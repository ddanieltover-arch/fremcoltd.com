import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AnswerCapsule } from "@/components/seo/AnswerCapsule";
import { JsonLd } from "@/components/seo/JsonLd";
import { getAllGuideSlugs, getGuide } from "@/config/guides";
import { breadcrumbSchema } from "@/lib/structured-data/breadcrumb";
import { createPageMetadata } from "@/lib/metadata";
import { absoluteUrl } from "@/lib/site-url";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllGuideSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) return {};
  return createPageMetadata({
    title: `${guide.title} | FREEM ENTERPRISE CO., LTD`,
    description: guide.description,
    path: `/guides/${slug}`,
  });
}

export default async function GuidePage({ params }: Props) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) notFound();

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.title,
    description: guide.description,
    datePublished: guide.publishedAt,
    dateModified: guide.updatedAt,
    author: { "@type": "Organization", name: "FREEM ENTERPRISE CO., LTD" },
    publisher: { "@type": "Organization", name: "FREEM ENTERPRISE CO., LTD" },
    mainEntityOfPage: { "@type": "WebPage", "@id": absoluteUrl(`/guides/${slug}`) },
  };

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Guides", path: "/guides" },
            { name: guide.title, path: `/guides/${slug}` },
          ]),
          articleSchema,
        ]}
      />
      <article className="mx-auto max-w-3xl px-4 py-12">
        <nav className="mb-6 text-sm text-slate-500">
          <Link href="/" className="hover:text-brand-700">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/guides" className="hover:text-brand-700">Guides</Link>
          <span className="mx-2">/</span>
          <span className="text-slate-800">{guide.title}</span>
        </nav>

        <header>
          <p className="text-sm font-semibold uppercase tracking-wider text-brand-600">Export Guide</p>
          <h1 className="mt-2 text-3xl font-bold text-brand-950 md:text-4xl">{guide.title}</h1>
          <p className="mt-3 text-slate-600">{guide.description}</p>
          <p className="mt-2 text-xs text-slate-400">Last updated: {guide.updatedAt}</p>
        </header>

        <AnswerCapsule>
          <strong>Quick Answer:</strong> {guide.answerCapsule}
        </AnswerCapsule>

        {guide.sections.map((section) => (
          <section key={section.heading} className="mt-10">
            <h2 className="text-xl font-bold text-brand-900">{section.heading}</h2>
            <p className="mt-3 leading-relaxed text-slate-600">{section.body}</p>
            {section.bullets && (
              <ul className="mt-4 space-y-2">
                {section.bullets.map((item) => (
                  <li key={item} className="flex gap-2 text-sm text-slate-600">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </section>
        ))}

        <div className="mt-12 rounded-2xl bg-brand-50 p-6 text-center">
          <p className="font-semibold text-brand-900">Ready to source from Thailand?</p>
          <Link href="/request-a-quote" className="mt-4 inline-block rounded-lg bg-brand-600 px-6 py-3 text-sm font-semibold text-white hover:bg-brand-700">
            Request a Wholesale Quote
          </Link>
        </div>
      </article>
    </>
  );
}
