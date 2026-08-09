# Project config — fill once per client

Agents: if this file is empty or still contains placeholders, ask the user or read `docs/pems.md` before scaffolding.

## Identity

| Field | Value |
|---|---|
| Client / project name | FREEM ENTERPRISE CO., LTD / fremcoltd.com |
| Legal / display name | FREEM ENTERPRISE CO., LTD |
| Primary domain | fremcoltd.com |
| Admin seed email | `ADMIN_EMAIL` (default `sales@fremcoltd.com`) |
| Product domain (1 line) | Thai agricultural commodity export (sugar, rice, fertilizers, edible cooking oil, energy drinks) |

## Brand tokens

| Semantic role | CSS variable in this project | Tailwind / utility class |
|---|---|---|
| Token prefix | `brand` | |
| Primary | `--brand-color-primary` (`#145e96` / `--brand-500`) | `bg-brand-primary` / `text-brand-primary` |
| Primary hover | `--brand-color-primary-hover` (`--brand-600`) | `bg-brand-primary-hover` |
| Secondary / accent | `--brand-color-secondary` (`--brand-400`) | `border-brand-secondary` |
| Background | `--brand-color-bg` (`--brand-50`) | `bg-brand-bg` |
| Surface | `--brand-color-surface` (`#ffffff`) | `bg-brand-surface` |
| Text | `--brand-color-text` (`--foreground`) | `text-brand-text` |
| Muted | `--brand-color-text-muted` | `text-brand-muted` |
| Border | `--brand-color-border` | `border-brand-border` |
| Error | `--brand-color-error` | `text-brand-error` |
| Success | `--brand-color-success` | `text-brand-success` |
| Radius md | `--brand-radius-md` | `rounded-[var(--brand-radius-md)]` |
| Container width | `--brand-container` | `max-w-[var(--brand-container)]` |
| Display font | Inter via `--font-sans` | `font-display` (aliased to sans for v1) |

**Rule:** Admin classes must use **this table**, not another client’s prefix.

## Modules

Mark each: `on` | `off` | `later`

### Core (required)

| Module | Status |
|---|---|
| Login + session gate | on |
| Dashboard | on |
| Users / roles (seed admin at minimum) | on |

### Sales

| Module | Status | Notes |
|---|---|---|
| Quotes / RFQ | on | Wired from public `/request-a-quote` |
| Inquiries / contact | on | Wired from public `/contact` |
| Dealers | later | No public apply form yet |
| Distributors | later | No public apply form yet |

### CMS

| Module | Status | Notes |
|---|---|---|
| Products (+ specs / packaging / images) | on | Hybrid v1: admin Prisma only; public catalog stays on `site-content.json` |
| Categories | on | Implicit via products |
| Certifications | later | |
| Site pages (fixed slugs) | later | |
| Media library (dedicated) | later | URL attach is enough for v1 |

## Stack assumptions

| Layer | Expected default | This project |
|---|---|---|
| Framework | Next.js App Router | Next.js 16 under `web/` |
| DB | Prisma (SQLite local / Postgres prod) | Prisma + SQLite local; Postgres on Vercel |
| Auth | Auth.js credentials → `/admin/login` | Auth.js v5 (next-auth) |
| Styling | Tailwind + CSS variables | Tailwind v4 + `brand-*` semantics |
| Mutations | Server Actions | Server Actions |
| Email (optional) | Resend or existing mailer | Existing Resend (`lib/email`) |
| Media (optional) | Supabase Storage or URL-only | URL-only for v1 |

## Out of scope for v1 (unless user insists)

Inventory, freight, analytics, newsletter, global search, MFA/SSO, custom RBAC UI, rich blog CMS, dealers/distributors, certifications, site pages, public catalog JSON→Prisma cutover.
