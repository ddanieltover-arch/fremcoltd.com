# Functionality Patterns — WordPress Plugin Replacements

## Contact Form (replaces Contact Form 7 / WPForms / Gravity Forms)

### Server Action + React Hook Form + Zod

```typescript
// lib/validations/contact.ts
import { z } from 'zod'

export const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
})

export type ContactFormData = z.infer<typeof contactSchema>
```

```typescript
// actions/contact.ts
'use server'
import { contactSchema } from '@/lib/validations/contact'
import { resend } from '@/lib/email/resend'

export async function submitContactForm(data: unknown) {
  const parsed = contactSchema.safeParse(data)
  if (!parsed.success) {
    return { error: 'Invalid form data', fields: parsed.error.flatten().fieldErrors }
  }
  
  await resend.emails.send({
    from: 'noreply@yourdomain.com',
    to: 'contact@yourdomain.com',
    subject: `New contact from ${parsed.data.name}`,
    html: `<p>${parsed.data.message}</p>`,
  })
  
  return { success: true }
}
```

```tsx
// components/sections/ContactForm.tsx
'use client'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { contactSchema, type ContactFormData } from '@/lib/validations/contact'
import { submitContactForm } from '@/actions/contact'

export function ContactForm() {
  const form = useForm<ContactFormData>({ resolver: zodResolver(contactSchema) })
  
  const onSubmit = async (data: ContactFormData) => {
    const result = await submitContactForm(data)
    if (result.error) { /* show error */ }
    if (result.success) { /* show success */ }
  }
  
  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      {/* fields */}
    </form>
  )
}
```

---

## Newsletter (replaces Mailchimp for WordPress / Newsletter plugin)

```typescript
// actions/newsletter.ts
'use server'
import { z } from 'zod'

const schema = z.object({ email: z.string().email() })

export async function subscribeNewsletter(data: unknown) {
  const parsed = schema.safeParse(data)
  if (!parsed.success) return { error: 'Invalid email' }
  
  // Option A: Mailchimp API
  // Option B: Loops.so API
  // Option C: Resend Audiences
  const res = await fetch('https://api.resend.com/audiences/{id}/contacts', {
    method: 'POST',
    headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: parsed.data.email }),
  })
  
  return res.ok ? { success: true } : { error: 'Subscription failed' }
}
```

---

## Blog / Posts (replaces WP Posts + The Loop)

### With Sanity CMS

```typescript
// lib/sanity/queries.ts
import { groq } from 'next-sanity'

export const allPostsQuery = groq`
  *[_type == "post"] | order(publishedAt desc) {
    _id, title, slug, excerpt, publishedAt,
    "author": author->{ name, image },
    "categories": categories[]->{ title, slug },
    mainImage
  }
`

export const singlePostQuery = groq`
  *[_type == "post" && slug.current == $slug][0] {
    _id, title, body, publishedAt,
    "author": author->{ name, bio, image },
    "categories": categories[]->{ title, slug },
    mainImage, seo
  }
`
```

```typescript
// app/(marketing)/blog/[slug]/page.tsx
import { client } from '@/lib/sanity/client'
import { singlePostQuery } from '@/lib/sanity/queries'

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = await client.fetch(singlePostQuery, { slug: params.slug })
  return { title: post.seo?.title || post.title, description: post.seo?.description || post.excerpt }
}

export default async function PostPage({ params }: { params: { slug: string } }) {
  const post = await client.fetch(singlePostQuery, { slug: params.slug })
  return <article>{/* render post */}</article>
}

export async function generateStaticParams() {
  const slugs = await client.fetch<{ slug: string }[]>(`*[_type == "post"]{ "slug": slug.current }`)
  return slugs.map(s => ({ slug: s.slug }))
}
```

---

## Authentication (replaces WP user system / membership plugins)

### NextAuth v5

```typescript
// lib/auth/options.ts
import NextAuth from 'next-auth'
import Google from 'next-auth/providers/google'
import Credentials from 'next-auth/providers/credentials'

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Google,
    Credentials({
      credentials: { email: {}, password: {} },
      authorize: async ({ email, password }) => {
        // validate against DB
      },
    }),
  ],
  callbacks: {
    session: ({ session, token }) => ({ ...session, user: { ...session.user, id: token.sub } }),
  },
})
```

