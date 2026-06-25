import Image from "next/image";
import Link from "next/link";
import { Reveal, Stagger } from "@/components/motion/Reveal";
import { facilityShowcase } from "@/config/assets";

interface FacilitiesSectionProps {
  showCta?: boolean;
}

export function FacilitiesSection({ showCta = true }: FacilitiesSectionProps) {
  return (
    <section className="relative overflow-hidden bg-brand-950 px-4 py-16 text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(20,94,150,0.3),transparent_60%)]" />
      <div className="relative mx-auto max-w-7xl">
        <Reveal>
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-200">Our Infrastructure</p>
            <h2 className="mt-3 text-3xl font-bold md:text-4xl">From Field to Export-Ready Supply</h2>
            <p className="mt-4 leading-relaxed text-slate-300">
              With decades of industry experience, FREEM combines agricultural sourcing, modern processing,
              and large-scale storage to deliver consistent quality to buyers worldwide.
            </p>
          </div>
        </Reveal>

        <Stagger className="mt-10 grid gap-6 md:grid-cols-3" staggerMs={120}>
          {facilityShowcase.map((item) => (
            <article
              key={item.src}
              className="modern-card group overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={item.src}
                  alt={item.title}
                  fill
                  className="object-cover transition duration-700 group-hover:scale-110"
                  sizes="(max-width:768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-950/60 to-transparent opacity-0 transition group-hover:opacity-100" />
              </div>
              <div className="p-5">
                <h3 className="text-lg font-semibold text-brand-100">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">{item.description}</p>
              </div>
            </article>
          ))}
        </Stagger>

        {showCta && (
          <Reveal delay={200} className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/about-us"
              className="rounded-xl bg-brand-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-950/30 transition hover:scale-105 hover:bg-brand-400"
            >
              Learn More About Us
            </Link>
            <Link
              href="/quality-control"
              className="rounded-xl border border-white/30 px-6 py-3 text-sm font-semibold backdrop-blur-sm transition hover:scale-105 hover:bg-white/10"
            >
              Quality Control
            </Link>
          </Reveal>
        )}
      </div>
    </section>
  );
}
