/** Normalize WordPress/SQL escaped line breaks and stray whitespace in plain text. */
export function normalizePlainText(text: string): string {
  if (!text) return "";

  return text
    .replace(/\\r\\n/g, "\n")
    .replace(/\\n/g, "\n")
    .replace(/\\r/g, "\n")
    .replace(/\r\n/g, "\n")
    .replace(/\r/g, "\n")
    .replace(/\n[ \t]+/g, "\n")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/[ \t]{2,}/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

export function splitParagraphs(text: string): string[] {
  return normalizePlainText(text)
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter(Boolean);
}
