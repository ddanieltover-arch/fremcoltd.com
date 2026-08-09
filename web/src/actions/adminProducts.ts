"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import type { PublishStatus } from "@prisma/client";
import { requireCmsWrite } from "@/lib/adminAuth";
import {
  addProductImage,
  addProductPackaging,
  addProductSpecification,
  createProduct,
  deleteProduct,
  deleteProductImage,
  deleteProductPackaging,
  deleteProductSpecification,
  updateProduct,
} from "@/services/adminProductService";

const PUBLISH_STATUSES: PublishStatus[] = ["DRAFT", "PUBLISHED", "ARCHIVED"];

function isPublishStatus(value: string): value is PublishStatus {
  return PUBLISH_STATUSES.includes(value as PublishStatus);
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function revalidateProductPaths(id?: string) {
  revalidatePath("/admin");
  revalidatePath("/admin/products");
  if (id) revalidatePath(`/admin/products/${id}`);
}

export async function createProductAction(formData: FormData) {
  await requireCmsWrite();
  const name = String(formData.get("name") ?? "").trim();
  const categoryId = String(formData.get("categoryId") ?? "").trim();
  const slugInput = String(formData.get("slug") ?? "").trim();
  if (!name || !categoryId) throw new Error("Name and category are required");

  const product = await createProduct({
    name,
    slug: slugInput || slugify(name),
    categoryId,
    shortDescription: String(formData.get("shortDescription") ?? "").trim(),
    status: "DRAFT",
  });
  revalidateProductPaths(product.id);
  redirect(`/admin/products/${product.id}`);
}

export async function updateProductAction(formData: FormData) {
  await requireCmsWrite();
  const id = String(formData.get("id") ?? "");
  if (!id) throw new Error("Missing product id");

  const status = String(formData.get("status") ?? "");
  await updateProduct(id, {
    name: String(formData.get("name") ?? "").trim(),
    slug: String(formData.get("slug") ?? "").trim(),
    categoryId: String(formData.get("categoryId") ?? "").trim(),
    shortDescription: String(formData.get("shortDescription") ?? "").trim(),
    description: String(formData.get("description") ?? "").trim(),
    originCountry: String(formData.get("originCountry") ?? "").trim() || null,
    status: isPublishStatus(status) ? status : undefined,
  });
  revalidateProductPaths(id);
}

export async function deleteProductAction(formData: FormData) {
  await requireCmsWrite();
  const id = String(formData.get("id") ?? "");
  if (!id) throw new Error("Missing product id");
  await deleteProduct(id);
  revalidateProductPaths();
}

export async function addProductSpecAction(formData: FormData) {
  await requireCmsWrite();
  const productId = String(formData.get("productId") ?? "");
  const label = String(formData.get("label") ?? "").trim();
  const value = String(formData.get("value") ?? "").trim();
  if (!productId || !label || !value) throw new Error("Spec fields required");
  await addProductSpecification({
    productId,
    label,
    value,
    unit: String(formData.get("unit") ?? "").trim() || undefined,
  });
  revalidateProductPaths(productId);
}

export async function deleteProductSpecAction(formData: FormData) {
  await requireCmsWrite();
  const id = String(formData.get("id") ?? "");
  const productId = String(formData.get("productId") ?? "");
  if (!id) throw new Error("Missing spec id");
  await deleteProductSpecification(id);
  revalidateProductPaths(productId || undefined);
}

export async function addProductPackagingAction(formData: FormData) {
  await requireCmsWrite();
  const productId = String(formData.get("productId") ?? "");
  const name = String(formData.get("name") ?? "").trim();
  if (!productId || !name) throw new Error("Packaging name required");
  await addProductPackaging({
    productId,
    name,
    sizeLabel: String(formData.get("sizeLabel") ?? "").trim() || undefined,
    notes: String(formData.get("notes") ?? "").trim() || undefined,
  });
  revalidateProductPaths(productId);
}

export async function deleteProductPackagingAction(formData: FormData) {
  await requireCmsWrite();
  const id = String(formData.get("id") ?? "");
  const productId = String(formData.get("productId") ?? "");
  if (!id) throw new Error("Missing packaging id");
  await deleteProductPackaging(id);
  revalidateProductPaths(productId || undefined);
}

export async function addProductImageAction(formData: FormData) {
  await requireCmsWrite();
  const productId = String(formData.get("productId") ?? "");
  const url = String(formData.get("url") ?? "").trim();
  if (!productId || !url) throw new Error("Image URL required");
  await addProductImage({
    productId,
    url,
    alt: String(formData.get("alt") ?? "").trim() || undefined,
    isPrimary: formData.get("isPrimary") === "on",
  });
  revalidateProductPaths(productId);
}

export async function deleteProductImageAction(formData: FormData) {
  await requireCmsWrite();
  const id = String(formData.get("id") ?? "");
  const productId = String(formData.get("productId") ?? "");
  if (!id) throw new Error("Missing image id");
  await deleteProductImage(id);
  revalidateProductPaths(productId || undefined);
}
