# Pulse Engineering Memory System (PEMS) — Project Record

*Fill one record per project. Save as `docs/pems.md` in the project repo. Read before starting work; update after major decisions.*

**PEMS Version:** 1.0  
**Last Updated:** 2026-08-09  
**Updated By:** Senior Full Stack Engineer (Pulse B2B Admin CMS v1)

---

## Context Snapshot

*Concise first-read for every specialist — keep this current.*

| Field | Value |
|---|---|
| Project | fremcoltd.com — FREEM ENTERPRISE CO., LTD |
| Current version | 0.1.0 (`web/package.json`) |
| Current sprint / phase | Launch / Maintain — marketing site live; admin CMS v1 added |
| Architecture (one line) | Next.js App Router under `web/`; static JSON public catalog; Prisma for admin queues + Auth.js `/admin`; Resend lead email |
| Tech stack (one line) | Next.js 16 · React 19 · TypeScript · Tailwind CSS v4 · Prisma · Auth.js · Zod · RHF · Resend · Vercel |
| Design system | Brand blue scale + admin semantic tokens (`brand-primary`, etc.) in `globals.css`; Inter; Lucide |
| Primary risks | Prod needs Postgres `DATABASE_URL` + `AUTH_SECRET`; hybrid catalog (JSON public / Prisma admin); in-memory rate limits |
| Open decisions | JSON→Prisma public catalog cutover; Dealers/Distributors/Certifications/Pages later; analytics; Upstash |
| Recent changes | Pulse B2B Admin CMS v1 (Quotes, Inquiries, Products); seed admin `sales@fremcoltd.com` |
| Next priorities | Wire Vercel Postgres + AUTH_SECRET; confirm email-health; optional catalog cutover |

---

## 1. Project Profile

| Field | Value |
|---|---|
| Name | fremcoltd.com / FREEM ENTERPRISE CO., LTD |
| Description | B2B export company website for a Thai wholesaler of sugar, rice, fertilizers, edible cooking oil, and energy drinks. Rebuilt from WordPress/WooCommerce into a zero-WP Next.js site with preserved URLs and a quote-request flow instead of cart checkout. |
| Goals | Modern, fast, maintainable marketing + catalog site that generates wholesale inquiries; preserve SEO URLs from the legacy site; remove WordPress operational burden |
| Target users | International wholesale buyers, distributors, and procurement teams seeking Thai agricultural commodities |
| Industry / domain | Agricultural commodity export / B2B wholesale (Thailand → global) |
| Key features | Product catalog (73 products, 5 categories); quote/contact/newsletter forms; WhatsApp CTA; info pages; `/admin` CMS (Quotes, Inquiries, Products) with Auth.js |
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
| Backend | Next.js Server Actions | Public forms + `actions/admin*.ts` |
| Database | Prisma (SQLite local / Postgres prod) | Admin queues + CMS products; public catalog still JSON |
| ORM / data layer | Prisma + content helpers | `web/prisma/schema.prisma`; `web/src/lib/content.ts` for storefront |
| Auth | Auth.js (credentials + JWT) | `/admin/login`; roles via `lib/adminAuth.ts`; proxy gate `/admin/*` |
| Styling | Tailwind CSS v4 | `@tailwindcss/postcss`; brand CSS variables in `globals.css` |
| State / data fetching | Server Components + local client state | Search/carousel/gallery are client components; content is import-time static |
| Forms / validation | React Hook Form + Zod + Server Actions | `@hookform/resolvers`, Zod 4; schemas in `lib/validations/forms.ts` |
| Animation | CSS + IntersectionObserver | `Reveal`, `CountUp`, ken-burns / slide-up keyframes; `prefers-reduced-motion` support |
| Testing | Playwright smoke | `web/e2e/smoke.spec.ts` — home, product, quote submit; `npm run test:e2e` |
| CI/CD | GitHub Actions + Vercel | `.github/workflows/ci.yml` — lint + build + Playwright smoke on PR/`main`; Vercel deploys production |
| Hosting | Vercel | Root `vercel.json` builds `web/package.json`; also set Root Directory to `web` |
| AI / LLM (if any) | None | |
| Other services | Resend (email); WhatsApp (`wa.me`); optional GA env stub | `NEXT_PUBLIC_GA_MEASUREMENT_ID` in `.env.example` but not wired in app code |

**Documented exceptions to PSEF:** Public storefront remains static-JSON hybrid (admin Prisma products not yet public). Inter font is project choice. In-memory rate limits (no Redis) accepted until abuse warrants Upstash.

---

## 3. Architecture Profile

