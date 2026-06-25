import siteContent from "../../content/site-content.json";
import { categorySortOrder } from "@/config/site";
import type { Category, PageContent, Product, SiteContent } from "@/types/content";
import { normalizePlainText } from "@/lib/text";

const content = siteContent as SiteContent;

function getCategoryRank(slug: string): number {
  const index = categorySortOrder.indexOf(slug as (typeof categorySortOrder)[number]);
  return index === -1 ? categorySortOrder.length : index;
}

function sortCategories(categories: Category[]): Category[] {
  return [...categories].sort((a, b) => getCategoryRank(a.slug) - getCategoryRank(b.slug));
}

function sortProductsByCategory(products: Product[]): Product[] {
  return [...products].sort((a, b) => {
    const rankA = Math.min(...a.categories.map(getCategoryRank));
    const rankB = Math.min(...b.categories.map(getCategoryRank));
    if (rankA !== rankB) return rankA - rankB;
    return a.title.localeCompare(b.title);
  });
}

function normalizeProduct(product: Product): Product {
  return {
    ...product,
    excerpt: normalizePlainText(product.excerpt),
    description: normalizePlainText(product.description),
  };
}

export function getSite() {
  return content.site;
}

export function getCategories(): Category[] {
  return sortCategories(content.categories);
}

export function getCategory(slug: string) {
  return content.categories.find((c) => c.slug === slug);
}

export function getProducts(): Product[] {
  return sortProductsByCategory(content.products.map(normalizeProduct));
}

export function getProduct(slug: string) {
  const product = content.products.find((p) => p.slug === slug);
  return product ? normalizeProduct(product) : undefined;
}

export function getProductsByCategory(categorySlug: string) {
  return sortProductsByCategory(
    content.products.filter((p) => p.categories.includes(categorySlug)).map(normalizeProduct),
  );
}

export function getRelatedProducts(currentSlug: string, categorySlug: string, limit = 4) {
  return getProductsByCategory(categorySlug)
    .filter((product) => product.slug !== currentSlug)
    .slice(0, limit);
}

export function getFeaturedProducts(limit = 8) {
  return sortProductsByCategory(content.products.map(normalizeProduct)).slice(0, limit);
}

export function getPage(slug: string): PageContent | undefined {
  return content.pages.find((p) => p.slug === slug);
}

export function getTestimonials() {
  return content.testimonials;
}

export function getAllProductSlugs() {
  return content.products.map((p) => p.slug);
}

export function getAllCategorySlugs() {
  return content.categories.map((c) => c.slug);
}
