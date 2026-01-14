# Sourceful Marketing Site

<!-- SOURCEFUL_PRINCIPLES_VERSION: 2026-01-09-v4 -->
<!-- ARCHITECTURE_VERSION: 2026-01-14 -->

This is the Sourceful Energy marketing website. Built with Next.js 16, TypeScript, and the `@sourceful-energy/ui` design system.

---

## Core Principles

### The Core Thesis

We build **local energy coordination infrastructure** — the Grid Intelligence Layer that gives utilities and homeowners actual control over distributed energy, at speeds cloud APIs can't match.

This is physics, not philosophy:
- Grid frequency must balance every second
- Cloud APIs respond in 2-5 seconds
- The gap is unbridgeable through software optimization

**Therefore: Local execution is the only architecture that works.**

### First Principles

1. **Physics Before Code** — Every technical decision starts with: "What does the physical system require?"
2. **Simple Over Clever** — If you're proud of how clever it is, simplify it.
3. **Local Over Cloud** — Default to local. Cloud is opt-in, not assumed.
4. **Robust Over Feature-Rich** — Ship something that works 100% before adding features.
5. **Open Over Proprietary** — Network effects, not lock-in.

### What Sourceful Is

- Local energy coordination infrastructure company
- Software company (NOT a hardware company)
- B2B infrastructure provider (90% utilities/partners, 10% community)
- Platform-only (partners sell hardware, we provide software)

### What We Don't Do

- Energy retail (conflict with utility partners)
- Hardware manufacturing for profit
- Cloud-dependent control paths
- Features before stability
- Closed ecosystems

---

## Architecture Overview

```
sourceful-marketing-site/
├── app/[locale]/           # Next.js App Router with i18n (en, sv)
├── components/             # React components (~118 files)
│   ├── ui/                 # Design system primitives
│   ├── calculators/        # Calculator tool components
│   ├── dashboard-showcase/ # Dashboard demo components
│   └── shop/               # Shopify cart integration
├── lib/                    # API clients and utilities
├── content/                # Static content (blog, changelog, SEO)
├── messages/               # i18n translations (en.json, sv.json)
├── public/                 # Static assets
└── middleware.ts           # i18n routing middleware
```

### Key Technologies

| Layer | Technology |
|-------|------------|
| Framework | Next.js 16.1.1 + React 19 |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 3.4 + @sourceful-energy/ui |
| i18n | next-intl (en, sv) |
| Auth | NextAuth 5 (GitHub OAuth) |
| Maps | Mapbox GL |
| E-commerce | Shopify Storefront API |
| Animations | Framer Motion + Lenis |

---

## Routes

### Marketing Pages
- `/` — Home (hero, dashboard showcase, pricing, FAQ)
- `/about` — About company
- `/platform` — Platform overview
- `/zap` — Zap gateway product
- `/v2x` — Vehicle-to-Grid
- `/get-started`, `/get-started/zap` — Onboarding

### Tools (Calculators)
- `/tools` — Tools hub
- `/tools/savings-calculator` — Savings calculator
- `/tools/solar-roi` — Solar ROI
- `/tools/battery-sizing` — Battery sizing
- `/tools/ev-charging` — EV charging
- `/tools/v2x-savings` — V2X savings
- `/tools/negative-prices` — Negative prices

### Content
- `/blog`, `/blog/[slug]` — Blog (MDX-based, i18n)
- `/integrations`, `/integrations/[brand]` — Integration pages
- `/use-cases/homeowners|utilities|oems|installers` — Use cases

### Other
- `/developers` — Developer portal
- `/contact` — Contact form
- `/roadmap` — Public roadmap (GitHub issues)
- `/changelog` — Changelog
- `/admin/*` — Admin panel (SEO management)

---

## Data Patterns

### Blog System
- **Location**: `content/blog/{locale}/` (MDX files)
- **Library**: `lib/blog.ts`
- **Features**: Categories, authors, i18n support

### Roadmap
- **Source**: GitHub Issues API (srcfl/srcful-design-system)
- **Library**: `lib/roadmap.ts` with Octokit
- **Features**: Voting via GitHub reactions

### Electricity Prices
- **Source**: Sourceful API via `/api/electricity-price`
- **Used by**: Calculator tools

### SEO
- **Storage**: `content/seo/metadata.json`
- **Admin**: AI-generated via `/admin/seo`

---

## External Integrations

### Shopify (`lib/shopify.ts`)
E-commerce for Zap gateway sales.
- `getProduct(handle, countryCode)`
- `createCheckout(lineItems, countryCode)`

### GitHub (`lib/github.ts`)
Feedback and roadmap voting.
- `createFeedbackIssue()`
- `addReaction()` / `removeReaction()`

### Other
- **Mailchimp** — Newsletter subscription
- **Mapbox** — Sites map visualization
- **Intercom** — Customer support chat

---

## Environment Variables

```env
# Required
NEXT_PUBLIC_MAPBOX_TOKEN=         # Sites map
GITHUB_CLIENT_ID=                 # Feedback/roadmap auth
GITHUB_CLIENT_SECRET=
AUTH_SECRET=                      # NextAuth secret

# E-commerce
NEXT_PUBLIC_SHOPIFY_DOMAIN=
NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN=

# Newsletter
MAILCHIMP_API_KEY=
MAILCHIMP_AUDIENCE_ID=

# Admin
ADMIN_SEO_PASSWORD=
```

---

## Development

```bash
npm install
npm run dev      # localhost:3000
npm run build    # Production build
npm run lint     # ESLint
```

---

## Design System Quick Reference

This project uses `@sourceful-energy/ui`. Full docs: https://design.sourceful.energy

### Common Imports
```tsx
import { Button, Card, Input, Badge, Dialog, Alert } from "@sourceful-energy/ui"
import { toast } from "sonner"
```

### Key Variants
```tsx
// Buttons
<Button>Primary</Button>
<Button variant="outline">Secondary</Button>
<Button variant="energy">Energy Action</Button>

// Badges
<Badge variant="energy">2.4 kWh</Badge>
<Badge variant="success">Online</Badge>

// Alerts
<Alert variant="success">...</Alert>
<Alert variant="energy">...</Alert>
```

### Design Tokens
- **Primary**: `sourceful-green-500` (#22c55e)
- **Accent**: `sourceful-yellow-400` (#facc15)
- **Font**: Satoshi (sans), JetBrains Mono (code)

### Colors (CSS Variables)
```tsx
className="text-foreground"        // Primary text
className="text-muted-foreground"  // Secondary text
className="bg-background"          // Page background
className="bg-card"                // Elevated surfaces
```

---

## Keeping This Updated

Update this file when you:
- Add new pages or routes
- Add new integrations
- Change data fetching patterns
- Add new environment variables

**PR checklist item**: "Does this change architecture? Update CLAUDE.md"

---

## Links

- **Live site**: https://sourceful.energy
- **Design system**: https://design.sourceful.energy
- **Design system repo**: https://github.com/srcfl/srcful-design-system
- **Management repo**: https://github.com/srcfl/management (principles source)