| Field | Value |
|---|---|
| Architecture style | Modular monolith — feature-oriented folders inside a single Next.js app (`web/`) |
| Folder structure summary | Repo: `web/` (app), `scripts/`, `docs/`, `pulse-b2b-admin-cms/`, `.github/workflows/`. App: `app/admin`, `components/admin`, `services/`, `prisma/`, `lib/{prisma,adminAuth,content,email,…}`, `actions/`, `features/admin`, `auth.ts`, `proxy.ts` |
| Routing strategy | App Router file routes; dynamic `[slug]` for info pages; `/product/[slug]`, `/product-category/[slug]`; WP legacy redirects in `next.config.ts` |
| API strategy | Server Actions only (no public REST/tRPC). Forms post to `submitContactForm` / `submitQuoteForm` / `subscribeNewsletter` |
| Auth model | Public site anonymous; `/admin` Auth.js session + RBAC (SUPER_ADMIN, ADMIN, EDITOR, SALES_MANAGER, READ_ONLY) |
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
| Env var naming | `NEXT_PUBLIC_*` for client; `RESEND_*`, `CONTACT_EMAIL`, `EMAIL_FROM`, `DATABASE_URL`, `AUTH_SECRET`, `ADMIN_EMAIL`, `ADMIN_PASSWORD` — see `web/.env.example` |
| Testing expectations | PRs must pass `lint` + `build` + Playwright smoke (`home` / `product` / `quote`); `E2E_BYPASS_EMAIL=1` for CI only |
| Documentation location | Root `README.md`, `web/MIGRATION.md`, `docs/pems.md` |

**Exceptions to PSEF:** Commit messages are prose imperative rather than `type(scope):` Conventional Commits. Inter as default sans is a legacy of create-next-app; brand redesign would revisit typography.

---

## 6. Project Decisions

| Date | Decision | Reasoning | Alternatives considered | Impact |
|---|---|---|---|---|
| 2026-08-09 | Pulse B2B Admin CMS v1: Quotes, Inquiries, Products; Dealers/Distributors/Certs/Pages later | Sales queue + optional CMS without full ERP | Full kit modules; no admin | `/admin` + Prisma + Auth.js; kit config in `pulse-b2b-admin-cms/project-config.md` |
| 2026-08-09 | Hybrid catalog: public JSON, admin Prisma products | Faster admin ship; avoid storefront cutover risk | Prisma as public source of truth | Two catalogs until cutover decision |
| 2026-08-09 | Persist contact/quote to DB then email; DB failure does not block Resend | Never lose sales lead email | Fail form if DB down | `console.error` on persist miss |
| 2026-08-09 | Admin seed email `sales@fremcoltd.com` | Client sales inbox identity | `admin@…` | `ADMIN_EMAIL` default in seed |
| 2026-08-03 | Playwright smoke tests for home/product/quote + CI | Shift-left confidence on catalog and lead-gen path | Manual QA only | `npm run test:e2e`; CI runs after build |
| 2026-08-03 | Honeypot + timing + in-memory IP/email rate limits on forms | Protect Resend quota and sales inbox from bots without adding Redis yet | Captcha; Upstash | Silent reject on honeypot/too-fast; visible rate-limit error |
| 2026-08-03 | Add GitHub Actions CI (lint + build) on PRs/`main` | Catch regressions before merge; PEMS backlog item | Vercel-only checks | Required quality gate for `web/` |
| 2026-08-03 | Strip WP shortcodes in JSON + shared `normalizePlainText` | Flatsome page excerpts were shortcode-only noise; products needed entity unescape | Leave raw excerpts; full re-author | Clean catalog data; future extracts stay clean |
| 2026-08-03 | Admin-first Resend send; user confirmation best-effort | Lead capture must not fail when confirmation to user is rejected | Keep all-or-nothing Promise.all | Fewer false form errors; sales always gets successful admin sends |
| 2026-08-03 | Add `/api/email-health` readiness endpoint | Verify production env without exposing secrets | Vercel dashboard only | Ops can confirm `ok: true` after deploy |
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
| Budget / timeline | Admin v1 scoped; dealers/distributors/pages later; no e-commerce unless requested |
| Technical | Hybrid catalog; prod needs Postgres; product public updates still JSON/script until cutover; remote WP upload host still in image allowlist |
| Business | Lead-gen / wholesale inquiry model; payment terms offline (TT/LC) |
| Legal / compliance | Privacy policy present; Thai company address; PDPA/GDPR-style rights language — not a formal legal review |
| Other | Local `fremcoltd.com.sql` required to re-extract content; not in git |

---

## 8. Active Work

| Field | Value |
|---|---|
| Current sprint / milestone | Admin CMS v1 local ready; prod DB/auth env pending |
| Open tasks | Vercel `DATABASE_URL` (Postgres) + `AUTH_SECRET` + admin seed; confirm `/api/email-health`; optional GA / distributed rate limit; JSON→Prisma cutover |
| Blocked tasks | Pulse CLI lacks access to fremcoltd Vercel project (only `dime-industries` visible under Dime Industries team) — env changes need client/account owner |
| Technical debt (active) | MIGRATION.md version drift (says Next 15); leftover create-next-app README in `web/`; unused default SVGs in `public/`; no unit tests beyond smoke; Inter vs brand typography; remote WP image pattern still enabled; page JSON excerpts empty (UI uses hand-authored `config/site.ts`); rate limits are in-memory only |

