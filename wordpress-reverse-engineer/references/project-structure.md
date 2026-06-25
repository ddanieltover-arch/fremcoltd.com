# Canonical Next.js Project Structure for WordPress Migrations

```
my-project/
├── app/                          # Next.js App Router
│   ├── (marketing)/              # Route group: public pages
│   │   ├── page.tsx              # Home page
│   │   ├── about/page.tsx
│   │   ├── services/
│   │   │   ├── page.tsx          # Services index
│   │   │   └── [slug]/page.tsx   # Individual service
│   │   ├── blog/
│   │   │   ├── page.tsx          # Blog index
│   │   │   └── [slug]/page.tsx   # Blog post
│   │   └── contact/page.tsx
│   ├── (auth)/                   # Route group: auth pages
│   │   ├── login/page.tsx
│   │   └── register/page.tsx
│   ├── (dashboard)/              # Route group: protected
│   │   └── dashboard/page.tsx
│   ├── api/                      # API Routes
│   │   ├── contact/route.ts
│   │   ├── newsletter/route.ts
│   │   └── webhooks/
│   │       └── stripe/route.ts
│   ├── layout.tsx                # Root layout
│   ├── not-found.tsx
│   └── sitemap.ts                # Dynamic sitemap
│
├── components/
│   ├── ui/                       # Shadcn UI primitives (auto-generated)
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── MobileNav.tsx
│   │   └── Breadcrumb.tsx
│   ├── sections/                 # Page sections (replaces Elementor sections)
│   │   ├── Hero.tsx
│   │   ├── Features.tsx
│   │   ├── Testimonials.tsx
│   │   ├── Pricing.tsx
│   │   ├── FAQ.tsx
│   │   ├── CTABanner.tsx
│   │   └── ContactForm.tsx
│   ├── blog/
│   │   ├── PostCard.tsx
│   │   ├── PostGrid.tsx
│   │   └── PostBody.tsx
│   └── shared/
│       ├── AnimatedSection.tsx
│       ├── SEOHead.tsx           # (metadata exported from page)
│       └── OptimizedImage.tsx
│
├── lib/
│   ├── sanity/                   # CMS client (if using Sanity)
│   │   ├── client.ts
│   │   ├── queries.ts
│   │   └── types.ts
│   ├── db/                       # Database (Supabase / Drizzle)
│   │   ├── index.ts
│   │   └── schema.ts
│   ├── auth/                     # Auth utilities
│   │   └── options.ts
│   ├── email/                    # Email sending
│   │   └── resend.ts
│   ├── validations/              # Zod schemas
│   │   ├── contact.ts
│   │   └── newsletter.ts
│   └── utils.ts                  # Shared helpers (cn, formatDate, etc.)
│
├── actions/                      # Server Actions
│   ├── contact.ts
│   ├── newsletter.ts
│   └── auth.ts
│
├── hooks/                        # Custom React hooks
│   ├── useScrollPosition.ts
│   └── useMediaQuery.ts
│
├── types/                        # Global TypeScript types
│   ├── index.ts
│   ├── cms.ts                    # CMS content types
│   └── api.ts                    # API response types
│
├── config/
│   ├── site.ts                   # Site metadata, nav items, links
│   └── seo.ts                    # Default SEO config
│
├── public/
│   ├── images/                   # Static images (prefer next/image CDN)
│   ├── fonts/                    # Self-hosted fonts (use next/font preferred)
│   ├── favicon.ico
│   ├── robots.txt
│   └── og-image.png
│
├── styles/
│   └── globals.css               # Tailwind base + custom CSS vars
│
├── middleware.ts                 # Auth guards, redirects, rate limits
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── .env.example
├── .eslintrc.json
├── prettier.config.js
├── package.json
└── vercel.json
```

---

## Key Conventions

### Route Groups
Use `(group-name)/` folders to organize routes without affecting the URL.
- `(marketing)` — public pages
- `(auth)` — login/register/forgot-password
- `(dashboard)` — authenticated user pages
- `(admin)` — admin panel routes

### Data Fetching Hierarchy
```
Static (build time)    → generateStaticParams + fetch cache: 'force-cache'
ISR (revalidate)       → fetch with revalidate: 3600 (1hr, adjust per content)
Dynamic (per request)  → fetch cache: 'no-store' or unstable_noStore()
Client-side            → SWR or React Query (for user-specific data)
```

### Metadata Pattern (per page)
```typescript
// app/(marketing)/about/page.tsx
export const metadata: Metadata = {
  title: 'About Us | Company Name',
  description: 'Your meta description here',
  openGraph: { ... },
}
```

### Server Action Pattern
```typescript
// actions/contact.ts
'use server'
import { contactSchema } from '@/lib/validations/contact'

export async function submitContact(formData: FormData) {
  const parsed = contactSchema.safeParse(Object.fromEntries(formData))
  if (!parsed.success) return { error: parsed.error.flatten() }
  // send email, save to DB, etc.
  return { success: true }
}
```
