# Sourceful Website - Setup & Deployment Guide

## 🎉 What You've Got

A complete, production-ready Next.js website featuring:

### ✅ Completed Pages
1. **Homepage** - Full hero, stats, products, use cases, and CTAs
2. **Platform Overview** - Cloud vs Hardware comparison, architecture breakdown
3. **API Reference** - Interactive documentation with code examples
4. **Quickstart Guide** - Step-by-step developer onboarding
5. **Pricing** - Three-tier pricing with detailed comparison table
6. **Contact** - Sales form with validation

### 📋 Pages to Complete (Templates Provided)
- Connect, Optimize, Flex product pages
- Use case pages (Installers, OEMs, Energy Companies, Developers)
- About/Company page
- Developer docs (Authentication, Webhooks, Device Integration, Code Examples)

## 🚀 Quick Start (5 minutes)

### Step 1: Install Dependencies
```bash
cd sourceful-site
npm install
```

### Step 2: Run Development Server
```bash
npm run dev
```

Open http://localhost:3000 in your browser.

### Step 3: Customize Content
Edit these files to match your branding:
- `/app/page.tsx` - Homepage content
- `/components/layout/Navigation.tsx` - Menu items
- `/components/layout/Footer.tsx` - Footer links
- `/tailwind.config.js` - Brand colors

## 📱 Project Structure

```
sourceful-site/
├── app/                          # Pages (Next.js App Router)
│   ├── page.tsx                  # ✅ Homepage
│   ├── platform/page.tsx         # ✅ Platform overview
│   ├── pricing/page.tsx          # ✅ Pricing page
│   ├── contact/page.tsx          # ✅ Contact form
│   ├── connect/                  # ⏳ To complete
│   ├── optimize/                 # ⏳ To complete
│   ├── flex/                     # ⏳ To complete
│   ├── use-cases/                # ⏳ To complete
│   │   ├── installers/
│   │   ├── oems/
│   │   ├── energy-companies/
│   │   └── developers/
│   ├── about/                    # ⏳ To complete
│   └── developers/               # Developer portal
│       ├── api-reference/page.tsx    # ✅ API docs
│       ├── quickstart/page.tsx       # ✅ Getting started
│       ├── authentication/           # ⏳ To complete
│       ├── webhooks/                 # ⏳ To complete
│       ├── device-integration/       # ⏳ To complete
│       └── code-examples/            # ⏳ To complete
├── components/
│   ├── layout/
│   │   ├── Navigation.tsx        # ✅ Main navigation
│   │   └── Footer.tsx            # ✅ Footer
│   ├── sections/                 # Reusable sections
│   └── ui/                       # UI components
└── public/                       # Static assets
```

## 🎨 Customization Guide

### 1. Update Brand Colors
Edit `tailwind.config.js`:
```javascript
colors: {
  sourceful: {
    blue: '#0ea5e9',      // Your primary blue
    purple: '#8b5cf6',     // Your secondary purple
    teal: '#14b8a6',       // Accent color
  },
}
```

### 2. Add Your Logo
Replace the placeholder logo in `components/layout/Navigation.tsx`:
```tsx
<Link href="/" className="flex items-center space-x-3">
  <img src="/images/logo.svg" alt="Sourceful" className="h-10" />
</Link>
```

### 3. Update Customer Logos
Edit the `customers` array in `/app/page.tsx`:
```typescript
const customers = [
  'Your Customer 1',
  'Your Customer 2',
  // Add your actual customer logos
]
```

### 4. Configure Navigation
Edit menu items in `/components/layout/Navigation.tsx`:
```typescript
const products = [
  { name: 'Your Product', href: '/your-product', description: '...' },
]
```

## 🔗 Integrations to Add

### 1. Form Handling (Contact Page)
Integrate with HubSpot, Salesforce, or your CRM:

```typescript
// In app/contact/page.tsx, replace the TODO:
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  
  // HubSpot example:
  const response = await fetch('https://api.hsforms.com/...', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData)
  })
  
  if (response.ok) {
    setSubmitted(true)
  }
}
```

### 2. Analytics
Add Google Analytics, Mixpanel, or Segment:

```typescript
// Create app/layout.tsx
<Script
  src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
  strategy="afterInteractive"
/>
```

### 3. Real API Integration
Connect the API Reference to your live API:

```typescript
// Fetch real endpoint data from your API
const endpoints = await fetch('https://api.sourceful.energy/docs/endpoints')
```

## 🌐 Deployment

### Current Setup: Vercel (Production Ready ✅)

The project is fully configured for automated deployments with Vercel.

