# SEO + GEO Strategy — fremcoltd.com

**Client:** FREEM ENTERPRISE CO., LTD  
**Domain:** https://www.fremcoltd.com (canonical; apex 301 → www)  
**Industry:** B2B agricultural commodity export (Thailand → global)  
**Last updated:** 2026-08-17

## Executive Summary

This strategy implements full-stack SEO and Generative Engine Optimization (GEO) for fremcoltd.com — a Next.js 16 B2B catalog site with 73 products across 5 categories. Primary conversion goal: wholesale inquiry and quote requests to sales@fremcoltd.com.

## Phase Summary

| Phase | Status | Key Deliverables |
|-------|--------|------------------|
| 0 — Audit | Complete | audit_report.json, crawl_inventory.csv, CWV baseline |
| 1 — Keywords | Complete | keyword_map.csv (24 priority clusters) |
| 2 — Technical SEO | Complete | Canonical URLs, robots, sitemap, security headers |
| 3 — On-page | Complete | H1 fixes, category enrichment, internal linking plan |
| 4 — Structured Data | Complete | Organization, Product, FAQ, LocalBusiness, HowTo, Article |
| 5 — GEO/AEO | Complete | Answer capsules, llms.txt, /faq, /glossary, /guides |
| 6 — Local SEO | Complete | LocalBusiness schema, NAP audit, GBP checklist |
| 7 — Content | In progress | 3 guides live; 90-day calendar for 10 more |
| 8 — Analytics | Complete | GA4 component + conversion events wired |
| 9 — Link Building | Seeded | CRM, pipeline, email templates |
| 10 — CI/CD | Complete | seo-check.yml, audit scripts, Lighthouse budgets |

## Target Keywords (Top 10)

1. Thai sugar exporter
2. ICUMSA 45 wholesale
3. Thailand rice exporter
4. NPK fertilizer supplier Thailand
5. edible cooking oil exporter Thailand
6. agricultural commodities supplier Thailand
7. bulk sugar FOB Thailand
8. how to import Thai sugar
9. FOB vs CIF agricultural commodities
10. wholesale sugar quote

## Technical Decisions

- **Canonical host:** www.fremcoltd.com (matches Vercel redirect + .env.example)
- **Content route:** `/guides/[slug]` (not `/blog` — avoids blog expectations for B2B)
- **Product schema:** Offer with price on request — no fake AggregateRating
- **Search page:** noindex + excluded from sitemap
- **AI crawlers:** Explicitly allowed (GPTBot, ClaudeBot, PerplexityBot, Google-Extended)

## KPI Targets (90 days)

| KPI | Baseline | Target |
|-----|----------|--------|
| Organic sessions | TBD from GA4 | +30% |
| Indexed pages | ~85 | 90+ (with guides) |
| Average position | TBD from GSC | < 15 |
| CTR | TBD | > 3% |
| LCP | ~2.1s | ≤ 2.5s |
| Form conversions (generate_lead) | TBD | +25% |

## Next Actions (Client)

1. Set `NEXT_PUBLIC_GA_MEASUREMENT_ID` in Vercel production env
2. Re-submit sitemap in Google Search Console
3. Connect GA4 ↔ GSC in Google Admin
4. Review and optimize Google Business Profile (see gbp_checklist.md)
5. Execute link-building outreach from seeded CRM
