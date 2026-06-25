"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface ProductGalleryProps {
  title: string;
  images: string[];
}

export function ProductGallery({ title, images }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeImage = images[activeIndex];

  if (images.length === 0) return null;

  return (
    <div className="space-y-4">
      <div className="relative aspect-square overflow-hidden rounded-3xl bg-gradient-to-br from-brand-50 to-brand-100">
        <Image
          key={activeImage}
          src={activeImage}
          alt={`${title} — image ${activeIndex + 1}`}
          fill
          className="object-contain p-4"
          sizes="(max-width:1024px) 100vw, 50vw"
          priority={activeIndex === 0}
        />
      </div>

      {images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-1">
          {images.map((src, index) => (
            <button
              key={src}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={cn(
                "relative h-20 w-20 shrink-0 overflow-hidden rounded-xl border-2 bg-white transition sm:h-24 sm:w-24",
                index === activeIndex
                  ? "border-brand-600 ring-2 ring-brand-200"
                  : "border-slate-200 hover:border-brand-300",
              )}
              aria-label={`View image ${index + 1}`}
              aria-current={index === activeIndex}
            >
              <Image src={src} alt="" fill className="object-contain p-1" sizes="96px" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
