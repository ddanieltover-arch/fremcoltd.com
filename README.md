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

## Deploy

Build and deploy the `web/` directory (e.g. Vercel). Set `RESEND_API_KEY` and related env vars from `web/.env.example`.
