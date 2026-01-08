# Sourceful Marketing Site Update Plan

**Created:** 2026-01-06
**Updated:** 2026-01-08
**Status:** ✅ Phase 1 & Phase 7 complete

---

## Implementation Roadmap

Based on your answers, here's the prioritized implementation plan:

### Phase 1: Foundation ✅ COMPLETE
1. [x] **Partner Logo Carousel** - `partner-logo-carousel.tsx`
2. [x] **Swedish Translation (i18n)** - `[locale]` folder structure
3. [x] **Replace mailto: links** - Only intentional ones remain (contact emails, investor)
4. [x] **GDPR Cookie Banner** - `cookie-consent.tsx`
5. [x] **V2X Waitlist** - `/v2x` page with `WaitlistForm`

### Phase 2: Platform Page Enhancements
6. [ ] **Interactive Dashboard Hero** - Reuse homepage components
7. [ ] **Animated Icons** - Integrate itshover.com icons with CSS animations
8. [ ] **Rewards Section** - Vague but compelling (points → future rewards)
9. [ ] **Scroll Animations** - Framer Motion reveals

### Phase 3: Integration/Brand Pages
10. [ ] **Brand Page Template** - One template, 17 brands
11. [ ] **SEO Optimization** - "SolarEdge smart home integration" etc.

### Phase 4: Calculators & Tools
12. [ ] **Savings Calculator** - Sweden-focused, email-gated
13. [ ] **Battery Sizing Calculator**
14. [ ] **EV Charging Cost Calculator**
15. [ ] **Solar ROI Calculator**
16. [ ] **Grid Export Earnings Calculator**
17. [ ] **Negative Price Analyzer** - Port from GitHub repo

### Phase 5: Dashboard Mockups
18. [ ] **VPP Dashboard** - For utilities/aggregators
19. [ ] **Installer Portal Mockup** - White-label options
20. [ ] **Utility Dashboard** - Customer loyalty focus

### Phase 6: E-commerce
21. [ ] **API Pricing Page** - Public tiers + Enterprise contact
22. [ ] **Bulk Sales Flow** - Form + sales-assisted

### Phase 7: Content Migration & New Pages ✅ COMPLETE
23. [x] **Blog Migration** - Migrated 30 articles from sourceful.energy/blog
    - 30 English articles, 29 Swedish articles
    - Authors: Fredrik Ahlgren (9), Viktor Olofsson (15), Paul Cooper (1), Johan Leitet (2), Sourceful Team (3)
    - Includes: images, categories, SEO tags, author info
    - Files: `content/blog/en/*.mdx`, `content/blog/sv/*.mdx`
    - Scripts: `scripts/migrate-blog.mjs`, `scripts/cleanup-blog.mjs`
24. [x] **Blog Index Page** - Categories, filtering, featured post
    - Files: `app/[locale]/blog/page.tsx`, `app/[locale]/blog/[slug]/page.tsx`
    - Lib: `lib/blog.ts`
25. [x] **Get Started Guides** - 3 pages (selector + 2 setup guides)
    - `/get-started` - Device selection (P1 meter vs Inverter)
    - `/get-started/zap` - 6-step P1 meter setup guide
    - `/get-started/zap-for-inverters` - 6-step inverter setup guide
26. [x] **B2B Content Integration** - Added to homepage
    - New "Universal Connectivity Layer" section on homepage
    - Features: Resilient Edge Connectivity, Zero OEM Dependence, Sovereign Data, Unified API
    - Translations: EN + SV
27. [x] **Developer Use Case Page** - Already existed at `/developers`
    - SDKs, APIs, webhooks, real-time event streams
    - Developer Portal CTA
    - Integration examples

---

## Decisions Summary

| Topic | Decision |
|-------|----------|
| **Animations** | CSS preferred, subtle micro-interactions, itshover.com icons |
| **Colors** | Minimal - greens for accents, soft variants, respect themes |
| **Maps** | Mapbox key ready, reuse homepage map |
| **Rewards** | Keep vague - "reward points" → future rewards (token/voucher/stablecoin TBD) |
| **Wallets** | Privy abstraction, users don't need crypto knowledge |
| **Translation** | Full site, /sv/ URLs, € English / kr Swedish |
| **Forms** | Formspark for forms, Mailchimp for newsletters |
| **Chat** | Intercom (9-5 weekdays) |
| **Analytics** | GA4 |
| **Payments** | Stripe + RevCat (mock for now) |
| **API Tiers** | Free/Pro/Enterprise - sales-assisted upgrades |

---

## Available Assets

