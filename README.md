# FREEM ENTERPRISE CO., LTD — fremcoltd.com

Next.js rebuild of [fremcoltd.com](https://fremcoltd.com), migrated from WordPress.

## Project structure

```
├── web/                 Next.js application (run from here)
├── scripts/             Content extraction & asset download scripts
└── fremcoltd.com.sql    WordPress DB dump (local only, not in git)
```

## Quick start

```bash
cd web
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Re-extract content from SQL

Place `fremcoltd.com.sql` in the repo root, then:

```bash
cd web
npm run extract-content
npm run download-images
npm run download-brand
```

See `web/MIGRATION.md` for full migration notes.

## CI

GitHub Actions runs lint, build, and Playwright smoke tests on pull requests and pushes to `main` (see `.github/workflows/ci.yml`). App commands run from `web/`.

```bash
cd web
npm run test:e2e
```

Smoke coverage: home, product detail, quote form submit (`E2E_BYPASS_EMAIL=1` skips Resend in local/CI only).

## Deploy on Vercel

The Next.js app lives in **`web/`**. Vercel must build from that folder.

1. Open [Vercel Dashboard](https://vercel.com/dashboard) → your **fremcoltd.com** project
2. **Settings** → **General** → **Root Directory**
3. Set Root Directory to **`web`** and save
4. **Settings** → **Environment Variables** — add from `web/.env.example`:
   - `RESEND_API_KEY`
   - `CONTACT_EMAIL` = `sales@fremcoltd.com`
   - `EMAIL_FROM` = `FREEM Enterprise <notifications@fremcoltd.com>`
   - `NEXT_PUBLIC_URL` = `https://fremcoltd.com`
   - `NEXT_PUBLIC_SITE_NAME` = `FREEM ENTERPRISE CO., LTD`
   - `DATABASE_URL` (Postgres connection string in production)
   - `AUTH_SECRET` (long random string)
   - `ADMIN_EMAIL` / `ADMIN_PASSWORD` (for seeding the first admin user)
5. **Deployments** → **Redeploy** the latest commit

If you see a plain **404: NOT_FOUND** page, the project is almost always building the repo root instead of `web/`.

### Admin CMS (local)

```bash
cd web
cp .env.example .env   # set AUTH_SECRET, ADMIN_*, DATABASE_URL
npm run db:setup       # prisma db push + seed
npm run dev
```

Sign in at `/admin/login` with `ADMIN_EMAIL` (default `sales@fremcoltd.com`) and `ADMIN_PASSWORD`.

Build locally before deploying:

```bash
cd web
npm run build
```
