"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, Menu, Phone, Search, X } from "lucide-react";
import { ProductSearchBar } from "@/components/search/ProductSearchBar";
import { Logo } from "@/components/layout/Logo";
import { navItems } from "@/config/site";
import { getSite } from "@/lib/content";
import { cn } from "@/lib/utils";

type NavChild = { label: string; href: string };
type NavItem =
  | { label: string; href: string }
  | { label: string; href: string; children: readonly NavChild[] };

function isDropdown(item: NavItem): item is { label: string; href: string; children: readonly NavChild[] } {
  return "children" in item;
}

function isChildActive(pathname: string, children: readonly NavChild[]) {
  return children.some((child) => pathname === child.href || pathname.startsWith(`${child.href}/`));
}

export function Header() {
  const site = getSite();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileSection, setMobileSection] = useState<string | null>(null);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setMobileOpen(false);
    setOpenDropdown(null);
  }, [pathname]);

  useEffect(() => {
    function handlePointerDown(event: MouseEvent) {
      if (!headerRef.current?.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    }
    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, []);

  return (
    <header ref={headerRef} className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 shadow-sm backdrop-blur-md">
      <div className="hidden border-b border-slate-100 bg-brand-900 text-sm text-white lg:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2.5">
          <p className="font-medium text-white/90">Sweetening the World with Thai Excellence</p>
          <div className="flex items-center gap-5">
            <a
              href={`tel:${site.phone.replace(/\s/g, "")}`}
              className="flex items-center gap-1.5 text-white/90 transition-colors hover:text-white"
            >
              <Phone className="h-4 w-4" />
              {site.phone}
            </a>
            <Link
              href="/request-a-quote"
              className="rounded-lg bg-white/10 px-4 py-1.5 font-semibold text-white ring-1 ring-white/20 transition-colors hover:bg-white/20"
            >
              Request a Quote
            </Link>
          </div>
        </div>
      </div>

      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-3.5 lg:py-4">
        <Logo showTagline={false} />

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main navigation">
          {navItems.map((item) => {
            if (isDropdown(item)) {
              const isOpen = openDropdown === item.label;
              const isActive = isChildActive(pathname, item.children);

              return (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => setOpenDropdown(item.label)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <button
                    type="button"
                    className={cn(
                      "flex items-center gap-1 rounded-lg px-3.5 py-2 text-sm font-medium transition-all",
                      isOpen || isActive
                        ? "text-brand-900 ring-1 ring-slate-900/80"
                        : "text-slate-700 hover:bg-slate-50 hover:text-brand-800",
                    )}
                    aria-expanded={isOpen}
                    aria-haspopup="true"
                    onClick={() => setOpenDropdown(isOpen ? null : item.label)}
                  >
                    {item.label}
                    <ChevronDown
                      className={cn("h-4 w-4 transition-transform duration-200", isOpen && "rotate-180")}
                    />
                  </button>

                  <div
                    className={cn(
                      "absolute left-0 top-full z-50 pt-2 transition-all duration-200",
                      isOpen ? "pointer-events-auto translate-y-0 opacity-100" : "pointer-events-none -translate-y-1 opacity-0",
                    )}
                  >
                    <div className="min-w-[240px] overflow-hidden rounded-xl border border-slate-200 bg-white p-2 shadow-xl ring-1 ring-slate-900/5">
                      {item.children.map((child) => {
                        const childActive =
                          pathname === child.href || pathname.startsWith(`${child.href}/`);

                        return (
                          <Link
                            key={child.href}
                            href={child.href}
                            className={cn(
                              "block rounded-lg px-4 py-3 text-sm font-medium transition-colors",
                              childActive
                                ? "bg-brand-50 text-brand-800"
                                : "text-slate-700 hover:bg-slate-50 hover:text-brand-900",
                            )}
                          >
                            {child.label}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            }

            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-lg px-3.5 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "text-brand-900 ring-1 ring-slate-900/80"
                    : "text-slate-700 hover:bg-slate-50 hover:text-brand-800",
                )}
              >
                {item.label}
              </Link>
            );
          })}

          <Link
            href="/search"
            className="ml-1 rounded-lg p-2.5 text-slate-600 transition-colors hover:bg-slate-50 hover:text-brand-800"
            aria-label="Search products"
          >
            <Search className="h-5 w-5" />
          </Link>
        </nav>

        <div className="flex items-center gap-2 lg:hidden">
          <Link
            href="/search"
            className="rounded-lg p-2.5 text-slate-600 transition-colors hover:bg-slate-50"
            aria-label="Search products"
          >
            <Search className="h-5 w-5" />
          </Link>
          <button
            type="button"
            className="rounded-lg border border-slate-200 p-2.5 text-slate-700 transition-colors hover:bg-slate-50"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-expanded={mobileOpen}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <div
        className={cn(
          "border-t border-slate-100 bg-white lg:hidden",
          mobileOpen ? "block" : "hidden",
        )}
      >
        <div className="mx-auto max-w-7xl px-4 pt-4">
          <ProductSearchBar />
        </div>
        <nav className="mx-auto max-w-7xl space-y-1 px-4 py-4" aria-label="Mobile navigation">
          {navItems.map((item) => {
            if (isDropdown(item)) {
              const isExpanded = mobileSection === item.label;
              const isActive = isChildActive(pathname, item.children);

              return (
                <div key={item.label} className="overflow-hidden rounded-xl border border-slate-200">
                  <button
                    type="button"
                    className={cn(
                      "flex w-full items-center justify-between px-4 py-3 text-left text-sm font-semibold transition-colors",
                      isActive ? "bg-brand-50 text-brand-900" : "bg-white text-slate-800",
                    )}
                    onClick={() => setMobileSection(isExpanded ? null : item.label)}
                    aria-expanded={isExpanded}
                  >
                    {item.label}
                    <ChevronDown
                      className={cn("h-4 w-4 transition-transform", isExpanded && "rotate-180")}
                    />
                  </button>
                  {isExpanded && (
                    <div className="border-t border-slate-100 bg-slate-50/80 p-2">
                      {item.children.map((child) => {
                        const childActive =
                          pathname === child.href || pathname.startsWith(`${child.href}/`);

                        return (
                          <Link
                            key={child.href}
                            href={child.href}
                            className={cn(
                              "block rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                              childActive
                                ? "bg-white text-brand-800 shadow-sm"
                                : "text-slate-600 hover:bg-white hover:text-brand-800",
                            )}
                            onClick={() => setMobileOpen(false)}
                          >
                            {child.label}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            }

            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "block rounded-xl px-4 py-3 text-sm font-semibold transition-colors",
                  isActive
                    ? "bg-brand-50 text-brand-900"
                    : "text-slate-800 hover:bg-slate-50",
                )}
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </Link>
            );
          })}
          <Link
            href="/request-a-quote"
            className="mt-3 block rounded-xl bg-brand-600 px-4 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-brand-700"
            onClick={() => setMobileOpen(false)}
          >
            Request a Quote
          </Link>
        </nav>
      </div>
    </header>
  );
}
