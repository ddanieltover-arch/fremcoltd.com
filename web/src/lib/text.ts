/** Domains / patterns that indicate Flatsome / WordPress builder shortcodes. */
const SHORTCODE_TAG =
  /\[[/]?[a-zA-Z_][\w-]*(?:\s[^[\]]*?)?\]/g;

const HTML_ENTITIES: Record<string, string> = {
  nbsp: " ",
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  apos: "'",
  rsquo: "\u2019",
  lsquo: "\u2018",
  rdquo: "\u201D",
  ldquo: "\u201C",
  mdash: "\u2014",
  ndash: "\u2013",
  hellip: "\u2026",
};

/**
 * Remove WordPress / Flatsome builder shortcodes (e.g. [ux_slider], [section], [/row]).
 * Runs repeatedly so nested tags are cleared.
 */
export function stripWordPressShortcodes(text: string): string {
  if (!text) return "";

  let result = text
    // JSON / SQL escaped quotes inside shortcode attributes
    .replace(/\\"/g, '"')
    .replace(/\\'/g, "'");

  let previous = "";
  while (result !== previous) {
    previous = result;
    result = result.replace(SHORTCODE_TAG, " ");
  }

  // Leftover unbalanced brackets from truncated excerpts
  result = result.replace(/\[[^\]]*$/g, " ").replace(/^\s*[^\[]*\]/g, " ");

  return result;
}

function decodeBasicHtmlEntities(text: string): string {
  return text
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)))
    .replace(/&#x([0-9a-f]+);/gi, (_, hex) => String.fromCharCode(parseInt(hex, 16)))
    .replace(/&([a-z]+);/gi, (match, name: string) => HTML_ENTITIES[name.toLowerCase()] ?? match);
}

/** Normalize WordPress/SQL escaped line breaks, shortcodes, and stray whitespace. */
export function normalizePlainText(text: string): string {
  if (!text) return "";

  return decodeBasicHtmlEntities(stripWordPressShortcodes(text))
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
