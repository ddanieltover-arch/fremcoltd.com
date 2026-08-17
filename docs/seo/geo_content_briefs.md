# GEO Content Briefs — fremcoltd.com

## Implemented (Phase 6)

| Page | Primary GEO Query | Answer Capsule | Schema |
|------|-------------------|----------------|--------|
| `/` | What does FREEM ENTERPRISE export? | Yes — `#answer` section | Organization, WebSite |
| `/product-category/*` | What {commodity} does FREEM export from Thailand? | Yes — per category | ItemList, Breadcrumb |
| `/about-us` | Who is FREEM ENTERPRISE? | Yes | LocalBusiness |
| `/faq` | Wholesale buyer questions | Yes — 10 Q&A pairs | FAQPage |
| `/glossary` | ICUMSA, FOB, CIF definitions | Yes — dl/dt/dd markup | Breadcrumb |
| `/guides/*` | Import guides | Yes — per guide | Article |

## Planned Expansion (90-day calendar)

### Comparison Pages
- **FOB vs CIF for Sugar Imports** — extend existing guide with comparison table
- **ICUMSA 45 vs ICUMSA 150** — new guide comparing sugar grades

### Statistics Page (future)
- Aggregate Thailand export statistics with citations to USDA, Thai commerce ministry data
- Highly linkable; target AI citation for "Thailand sugar export statistics"

### Definitive Guides (future pillars)
- Complete Guide to Importing Thai Agricultural Commodities (3000+ words)
- Thai Rice Buyer's Handbook

## AI Crawler Access
- `llms.txt` deployed at `/llms.txt`
- GPTBot, ClaudeBot, PerplexityBot, Google-Extended allowed in robots.txt
- All content SSR/SSG — no JS-only rendering for key pages
