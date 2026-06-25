import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import type { Product } from "@/types/content";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  className?: string;
}

const categoryGradients: Record<string, string> = {
  sugar: "from-amber-100 to-amber-50",
  rice: "from-emerald-100 to-emerald-50",
  fertilizers: "from-lime-100 to-lime-50",
  "edible-cooking-oil": "from-yellow-100 to-yellow-50",
};

export function ProductCard({ product, className }: ProductCardProps) {
  const category = product.categories[0] ?? "sugar";
  const gradient = categoryGradients[category] ?? "from-brand-100 to-brand-50";

  return (
    <Link
      href={`/product/${product.slug}`}
      className={cn(
        "card-shine modern-card group block overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm hover:border-brand-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600",
        className,
      )}
    >
      <article>
        <div className={cn("relative aspect-[4/3] overflow-hidden bg-gradient-to-br", gradient)}>
          {product.image ? (
            <Image
              src={product.image}
              alt={product.title}
              fill
              className="object-cover transition duration-500 group-hover:scale-105"
              sizes="(max-width:768px) 100vw, 25vw"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center p-6 text-center">
              <p className="text-sm font-semibold uppercase tracking-wide text-brand-900/70">{product.title}</p>
            </div>
          )}
          <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand-800">
            {category.replace("-", " ")}
          </span>
        </div>
        <div className="p-5">
          <h3 className="line-clamp-2 text-base font-semibold text-slate-900">{product.title}</h3>
          <p className="mt-2 line-clamp-3 text-sm text-slate-600">
            {product.excerpt || product.description.slice(0, 140)}
          </p>
          <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-700 group-hover:text-brand-900">
            Read more <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </span>
        </div>
      </article>
    </Link>
  );
}
