import type { AdminRole } from "@prisma/client";
import { auth } from "@/auth";

export type AdminSessionUser = {
  id: string;
  email: string;
  name?: string | null;
  role: AdminRole;
};

const WRITE_ROLES: AdminRole[] = ["SUPER_ADMIN", "ADMIN"];
const CMS_WRITE_ROLES: AdminRole[] = ["SUPER_ADMIN", "ADMIN", "EDITOR"];
const SALES_WRITE_ROLES: AdminRole[] = ["SUPER_ADMIN", "ADMIN", "SALES_MANAGER"];

async function getSessionUser(): Promise<AdminSessionUser | null> {
  const session = await auth();
  if (!session?.user?.id || !session.user.email || !session.user.role) {
    return null;
  }
  return {
    id: session.user.id,
    email: session.user.email,
    name: session.user.name,
    role: session.user.role,
  };
}

function assertRole(user: AdminSessionUser, allowed: AdminRole[]): AdminSessionUser {
  if (!allowed.includes(user.role)) {
    throw new Error("Forbidden");
  }
  return user;
}

export async function requireAdmin(): Promise<AdminSessionUser> {
  const user = await getSessionUser();
  if (!user) throw new Error("Unauthorized");
  return user;
}

export async function requireAdminWrite(): Promise<AdminSessionUser> {
  return assertRole(await requireAdmin(), WRITE_ROLES);
}

export async function requireCmsWrite(): Promise<AdminSessionUser> {
  return assertRole(await requireAdmin(), CMS_WRITE_ROLES);
}

export async function requireSalesWrite(): Promise<AdminSessionUser> {
  return assertRole(await requireAdmin(), SALES_WRITE_ROLES);
}

export function safeAdminCallbackUrl(raw: string | null | undefined): string {
  if (!raw) return "/admin";
  if (!raw.startsWith("/admin")) return "/admin";
  if (raw.startsWith("//")) return "/admin";
  if (raw.includes("://")) return "/admin";
  return raw;
}
