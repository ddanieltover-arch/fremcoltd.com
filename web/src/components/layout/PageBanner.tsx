import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { pageThumbnail } from "@/config/assets";

interface PageBannerProps {
  title: string;
  description?: string;
  eyebrow?: string;
}

export function PageBanner({ title, description, eyebrow }: PageBannerProps) {
  return (
    <section className="relative h-56 overflow-hidden md:h-72">
      <Image
        src={pageThumbnail.src}
        alt={pageThumbnail.alt}
        fill
        className="animate-ken-burns object-cover"
        sizes="100vw"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-r from-brand-950/75 via-brand-950/50 to-brand-950/30" />
      <div className="relative mx-auto flex h-full max-w-7xl items-end px-4 pb-8 text-white">
        <Reveal direction="up" delay={100}>
          <div>
            {eyebrow && (
              <p className="text-sm font-semibold uppercase tracking-wider text-brand-200">{eyebrow}</p>
            )}
            <h1 className={`text-4xl font-bold ${eyebrow ? "mt-2" : ""}`}>{title}</h1>
            {description && <p className="mt-2 max-w-2xl text-white/90">{description}</p>}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