```typescript
// middleware.ts
import { auth } from '@/lib/auth/options'

export default auth((req) => {
  const isLoggedIn = !!req.auth
  const isProtected = req.nextUrl.pathname.startsWith('/dashboard')
  if (isProtected && !isLoggedIn) {
    return Response.redirect(new URL('/login', req.nextUrl))
  }
})
```

---

## SEO (replaces Yoast SEO / RankMath)

```typescript
// config/seo.ts
export const defaultSEO = {
  siteName: 'Your Site Name',
  siteUrl: 'https://yourdomain.com',
  defaultTitle: 'Your Site | Tagline',
  defaultDescription: 'Your site description',
  twitterHandle: '@yourhandle',
}
```

```typescript
// app/layout.tsx
export const metadata: Metadata = {
  metadataBase: new URL('https://yourdomain.com'),
  title: { default: defaultSEO.defaultTitle, template: `%s | ${defaultSEO.siteName}` },
  description: defaultSEO.defaultDescription,
  openGraph: { type: 'website', siteName: defaultSEO.siteName },
  twitter: { card: 'summary_large_image', site: defaultSEO.twitterHandle },
  robots: { index: true, follow: true },
}
```

```typescript
// app/sitemap.ts
import { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await fetchAllPosts() // from CMS
  return [
    { url: 'https://yourdomain.com', lastModified: new Date() },
    { url: 'https://yourdomain.com/about', lastModified: new Date() },
    ...posts.map(p => ({
      url: `https://yourdomain.com/blog/${p.slug}`,
      lastModified: new Date(p.updatedAt),
    })),
  ]
}
```

---

## Redirects (preserving WP URL structure)

```typescript
// next.config.ts
const nextConfig = {
  async redirects() {
    return [
      // WP default → new structure
      { source: '/?p=:id', destination: '/blog', permanent: true },
      { source: '/category/:slug', destination: '/blog/category/:slug', permanent: true },
      { source: '/tag/:slug', destination: '/blog/tag/:slug', permanent: true },
      // Specific page redirects
      { source: '/old-page-slug', destination: '/new-page-slug', permanent: true },
      // Add ALL redirects from your URL audit here
    ]
  },
}
```

---

## WooCommerce → Stripe Commerce

```typescript
// lib/stripe.ts
import Stripe from 'stripe'
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2024-06-20' })

// app/api/checkout/route.ts
import { stripe } from '@/lib/stripe'
import { NextRequest } from 'next/server'

export async function POST(req: NextRequest) {
  const { items } = await req.json()
  
  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    line_items: items.map((item: any) => ({
      price_data: {
        currency: 'usd',
        product_data: { name: item.name },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    })),
    success_url: `${process.env.NEXT_PUBLIC_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_URL}/cart`,
  })
  
  return Response.json({ url: session.url })
}

// app/api/webhooks/stripe/route.ts
import { stripe } from '@/lib/stripe'

export async function POST(req: Request) {
  const body = await req.text()
  const sig = req.headers.get('stripe-signature')!
  
  const event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!)
  
  switch (event.type) {
    case 'checkout.session.completed':
      // fulfill order
      break
    case 'payment_intent.payment_failed':
      // handle failure
      break
  }
  
  return Response.json({ received: true })
}
```

---

## Environment Variables Template

```bash
# .env.example

# App
NEXT_PUBLIC_URL=https://yourdomain.com
NEXT_PUBLIC_SITE_NAME="Your Site Name"

# Database (Supabase)
DATABASE_URL=postgresql://...
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# CMS (Sanity)
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_token

# Auth (NextAuth)
NEXTAUTH_URL=https://yourdomain.com
NEXTAUTH_SECRET=generate_with_openssl_rand_base64_32
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...

# Email (Resend)
RESEND_API_KEY=re_...

# Payments (Stripe)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Analytics (optional)
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-...
NEXT_PUBLIC_POSTHOG_KEY=phc_...
```
