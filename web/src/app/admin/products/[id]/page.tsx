import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  addProductImageAction,
  addProductPackagingAction,
  addProductSpecAction,
  deleteProductAction,
  deleteProductImageAction,
  deleteProductPackagingAction,
  deleteProductSpecAction,
  updateProductAction,
} from "@/actions/adminProducts";
import { AdminDeleteButton } from "@/components/admin/AdminDeleteButton";
import { AdminShell } from "@/components/admin/AdminShell";
import { AdminStatusForm } from "@/components/admin/AdminStatusForm";
import { requireAdmin } from "@/lib/adminAuth";
import { getProductById, listCategories } from "@/services/adminProductService";

export const metadata: Metadata = {
  title: "Product detail",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

const fieldClass =
  "w-full rounded-[var(--brand-radius-md)] border border-brand-border bg-white px-3 py-2 text-sm";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function AdminProductDetailPage({ params }: PageProps) {
  await requireAdmin();
  const { id } = await params;
  const [product, categories] = await Promise.all([getProductById(id), listCategories()]);
  if (!product) notFound();

  return (
    <AdminShell
      title={product.name}
      current="/admin/products"
      actions={
        <AdminDeleteButton
          action={deleteProductAction}
          id={product.id}
          hrefAfter="/admin/products"
          confirmText={`Delete product ${product.name}?`}
        />
      }
    >
      <Link
        href="/admin/products"
        className="mb-4 inline-block text-sm text-brand-muted hover:text-brand-primary"
      >
        ← Back to products
      </Link>

      <div className="space-y-6">
        <section className="rounded-[var(--brand-radius-md)] border border-brand-border bg-brand-surface p-6">
          <h2 className="font-display mb-4 text-lg text-brand-primary">Core details</h2>
          <AdminStatusForm action={updateProductAction} className="grid gap-3 md:grid-cols-2">
            <input type="hidden" name="id" value={product.id} />
            <label className="block text-sm">
              <span className="mb-1 block text-brand-muted">Name</span>
              <input className={fieldClass} name="name" defaultValue={product.name} required />
            </label>
            <label className="block text-sm">
              <span className="mb-1 block text-brand-muted">Slug</span>
              <input className={fieldClass} name="slug" defaultValue={product.slug} required />
            </label>
            <label className="block text-sm">
              <span className="mb-1 block text-brand-muted">Category</span>
              <select className={fieldClass} name="categoryId" defaultValue={product.categoryId}>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </label>
            <label className="block text-sm">
              <span className="mb-1 block text-brand-muted">Status</span>
              <select className={fieldClass} name="status" defaultValue={product.status}>
                <option value="DRAFT">DRAFT</option>
                <option value="PUBLISHED">PUBLISHED</option>
                <option value="ARCHIVED">ARCHIVED</option>
              </select>
            </label>
            <label className="block text-sm">
              <span className="mb-1 block text-brand-muted">Origin country</span>
              <input
                className={fieldClass}
                name="originCountry"
                defaultValue={product.originCountry ?? ""}
              />
            </label>
            <label className="block text-sm md:col-span-2">
              <span className="mb-1 block text-brand-muted">Short description</span>
              <input
                className={fieldClass}
                name="shortDescription"
                defaultValue={product.shortDescription}
              />
            </label>
            <label className="block text-sm md:col-span-2">
              <span className="mb-1 block text-brand-muted">Description</span>
              <textarea
                className={fieldClass}
                name="description"
                rows={5}
                defaultValue={product.description}
              />
            </label>
          </AdminStatusForm>
        </section>

        <section className="rounded-[var(--brand-radius-md)] border border-brand-border bg-brand-surface p-6">
          <h2 className="font-display mb-4 text-lg text-brand-primary">Specifications</h2>
          {product.specifications.length === 0 ? (
            <p className="mb-4 text-sm text-brand-muted">No specifications yet.</p>
          ) : (
            <ul className="mb-4 divide-y divide-brand-border border border-brand-border rounded-[var(--brand-radius-md)]">
              {product.specifications.map((spec) => (
                <li key={spec.id} className="flex items-center justify-between gap-3 px-3 py-2 text-sm">
                  <span>
                    {spec.label}: {spec.value}
                    {spec.unit ? ` ${spec.unit}` : ""}
                  </span>
                  <form action={deleteProductSpecAction}>
                    <input type="hidden" name="id" value={spec.id} />
                    <input type="hidden" name="productId" value={product.id} />
                    <button type="submit" className="text-brand-error hover:underline">
                      Remove
                    </button>
                  </form>
                </li>
              ))}
            </ul>
          )}
          <AdminStatusForm action={addProductSpecAction} className="grid gap-3 md:grid-cols-4">
            <input type="hidden" name="productId" value={product.id} />
            <input className={fieldClass} name="label" placeholder="Label" required />
            <input className={fieldClass} name="value" placeholder="Value" required />
            <input className={fieldClass} name="unit" placeholder="Unit" />
          </AdminStatusForm>
        </section>

        <section className="rounded-[var(--brand-radius-md)] border border-brand-border bg-brand-surface p-6">
          <h2 className="font-display mb-4 text-lg text-brand-primary">Packaging</h2>
          {product.packaging.length === 0 ? (
            <p className="mb-4 text-sm text-brand-muted">No packaging rows yet.</p>
          ) : (
            <ul className="mb-4 divide-y divide-brand-border border border-brand-border rounded-[var(--brand-radius-md)]">
              {product.packaging.map((pack) => (
                <li key={pack.id} className="flex items-center justify-between gap-3 px-3 py-2 text-sm">
                  <span>
                    {pack.name}
                    {pack.sizeLabel ? ` — ${pack.sizeLabel}` : ""}
                  </span>
                  <form action={deleteProductPackagingAction}>
                    <input type="hidden" name="id" value={pack.id} />
                    <input type="hidden" name="productId" value={product.id} />
                    <button type="submit" className="text-brand-error hover:underline">
                      Remove
                    </button>
                  </form>
                </li>
              ))}
            </ul>
          )}
          <AdminStatusForm action={addProductPackagingAction} className="grid gap-3 md:grid-cols-3">
            <input type="hidden" name="productId" value={product.id} />
            <input className={fieldClass} name="name" placeholder="Name" required />
            <input className={fieldClass} name="sizeLabel" placeholder="Size label" />
            <input className={fieldClass} name="notes" placeholder="Notes" />
          </AdminStatusForm>
        </section>

        <section className="rounded-[var(--brand-radius-md)] border border-brand-border bg-brand-surface p-6">
          <h2 className="font-display mb-4 text-lg text-brand-primary">Images</h2>
          {product.images.length === 0 ? (
            <p className="mb-4 text-sm text-brand-muted">No images yet. Attach by URL.</p>
          ) : (
            <ul className="mb-4 divide-y divide-brand-border border border-brand-border rounded-[var(--brand-radius-md)]">
              {product.images.map((image) => (
                <li key={image.id} className="flex items-center justify-between gap-3 px-3 py-2 text-sm">
                  <span className="truncate">
                    {image.isPrimary ? "[Primary] " : ""}
                    {image.url}
                  </span>
                  <form action={deleteProductImageAction}>
                    <input type="hidden" name="id" value={image.id} />
                    <input type="hidden" name="productId" value={product.id} />
                    <button type="submit" className="text-brand-error hover:underline">
                      Remove
                    </button>
                  </form>
                </li>
              ))}
            </ul>
          )}
          <AdminStatusForm action={addProductImageAction} className="grid gap-3 md:grid-cols-3">
            <input type="hidden" name="productId" value={product.id} />
            <input className={fieldClass} name="url" placeholder="Image URL" required />
            <input className={fieldClass} name="alt" placeholder="Alt text" />
            <label className="flex items-center gap-2 text-sm text-brand-muted">
              <input type="checkbox" name="isPrimary" />
              Primary image
            </label>
          </AdminStatusForm>
        </section>
      </div>
    </AdminShell>
  );
}
