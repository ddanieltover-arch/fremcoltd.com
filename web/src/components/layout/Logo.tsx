import Image from "next/image";
import Link from "next/link";
import { brandAssets } from "@/config/assets";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  imageClassName?: string;
  showTagline?: boolean;
}

export function Logo({ className, imageClassName, showTagline = true }: LogoProps) {
  return (
    <Link href="/" className={cn("flex items-center gap-3", className)}>
      <Image
        src={brandAssets.logo}
        alt={brandAssets.logoAlt}
        width={180}
        height={73}
        className={cn("h-10 w-auto object-contain md:h-12", imageClassName)}
        priority
      />
      {showTagline && (
        <span className="sr-only">{brandAssets.logoAlt} — Sweetening the World with Thai Excellence</span>
      )}
    </Link>
  );
}
