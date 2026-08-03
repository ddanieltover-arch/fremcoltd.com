# Pulse Engineering Memory System (PEMS) — Project Record

*Fill one record per project. Save as `docs/pems.md` in the project repo. Read before starting work; update after major decisions.*

**PEMS Version:** 1.0  
**Last Updated:** 2026-08-03  
**Updated By:** Master Technical Director (Pulse Software Studio)

---

## Context Snapshot

*Concise first-read for every specialist — keep this current.*

| Field | Value |
|---|---|
| Project | fremcoltd.com — FREEM ENTERPRISE CO., LTD |
| Current version | 0.1.0 (`web/package.json`) |
| Current sprint / phase | Launch / Maintain — WordPress→Next.js migration largely complete; production hardening ongoing |
| Architecture (one line) | Static-content Next.js App Router monolith under `web/`; Server Actions + Resend for lead capture; no database |
| Tech stack (one line) | Next.js 16 · React 19 · TypeScript · Tailwind CSS v4 · Zod · React Hook Form · Resend · Vercel |
| Design system | Project-local brand tokens in `globals.css` (blue brand scale); Inter; Lucide icons; custom motion utilities |
| Primary risks | Resend/env not verified in prod; no automated tests/CI; content still carries raw WP shortcodes in JSON excerpts; GA unused |
| Open decisions | Confirm Resend domain verification + live form delivery; whether Stripe/e-commerce is ever needed; analytics provider |
| Recent changes | Lampang office address; Energy Drinks category + Red Bull + gallery; Vercel `web/` root fix; WP backup removed from git |
| Next priorities | Verify email delivery in production; clean residual WP shortcode content; add minimal CI + smoke tests; optional GA |

---

## 1. Project Profile

| Field | Value |
|---|---|
| Name | fremcoltd.com / FREEM ENTERPRISE CO., LTD |
| Description | B2B export company website for a Thai wholesaler of sugar, rice, fertilizers, edible cooking oil, and energy drinks. Rebuilt from WordPress/WooCommerce into a zero-WP Next.js site with preserved URLs and a quote-request flow instead of cart checkout. |
| Goals | Modern, fast, maintainable marketing + catalog site that generates wholesale inquiries; preserve SEO URLs from the legacy site; remove WordPress operational burden |
| Target users | International wholesale buyers, distributors, and procurement teams seeking Thai agricultural commodities |
| Industry / domain | Agricultural commodity export / B2B wholesale (Thailand → global) |
| Key features | Product catalog (73 products, 5 categories); category & product pages; client-side search; contact / quote / newsletter forms; WhatsApp CTA; info pages (ordering, QC, sustainability, privacy); sitemap/robots; hero slider & facilities showcase |
| Phase | Launch / Maintain |
| Ownership (client / Pulse / stakeholders) | Client: FREEM ENTERPRISE CO., LTD (fremcoltd.com). Delivery: Pulse Software Studio engagement. Sales contact: sales@fremcoltd.com |
| Success metrics | Form submissions delivered to sales; Core Web Vitals healthy on Vercel; SEO URL continuity (no soft-404s for legacy paths); inquiry conversion from product → quote |

---

## 2. Technology Profile

| Layer | Choice | Notes / version |
|---|---|---|
| Language(s) | TypeScript | `typescript` ^5; strict App Router codebase |
| Web framework | Next.js (App Router) | `next` 16.2.9 (MIGRATION.md still says “15” — treat package.json as source of truth) |
| Mobile framework | N/A | Responsive web only |
| Backend | Next.js Server Actions | `web/src/actions/forms.ts` — no separate API server |
| Database | None | Catalog from static JSON (`web/content/site-content.json`) |
| ORM / data layer | Content helpers | `web/src/lib/content.ts` + typed models in `web/src/types/content.ts` |
| Auth | None | Public marketing site; no accounts (`/my-account` redirects to quote) |
| Styling | Tailwind CSS v4 | `@tailwindcss/postcss`; brand CSS variables in `globals.css` |
| State / data fetching | Server Components + local client state | Search/carousel/gallery are client components; content is import-time static |
| Forms / validation | React Hook Form + Zod + Server Actions | `@hookform/resolvers`, Zod 4; schemas in `lib/validations/forms.ts` |
| Animation | CSS + IntersectionObserver | `Reveal`, `CountUp`, ken-burns / slide-up keyframes; `prefers-reduced-motion` support |
| Testing | None | No unit/e2e suite or test runner configured |
| CI/CD | Vercel only | No `.github` workflows |
| Hosting | Vercel | Root `vercel.json` builds `web/package.json`; also set Root Directory to `web` |
| AI / LLM (if any) | None | |
| Other services | Resend (email); WhatsApp (`wa.me`); optional GA env stub | `NEXT_PUBLIC_GA_MEASUREMENT_ID` in `.env.example` but not wired in app code |