#### How It Works
- **Production**: Push to `main` branch → Auto-deploys to production
- **Development**: Push to `dev` branch → Auto-deploys to preview environment
- **Pre-deployment checks**: Automatically run via GitHub Actions (ESLint, TypeScript, Build)

#### Domains
- **Dev**: `mkt-dev.sourceful.energy` (configured and working)
- **Prod**: `sourceful.energy` (configured in Vercel, DNS pending)

#### Git Configuration Required
Make sure your git author email matches your Vercel account:
```bash
git config user.email "your-email@sourceful-labs.com"
git config user.name "Your Name"
```

#### Manual Deployment (if needed)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

### Option 2: Docker
```dockerfile
# Dockerfile already configured
docker build -t sourceful-website .
docker run -p 3000:3000 sourceful-website
```

### Option 3: Traditional Hosting (Netlify, AWS, etc.)
```bash
# Build static export
npm run build

# Files are in .next folder
# Upload to your hosting provider
```

### Option 4: Self-Hosted
```bash
# On your server:
npm ci --only=production
npm run build
npm start

# Use PM2 for process management:
pm2 start npm --name "sourceful-web" -- start
```

## ✏️ Completing Remaining Pages

Each incomplete page should follow this structure:

```typescript
// Example: app/connect/page.tsx
import Link from 'next/link'
import { ArrowRight, Zap } from 'lucide-react'

export default function Connect() {
  return (
    <div className="min-h-screen bg-white pt-24">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-gray-900 to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-bold text-white mb-6">
            Your page title
          </h1>
          <p className="text-xl text-gray-300">
            Your description highlighting hardware advantage
          </p>
        </div>
      </section>

      {/* Content sections... */}
      
      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-blue-600 to-purple-700">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to get started?
          </h2>
          <Link
            href="/contact"
            className="px-8 py-4 bg-white text-gray-900 rounded-lg font-semibold hover:bg-gray-100"
          >
            Contact Sales
          </Link>
        </div>
      </section>
    </div>
  )
}
```

**Copy from existing pages:**
- Use Homepage for inspiration on layout and sections
- Use Platform page for comparison tables
- Use API Reference for technical documentation
- Use Quickstart for step-by-step guides

## 📊 Performance Optimization

### 1. Image Optimization
```typescript
// Use Next.js Image component
import Image from 'next/image'

<Image
  src="/images/your-image.jpg"
  width={800}
  height={600}
  alt="Description"
/>
```

### 2. Add Metadata for SEO
```typescript
// In each page.tsx
export const metadata = {
  title: 'Your Page Title | Sourceful Energy',
  description: 'Your page description for search engines',
  openGraph: {
    title: 'Your Page Title',
    description: 'Description for social sharing',
    images: ['/images/og-image.jpg'],
  },
}
```

### 3. Environment Variables
Create `.env.local`:
```
NEXT_PUBLIC_API_URL=https://api.sourceful.energy
HUBSPOT_API_KEY=your_key_here
GOOGLE_ANALYTICS_ID=GA_MEASUREMENT_ID
```

## 🧪 Testing Checklist

- [ ] Test all navigation links work
- [ ] Test contact form submission
- [ ] Verify mobile responsiveness on all pages
- [ ] Test API reference code copy buttons
- [ ] Check loading speeds (should be <2s)
- [ ] Validate all CTAs link correctly
- [ ] Test on multiple browsers (Chrome, Firefox, Safari)
- [ ] Verify all images load properly
- [ ] Check for console errors
- [ ] Test form validation

## 🐛 Troubleshooting

### Build Errors
```bash
# Clear Next.js cache
rm -rf .next
npm run dev
```

### Styling Issues
```bash
# Rebuild Tailwind
npm run build
```

### Module Not Found
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

## 📞 Need Help?

- **Documentation**: Check README.md for detailed docs
- **Questions**: Comment in the code or reach out
- **Issues**: Check console for error messages

## 🎯 Next Steps

1. **Week 1**: Complete remaining product pages (Connect, Optimize, Flex)
2. **Week 2**: Add use case pages for each audience
3. **Week 3**: Complete developer documentation pages
4. **Week 4**: Add real API integration and analytics
5. **Week 5**: Launch!

## ✨ Key Features to Highlight

When writing content, always emphasize:
1. **Hardware-first** - Local control, works offline
2. **Sub-100ms latency** - Edge processing
3. **Security** - Hardware keys, no third-party APIs
4. **Reliability** - 99.9% uptime, resilient architecture
5. **Developer-friendly** - Great docs, SDKs, examples

Remember: Every page should make the hardware advantage crystal clear!
