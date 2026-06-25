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
5. **Deployments** → **Redeploy** the latest commit

If you see a plain **404: NOT_FOUND** page, the project is almost always building the repo root instead of `web/`.

Build locally before deploying:

```bash
cd web
npm run build
```
