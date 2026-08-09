"use server";

import { revalidatePath } from "next/cache";
import type { InquiryStatus } from "@prisma/client";
import { requireSalesWrite } from "@/lib/adminAuth";
import {
  deleteInquiry,
  updateInquiry,
  updateInquiryStatus,
} from "@/services/inquiryService";

const INQUIRY_STATUSES: InquiryStatus[] = [
  "NEW",
  "IN_PROGRESS",
  "CLOSED",
  "SPAM",
  "ARCHIVED",
];

function isInquiryStatus(value: string): value is InquiryStatus {
  return INQUIRY_STATUSES.includes(value as InquiryStatus);
}

function revalidateInquiryPaths(id?: string) {
  revalidatePath("/admin");
  revalidatePath("/admin/inquiries");
  if (id) revalidatePath(`/admin/inquiries/${id}`);
}

export async function updateInquiryStatusAction(formData: FormData) {
  await requireSalesWrite();
  const id = String(formData.get("id") ?? "");
  const status = String(formData.get("status") ?? "");
  if (!id || !isInquiryStatus(status)) throw new Error("Invalid inquiry status update");
  await updateInquiryStatus(id, status);
  revalidateInquiryPaths(id);
}

export async function updateInquiryAction(formData: FormData) {
  await requireSalesWrite();
  const id = String(formData.get("id") ?? "");
  if (!id) throw new Error("Missing inquiry id");

  const status = String(formData.get("status") ?? "");
  await updateInquiry(id, {
    companyName: String(formData.get("companyName") ?? "").trim() || null,
    contactName: String(formData.get("contactName") ?? "").trim(),
    email: String(formData.get("email") ?? "").trim().toLowerCase(),
    phone: String(formData.get("phone") ?? "").trim() || null,
    country: String(formData.get("country") ?? "").trim() || null,
    message: String(formData.get("message") ?? "").trim(),
    status: isInquiryStatus(status) ? status : undefined,
  });
  revalidateInquiryPaths(id);
}

export async function deleteInquiryAction(formData: FormData) {
  await requireSalesWrite();
  const id = String(formData.get("id") ?? "");
  if (!id) throw new Error("Missing inquiry id");
  await deleteInquiry(id);
  revalidateInquiryPaths();
}
