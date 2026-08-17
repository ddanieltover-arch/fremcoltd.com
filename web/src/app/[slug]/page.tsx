import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { InfoPageLayout } from "@/components/layout/InfoPageLayout";
import { JsonLd } from "@/components/seo/JsonLd";
import { infoPages } from "@/config/site";
import { createPageMetadata } from "@/lib/metadata";
import { breadcrumbSchema } from "@/lib/structured-data/breadcrumb";
import { howToSchema } from "@/lib/structured-data/how-to";

const slugs = Object.keys(infoPages);

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = infoPages[slug];
  if (!page) return {};
  return createPageMetadata({
    title: `${page.title} | FREEM ENTERPRISE CO., LTD`,
    description: page.intro,
    path: `/${slug}`,
  });
}

export default async function InfoPage({ params }: Props) {
  const { slug } = await params;
  const page = infoPages[slug];
  if (!page) notFound();

  const schemas: Record<string, unknown>[] = [
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: page.title, path: `/${slug}` },
    ]),
  ];

  if (slug === "ordering-procedure") {
    schemas.push(
      howToSchema(
        "How to order agricultural commodities from FREEM ENTERPRISE",
        page.intro,
        page.sections.map((s) => ({ name: s.heading, text: s.body })),
        `/${slug}`,
      ),
    );
  }

  return (
    <>
      <JsonLd data={schemas} />
      <InfoPageLayout
        slug={slug}
        title={page.title}
        intro={page.intro}
        sections={page.sections}
        related={page.related}
      />
    </>
  );
}
