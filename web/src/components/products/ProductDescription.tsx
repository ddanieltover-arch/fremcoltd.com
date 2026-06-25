import { normalizePlainText, splitParagraphs } from "@/lib/text";

interface ProductDescriptionProps {
  text: string;
}

export function ProductDescription({ text }: ProductDescriptionProps) {
  const paragraphs = splitParagraphs(text);

  if (paragraphs.length === 0) return null;

  return (
    <div className="mt-6 space-y-4 text-slate-600 leading-relaxed">
      {paragraphs.map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ))}
    </div>
  );
}

export function plainTextExcerpt(text: string, maxLength = 160): string {
  const normalized = normalizePlainText(text).replace(/\n+/g, " ");
  if (normalized.length <= maxLength) return normalized;
  return `${normalized.slice(0, maxLength).trim()}…`;
}