### Partner Logos (17 brands, dark/light variants)
**Inverters/Solar:** SolarEdge, Fronius, Huawei, Solis, SolaX, Sungrow, Deye, SMA, Ferroamp
**Batteries:** Pixii
**EV Chargers:** ChargeAmps, Easee, Zaptec, Ambibox
**Utility Partners:** Kalmar Energi, NRGi, Elkedjan

### Dashboard Components (ready to reuse)
- `analytics-dashboard.tsx` - Charts and metrics
- `ems-dashboard.tsx` - Energy management
- `fleet-dashboard.tsx` - Multi-site management
- `energy-monitor.tsx` - Real-time monitoring
- `sites-overview.tsx` - Site cards/list
- `savings-rewards.tsx` - Points and savings

### Hero Images
`/public/images/dark-mode/` and `/public/images/light-mode/`:
- control.svg, globe.svg, infra.svg, order.svg, pattern.svg, sphere.svg

---

## Detailed Reference (from Q&A)

<details>
<summary><strong>1. Platform Page Enhancements</strong></summary>

### 1.1 Branding and Visuals
- **Hero visuals:** Reuse interactive dashboard components from homepage (responsive for mobile)
- **Hero images:** `/public/images/dark-mode/` and `/public/images/light-mode/` (control, globe, infra, order, pattern, sphere SVGs)
- **Animation style:** Subtle CSS micro-interactions + itshover.com animated icons
- **Video:** Leave placeholders, add later
- **Colors:** Minimal - greens for accents, respect dark/light themes, soft component variants

### 1.2 Mapbox Integration
- **API key:** Ready in `.env` as `NEXT_PUBLIC_MAPBOX_TOKEN`
- **Content:** Reuse existing homepage map
- **Interactivity:** Interactive, dark/light theme support

### 1.3 Rewards & Crypto
- **Mechanism:** "Reward points" (vague - future rewards TBD: voucher/stablecoin/token)
- **Earning:** Currently for connecting DERs via Zap (future: multiple factors - keep vague)
- **Positioning:**
  - Consumers: Extra benefit
  - B2B: Add-on loyalty/rewards for their customers
  - Installers: Potential extra income
