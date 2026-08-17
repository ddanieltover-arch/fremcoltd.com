import Link from "next/link";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import type { RelatedResourceSet } from "@/config/related-resources";

interface RelatedResourcesProps {
  resources: RelatedResourceSet;
  className?: string;
}

export function RelatedResources({ resources, className = "" }: RelatedResourcesProps) {
  return (
    <section
      aria-labelledby="related-resources-heading"
      className={`mt-14 rounded-3xl border border-slate-200 bg-slate-50 p-6 md:p-8 ${className}`}
    >
      <p className="text-sm font-semibold uppercase tracking-wider text-brand-600">Related resources</p>
      <h2 id="related-resources-heading" className="mt-2 text-2xl font-bold text-brand-900">
        Continue researching this topic
      </h2>
      <div className="mt-6 grid gap-8 md:grid-cols-2">
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500">On this site</h3>
          <ul className="mt-3 space-y-2">
            {resources.internal.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="inline-flex items-start gap-2 text-sm font-medium text-brand-700 hover:text-brand-900"
                >
                  <ArrowUpRight className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
                  <span>{link.anchor}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500">Industry references</h3>
          <ul className="mt-3 space-y-2">
            {resources.outbound.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-track-outbound={link.anchor}
                  className="inline-flex items-start gap-2 text-sm font-medium text-slate-700 hover:text-brand-800"
                >
                  <ExternalLink className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
                  <span>{link.anchor}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
