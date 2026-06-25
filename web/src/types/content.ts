export interface SiteInfo {
  name: string;
  tagline: string;
  url: string;
  phone: string;
  whatsapp: string;
  email: string;
}

export interface PageContent {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  parent: number;
}

export interface Category {
  slug: string;
  name: string;
  count: number;
}

export interface Product {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  description: string;
  categories: string[];
  image?: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
}

export interface SiteContent {
  site: SiteInfo;
  stats: { pages: number; products: number; posts: number };
  pages: PageContent[];
  categories: Category[];
  products: Product[];
  testimonials: Testimonial[];
}