**Documented exceptions to PSEF:** No database/auth layer by design (static B2B brochure + lead gen). No automated test gate yet — accepted debt until production email is confirmed. Inter font is project choice (PSEF prefers expressive type; redesign would need Brand/Design specialists).

---

## 3. Architecture Profile

| Field | Value |
|---|---|
| Architecture style | Modular monolith — feature-oriented folders inside a single Next.js app (`web/`) |
| Folder structure summary | Repo: `web/` (app), `scripts/` (SQL extract & asset download), `docs/` (PEMS). App: `app/` routes, `components/{layout,forms,products,sections,motion,search}`, `config/`, `lib/{content,email,validations,search}`, `actions/`, `content/site-content.json`, `types/` |
| Routing strategy | App Router file routes; dynamic `[slug]` for info pages; `/product/[slug]`, `/product-category/[slug]`; WP legacy redirects in `next.config.ts` |
| API strategy | Server Actions only (no public REST/tRPC). Forms post to `submitContactForm` / `submitQuoteForm` / `subscribeNewsletter` |
| Auth model | Public site; no sessions |
| State management | React local state for UI; no global store |
| Caching strategy | Static generation from JSON + Vercel edge/CDN; `next/image` for assets |
| Background jobs | None |
| Multi-tenancy | N/A (single brand) |
| Key integration points | Resend API; WhatsApp deep links; optional remote `fremcoltd.com/wp-content/uploads` image host still allowed in `next.config.ts` for legacy URLs |

**Architecture Decision Records (summary):**

1. **Static JSON catalog over CMS/DB** — extract from WP SQL once; re-run scripts when dump updates.
2. **Quote flow replaces WooCommerce cart** — B2B wholesale, not retail checkout.
3. **Zero WordPress runtime** — WP backup removed from git; SQL dump stays local-only (`.gitignore`).
4. **Vercel Root Directory = `web`** — required for deploy (root `vercel.json` is a safety net).

---

## 4. Design Profile

| Field | Value |
|---|---|
| Brand / product name | FREEM ENTERPRISE CO., LTD — tagline “Sweetening the World with Thai Excellence” |
| Design system name / location | Informal project tokens — `web/src/app/globals.css` + Tailwind `@theme inline` |
| Color tokens (summary or path) | Brand blue scale `--brand-50`…`--brand-950` (primary `#145e96`); white/slate foreground; see `globals.css` |
| Typography | Inter via `next/font/google` (`--font-inter`); system-ui fallback |
| Spacing / radius conventions | Tailwind defaults; rounded cards (~xl/2xl) and glass/modern-card utility classes |
| Component library | Custom React components (no shadcn/Radix); Lucide React icons |
| Icon set | `lucide-react` |
| Motion language | Scroll reveal, hero ken-burns, carousel, count-up, float/shimmer; reduced-motion media query |
| Accessibility target | Informal WCAG-oriented practices (landmarks, aria-labels on nav/carousels); no formal audit yet — target WCAG 2.2 AA |

---

## 5. Engineering Standards

*Should match `pulse-engineering-framework` unless documented below.*

