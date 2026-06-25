import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { InfoPageLayout } from "@/components/layout/InfoPageLayout";
import { infoPages } from "@/config/site";
import { createPageMetadata } from "@/lib/metadata";
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
  });
}

export default async function InfoPage({ params }: Props) {
  const { slug } = await params;
  const page = infoPages[slug];
  if (!page) notFound();

  return (
    <InfoPageLayout
      slug={slug}
      title={page.title}
      intro={page.intro}
      sections={page.sections}
      related={page.related}
    />
  );
}
