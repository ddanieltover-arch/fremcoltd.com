import { headers } from "next/headers";
import {
  checkRateLimit,
  EMAIL_RATE_LIMIT,
  FORM_RATE_LIMITS,
} from "@/lib/security/rate-limit";

export type FormKind = keyof typeof FORM_RATE_LIMITS;

const MIN_FILL_MS: Record<FormKind, number> = {
  contact: 2_000,
  quote: 2_000,
  newsletter: 800,
};

function asRecord(data: unknown): Record<string, unknown> {
  return data !== null && typeof data === "object" ? (data as Record<string, unknown>) : {};
}

/** Strip anti-abuse fields before Zod validation / email templates. */
export function stripAbuseFields(data: unknown): Record<string, unknown> {
  const record = { ...asRecord(data) };
  delete record.website;
  delete record.formStartedAt;
  return record;
}

export async function getClientIp(): Promise<string> {
  const h = await headers();
  const forwarded = h.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }
  return h.get("x-real-ip")?.trim() || h.get("cf-connecting-ip")?.trim() || "unknown";
}

export type AbuseCheckResult =
  | { ok: true }
  | { ok: false; silent: true }
  | { ok: false; silent: false; error: string };

/**
 * Honeypot + timing + IP rate limit.
 * Honeypot / too-fast submissions return silent failure (caller should fake success).
 */
export async function guardFormSubmission(
  data: unknown,
  form: FormKind,
): Promise<AbuseCheckResult> {
  const record = asRecord(data);

  const honeypot = String(record.website ?? "").trim();
  if (honeypot.length > 0) {
    console.warn("[security] honeypot tripped", { form });
    return { ok: false, silent: true };
  }

  const startedAt = Number(record.formStartedAt);
  if (Number.isFinite(startedAt)) {
    const elapsed = Date.now() - startedAt;
    if (elapsed >= 0 && elapsed < MIN_FILL_MS[form]) {
      console.warn("[security] form submitted too quickly", { form, elapsed });
      return { ok: false, silent: true };
    }
  }

  const ip = await getClientIp();
  const ipLimit = checkRateLimit(`form:${form}:ip:${ip}`, FORM_RATE_LIMITS[form]);
  if (!ipLimit.allowed) {
    console.warn("[security] IP rate limit", { form, ip });
    return {
      ok: false,
      silent: false,
      error: "Too many requests. Please wait a few minutes and try again, or email sales@fremcoltd.com.",
    };
  }

  return { ok: true };
}

/** Secondary limit after a valid email is known — slows spray attacks. */
export function guardEmailSubmission(email: string, form: FormKind): AbuseCheckResult {
  const normalized = email.trim().toLowerCase();
  if (!normalized) return { ok: true };

  const emailLimit = checkRateLimit(`form:${form}:email:${normalized}`, EMAIL_RATE_LIMIT);
  if (!emailLimit.allowed) {
    console.warn("[security] email rate limit", { form, email: normalized });
    return {
      ok: false,
      silent: false,
      error: "Too many requests from this email. Please try again later or contact sales@fremcoltd.com.",
    };
  }

  return { ok: true };
}