| Convention | Project standard |
|---|---|
| File / component naming | PascalCase components (`Header.tsx`); camelCase libs; kebab-case routes/folders |
| Branch naming | Prefer PSEF: `feature/`, `bugfix/`, `hotfix/`, `release/` (history to date is mostly direct `main` commits) |
| Commit style | Imperative sentence summaries (not strict Conventional Commits) — e.g. “Add Energy Drinks category…” |
| PR / review process | Single `main` branch on origin; establish PR reviews for non-trivial work going forward |
| Env var naming | `NEXT_PUBLIC_*` for client; `RESEND_API_KEY`, `CONTACT_EMAIL`, `EMAIL_FROM` server-side — see `web/.env.example` |
| Testing expectations | Lint via `npm run lint`; no test suite yet — add smoke/build gate before major releases |
| Documentation location | Root `README.md`, `web/MIGRATION.md`, `docs/pems.md` |

**Exceptions to PSEF:** Commit messages are prose imperative rather than `type(scope):` Conventional Commits. Inter as default sans is a legacy of create-next-app; brand redesign would revisit typography.

---

## 6. Project Decisions

| Date | Decision | Reasoning | Alternatives considered | Impact |
|---|---|---|---|---|
| 2026 (initial) | Migrate WP/WooCommerce → Next.js App Router | Remove plugin/hosting debt; improve performance and maintainability | Keep WordPress; headless WP | Full rewrite in `web/` |
| 2026 (initial) | Static JSON catalog from SQL extract | Catalog is relatively stable; avoids CMS cost | Sanity/Contentful; keep WP REST | Scripts in `scripts/`; content in `site-content.json` |
| 2026 (initial) | Quote/contact forms instead of e-commerce checkout | B2B wholesale via TT/LC, not cart checkout | Stripe/WooCommerce | Redirects `/cart`, `/checkout`, `/my-account` → `/request-a-quote` |
| 2026 (initial) | Resend for transactional email | Simple Server Action integration | SendGrid, SMTP, Formspree | Needs verified domain + `RESEND_API_KEY` in Vercel |
| ~2026-07 | Remove WP files from repository | Repo size/security; runtime no longer needs WP | Keep backup in git LFS | SQL dump local-only; assets downloaded into `public/` |
| ~2026-07 | Vercel root = `web/` (+ root vercel.json build) | App lives in subdirectory | Monorepo tooling | Misconfig causes 404 NOT_FOUND |
| ~2026-07/08 | Add Energy Drinks category | Expand catalog beyond original 4 categories | Separate microsite | Nav, validation enum, assets, 1 product |
| 2026-08 | Document Lampang office address site-wide | Accurate contact/legal presence | Bangkok-only listing | Contact, footer, privacy |

---

## 7. Known Constraints

| Type | Constraint |
|---|---|
| Budget / timeline | Marketing site scope — avoid introducing CMS/auth/e-commerce unless client requests |
| Technical | No DB; product/content updates require JSON/script re-extract or manual edits; remote WP upload host still in image allowlist |
| Business | Lead-gen / wholesale inquiry model; payment terms offline (TT/LC) |
| Legal / compliance | Privacy policy present; Thai company address; PDPA/GDPR-style rights language — not a formal legal review |
| Other | Local `fremcoltd.com.sql` required to re-extract content; not in git |

---

## 8. Active Work

| Field | Value |
|---|---|
| Current sprint / milestone | Production readiness / maintain — confirm email & DNS; content hygiene |
| Open tasks | Verify Resend domain + Vercel env; wire or remove GA stub; scrub WP shortcodes from JSON page excerpts if still surfaceable; formal a11y pass; add CI build |
| Blocked tasks | None known (email blocked only if keys/domain missing in prod) |
| Technical debt (active) | MIGRATION.md version drift (says Next 15); leftover create-next-app README in `web/`; unused default SVGs in `public/`; no tests; Inter vs brand typography; remote WP image pattern still enabled |

---

## 9. Reusable Assets

