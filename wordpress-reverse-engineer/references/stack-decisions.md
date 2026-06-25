# Stack Decisions Reference

## Framework Selection Tree

```
Is the site primarily content-driven (blog, docs, marketing)?
├── Yes + needs real-time data → Next.js App Router (RSC + ISR)
├── Yes + mostly static → Astro (MPA, minimal JS)
└── No → Next.js (default for full-stack apps)

Is there complex server-side business logic?
├── Yes → Next.js Server Actions + API Routes
└── No → Astro or Next.js static

Is there an existing React component library?
├── Yes → Next.js (best React ecosystem compatibility)
└── No → Astro or Next.js (both fine)
```

Default: **Next.js 14+ with App Router** for 90% of WordPress migrations.

---

## Database Selection

| Scenario | Recommended | Reasoning |
|----------|-------------|-----------|
| New project, need backend | Supabase | Postgres + Auth + Storage + Realtime in one |
| Serverless / edge first | Neon | Serverless Postgres, branching |
| High scale, MySQL team | PlanetScale | Serverless MySQL, branching |
| Complex relations + GraphQL | Hasura + Postgres | Auto-generated API |
| Document-oriented | MongoDB Atlas | Flexible schema |

---

## CMS Selection

| Content Type | Recommended | When to Use |
|--------------|-------------|-------------|
| Developer-centric, flexible | Sanity | Most WP migrations — real-time, CDN |
| Full-stack CMS with admin | Payload CMS | When you need CMS + API in one codebase |
| Headless WP (keep editors) | WPGraphQL | When editorial team is WP-dependent |
| Markdown / Git-based | Contentlayer + MDX | Blog-only, developer-run |
| Enterprise / multinational | Contentful / Hygraph | Internationalization at scale |

---

## Authentication Selection

| Auth Need | Recommended |
|-----------|-------------|
| Simple email/password + social | NextAuth v5 |
| Enterprise SSO, MFA, user management | Clerk |
| Already using Supabase | Supabase Auth |
| B2C with advanced flows | Auth0 |

---

## Commerce Selection

| Commerce Need | Recommended |
|---------------|-------------|
| Simple products + Stripe | Stripe Checkout + custom cart |
| Full headless commerce | Medusa.js |
| Shopify inventory already | Shopify Headless (Hydrogen or custom) |
| Digital downloads only | Stripe + custom fulfillment |
| Subscriptions | Stripe Billing + webhooks |

---

## Email / Form Submission

| Volume | Recommended |
|--------|-------------|
| < 3,000/month | Resend (free tier) |
| 3,000–50,000/month | Resend Pro or SendGrid |
| 50,000+/month | AWS SES |
| Transactional + marketing | Postmark (transactional) + Loops/Mailchimp (marketing) |

---

## Search Selection

| Data Size | Recommended |
|-----------|-------------|
| < 10,000 records | Postgres full-text search (pg_trgm) |
| 10,000 – 1M records | Algolia or Meilisearch |
| Large + open source self-hosted | Typesense |
| AI-powered semantic search | pgvector + OpenAI embeddings |
