"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { Search } from "lucide-react";
import { type SearchCategory, searchCategories } from "@/lib/search";
import { cn } from "@/lib/utils";

interface ProductSearchBarProps {
  className?: string;
  defaultQuery?: string;
  defaultCategory?: SearchCategory;
  compact?: boolean;
}

export function ProductSearchBar({
  className,
  defaultQuery = "",
  defaultCategory = "all",
  compact = false,
}: ProductSearchBarProps) {
  const router = useRouter();
  const [query, setQuery] = useState(defaultQuery);
  const [category, setCategory] = useState<SearchCategory>(defaultCategory);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (query.trim()) params.set("q", query.trim());
    if (category !== "all") params.set("category", category);
    const qs = params.toString();
    router.push(qs ? `/search?${qs}` : "/search");
  }

  return (
    <form onSubmit={handleSubmit} className={cn("flex flex-col gap-2 sm:flex-row sm:items-center", className)}>
      {!compact && (
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value as SearchCategory)}
          className="rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
          aria-label="Product category"
        >
          {searchCategories.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
      )}
      <div className="relative flex-1">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search products..."
          className={cn(
            "w-full rounded-lg border border-slate-300 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100",
            compact && "py-2",
          )}
        />
      </div>
      <button
        type="submit"
        className={cn(
          "rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-700",
          compact && "px-3 py-2",
        )}
      >
        Search
      </button>
    </form>
  );
}
