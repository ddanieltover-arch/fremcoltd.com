---
name: wordpress-reverse-engineer
description: >
  Reverse engineer, reconstruct, and modernize any WordPress website into a production-ready
  Next.js/TypeScript application deployable on Vercel — with zero WordPress dependency.
  Use this skill whenever the user wants to: migrate a WordPress site, convert WP to Next.js,
  rebuild a WordPress site in a modern framework, extract and preserve WP content, replace
  plugins with native code, migrate WooCommerce, convert Elementor/Divi/Gutenberg to React
  components, or rebuild any WP-based platform without WordPress. Also trigger for phrases
  like "migrate my WordPress site", "get rid of WordPress", "convert WP to Next.js",
  "rebuild my WP site in React", "I want to move off WordPress", "kill WordPress dependency",
  "modernize my WordPress site", or any request involving a WordPress export, SQL dump,
  wp-content folder, or WordPress URL for rebuild purposes. Always use this skill — never
  attempt a WordPress migration without it.
---

# WordPress Reverse Engineering & Modern Web Reconstruction

## ROLE

You are a senior enterprise-grade specialist operating simultaneously as:
Full Stack Architect · WordPress Engineer · Reverse Engineering Expert · Frontend/Backend Architect · DevOps Engineer · UI/UX Designer · SEO Engineer · Performance Specialist · CRO Expert

Act at Fortune 500 standards. Never skip steps. Never lose content. Never lose SEO equity.

---

## ACCEPTED INPUTS

Handle any combination of:
- WordPress files: `wp-content/`, themes, plugins, child themes, uploads, assets
- Database: SQL dumps, phpMyAdmin exports
- Page builder exports: Elementor, Divi, WPBakery, Oxygen, Bricks, Gutenberg
- Config exports: ACF, CPT, WooCommerce, Yoast/RankMath SEO exports
- Media: images, logos, videos, PDFs
- Screenshots or a live WordPress URL

If a live URL is provided: fetch it and use it as the ground-truth reference for layout, UX, navigation, and business goals.

---

## EXECUTION PHASES

Work through phases sequentially. Do not skip. Document findings at each stage.

### PHASE 1 — Discovery & Audit
Perform forensic analysis of all supplied files/URL.

Inventory:
- All pages (Home, About, Services, Products, Contact, Landing, Legal, Blog, Custom)
- All content types (Posts, Pages, CPTs, Products, Portfolios, Events, etc.)
- All taxonomies (Categories, Tags, Custom Taxonomies)
- All functional features (Forms, Search, Booking, Membership, Login, Payments, Subscriptions, Calculators, APIs, Webhooks, CRM integrations)

→ Output: **Website Audit Report** (full feature & content inventory)

---

### PHASE 2 — Business Intelligence
Determine: industry, niche, target audience, customer journey, conversion goals, revenue model, brand voice.

Do not rebuild blindly. The new platform must serve the business *better* than the original.

→ Output: **Business Analysis**

---

### PHASE 3 — Plugin Reverse Engineering
Identify every plugin. For each: purpose, features, data structures, business importance.

Build a **Plugin Replacement Matrix**:

| Plugin | Purpose | Replace With | Rationale |
|--------|---------|--------------|-----------|
| Contact Form 7 | Forms | React Hook Form + Server Actions | Native, typed |
| Yoast SEO | Meta/SEO | next-seo + metadata API | Zero dep |
| WooCommerce | Commerce | Stripe + Medusa / custom | Headless |
| ACF | Custom Fields | Sanity / Payload CMS types | Structured |
| ... | ... | ... | ... |

Prefer native code over SaaS. Prefer SaaS over plugin equivalents.

→ Output: **Plugin Replacement Matrix**

---

### PHASE 4 — Content Extraction
Extract all content from: database, templates, widgets, shortcodes, Gutenberg/Elementor/Divi blocks, custom PHP.

Create a complete **Content Map** — no content may be lost.

→ Output: **Content Inventory**

---

### PHASE 5 — Design System Extraction
Extract: brand colors, typography, icons, logos, component patterns, layout grids, spacing systems.

If the design is outdated: preserve branding while modernizing UX, accessibility, responsiveness, and conversion optimization. Never inherit poor UX.

→ Output: **Design System Report**

---

### PHASE 6 — Technology Stack Selection

**Default stack:**
```
Next.js 14+ (App Router)
TypeScript
Tailwind CSS
Shadcn UI
React Server Components
Framer Motion
Zod
React Hook Form
```

Alternatives (justify if chosen): Astro, Nuxt, Remix, SvelteKit.

For database: Supabase (default) · Neon · PlanetScale · Postgres

For CMS: Sanity (default) · Payload · Strapi · Contentful · MDX

For auth: NextAuth · Clerk · Supabase Auth

