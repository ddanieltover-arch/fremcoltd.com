"use server";

import { revalidatePath } from "next/cache";
import type { QuoteStatus } from "@prisma/client";
import { requireSalesWrite } from "@/lib/adminAuth";
import {
  deleteQuoteRequest,
  updateQuoteRequest,
  updateQuoteStatus,
} from "@/services/quoteService";

const QUOTE_STATUSES: QuoteStatus[] = [
  "NEW",
  "IN_PROGRESS",
  "AWAITING_INFO",
  "QUOTED",
  "CLOSED",
  "SPAM",
  "ARCHIVED",
];

function isQuoteStatus(value: string): value is QuoteStatus {
  return QUOTE_STATUSES.includes(value as QuoteStatus);
}

function revalidateQuotePaths(id?: string) {
  revalidatePath("/admin");
  revalidatePath("/admin/quotes");
  if (id) revalidatePath(`/admin/quotes/${id}`);
}

export async function updateQuoteStatusAction(formData: FormData) {
  await requireSalesWrite();
  const id = String(formData.get("id") ?? "");
  const status = String(formData.get("status") ?? "");
  if (!id || !isQuoteStatus(status)) throw new Error("Invalid quote status update");
  await updateQuoteStatus(id, status);
  revalidateQuotePaths(id);
}

export async function updateQuoteAction(formData: FormData) {
  await requireSalesWrite();
  const id = String(formData.get("id") ?? "");
  if (!id) throw new Error("Missing quote id");

  const status = String(formData.get("status") ?? "");
  await updateQuoteRequest(id, {
    companyName: String(formData.get("companyName") ?? "").trim(),
    contactName: String(formData.get("contactName") ?? "").trim(),
    email: String(formData.get("email") ?? "").trim().toLowerCase(),
    phone: String(formData.get("phone") ?? "").trim() || null,
    country: String(formData.get("country") ?? "").trim() || null,
    productLabel: String(formData.get("productLabel") ?? "").trim() || null,
    quantityText: String(formData.get("quantityText") ?? "").trim(),
    destination: String(formData.get("destination") ?? "").trim(),
    message: String(formData.get("message") ?? "").trim() || null,
    status: isQuoteStatus(status) ? status : undefined,
  });
  revalidateQuotePaths(id);
}

export async function deleteQuoteAction(formData: FormData) {
  await requireSalesWrite();
  const id = String(formData.get("id") ?? "");
  if (!id) throw new Error("Missing quote id");
  await deleteQuoteRequest(id);
  revalidateQuotePaths();
}
