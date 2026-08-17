# Analytics Setup — fremcoltd.com

## Google Analytics 4

### Environment Variable
Set in Vercel production (and local `.env`):
```
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

### Implementation
- Component: `web/src/components/analytics/GoogleAnalytics.tsx`
- Loaded via `next/script` with `strategy="afterInteractive"`
- Included in root layout

### Conversion Events

| Event | Trigger | Parameters |
|-------|---------|------------|
| `generate_lead` | Contact, quote, or product enquiry form success | `form_type`: contact \| quote \| newsletter |
| `sign_up` | Newsletter subscription success | `method`: newsletter |
| `click` | Outbound phone, WhatsApp, email links | `event_category`: outbound, `event_label`, `link_url` |

Outbound links use `data-track-outbound="phone|whatsapp|email"` attribute.

### Enhanced Measurement (GA4 Admin)
Enable in GA4 property settings:
- Scroll depth
- Outbound clicks (supplemental to custom tracking)
- Site search (if search usage grows)
- File downloads

## Google Search Console

1. Verify domain property for `fremcoltd.com` (covers www + apex)
2. Set preferred domain to **www**
3. Submit sitemap: `https://www.fremcoltd.com/sitemap.xml`
4. Connect to GA4: Admin → Product Links → Search Console

## Post-Deploy Checklist

- [ ] Confirm GA4 Realtime shows pageviews on production
- [ ] Submit test quote form — verify `generate_lead` in GA4 DebugView
- [ ] Confirm sitemap shows 85+ URLs in GSC
- [ ] Review Coverage report for errors after deploy
- [ ] Set up GSC email alerts for critical issues

## Sitemap Ping (Automated)

GitHub Action `seo-check.yml` pings Google and Bing sitemap endpoints on push to `main`.
