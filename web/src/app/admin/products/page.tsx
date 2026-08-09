import type { Metadata } from "next";
import Link from "next/link";
import { createProductAction, deleteProductAction } from "@/actions/adminProducts";
import { AdminDeleteButton } from "@/components/admin/AdminDeleteButton";
import { AdminShell } from "@/components/admin/AdminShell";
import { requireAdmin } from "@/lib/adminAuth";
import { listCategories, listProducts } from "@/services/adminProductService";

export const metadata: Metadata = {
  title: "Products",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

const fieldClass =
  "w-full rounded-[var(--brand-radius-md)] border border-brand-border bg-white px-3 py-2 text-sm";

export default async function AdminProductsPage() {
  await requireAdmin();
  const [products, categories] = await Promise.all([listProducts(), listCategories()]);

  return (
    <AdminShell title="Products" current="/admin/products">
      <section className="mb-8 rounded-[var(--brand-radius-md)] border border-brand-border bg-brand-surface p-5">
        <h2 className="font-display mb-3 text-lg text-brand-primary">Create product</h2>
        <p className="mb-4 text-sm text-brand-muted">
          Admin CMS only for v1 — the public catalogue still reads from static JSON.
        </p>
        {categories.length === 0 ? (
          <p className="text-sm text-brand-error">
            No categories seeded. Run `npm run db:seed` first.
          </p>
        ) : (
          <form action={createProductAction} className="grid gap-3 md:grid-cols-2">
            <label className="block text-sm md:col-span-1">
              <span className="mb-1 block text-brand-muted">Name</span>
              <input className={fieldClass} name="name" required />
            </label>
            <label className="block text-sm">
              <span className="mb-1 block text-brand-muted">Slug (optional)</span>
              <input className={fieldClass} name="slug" placeholder="auto-from-name" />
            </label>
            <label className="block text-sm">
              <span className="mb-1 block text-brand-muted">Category</span>
              <select className={fieldClass} name="categoryId" required defaultValue="">
                <option value="" disabled>
                  Select category
                </option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </label>
            <label className="block text-sm md:col-span-2">
              <span className="mb-1 block text-brand-muted">Short description</span>
              <input className={fieldClass} name="shortDescription" />
            </label>
            <div className="md:col-span-2">
              <button
                type="submit"
                className="min-h-11 rounded-[var(--brand-radius-md)] bg-brand-primary px-4 text-sm font-semibold text-white hover:bg-brand-primary-hover"
              >
                Create product
              </button>
            </div>
          </form>
        )}
      </section>

      {products.length === 0 ? (
        <p className="rounded-[var(--brand-radius-md)] border border-dashed border-brand-border bg-brand-surface px-4 py-12 text-center text-sm text-brand-muted">
          No CMS products yet. Create one above.
        </p>
      ) : (
        <div className="overflow-x-auto rounded-[var(--brand-radius-md)] border border-brand-border bg-brand-surface">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-brand-bg text-brand-muted">
              <tr>
                <th className="px-4 py-3 font-medium">Product</th>
                <th className="px-4 py-3 font-medium">Category</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-t border-brand-border">
                  <td className="px-4 py-3">
                    <Link
                      href={`/admin/products/${product.id}`}
                      className="font-medium text-brand-primary hover:underline"
                    >
                      {product.name}
                    </Link>
                    <p className="text-xs text-brand-muted">{product.slug}</p>
                  </td>
                  <td className="px-4 py-3">{product.category.name}</td>
                  <td className="px-4 py-3">{product.status}</td>
                  <td className="px-4 py-3">
                    <div className="flex flex-col gap-2">
                      <Link
                        href={`/admin/products/${product.id}`}
                        className="text-sm text-brand-primary hover:underline"
                      >
                        Edit
                      </Link>
                      <AdminDeleteButton
                        action={deleteProductAction}
                        id={product.id}
                        confirmText={`Delete product ${product.name}?`}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </AdminShell>
  );
}
