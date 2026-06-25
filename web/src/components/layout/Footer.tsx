import Link from "next/link";
import Image from "next/image";
import { Mail, MessageCircle, Phone } from "lucide-react";
import { brandAssets } from "@/config/assets";
import { getCategories, getSite } from "@/lib/content";

export function Footer() {
  const site = getSite();
  const categories = getCategories();

  return (
    <footer className="mt-auto border-t border-slate-200 bg-brand-950 text-slate-200">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <Image
            src={brandAssets.logo}
            alt={brandAssets.logoAlt}
            width={160}
            height={65}
            className="h-10 w-auto brightness-0 invert"
          />
          <p className="mt-4 text-sm leading-relaxed text-slate-300">
            We strive to deliver the highest quality agricultural commodities to markets worldwide,
            ensuring customer satisfaction through excellence in production, sustainability, and innovation.
          </p>
        </div>

        <div>
          <h4 className="font-semibold text-white">Product Categories</h4>
          <ul className="mt-4 space-y-2 text-sm">
            {categories.map((cat) => (
              <li key={cat.slug}>
                <Link href={`/product-category/${cat.slug}`} className="hover:text-white">
                  {cat.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-white">Information</h4>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link href="/products" className="hover:text-white">Products</Link></li>
            <li><Link href="/about-us" className="hover:text-white">About Us</Link></li>
            <li><Link href="/privacy-policy" className="hover:text-white">Privacy Policy</Link></li>
            <li><Link href="/quality-control" className="hover:text-white">Quality Control</Link></li>
            <li><Link href="/ordering-procedure" className="hover:text-white">Ordering Procedure</Link></li>
            <li><Link href="/sustainability" className="hover:text-white">Sustainability</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-white">Contact Us</h4>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4 shrink-0" />
              <a href={`tel:${site.phone.replace(/\s/g, "")}`}>{site.phone}</a>
            </li>
            <li className="flex items-center gap-2">
              <MessageCircle className="h-4 w-4 shrink-0" />
              <a href={`https://wa.me/${site.whatsapp.replace(/\D/g, "")}`} target="_blank" rel="noreferrer">
                WhatsApp
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4 shrink-0" />
              <a href={`mailto:${site.email}`}>{site.email}</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 py-6 text-center text-sm text-slate-400">
        Copyright {new Date().getFullYear()} © <strong className="text-white">{site.name}</strong>
      </div>
    </footer>
  );
}
