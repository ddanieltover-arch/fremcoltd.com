import Image from "next/image";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  ClipboardList,
  Eye,
  FileCheck,
  FileText,
  Globe,
  Leaf,
  Lock,
  Mail,
  PackageCheck,
  Recycle,
  Scale,
  Search,
  Shield,
  Ship,
  Sprout,
  Truck,
  Users,
} from "lucide-react";
import { Reveal, Stagger } from "@/components/motion/Reveal";
import { infoPageHero } from "@/config/assets";
import type { InfoPageSection, InfoRelatedLink } from "@/config/site";
import { infoNavItems } from "@/config/site";
import { cn } from "@/lib/utils";

interface InfoPageLayoutProps {
  slug: string;
  title: string;
  intro: string;
  sections: InfoPageSection[];
  related: InfoRelatedLink[];
}

const sectionIcons: Record<string, LucideIcon[]> = {
  "ordering-procedure": [ClipboardList, FileText, Shield, PackageCheck, Ship, Users],
  "quality-control": [Search, PackageCheck, Truck, FileCheck, Scale, Eye],
  sustainability: [Sprout, Recycle, Users, Leaf, Globe, Shield],
  "privacy-policy": [FileText, Mail, Scale, Users, Lock, Mail],
};

const fallbackIcons: LucideIcon[] = [FileText, Shield, Globe, Users, Truck, Leaf];

function SectionBullets({ items }: { items: string[] }) {
  return (
    <ul className="mt-4 space-y-2">
      {items.map((item) => (
        <li key={item} className="flex gap-2 text-sm leading-relaxed text-slate-600">
          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" aria-hidden />
          {item}
        </li>
      ))}
    </ul>
  );
}

export function InfoPageLayout({ slug, title, intro, sections, related }: InfoPageLayoutProps) {
  const hero = infoPageHero[slug];
  const icons = sectionIcons[slug] ?? fallbackIcons;
  const isSteps = slug === "ordering-procedure";

  return (
    <div>
      <section className="relative overflow-hidden">
        {hero?.image ? (
          <>
            <div className="absolute inset-0">
              <Image
                src={hero.image.src}
                alt={hero.image.alt}
                fill
                className="object-cover"
                sizes="100vw"
                priority
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-brand-950/90 via-brand-950/75 to-brand-950/50" />
          </>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-brand-900 via-brand-800 to-brand-950" />
        )}
        <div className="relative mx-auto max-w-7xl px-4 py-16 md:py-20">
          <p className="text-sm font-semibold uppercase tracking-widest text-brand-200">
            {hero?.eyebrow ?? "Company Info"}
          </p>
          <h1 className="mt-3 max-w-3xl text-4xl font-bold text-white md:text-5xl">{title}</h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-200">{intro}</p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="lg:grid lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-12">
          <aside className="mb-10 lg:mb-0">
            <div className="lg:sticky lg:top-28">
              <p className="mb-3 hidden text-xs font-semibold uppercase tracking-wider text-slate-500 lg:block">
                Info
              </p>
              <nav
                className="flex gap-2 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible lg:rounded-2xl lg:border lg:border-slate-200 lg:bg-slate-50 lg:p-3 lg:shadow-sm"
                aria-label="Info pages"
              >
                {infoNavItems.map((item) => (
                  <Link
                    key={item.slug}
                    href={item.href}
                    className={cn(
                      "shrink-0 rounded-xl px-4 py-2.5 text-sm font-medium transition-colors lg:py-3",
                      slug === item.slug
                        ? "bg-brand-600 text-white shadow-sm"
                        : "border border-slate-200 bg-white text-slate-600 hover:border-brand-200 hover:bg-brand-50 hover:text-brand-800 lg:border-transparent lg:bg-transparent",
                    )}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>
          </aside>

          <div>
            {isSteps ? (
              <div className="relative">
                {sections.map((section, index) => {
                  const Icon = icons[index] ?? fallbackIcons[index % fallbackIcons.length];
                  return (
                    <div key={section.heading} className="relative flex gap-5 pb-10 last:pb-0">
                      {index < sections.length - 1 && (
                        <div
                          className="absolute left-5 top-14 hidden h-[calc(100%-3.5rem)] w-px bg-brand-200 md:block"
                          aria-hidden
                        />
                      )}
                      <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-600 text-sm font-bold text-white shadow-md">
                        {index + 1}
                      </div>
                      <article className="modern-card flex-1 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
                        <div className="flex items-start gap-4">
                          <div className="hidden rounded-xl bg-brand-50 p-3 md:block">
                            <Icon className="h-6 w-6 text-brand-600" />
                          </div>
                          <div>
                            <h2 className="text-xl font-bold text-brand-900">{section.heading}</h2>
                            <p className="mt-3 leading-relaxed text-slate-600">{section.body}</p>
                            {section.bullets && <SectionBullets items={section.bullets} />}
                          </div>
                        </div>
                      </article>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2">
                {sections.map((section, index) => {
                  const Icon = icons[index] ?? fallbackIcons[index % fallbackIcons.length];
                  return (
                    <article
                      key={section.heading}
                      className="modern-card rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8"
                    >
                      <div className="inline-flex rounded-xl bg-brand-50 p-3">
                        <Icon className="h-6 w-6 text-brand-600" />
                      </div>
                      <h2 className="mt-5 text-xl font-bold text-brand-900">{section.heading}</h2>
                      <p className="mt-3 leading-relaxed text-slate-600">{section.body}</p>
                      {section.bullets && <SectionBullets items={section.bullets} />}
                    </article>
                  );
                })}
              </div>
            )}

            <Reveal className="mt-14">
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 md:p-8">
                <p className="text-sm font-semibold uppercase tracking-wider text-brand-600">Related</p>
                <h2 className="mt-2 text-2xl font-bold text-brand-900">You may also find helpful</h2>
                <Stagger className="mt-6 grid gap-4 sm:grid-cols-2" staggerMs={80}>
                  {related.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="modern-card group flex flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
                    >
                      <h3 className="font-semibold text-brand-900 group-hover:text-brand-700">{link.title}</h3>
                      <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">{link.description}</p>
                      <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-600 group-hover:gap-2">
                        Learn more <ArrowRight className="h-4 w-4" />
                      </span>
                    </Link>
                  ))}
                </Stagger>
              </div>
            </Reveal>
          </div>
        </div>
      </div>

      <section className="border-t border-slate-200 bg-slate-50 px-4 py-12">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 rounded-3xl bg-brand-900 px-8 py-10 text-white md:flex-row md:items-center">
          <div>
            <h2 className="text-2xl font-bold">
              {slug === "privacy-policy" ? "Questions about your data?" : "Ready to work with FREEM?"}
            </h2>
            <p className="mt-2 max-w-xl text-slate-300">
              {slug === "privacy-policy"
                ? "Our team is happy to clarify how we handle your information."
                : "Get a tailored quotation for sugar, rice, fertilizers, or cooking oil exports."}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            {slug !== "privacy-policy" && (
              <Link
                href="/request-a-quote"
                className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-brand-900 transition-colors hover:bg-brand-50"
              >
                Request a Quote
                <ArrowRight className="h-4 w-4" />
              </Link>
            )}
            <Link
              href="/contact"
              className={cn(
                "inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold transition-colors",
                slug === "privacy-policy"
                  ? "bg-white text-brand-900 hover:bg-brand-50"
                  : "border border-white/30 text-white hover:bg-white/10",
              )}
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
