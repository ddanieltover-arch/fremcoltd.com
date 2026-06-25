import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Layers } from "lucide-react";
import type { Category } from "@/types/content";
import { categoryMeta } from "@/config/site";
import { cn } from "@/lib/utils";

interface CategoryCardProps {
  category: Category;
  className?: string;
  variant?: "overlay" | "compact";
}

export function CategoryCard({ category, className, variant = "overlay" }: CategoryCardProps) {
  const meta = categoryMeta[category.slug];

  if (variant === "compact") {
    return (
      <Link
        href={`/product-category/${category.slug}`}
        className={cn(
          "modern-card group flex overflow-hidden rounded-2xl border-2 border-brand-200/80 bg-gradient-to-br from-brand-50 to-white shadow-sm hover:border-brand-400",
          className,
        )}
      >
        {meta?.image && (
          <div className="relative w-28 shrink-0 sm:w-32">
            <Image src={meta.image} alt={category.name} fill className="object-cover" sizes="128px" />
          </div>
        )}
        <div className="flex flex-1 flex-col justify-center p-4">
          <p className="text-xs font-bold uppercase tracking-wider text-brand-600">Category</p>
          <h2 className="mt-1 text-lg font-bold text-brand-900">{category.name}</h2>
          <p className="mt-1 line-clamp-2 text-xs text-slate-600">{meta?.description}</p>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={`/product-category/${category.slug}`}
      className={cn(
        "modern-card group relative block min-h-[220px] overflow-hidden rounded-3xl border-2 border-brand-900/10 shadow-md hover:border-brand-500/40 hover:shadow-xl hover:shadow-brand-900/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600",
        className,
      )}
    >
      {meta?.image && (
        <Image
          src={meta.image}
          alt={category.name}
          fill
          className="object-cover transition duration-700 group-hover:scale-110"
          sizes="(max-width:768px) 100vw, 25vw"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-brand-950 via-brand-950/70 to-brand-950/20 transition duration-500 group-hover:via-brand-950/80" />
      <div className="absolute inset-0 flex flex-col justify-end p-5 text-white sm:p-6">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider backdrop-blur-sm">
            <Layers className="h-3.5 w-3.5" />
            Category
          </span>
          <span className="rounded-full bg-brand-500/90 px-3 py-1 text-xs font-semibold backdrop-blur-sm">
            {category.count} products
          </span>
        </div>
        <h2 className="mt-3 text-2xl font-bold tracking-tight">{meta?.title ?? category.name}</h2>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-slate-200">{meta?.description}</p>
        <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand-200 transition group-hover:gap-3 group-hover:text-white">
          Browse category <ArrowRight className="h-4 w-4" />
        </span>
      </div>
    </Link>
  );
}
