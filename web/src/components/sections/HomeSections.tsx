import { Leaf, ShieldCheck, Truck } from "lucide-react";
import { CountUp } from "@/components/motion/CountUp";
import { Reveal, Stagger } from "@/components/motion/Reveal";

const stats = [
  { value: "80+", label: "Qualified Staff" },
  { value: "410k+", label: "Total Clients" },
  { value: "30+", label: "Years Experience" },
  { value: "15,000+", label: "Monthly Output" },
];

export function StatsSection() {
  return (
    <section className="relative border-b border-slate-200 bg-white px-4 py-12 mesh-gradient">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 md:grid-cols-4">
        {stats.map((stat, index) => (
          <Reveal key={stat.label} delay={index * 100}>
            <div className="modern-card rounded-2xl border border-slate-200/80 bg-white/80 p-6 text-center shadow-sm backdrop-blur-sm">
              <p className="text-3xl font-bold text-brand-700">
                <CountUp value={stat.value} />
              </p>
              <p className="mt-1 text-sm font-medium text-slate-600">{stat.label}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function TrustSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16">
      <Reveal>
        <div className="overflow-hidden rounded-3xl border border-slate-200/80 bg-gradient-to-br from-slate-50 via-white to-brand-50 p-8 shadow-sm md:p-12">
          <p className="text-sm font-semibold uppercase tracking-wider text-brand-600">Why FREEM</p>
          <h2 className="mt-2 text-3xl font-bold text-brand-900 md:text-4xl">
            Quality You Can Trust, Products That Deliver
          </h2>
          <p className="mt-4 max-w-3xl text-lg leading-relaxed text-slate-600">
            At FREEM we understand that your business depends on reliable, high-quality commodities.
            That&apos;s why we focus on delivering only the finest sugar, rice, and fertilizers, sourced
            with care and processed to meet international standards.
          </p>
          <Stagger className="mt-10 grid gap-6 md:grid-cols-3" staggerMs={120}>
            {[
              {
                icon: ShieldCheck,
                title: "Certified Quality",
                text: "Rigorous inspection at every stage of production and export.",
              },
              {
                icon: Truck,
                title: "Global Logistics",
                text: "Reliable shipping and complete export documentation worldwide.",
              },
              {
                icon: Leaf,
                title: "Sustainable Sourcing",
                text: "Ethical partnerships with producers across Thailand and beyond.",
              },
            ].map(({ icon: Icon, title, text }) => (
              <div
                key={title}
                className="modern-card group rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm"
              >
                <div className="inline-flex rounded-xl bg-brand-50 p-3 transition group-hover:scale-110 group-hover:bg-brand-100">
                  <Icon className="h-8 w-8 text-brand-600" />
                </div>
                <h3 className="mt-4 font-semibold text-slate-900">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{text}</p>
              </div>
            ))}
          </Stagger>
        </div>
      </Reveal>
    </section>
  );
}

export function MissionSection() {
  return (
    <section className="relative overflow-hidden bg-brand-900 px-4 py-16 text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(61,143,196,0.25),transparent_55%)]" />
      <Stagger className="relative mx-auto grid max-w-7xl gap-8 md:grid-cols-3" staggerMs={150}>
        {[
          {
            title: "Our Mission",
            text: "Deliver premium-quality agricultural and food commodities that empower our clients and enrich communities worldwide.",
          },
          {
            title: "Our Goal",
            text: "Through reliable partnerships and responsive service, we strive to be the supplier of choice for businesses that demand the highest standards.",
          },
          {
            title: "Our Vision",
            text: "Become a recognized global leader in sugar, rice, and fertilizers — known for ethical practices, sustainable sourcing, and customer-centric service.",
          },
        ].map((item) => (
          <div
            key={item.title}
            className="modern-card rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
          >
            <h3 className="text-xl font-bold text-brand-200">{item.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-200">{item.text}</p>
          </div>
        ))}
      </Stagger>
    </section>
  );
}
