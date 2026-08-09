import type { QuoteStatus } from "@prisma/client";
import { prisma } from "@/lib/prisma";

function makeReferenceCode() {
  const stamp = Date.now().toString(36).toUpperCase();
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `FQ-${stamp}-${rand}`;
}

export async function listQuotes() {
  return prisma.quoteRequest.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export async function getQuoteById(id: string) {
  return prisma.quoteRequest.findUnique({ where: { id } });
}

export async function countQuotesByStatuses(statuses: QuoteStatus[]) {
  return prisma.quoteRequest.count({
    where: { status: { in: statuses } },
  });
}

export async function listRecentQuotes(take = 5) {
  return prisma.quoteRequest.findMany({
    orderBy: { createdAt: "desc" },
    take,
  });
}

export type CreateQuoteInput = {
  companyName: string;
  contactName: string;
  email: string;
  phone?: string;
  country?: string;
  productLabel?: string;
  quantityText: string;
  destination: string;
  message?: string;
};

export async function createQuoteRequest(input: CreateQuoteInput) {
  return prisma.quoteRequest.create({
    data: {
      referenceCode: makeReferenceCode(),
      companyName: input.companyName,
      contactName: input.contactName,
      email: input.email.toLowerCase(),
      phone: input.phone || null,
      country: input.country || null,
      productLabel: input.productLabel || null,
      quantityText: input.quantityText,
      destination: input.destination,
      message: input.message || null,
    },
  });
}

export async function updateQuoteRequest(
  id: string,
  data: {
    companyName?: string;
    contactName?: string;
    email?: string;
    phone?: string | null;
    country?: string | null;
    productLabel?: string | null;
    quantityText?: string;
    destination?: string;
    message?: string | null;
    status?: QuoteStatus;
    version?: number;
  },
) {
  return prisma.quoteRequest.update({
    where: { id },
    data: {
      ...data,
      version: { increment: 1 },
    },
  });
}

export async function updateQuoteStatus(id: string, status: QuoteStatus) {
  return prisma.quoteRequest.update({
    where: { id },
    data: { status, version: { increment: 1 } },
  });
}

export async function deleteQuoteRequest(id: string) {
  return prisma.quoteRequest.delete({ where: { id } });
}
