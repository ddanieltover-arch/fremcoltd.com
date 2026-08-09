import type { PublishStatus } from "@prisma/client";
import { prisma } from "@/lib/prisma";

export async function listProducts() {
  return prisma.product.findMany({
    include: { category: true, images: { orderBy: { sortOrder: "asc" } } },
    orderBy: { updatedAt: "desc" },
  });
}

export async function countProducts() {
  return prisma.product.count();
}

export async function listCategories() {
  return prisma.category.findMany({ orderBy: { sortOrder: "asc" } });
}

export async function getProductById(id: string) {
  return prisma.product.findUnique({
    where: { id },
    include: {
      category: true,
      specifications: { orderBy: { sortOrder: "asc" } },
      packaging: { orderBy: { sortOrder: "asc" } },
      images: { orderBy: { sortOrder: "asc" } },
    },
  });
}

export async function createProduct(data: {
  name: string;
  slug: string;
  categoryId: string;
  shortDescription?: string;
  description?: string;
  originCountry?: string;
  status?: PublishStatus;
}) {
  const status = data.status ?? "DRAFT";
  return prisma.product.create({
    data: {
      name: data.name,
      slug: data.slug,
      categoryId: data.categoryId,
      shortDescription: data.shortDescription ?? "",
      description: data.description ?? "",
      originCountry: data.originCountry || null,
      status,
      publishedAt: status === "PUBLISHED" ? new Date() : null,
    },
  });
}

export async function updateProduct(
  id: string,
  data: {
    name?: string;
    slug?: string;
    categoryId?: string;
    shortDescription?: string;
    description?: string;
    originCountry?: string | null;
    status?: PublishStatus;
  },
) {
  const existing = await prisma.product.findUnique({ where: { id } });
  if (!existing) throw new Error("Product not found");

  let publishedAt = existing.publishedAt;
  if (data.status === "PUBLISHED" && !publishedAt) {
    publishedAt = new Date();
  }
  if (data.status && data.status !== "PUBLISHED") {
    publishedAt = publishedAt;
  }

  return prisma.product.update({
    where: { id },
    data: {
      ...data,
      publishedAt,
    },
  });
}

export async function deleteProduct(id: string) {
  return prisma.product.delete({ where: { id } });
}

export async function addProductSpecification(data: {
  productId: string;
  label: string;
  value: string;
  unit?: string;
}) {
  const count = await prisma.productSpecification.count({
    where: { productId: data.productId },
  });
  return prisma.productSpecification.create({
    data: {
      productId: data.productId,
      label: data.label,
      value: data.value,
      unit: data.unit || null,
      sortOrder: count,
    },
  });
}

export async function deleteProductSpecification(id: string) {
  return prisma.productSpecification.delete({ where: { id } });
}

export async function addProductPackaging(data: {
  productId: string;
  name: string;
  sizeLabel?: string;
  notes?: string;
}) {
  const count = await prisma.productPackaging.count({
    where: { productId: data.productId },
  });
  return prisma.productPackaging.create({
    data: {
      productId: data.productId,
      name: data.name,
      sizeLabel: data.sizeLabel || null,
      notes: data.notes || null,
      sortOrder: count,
    },
  });
}

export async function deleteProductPackaging(id: string) {
  return prisma.productPackaging.delete({ where: { id } });
}

export async function addProductImage(data: {
  productId: string;
  url: string;
  alt?: string;
  isPrimary?: boolean;
}) {
  const count = await prisma.productImage.count({
    where: { productId: data.productId },
  });
  if (data.isPrimary) {
    await prisma.productImage.updateMany({
      where: { productId: data.productId },
      data: { isPrimary: false },
    });
  }
  return prisma.productImage.create({
    data: {
      productId: data.productId,
      url: data.url,
      alt: data.alt ?? "",
      isPrimary: data.isPrimary ?? count === 0,
      sortOrder: count,
    },
  });
}

export async function deleteProductImage(id: string) {
  return prisma.productImage.delete({ where: { id } });
}