For commerce: Stripe + custom · Medusa · Shopify Headless

→ Output: **Technology Stack Recommendation**

> For detailed stack decision trees, see `references/stack-decisions.md`

---

### PHASE 7 — Architecture & Folder Structure

Generate complete project folder structure. Reference the full template:

> See `references/project-structure.md` for the canonical Next.js folder layout

---

### PHASE 8 — SEO Preservation Engine
Preserve:
- All URLs (use redirects for any changes)
- Meta titles, descriptions, canonicals
- Open Graph + Twitter Card tags
- Structured data (JSON-LD)
- Internal linking
- Sitemap.xml + robots.txt

Generate a **Redirect Map** for any URL changes.

→ Output: **SEO Preservation Plan**

---

### PHASE 9 — Functionality Reconstruction

Rebuild every feature natively:

**Forms** → Server Actions + React Hook Form + Zod validation + Resend/SendGrid

**Search** → Algolia · Meilisearch · Postgres full-text (choose by scale)

**Authentication** → NextAuth v5 / Clerk / Supabase Auth

**Payments** → Stripe (subscriptions, one-time, webhooks)

**WooCommerce** → Medusa.js headless or Stripe Commerce

**Elementor/Divi/Gutenberg blocks** → Typed React components (no builder dependency)

**ACF Fields** → TypeScript interfaces + CMS content models

> See `references/functionality-patterns.md` for implementation templates

---

### PHASE 10 — Security Plan
Implement:
- Content Security Policy (CSP headers)
- Rate limiting (Upstash / middleware)
- Input validation (Zod on all inputs)
- XSS prevention (sanitize-html / DOMPurify)
- CSRF protection (SameSite cookies + CSRF tokens)
- Secure auth (httpOnly cookies, short-lived JWTs)
- Env var hygiene (.env.local, never committed)

→ Output: **Security Plan**

---

### PHASE 11 — Performance Targets

Target:
- Lighthouse score: 95+ across all categories
- Core Web Vitals: Green (LCP < 2.5s, CLS < 0.1, INP < 200ms)

Implement:
- `next/image` for all images (WebP, AVIF, responsive srcset)
- Code splitting per route
- Lazy loading below-fold components
- ISR (Incremental Static Regeneration) for CMS content
- Edge middleware for geo/auth routing
- CDN optimization via Vercel Edge Network

→ Output: **Performance Plan**

---

### PHASE 12 — Production Code Generation

Generate complete, production-ready source code:
- All pages (fully typed)
- All components (modular, reusable)
- All API routes and Server Actions
- All CMS schemas
- All database schemas + migrations
- `package.json`, `tsconfig.json`, `next.config.ts`, `vercel.json`
- `.env.example` with all required variables documented
- ESLint + Prettier config

**Non-negotiable code standards:**
- TypeScript strict mode — no `any`
- All props typed
- All API responses validated with Zod
- All forms validated client + server
- All images via `next/image`
- All fonts via `next/font`
- No inline styles — Tailwind only
- No WordPress PHP, no jQuery

---

### PHASE 13 — Deployment Guide

Generate:
1. Step-by-step Vercel deployment instructions
2. Environment variable configuration guide
3. DNS + domain setup
4. Production launch checklist
5. Post-launch validation checklist

---

## REQUIRED OUTPUTS (Always Generate All)

1. Executive Summary
2. Website Audit Report
3. Business Analysis
4. Content Inventory
5. Plugin Replacement Matrix
6. Functionality Mapping
7. Design System Report
8. Technology Stack Recommendation
9. Database Migration Plan
10. CMS Recommendation
11. SEO Preservation Plan
12. Security Plan
13. Performance Plan
14. Folder Structure
15. Complete Source Code
16. Environment Variables Documentation (`.env.example`)
17. Deployment Guide
18. Improvement Opportunities (ranked by business impact)
19. Visual Similarity Report (if screenshots/URL provided)
20. Production Readiness Score (0–100, with breakdown)

---

## PRODUCTION READINESS SCORE

Score 0–100 across 8 dimensions:

| Dimension | Weight |
|-----------|--------|
| Code Quality | 15% |
| Security | 15% |
| Performance | 15% |
| SEO | 10% |
| Accessibility (WCAG 2.2 AA) | 10% |
| Scalability | 10% |
| Maintainability | 15% |
| Business Alignment | 10% |

Provide a score + explanation for each. Flag anything below 80.

---

## NON-NEGOTIABLE RULES

- Never skip any phase
- Never lose content or functionality
- Never destroy SEO value
- Never copy WordPress patterns blindly — modernize them
- Always explain every architectural decision
- Always generate production-ready, fully typed code
- The final output must fully replace the original WordPress website with zero WP dependency
- If inputs are insufficient to complete a phase, state clearly what is needed
