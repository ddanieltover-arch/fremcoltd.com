"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { heroSlides } from "@/config/assets";
import { cn } from "@/lib/utils";

const SLIDE_DURATION_MS = 10000;

export function HeroSlider() {
  const [index, setIndex] = useState(0);
  const [textVisible, setTextVisible] = useState(false);
  const isLastSlide = index === heroSlides.length - 1;

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i === heroSlides.length - 1 ? 0 : i + 1));
    }, SLIDE_DURATION_MS);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    setTextVisible(false);
    if (!isLastSlide) return;
    const timer = setTimeout(() => setTextVisible(true), 200);
    return () => clearTimeout(timer);
  }, [index, isLastSlide]);

  return (
    <section className="relative h-[420px] overflow-hidden bg-brand-950 md:h-[520px]">
      {heroSlides.map((item, i) => (
        <Link
          key={item.src}
          href={item.href}
          className={cn(
            "absolute inset-0 transition-all duration-1000 ease-out",
            i === index ? "z-10 scale-100 opacity-100" : "z-0 scale-105 opacity-0",
          )}
          tabIndex={i === index ? 0 : -1}
          aria-hidden={i !== index}
        >
          <Image
            src={item.src}
            alt={item.alt}
            fill
            className={cn("object-cover", i === index && "animate-ken-burns")}
            sizes="100vw"
            priority={i === 0}
          />
          <div
            className={cn(
              "absolute inset-0 transition-opacity duration-700",
              i === heroSlides.length - 1
                ? "bg-gradient-to-r from-brand-950/85 via-brand-950/45 to-brand-950/20"
                : "bg-gradient-to-t from-brand-950/50 via-brand-950/15 to-transparent",
            )}
          />
        </Link>
      ))}

      {isLastSlide && (
        <div className="pointer-events-none relative z-20 mx-auto flex h-full max-w-7xl items-end px-4 pb-14">
          <div
            className={cn(
              "max-w-xl text-white transition-all duration-700",
              textVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
            )}
          >
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-200">About Our Company</p>
            <h1 className="mt-3 text-3xl font-bold leading-tight md:text-5xl">FREEM ENTERPRISE CO., LTD</h1>
            <p className="mt-4 text-base text-slate-200 md:text-lg">
              Sweetening the World with Thai Excellence — premium sugar, rice, fertilizers, and edible cooking oil.
            </p>
            <p className="mt-2 text-sm text-brand-200">{heroSlides[heroSlides.length - 1].alt}</p>
          </div>
        </div>
      )}

      <div className="absolute bottom-0 left-0 right-0 z-30 h-1 bg-white/15">
        <div key={index} className="h-full bg-gradient-to-r from-brand-400 to-brand-200 animate-hero-progress" />
      </div>

      <div className="absolute bottom-5 right-4 z-30 flex items-center gap-2">
        <button
          type="button"
          onClick={() => setIndex((i) => (i === 0 ? heroSlides.length - 1 : i - 1))}
          className="rounded-full border border-white/20 bg-white/15 p-2.5 text-white backdrop-blur-md transition hover:scale-105 hover:bg-white/25"
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          type="button"
          onClick={() => setIndex((i) => (i === heroSlides.length - 1 ? 0 : i + 1))}
          className="rounded-full border border-white/20 bg-white/15 p-2.5 text-white backdrop-blur-md transition hover:scale-105 hover:bg-white/25"
          aria-label="Next slide"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      <div className="absolute bottom-5 left-1/2 z-30 flex -translate-x-1/2 gap-2">
        {heroSlides.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setIndex(i)}
            className={cn(
              "h-2 rounded-full transition-all duration-300",
              i === index ? "w-8 bg-white" : "w-2 bg-white/40 hover:bg-white/60",
            )}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