---

## 9. Reusable Assets

| Asset | Path / location | Notes |
|---|---|---|
| Components | `web/src/components/**` | Layout (Header, Footer, Logo, PageBanner, InfoPageLayout, FloatingActions); products; forms; sections; motion; search |
| Hooks | — | No shared hooks folder yet |
| Services / utilities | `lib/content.ts`, `lib/prisma.ts`, `lib/adminAuth.ts`, `services/*`, `lib/email/**`, `lib/security/**` | Content accessors; admin queues; email; form abuse guards |
| Admin kit | `pulse-b2b-admin-cms/` | Structure kit + filled `project-config.md` |
| Config | `web/src/config/site.ts`, `assets.ts` | Nav, category meta, info page copy, brand/hero/facility assets |
| Templates / scripts | `scripts/extract-content.mjs`, `clean-shortcodes.mjs`, `download-product-images.mjs`, `download-brand-assets.mjs`, `probe-resend-production.mjs` | `npm run clean-shortcodes` / `extract-content` from `web/` |
| Health | `GET /api/email-health` | Non-secret Resend readiness (`ok`, `usingOnboardingFrom`) |
| Types | `web/src/types/content.ts` | SiteContent model |
| Brand images | `web/public/images/**`, `og-image.png`, icons | ~92 files under `public/images` |

---

## 10. Risk Register

| Risk | Category | Severity | Mitigation | Status |
|---|---|---|---|---|
| Resend not configured or domain unverified → forms fail in production | Business / Security | Critical | Live probe 2026-08-03: contact/quote/newsletter succeeded with real domains; check `/api/email-health` after deploy | Mitigated |
| User confirmation failure discarded lead (all-or-nothing send) | Business | High | Admin-first send; confirmation best-effort | Mitigated (pending deploy) |
| Reserved/test email domains (e.g. example.com) confuse users | Technical | Medium | Zod blocks reserved domains client/server | Mitigated (pending deploy) |
| No automated tests or CI → regressions ship unnoticed | Technical | High | GitHub Actions lint+build+Playwright smoke on PR/`main` | Mitigated |
| Residual WP shortcode noise in `site-content.json` page excerpts | Technical / Business | Medium | Stripped via `clean-shortcodes` + extract/runtime `normalizePlainText`; page UI uses `config/site.ts` | Mitigated |
| SEO regression if Vercel root mis-set | Business | High | Document Root Directory=`web`; root `vercel.json` builds `web/package.json` | Mitigated |
| Form spam / Resend quota exhaustion | Security / Business | Medium | Honeypot + min fill time + IP/email sliding windows; silent success on bot traps | Mitigated |
| Accessibility gaps (carousels, contrast, keyboard) | Technical | Medium | AXA audit; keep reduced-motion; expand focus/ARIA coverage | Open |
| Remote WP upload images as dependency | Performance / Reliability | Low–Medium | Prefer local `/images` assets; tighten `remotePatterns` when unused | Open |
| Optional Stripe called out but unused | Business | Low | Do not build until client requests retail checkout | Accepted |
| Analytics env unused | Business | Low | Wire GA/Plausible or remove env stub | Open |
| Pulse lacks Vercel project link for fremcoltd | Operational | Medium | Link/share correct Vercel team or have owner confirm envs | Open |

---

## 11. Improvement Backlog

| Idea | Area | Priority | Notes |
|---|---|---|---|
| Confirm `/api/email-health` ok after deploy | Security / Business | High | Expect `usingOnboardingFrom: false` |
| Minimal CI (lint + build) | Architecture | High | Added 2026-08-03 — extended with Playwright smoke |
| E2E smoke tests | Performance / QA | Medium | Added 2026-08-03 — home/product/quote |
| Content hygiene (strip WP shortcodes; refresh product copy) | Architecture | Medium | Shortcodes stripped 2026-08-03; product copy refresh optional |
| Formal WCAG 2.2 AA audit | A11y | Medium | Hero/carousel/forms focus |
| Brand typography refresh (move off Inter) | UI | Medium | Align with Pulse brand guidance when redesigning |
| Wire analytics or remove stub | Performance / Business | Low | `NEXT_PUBLIC_GA_MEASUREMENT_ID` |
| Rate limiting / honeypot on forms | Security | Medium | Added 2026-08-03 — in-memory per isolate; upgrade to Upstash if abuse persists |
| CMS later if content velocity rises | Architecture | Low | Only if sales team needs non-dev edits |

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
- [x] Security model — Resend live verified; admin-first + email-health 2026-08-03
- [x] Deployment / hosting — Vercel `web/` root documented
- [x] Significant feature completed — WP shortcode cleanup + CI lint/build 2026-08-03
- [x] Major technical decision made — static JSON + quote flow + WP removal + admin-first email + shortcode strip + GitHub Actions CI logged
