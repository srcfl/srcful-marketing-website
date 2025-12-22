# Sourceful Energy Website

A modern, multi-page Next.js website for Sourceful Energy - the hardware-first energy coordination platform. Built to showcase our unique value proposition against cloud-only competitors like Enode.

## 🚀 Key Features

### Marketing Site
- **Homepage** - Hero section highlighting hardware-first advantage, platform overview, customer logos, stats
- **Platform Overview** - Detailed comparison with cloud-only competitors, architecture breakdown
- **Product Pages** - Connect, Optimize, and Flex pages with feature details
- **Use Case Pages** - Targeted pages for Installers, OEMs, Energy Companies, and Developers
- **Pricing Page** - Clear pricing tiers and feature comparison
- **Company Pages** - About, Contact, Blog

### Developer Portal (World-Class)
- **API Reference** - Interactive documentation with code examples in multiple languages
- **Quickstart Guide** - Step-by-step tutorial to get developers building in minutes
- **Authentication Guide** - OAuth and API key documentation
- **Device Integration** - Guides for integrating specific device types
- **Code Examples** - Real-world implementations
- **Webhooks Documentation** - Event-driven architecture guide

### Design Highlights
- Clean, professional design inspired by Enode but with startup energy
- Consistent branding with Sourceful blue/purple gradients
- Responsive across all devices
- Dark mode code editors
- Interactive components
- Hardware USP emphasized throughout

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Animations**: Framer Motion (for advanced animations if needed)

## 📦 Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

The site will be available at `http://localhost:3000`

## 📁 Project Structure

```
sourceful-site/
├── app/                          # Next.js App Router pages
│   ├── page.tsx                  # Homepage
│   ├── platform/                 # Platform overview
│   ├── connect/                  # Connect product page
│   ├── optimize/                 # Optimize product page
│   ├── flex/                     # Flex/VPP product page
│   ├── use-cases/               # Use case pages by audience
│   │   ├── installers/
│   │   ├── oems/
│   │   ├── energy-companies/
│   │   └── developers/
│   ├── pricing/                  # Pricing page
│   ├── about/                    # Company/about page
│   ├── contact/                  # Contact sales page
│   └── developers/               # Developer portal
│       ├── api-reference/        # Interactive API docs
│       ├── quickstart/           # Getting started guide
│       ├── authentication/       # Auth documentation
│       ├── webhooks/             # Webhooks guide
│       ├── device-integration/   # Device guides
│       └── code-examples/        # Code samples
├── components/
│   ├── layout/                   # Navigation, Footer
│   ├── sections/                 # Reusable page sections
│   └── ui/                       # UI components
├── public/                       # Static assets
│   ├── images/
│   └── icons/
└── styles/                       # Global styles

```

## 🎨 Key Design Decisions

### Hardware-First Messaging
Every page emphasizes Sourceful's key differentiators:
- **Local control** - Works offline, no cloud dependency
- **Sub-100ms latency** - Edge processing eliminates round trips
- **Hardware security** - Cryptographic keys in secure hardware
- **No third-party APIs** - Direct device control

### B2B Focus
Content prioritizes professional audiences:
1. Installers & Wholesalers
2. OEMs & Device Manufacturers  
3. Energy Companies & Utilities
4. Developers & Engineers
5. Consumers (lower priority)

### Developer Experience
World-class developer portal inspired by Stripe, Twilio:
- Interactive API explorer
- Multi-language code examples (curl, JavaScript, Python)
- Copy-paste ready snippets
- Clear authentication flows
- Comprehensive error handling docs

## 🔧 Customization

### Colors
Primary brand colors are defined in `tailwind.config.js`:
- `sourceful-blue`: #0ea5e9
- `sourceful-purple`: #8b5cf6
- `sourceful-teal`: #14b8a6

### Content
- Product descriptions: Edit `/app/page.tsx` and product-specific pages
- API docs: Edit `/app/developers/api-reference/page.tsx`
- Customer logos: Replace in `/app/page.tsx` trusted-by section

### Navigation
Main navigation is in `/components/layout/Navigation.tsx`

## 📱 Pages to Complete

The following pages need content (use existing pages as templates):

1. **Connect** (`/app/connect/page.tsx`) - Device connectivity details
2. **Optimize** (`/app/optimize/page.tsx`) - Smart algorithms page
3. **Flex** (`/app/flex/page.tsx`) - VPP and grid services
4. **Use Cases** (all audience pages) - Customer-specific landing pages
5. **Pricing** (`/app/pricing/page.tsx`) - Pricing tiers and features
6. **About** (`/app/about/page.tsx`) - Company information
7. **Contact** (`/app/contact/page.tsx`) - Sales contact form
8. **Authentication** (`/app/developers/authentication/page.tsx`) - OAuth guide
9. **Webhooks** (`/app/developers/webhooks/page.tsx`) - Event documentation
10. **Device Integration** (`/app/developers/device-integration/page.tsx`) - Device guides
11. **Code Examples** (`/app/developers/code-examples/page.tsx`) - Sample implementations

## 🚢 Deployment

### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

### Traditional Hosting
```bash
npm run build
# Upload .next folder and package.json to server
npm ci --only=production
npm start
```

## 🎯 Next Steps

1. **Complete missing pages** - Use the templates provided as a starting point
2. **Add real customer logos** - Replace placeholder customer names with actual logos
3. **Integrate real API** - Connect API reference to live endpoint data
4. **Add analytics** - Google Analytics, Mixpanel, or Segment
5. **SEO optimization** - Meta tags, sitemaps, robots.txt
6. **Performance optimization** - Image optimization, lazy loading
7. **A/B testing** - Test different messaging variations
8. **Add blog** - Content marketing with Next.js MDX

## 📝 Content Guidelines

When completing pages:
- Lead with **hardware advantage** in every section
- Use **specific metrics** (sub-100ms, 99.9% uptime, etc.)
- Include **code examples** on technical pages
- Add **customer testimonials** where possible
- Keep paragraphs short and scannable
- Use **active voice** and clear CTAs

## 🤝 Contributing

This is an internal project. For questions or suggestions, contact the product team.

## 📄 License

Proprietary - Sourceful Labs © 2025