- **Wallets:** Privy abstraction (users don't need crypto knowledge)
- **Compliance:** Add disclaimer in footer (not investment advice, no promise of returns)

### 1.4 Partner Logos
- **Location:** `/public/images/partner-logos/dark-mode/` and `light-mode/`
- **Display:** Slow-moving looping carousel on homepage, relevant logos on relevant pages
- **Permissions:** Confirmed

### 1.5 Swedish Translation
- **Scope:** Full site translation
- **URL structure:** `/sv/platform`
- **Currency:** € for English, kr for Swedish
- **Priority:** Home, Platform, Zap, Use Cases first, then all pages
- **Format:** Language files for easy updates

</details>

<details>
<summary><strong>2. E-commerce & Lead Generation</strong></summary>

### 2.1 Bulk Sales Flow
- **Process:** Form → Sales call
- **Tiers:** 10+, 100+, 500+, 1000+ units
- **Pricing:** "Contact us" (invoicing only)
- **Tools:** Formspark (forms), Mailchimp (newsletters)

### 2.2 Bulk Onboarding
- **Status:** Deferred - not implementing now

### 2.3 API Limits & Upgrades
- **Tiers:** Free / Pro / Enterprise (make up reasonable limits)
- **Pricing:** Public for Free/Pro, "Contact us" for Enterprise
- **Upgrade flow:** Sales-assisted (mock self-service UI)
- **Payments:** Stripe + RevCat (mock for now)

</details>

<details>
<summary><strong>3. Dashboard & Use Case Components</strong></summary>

### 3.1 VPP Dashboard
- **Design:** Based on homepage dashboard examples
- **Metrics:** Aggregate capacity, dispatch events, revenue, + more
- **Audience:** Utilities, aggregators, policy makers
- **Research:** Look at Fuse Energy, Daylight, Enode for inspiration

### 3.2 Installer Dashboard
- **Features:** Customer sites, installations, commissions
- **Status:** Fake/mockup for now
- **White-label:** Promote web app, native app, training, support options

### 3.3 Utility Dashboard
- **Focus:** Customer loyalty, incentives, VPP features
- **Features:** Grid flexibility visualization, integration options

### 3.4 App Page
- **App:** iOS/Android at https://sourceful.energy/app-downloads
- **Screenshots:** Keep simple, use placeholders (avoid frequent updates)
- **Features:** Onboarding, data viz, EMS
- **Also needed:** Web app landing page (refer to srcful-builder GitHub)

</details>

<details>
<summary><strong>4. Calculators & Free Tools</strong></summary>

### All Calculators
- **Country:** Sweden only
- **Lead capture:** Email + name via Formspark (gated)
- **Data source:** Sourceful API (check dev portal)

### Calculators to Build
1. **Savings Calculator** - Homeowner-focused
2. **Solar ROI Calculator**
3. **Battery Sizing Calculator**
4. **EV Charging Cost Calculator**
5. **Grid Export Earnings Calculator**
6. **V2X Savings Estimator**
7. **Negative Price Analyzer** - Port from GitHub repo

</details>

<details>
<summary><strong>5. Visual & Animation Upgrades</strong></summary>

### 5.1 Data Components
- **Approach:** Reuse homepage dashboard components, create new as needed
- **Style:** Interactive code with realistic data
- **Video:** Leave placeholders for later

### 5.2 Header Animations
- **Base:** Hero images from `/public/images/`
- **Style:** Minimal particle effects, text reveals (work on individually later)
- **Reference:** wingbits
- **Performance:** Keep light for mobile, no video backgrounds

### 5.3 Text & Page Transitions
- **Text:** Subtle, smooth fade reveals on scroll/load
- **Pages:** Slide transitions (like current sourceful.energy)
- **Scroll:** Reveal on scroll
- **Tool:** Framer Motion (installed)

### 5.4 Icons
- **Source:** https://www.itshover.com/icons
- **Animation:** On reveal, hover, or loop based on context
- **States:** Both hover and load animations

</details>

<details>
<summary><strong>6. Lead Capture & Conversion</strong></summary>

### 6.1 Lead Forms
- **Fields:** Email, name, company (start simple)
- **Placement:** End of pages
- **Lead magnet:** Calculator results
- **Tools:** Formspark + Mailchimp
- **GDPR:** Cookie popup with IP + date storage, respect declined cookies

### 6.2 Contact Methods
- **Action:** Remove all mailto: links → contact page forms
- **Chat:** Intercom on all pages (9-5pm weekdays)
- **Social:** Discord, X, LinkedIn, YouTube

### 6.3 A/B Testing
- **Status:** Deferred for now
- **Analytics:** GA4

### 6.4 V2X Waitlist
- **Product:** Feature of Zap (works with tested partner chargers)
- **Incentive:** Early access
- **Timeline:** Keep vague ("very soon this year")
- **Pages:** Both dedicated landing page AND section on existing page
- **Form:** Formspark

</details>

<details>
<summary><strong>7. Brand Partner Landing Pages</strong></summary>

### Template Approach
- **Brands:** All 17 from partner logos folder
- **Content:** Light - benefits of Sourceful for [brand] owners, strong Zap CTA, use case example, multi-brand operability
- **SEO:** "[Brand] smart home integration" keywords
- **Permissions:** Confirmed

### Brands (from logo files)
**Inverters/Solar:** SolarEdge, Fronius, Huawei, Solis, SolaX, Sungrow, Deye, SMA, Ferroamp
**Batteries:** Pixii
**EV Chargers:** ChargeAmps, Easee, Zaptec, Ambibox
**Utility Partners:** Kalmar Energi, NRGi, Elkedjan

</details>

<details>
<summary><strong>8. Technical Implementation</strong></summary>

### Already in Place
- Next.js 16 with App Router
- Tailwind CSS + Sourceful Design System
- Framer Motion
- Mapbox GL
- Dark mode
- Mobile responsive
- Contact form

### To Set Up
- [x] Mapbox API key (in .env)
- [ ] Formspark form IDs
- [ ] Mailchimp integration
- [ ] Intercom chat widget
- [ ] i18n for Swedish
- [ ] GA4 events
- [ ] GDPR cookie consent

</details>

---

## What's Next?

**Phase 1 & Phase 7 complete!** Ready for Phase 2 (Platform Page Enhancements):

1. **Interactive Dashboard Hero** - Reuse homepage components
2. **Animated Icons** - Integrate itshover.com icons with CSS animations
3. **Rewards Section** - Vague but compelling (points → future rewards)
4. **Scroll Animations** - Framer Motion reveals

### Phase 7 Summary (Completed)
- ✅ Blog migrated: 30 EN + 29 SV articles with authors, categories, images
- ✅ Blog index page with filtering and featured posts
- ✅ Get Started guides: 3 pages (device selector + P1 meter + Inverter setup)
- ✅ B2B content: "Universal Connectivity Layer" section added to homepage
- ✅ Developer use case page already existed


