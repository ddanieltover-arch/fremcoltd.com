"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import type { Testimonial } from "@/types/content";
import { cn } from "@/lib/utils";

interface TestimonialsProps {
  items: Testimonial[];
}

export function TestimonialsCarousel({ items }: TestimonialsProps) {
  const [index, setIndex] = useState(0);
  const [animating, setAnimating] = useState(false);
  const current = items[index];

  function goTo(next: number) {
    if (animating) return;
    setAnimating(true);
    setIndex(next);
    setTimeout(() => setAnimating(false), 400);
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-16">
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl border border-brand-100 bg-gradient-to-br from-brand-50 via-white to-slate-50 px-6 py-12 shadow-sm md:px-12">
          <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-brand-200/30 blur-2xl" />
          <Quote className="h-10 w-10 text-brand-400" />
          <blockquote
            className={cn(
              "mt-6 text-2xl font-medium leading-relaxed text-brand-950 transition-all duration-300 md:text-3xl",
              animating ? "translate-y-2 opacity-0" : "translate-y-0 opacity-100",
            )}
          >
            &ldquo;{current.quote}&rdquo;
          </blockquote>
          <div
            className={cn(
              "transition-all duration-300",
              animating ? "translate-y-2 opacity-0" : "translate-y-0 opacity-100",
            )}
          >
            <p className="mt-6 font-semibold text-brand-800">{current.author}</p>
            <p className="text-sm text-slate-600">{current.role}</p>
          </div>

          <div className="mt-8 flex items-center gap-3">
            <button
              type="button"
              onClick={() => goTo(index === 0 ? items.length - 1 : index - 1)}
              className="rounded-full border border-brand-200 bg-white/80 p-2 backdrop-blur transition hover:scale-105 hover:bg-white"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => goTo(index === items.length - 1 ? 0 : index + 1)}
              className="rounded-full border border-brand-200 bg-white/80 p-2 backdrop-blur transition hover:scale-105 hover:bg-white"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
            <div className="ml-4 flex gap-2">
              {items.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => goTo(i)}
                  className={cn(
                    "h-2 rounded-full transition-all duration-300",
                    i === index ? "w-8 bg-brand-600" : "w-2 bg-brand-200 hover:bg-brand-400",
                  )}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
