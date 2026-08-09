import Link from "next/link";
import { AdminSignOutButton } from "@/components/admin/AdminSignOutButton";

const NAV_ITEMS = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/quotes", label: "Quotes" },
  { href: "/admin/inquiries", label: "Inquiries" },
  { href: "/admin/products", label: "Products" },
] as const;

type AdminNavProps = {
  current: string;
};

export function AdminNav({ current }: AdminNavProps) {
  return (
    <nav aria-label="Admin" className="flex flex-wrap items-center gap-2">
      {NAV_ITEMS.map((item) => {
        const active =
          item.href === "/admin" ? current === "/admin" : current.startsWith(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? "page" : undefined}
            className={
              active
                ? "rounded-full bg-brand-primary px-3 py-1.5 text-sm font-medium text-white"
                : "rounded-full px-3 py-1.5 text-sm text-brand-muted hover:bg-brand-bg hover:text-brand-text"
            }
          >
            {item.label}
          </Link>
        );
      })}
      <AdminSignOutButton />
    </nav>
  );
}
