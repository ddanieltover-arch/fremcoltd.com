"use client";

import { useEffect, useRef, useState } from "react";

interface CountUpProps {
  value: string;
  className?: string;
  duration?: number;
}

function parseStatValue(value: string) {
  const cleaned = value.replace(/,/g, "");
  const match = cleaned.match(/^([\d.]+)([kKmM]?)(.*)$/);
  if (!match) return { numeric: 0, suffix: value, decimals: 0 };

  let numeric = parseFloat(match[1]);
  const unit = match[2]?.toLowerCase();
  const suffix = `${unit ?? ""}${match[3] ?? ""}`;

  if (unit === "k") numeric *= 1_000;
  if (unit === "m") numeric *= 1_000_000;

  const decimals = match[1].includes(".") ? match[1].split(".")[1].length : 0;
  return { numeric, suffix, decimals, unit };
}

function formatNumber(num: number, decimals: number, unit?: string) {
  if (unit === "k") return `${(num / 1_000).toFixed(decimals)}k`;
  if (unit === "m") return `${(num / 1_000_000).toFixed(decimals)}m`;
  return num.toLocaleString(undefined, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

export function CountUp({ value, className, duration = 1800 }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState("0");
  const parsed = parseStatValue(value);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();

        const start = performance.now();
        const tick = (now: number) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - (1 - progress) ** 3;
          const current = parsed.numeric * eased;
          setDisplay(`${formatNumber(current, parsed.decimals, parsed.unit)}${parsed.suffix}`);
          if (progress < 1) requestAnimationFrame(tick);
        };

        requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [duration, parsed.decimals, parsed.numeric, parsed.suffix, parsed.unit, value]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}
