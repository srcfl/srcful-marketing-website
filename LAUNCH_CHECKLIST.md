# Sourceful Marketing Site - Launch Checklist

## Completed Fixes ✅

### Security
- [x] Fixed XSS vulnerability in `brand-logo.tsx` (innerHTML → textContent)
- [x] Added security headers to `next.config.ts`:
  - Strict-Transport-Security (HSTS)
  - X-Content-Type-Options
  - X-Frame-Options
  - X-XSS-Protection
  - Referrer-Policy
  - Permissions-Policy
- [x] Enabled gzip compression

### SEO
- [x] Created `robots.txt`
- [x] Created dynamic `sitemap.ts` for all pages
- [x] Added SEO metadata for careers, about, community, pricing, contact, get-started pages
- [x] Enabled AVIF/WebP image formats

### Cleanup
- [x] Removed legacy design system documentation pages (`/app/components/`, `/app/docs/`, `/app/brand/`, `/app/changelog/`, `/app/roadmap/`)
- [x] Removed unused components (`feedback-dialog.tsx`, `feedback-button.tsx`, `component-nav.tsx`, etc.)
- [x] Removed "Video coming soon" placeholder sections from all pages
- [x] Deleted `components/video-placeholder.tsx`

---

## Pre-Launch To-Do List

### Critical (Do Before Launch)

#### 1. 301 Redirects ✅ DONE
Already added to `next.config.ts`:

**Page Redirects:**
| Old Route | New Route |
|-----------|-----------|
| `/connect-your-home` | `/use-cases/homeowners` |
| `/connect-your-solar-pv` | `/zap` |
| `/connect-your-vehicle` | `/v2x` |
| `/b2b` | `/use-cases/utilities` |
| `/app-downloads` | `/app` |

**Blog Post Redirects:**
| Old Slug | New Slug |
|----------|----------|
| `i-built-a-full-ai-ready-design-system-in-1.4-days.-with-ai` | `i-built-a-full-ai-ready-design-system-in-1-4-days-with-ai` |
| `how-stockholm-homeowners-are-saving-2-925-kr-...` | (same slug) |
| `stop-overpaying-for-electricity-how-to-save-...` | (same slug) |

#### 2. Update Vulnerable Dependency ✅ DONE
Removed `xlsx` package entirely. The negative prices calculator now only accepts CSV files, which is sufficient for most inverter export formats.

#### 3. Test All Forms
- [ ] Contact form submits correctly
- [ ] Waitlist form submits correctly
- [ ] Newsletter subscription works

#### 4. Verify External Integrations
- [ ] Mapbox token is valid for production domain
- [ ] Shopify storefront token works
- [ ] GitHub OAuth callback URL updated for production
- [ ] Intercom app ID is correct
- [ ] All analytics pixels configured (GA4, Meta, TikTok, Reddit, Clarity)

---

### High Priority (Week 1)

#### 5. Performance Optimizations ✅ DONE
- [x] Remove `unoptimized` flag from blog images (added `sizes` attribute instead)
- [x] Add width/height to `ZapImage` component (converted to Next.js Image)
- [x] Add `loading.tsx` files for route transitions (added for `/`, `/blog`, `/tools`)
- [x] Lazy-load Intercom (loads on first click, not page load)

#### 6. Move Token Storage to Production
- [ ] Replace in-memory token storage in `lib/admin-auth.ts` with Redis/database
- [ ] Same for newsletter rate limiting

#### 7. Create OG Images
- [ ] `/images/og/platform.png`
- [ ] `/images/og/zap.png`
- [ ] `/images/og/v2x.png`
- [ ] `/images/og/careers.png`
- [ ] `/images/og/pricing.png`

---

### Medium Priority (Week 2-4)

#### 8. Add Missing Translations ✅ DONE
- [x] `components/feedback-dialog.tsx` - added i18n with `useTranslations`
- [x] `components/search-command.tsx` - added i18n with `useTranslations`

#### 9. Optimize Client Components
Consider converting these "use client" pages to server components with client children:
- [ ] `/about` - mostly static
- [ ] `/contact` - only form needs client
- [ ] `/pricing` - mostly static

#### 10. Analytics Scripts ✅ DONE
Current load: 4 analytics scripts
- Google Analytics 4
- Meta Pixel
- TikTok Pixel
- Reddit Pixel

Removed Microsoft Clarity (was causing 422 errors).

---

## DNS & Domain Setup

### Required DNS Records
```
Type    Name    Value                   TTL
A       @       [Vercel IP]             300
CNAME   www     cname.vercel-dns.com    300
```

### Subdomain Configuration
Ensure these subdomains are configured:
- `support.sourceful.energy` → Intercom/help center
- `docs.sourceful.energy` → Documentation site
- `developer.sourceful.energy` → Developer portal
- `store.sourceful.energy` → Shopify store

---

## Environment Variables Checklist

Verify all env vars are set in Vercel:

```
# Required
NEXT_PUBLIC_MAPBOX_TOKEN=
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
AUTH_SECRET=

# E-commerce
NEXT_PUBLIC_SHOPIFY_DOMAIN=
NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN=

# Newsletter
MAILCHIMP_API_KEY=
MAILCHIMP_AUDIENCE_ID=

# Admin
ADMIN_SEO_PASSWORD=

# Analytics (client-side)
NEXT_PUBLIC_GA_MEASUREMENT_ID=
NEXT_PUBLIC_META_PIXEL_ID=
NEXT_PUBLIC_TIKTOK_PIXEL_ID=
NEXT_PUBLIC_REDDIT_PIXEL_ID=

# Support
NEXT_PUBLIC_INTERCOM_APP_ID=
```

---

## Post-Launch Monitoring

### Week 1
- [ ] Monitor Vercel Analytics for errors
- [ ] Check Google Search Console for crawl errors
- [ ] Verify sitemap is being indexed
- [ ] Test all redirects are working
- [ ] Monitor Core Web Vitals in PageSpeed Insights

### Ongoing
- [ ] Set up Lighthouse CI for automated performance monitoring
- [ ] Configure error alerting (Sentry or similar)
- [ ] Monitor form submission success rates

---

## Quick Reference - File Locations

| What | Where |
|------|-------|
| Security headers | `next.config.ts` |
| SEO metadata | `content/seo/metadata.json` |
| Sitemap | `app/sitemap.ts` |
| Robots | `public/robots.txt` |
| Translations | `messages/en.json`, `messages/sv.json` |
| Admin auth | `lib/admin-auth.ts` |
| Forms | `components/contact-form.tsx`, `components/waitlist-form.tsx` |
