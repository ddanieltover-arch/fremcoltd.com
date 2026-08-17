/** Canonical site origin — www is preferred; apex redirects at Vercel. */
export function getSiteUrl(): string {
  return process.env.NEXT_PUBLIC_URL?.trim() || "https://www.fremcoltd.com";
}

export function absoluteUrl(path: string): string {
  const base = getSiteUrl().replace(/\/$/, "");
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${base}${normalized}`;
}