| Asset | Path / location | Notes |
|---|---|---|
| Components | `web/src/components/**` | Layout (Header, Footer, Logo, PageBanner, InfoPageLayout, FloatingActions); products; forms; sections; motion; search |
| Hooks | — | No shared hooks folder yet |
| Services / utilities | `web/src/lib/content.ts`, `search.ts`, `text.ts`, `utils.ts` (`cn`), `lib/email/**`, `lib/validations/forms.ts`, `lib/metadata.ts` | Content accessors are the primary data API |
| Config | `web/src/config/site.ts`, `assets.ts` | Nav, category meta, info page copy, brand/hero/facility assets |
| Templates / scripts | `scripts/extract-content.mjs`, `download-product-images.mjs`, `download-brand-assets.mjs` | Re-run from `web` via npm scripts |
| Types | `web/src/types/content.ts` | SiteContent model |
| Brand images | `web/public/images/**`, `og-image.png`, icons | ~92 files under `public/images` |

---

## 10. Risk Register

| Risk | Category | Severity | Mitigation | Status |
|---|---|---|---|---|
| Resend not configured or domain unverified → forms fail in production | Business / Security | Critical | Set Vercel envs from `.env.example`; verify `fremcoltd.com` in Resend; smoke-test contact + quote | Open |
| No automated tests or CI → regressions ship unnoticed | Technical | High | Add `npm run build` (+ lint) on PR; later Playwright smoke for home/product/form | Open |
| Residual WP shortcode noise in `site-content.json` page excerpts | Technical / Business | Medium | Re-extract with cleaner parser or hand-curate pages (info pages already authored in `site.ts`) | Open |
| SEO regression if Vercel root mis-set | Business | High | Document Root Directory=`web`; root `vercel.json` builds `web/package.json` | Mitigated |
| Secrets leakage (API keys) | Security | High | `.gitignore` for `.env*`; only `.env.example` committed | Mitigated |
| Accessibility gaps (carousels, contrast, keyboard) | Technical | Medium | AXA audit; keep reduced-motion; expand focus/ARIA coverage | Open |
| Remote WP upload images as dependency | Performance / Reliability | Low–Medium | Prefer local `/images` assets; tighten `remotePatterns` when unused | Open |
| Optional Stripe called out but unused | Business | Low | Do not build until client requests retail checkout | Accepted |
| Analytics env unused | Business | Low | Wire GA/Plausible or remove env stub | Open |

---

## 11. Improvement Backlog

| Idea | Area | Priority | Notes |
|---|---|---|---|
| Production email end-to-end verification | Security / Business | High | Contact, quote, newsletter |
| Minimal CI (lint + build) | Architecture | High | GitHub Actions or Vercel checks |
| Content hygiene (strip WP shortcodes; refresh product copy) | Architecture | Medium | Especially raw page excerpts in JSON |
| Formal WCAG 2.2 AA audit | A11y | Medium | Hero/carousel/forms focus |
| Brand typography refresh (move off Inter) | UI | Medium | Align with Pulse brand guidance when redesigning |
| Wire analytics or remove stub | Performance / Business | Low | `NEXT_PUBLIC_GA_MEASUREMENT_ID` |
| Rate limiting / honeypot on forms | Security | Medium | Protect Resend quota and spam |
| CMS later if content velocity rises | Architecture | Low | Only if sales team needs non-dev edits |
| E2E smoke tests | Performance / QA | Medium | Home, category, product, quote submit |

---

## 12. Collaboration Notes

| Note | Detail |
|---|---|
| Assumptions | Client remains B2B quote-led; Vercel hosts production domain; sales inbox is `sales@fremcoltd.com` |
| Cross-team decisions | Pulse owns engineering standards via Playbook/PSEF; client owns product catalog and commercial terms |
| External dependencies | Resend; Vercel; WhatsApp; optional analytics; local SQL dump for re-extraction |
| Specialist handoffs | Full Stack for email/CI/content; Design/BXA for brand typography refresh; AXA for a11y; EQTA for test strategy; DSRA for CI; ECSA if expanding form attack surface |

---

## Update Checklist

Update this record when any of the following change:

- [x] Architecture — initial discovery recorded 2026-08-03
- [x] Technology / major dependencies — Next 16 / React 19 / Tailwind 4 / Resend documented
- [x] Design system — brand tokens documented
- [ ] Security model — revisit after Resend/rate-limit changes
- [x] Deployment / hosting — Vercel `web/` root documented
- [ ] Significant feature completed
- [x] Major technical decision made — static JSON + quote flow + WP removal logged
