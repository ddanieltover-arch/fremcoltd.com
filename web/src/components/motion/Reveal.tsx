"use client";

import { Children, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type RevealDirection = "up" | "down" | "left" | "right" | "none";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: RevealDirection;
}

const hiddenTransform: Record<RevealDirection, string> = {
  up: "translateY(32px)",
  down: "translateY(-32px)",
  left: "translateX(-32px)",
  right: "translateX(32px)",
  none: "none",
};

export function Reveal({ children, className, delay = 0, direction = "up" }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -48px 0px" },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={cn(className)}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : hiddenTransform[direction],
        transition: `opacity 0.8s cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms, transform 0.8s cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

interface StaggerProps {
  children: React.ReactNode;
  className?: string;
  staggerMs?: number;
}

export function Stagger({ children, className, staggerMs = 100 }: StaggerProps) {
  const items = Children.toArray(children);

  return (
    <div className={className}>
      {items.map((child, index) => (
        <Reveal key={index} delay={index * staggerMs}>
          {child}
        </Reveal>
      ))}
    </div>
  );
}
