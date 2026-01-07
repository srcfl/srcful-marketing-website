# Sourceful Marketing Site Update Plan

**Created:** 2026-01-06
**Status:** Ready for review - answer questions below, then we implement

---

## 1. Platform Page Enhancements

### 1.1 Branding and Visuals
**Current state:** Basic platform page with text-heavy content describing the 3-layer architecture.

**Questions:**
- [ ] Do you have hero images/renders of the platform dashboard or architecture diagrams? Yes, use the dashboards that are on the home page - the actual code with dummy data so people can interact, rather than just boring image, you can also use elements from them for feature card etc, eg use a chart, table or component from one of the many examples on the home screen - but make sure they're repsonsive for mobile. We can also use these images for heroes - I want to animate them eventually but let's used these as placeholder: /Users/paulcooper/Documents/Repos/sourceful-marketing-site/public/images/dark-mode
/Users/paulcooper/Documents/Repos/sourceful-marketing-site/public/images
- [ ] What style of animation? (Subtle micro-interactions vs bold motion graphics) - subtle micro animations, like hovers but also using the animated icons that we use on the design system home page, there's 3 there now, but we can use the whole set from https://www.itshover.com/icons
- [ ] Should we use Lottie animations, CSS animations, or video backgrounds? I prefer CSS, but we can also use lottie and video. Can you make lotties? Leave placeholders for video, we can do that later. Don't make any lotties, we can do that later.
- [ ] Any specific color treatments beyond the green/yellow brand palette? Keep colours to a minimum, just use the greens for accents, respect the dark and light theme. Use soft variants of components.

### 1.2 Mapbox Integration
**Current state:** Homepage has a map example but key may be missing/placeholder. 

**Questions:**
- [ ] Do you have a Mapbox API key ready? (I can set up env variable) They key is in the ENV file now NEXT_PUBLIC_MAPBOX_TOKEN=pk.eyJ1IjoiMHhjb29wcyIsImEiOiJjbWpweWJyNTMwbTgyM2hzY3FxOHV2eDJpIn0._AwdEmmC-NqNHQDd8n0utw

- [ ] What should the map show? (Device locations, grid zones, partner coverage?) Just use the existing map from the home page
- [ ] Interactive or static visualization? Interactive
- [ ] Any specific map style preference? (Dark/light/satellite) dark and light

### 1.3 Rewards & Crypto Differentiator
**Current state:** Not prominently featured - this is a gap given it's your differentiator.

**Questions:**
- [ ] What's the token/reward mechanism called? (SRC token? Energy credits?) We currently offer reward points, which will later make the holders elligible for some form of rewards. We've not decided if it's a voucher, stablecoin or our own token yet so we need to keep it vague.
- [ ] How do users earn rewards? (Grid services, flexibility, data sharing?) Currently just for connecting their DERs to Sourceful with a Zap. But we plan to adjust how points are earned based on multiple factors, including the ones you mentioned, but nothing solid yet so keep it vague but compelling. No lies though!
- [ ] Any existing explainer content, diagrams, or tokenomics docs I can reference? No
- [ ] Should this be a dedicated section on Platform page, or its own page? It needs to be kept minimal, for consumers its an extra benefit, for B2B it's an add-on loyalty or rewards system for their customers, for installers it's a potential extra source of income.
- [ ] Wallet integration mentioned anywhere? Web3 connections? We use Privy to keep the wallet side abstracted so users don't need to be crypot savvy, they don't need a wallet, we create one, but again, let's keep this side of things to a min, a mere mention.
- [ ] Any compliance/regulatory language needed around crypto? Yes probably, not investment advice, no promise of returns etc etc maybe something in the footer?

### 1.4 Partner Logos
**Questions:**
- [ ] Can you provide partner logo files? (SVG preferred) Yes  /Users/paulcooper/Documents/Repos/sourceful-marketing-site/public/images/partner-logos
- [ ] Which partners to feature? (Kalmar Energi, NRGi, Elkedjan mentioned in site) Yes all those mentioned, here's the logos: /Users/paulcooper/Documents/Repos/sourceful-marketing-site/public/images/partner-logos
- [ ] Any hardware partners? (Inverter brands, battery manufacturers) Yes, check the logo files:  /Users/paulcooper/Documents/Repos/sourceful-marketing-site/public/images/partner-logos
- [ ] Logo usage permissions confirmed? Yes
- [ ] Tiered display? (Featured partners vs integration partners) Home page can show a slowly moving looping carousel of all logos - then show relevant logos on relevant pages

### 1.5 Swedish Translation
**Questions:**
- [ ] Full site translation or just key marketing pages? Full translation of all pages: English as default, Swedish next.
- [ ] Do you have Swedish copy already, or need translation? Needs translating, you do it, I'll get a Swede to check it, make it easy to update with Claude - a lang file?
- [ ] URL structure preference? (`/sv/platform` vs `platform?lang=sv` vs `sourceful.se`) use /sv/platform
- [ ] Which pages are priority? (I assume: Home, Platform, Zap, Use Cases) yes start there then do every page
- [ ] Any Swedish-specific content differences? (Local regulations, pricing in SEK) Use € on English, kr on Swedish

---

## 2. E-commerce & Lead Generation Pipeline

### 2.1 Bulk Sales Flow
**Questions:**
- [ ] What's the current sales process for bulk orders? (Form → Sales call?) Form and sales call
- [ ] Volume tiers? (10+, 100+, 1000+ units?) yes and 500
- [ ] Should bulk pricing be visible or "contact us"? Contact us
- [ ] Any existing CRM integration? (HubSpot, Salesforce, Pipedrive?) No, we use formspark for forms, I can create you form IDs, and mailchimp for newsletter sign ups
- [ ] Payment: Invoicing only, or card payments for smaller bulk orders? Invoicing only

### 2.2 Bulk Onboarding Tools
**Questions:**
- [ ] What does bulk onboarding look like? (CSV upload, API provisioning?) I don't know yet, let's forget bulk onboarding
- [ ] Is this a self-service tool or admin-assisted? I don't know yet, let's forget bulk onboarding
- [ ] Where does this live? (Dashboard, separate portal?) I don't know yet, let's forget bulk onboarding
- [ ] Any existing documentation or mockups? I don't know yet, let's forget bulk onboarding

### 2.3 API Limits & Upgrades
**Questions:**
- [ ] What are the current API tiers? (Free, Pro, Enterprise?) I don't know yet, let's make something up that sounds reasonable
- [ ] Rate limits per tier? Yes, let's make something up that sounds reasonable
- [ ] Upgrade flow: Self-service or sales-assisted? Sales assisted for now, but I want to mock up self-service
- [ ] Should pricing be public or "contact us"? Public for set tiers plus a call us for Enterprise scale
- [ ] Stripe integration for subscriptions? Yes, we use rev cat too, let's mock it for now, I can give you stripe and rev cat details later

---

## 3. Dashboard & Use Case Components

### 3.1 VPP Dashboard Components
**Questions:**
- [ ] Do you have VPP dashboard mockups or screenshots? No, you need to design one, based on our dashboard examples on the home page. Let's dig into the details later.
- [ ] Key metrics to show? (Aggregate capacity, dispatch events, revenue?) Sounds good, think of more. we can work together on it.
- [ ] Target audience for VPP content? (Utilities, aggregators?) Yes, and maybe policy makers?
- [ ] Any existing VPP explainer content? Not really, look at companies like fuse energy, and daylight and enode, copy the best best ideas we can polish later.

### 3.2 Installer Dashboard
**Questions:**
- [ ] What do installers need to see? (Customer sites, installations, commissions?) Yes all of those, look at the dashboard examples on the home screen
- [ ] Any installer portal already built? No, but we could easily build it. I want to build out the dev portal after this site is done, and maybe add an installer portal too, so let's fake it for now
- [ ] White-label considerations? Yes, promote white label options for installers: web app, native app maybe? training and support options too.

### 3.3 Utility Dashboard
**Questions:**
- [ ] Similar to VPP or different focus? A different focus, maybe more about customer loyalty and customer incentives but also VPP, need to think of the use cases and build for their needs. Help me.
- [ ] Grid flexibility visualization needs? Yes
- [ ] Integration with existing utility systems mentioned? Yes, we integrate or provide end to end solutions, whatever they prefer.

### 3.4 App Page
**Questions:**
- [ ] Is there a mobile app? (iOS/Android) Yes  https://sourceful.energy/app-downloads
- [ ] App Store links? https://sourceful.energy/app-downloads
- [ ] Screenshots/mockups available? https://sourceful.energy/app-downloads here, but add placeholders, we can add more later, but maybe we keep it simple so we dont' have to keep updating it with every release.
- [ ] Feature highlights for the app? Onboarding, data viz, EMS - all the core platform features
- [ ] Or is this about the web app/dashboard? - its about the native app, but we should also have a web app landing page - it's not finished yet but you can refer to our github project srcful-builder.

---

## 4. Calculators & Free Tools

### 4.1 Savings Calculator (Homeowners)
**Questions:**
- [ ] What inputs? (Location, consumption, solar size, battery, EV?) You decide
- [ ] What outputs? (Annual savings, payback period, CO2 reduction?) You decide
- [ ] Any existing calculator logic or spreadsheet I can reference? Yes - check the github for similar projects or make a good guess
- [ ] Country-specific? (Sweden first, then expand?) Just Sweden
- [ ] Electricity price data source? (API or manual input?) Use our API, check the dev portal in github for details
- [ ] Lead capture at end of calculation? Yes, enter email and maybe name via a new formspark form, I can give you a formspark ID

### 4.2 Other Calculators / SEO Tools
**Questions:**
- [ ] Any keyword research done on what people search for?
- [ ] Ideas I'm thinking:
  - Solar panel ROI calculator - Yes!
  - Battery sizing calculator - Yes!
  - EV charging cost calculator - Yes!
  - Grid export earnings calculator - Yes!
  - V2X savings estimator - Yes!
  Add negative price analyser - there's one in our github repo
- [ ] Which would be highest value for lead gen? All of them
- [ ] Gated (email required) or ungated? gated, enter email and maybe name via a new formspark form, I can give you a formspark ID

---

## 5. Visual & Animation Upgrades

### 5.1 Data & Control Components (Use Case Pages)
**Questions:**
- [ ] What kind of visualizations? (Real-time charts, device status, energy flows?) Yes - reuse components from the dashboard examples on the home page and maybe make new ones that are elevant to the use case
- [ ] Any specific animations in mind? (Energy flowing, devices responding?) They are good ideas, more like that
- [ ] Video content available? (Product demos, installations?) Not yet - leave placeholders for a few videos for later
- [ ] Should these be interactive or illustrative? - always use code, with detailed realistic data thats interactive

### 5.2 Header Animations
**Questions:**
- [ ] Hero section animations? (Parallax, particle effects, gradient motion?) Use these images /Users/paulcooper/Documents/Repos/sourceful-marketing-site/public/images/dark-mode
/Users/paulcooper/Documents/Repos/sourceful-marketing-site/public/images as the base, or inspiration. I like the idea of particle effects and text reveals, but let's keep that to a minimum now, we'll work on each page indivually later. 
- [ ] Reference sites you like the feel of? wingbits
- [ ] Performance considerations? (Keep it light for mobile?) yes
- [ ] Should headers have video backgrounds? no

### 5.3 Animated Text & Page Transitions
**Questions:**
- [ ] Text reveal animations? (Fade in, typewriter, split text?) Subtle, smooth and not too fast. Reveal on page scroll or page load
- [ ] Page transitions? (Fade, slide, morphing elements?) slide in like www.sourceful.energy
- [ ] Section scroll animations? (Reveal on scroll?) yes nice
- [ ] Any sites with animation style you like? 
- [ ] Note: We have Framer Motion installed, ready to go

### 5.4 Icon Animations
**Questions:**
- [ ] Animated Lucide icons or custom Lottie animations? https://www.itshover.com/icons
- [ ] Where specifically? (Feature lists, benefits sections?) Yes, animate on reveal, hover or just loop based on position and section design
- [ ] Hover states or load animations? both

---

## 6. Lead Capture & Conversion

### 6.1 Lead Capture Forms
**Questions:**
- [ ] What fields to capture? (Email only? Name + email? Company?) start with those
- [ ] Where should forms appear? (End of pages, sidebar, popups?) end of pages
- [ ] Lead magnet ideas? (Whitepaper, calculator results, early access?) yes, calculator results
- [ ] CRM/email tool integration? (HubSpot, Mailchimp, ConvertKit?) Mailchimp and formspark for now
- [ ] GDPR consent handling? Yes, we need a cookie pop-up and store IP and date of acceptance, and if they decline, don't use the cookies they declined.

### 6.2 Replace Email Links
**Current state:** Contact page has forms but some pages may have mailto: links. yes we need remove mail links, direct them to the contact page form.

**Questions:**
- [ ] Intercom or similar chat widget? (Do you have an account?) Yes we have intercom chat
- [ ] Which social channels to prioritize? (Discord seems active for devs) Discord, X, LinkedIn, Youtube
- [ ] Should chat be on all pages or specific ones? yes I suppose
- [ ] Support hours / expectations for chat? 9-5pm weekdays

### 6.3 A/B Testing & Campaign Pages
**Questions:**
- [ ] A/B testing tool preference? (Vercel, Optimizely, PostHog, custom?) Forget it for now, but we might add later
- [ ] What elements to test? (Headlines, CTAs, pricing display?) Forget it for now, but we might add later
- [ ] Campaign landing pages: What campaigns are planned? Forget it for now, but we might add later
- [ ] How many variants typically? Forget it for now, but we might add later
- [ ] Analytics setup? (GA4, Plausible, PostHog?) GA4

### 6.4 V2X Waitlist
**Questions:**
- [ ] Is V2X a separate product or feature of The Zap? It's a feature of the Zap but only works with our tested partner chargers.
- [ ] Waitlist incentive? (Early access, discount, priority?) Early access
- [ ] Launch timeline to mention? (Or keep it vague?) Keep it vague, very soon this year
- [ ] Separate landing page or section on existing page? Both
- [ ] Integration with email tool for waitlist management? Yes, Formspark I'll supply code later.

---

## 7. Brand Partner Landing Pages

### 7.1 Hardware Brand Pages (SolarEdge, GoodWe, etc.)
**Questions:**
- [ ] Which brands to start with? Priority order? Work through the logo files, thats the list /Users/paulcooper/Documents/Repos/sourceful-marketing-site/public/images/partner-logos
- [ ] Content for each: Integration guide? Compatibility? Setup steps? Keep it light for now, just create a template for each and then explain the benefits of sourceful to owners of the respective inverter/battery/charger and a strong CTA to buy a Zap maybe include a use case example, highlight the multi-brand operability
- [ ] Co-marketing arrangements with these brands? None really but we have permission
- [ ] SEO play: "SolarEdge smart home integration" etc? yes
- [ ] Template approach (same structure, different brand) or custom per brand? Template for now
- [ ] Partner logo/asset usage rights confirmed? Yes
- [ ] Brands mentioned in your current integrations:
  - SolarEdge
  - GoodWe
  - Huawei
  - Fronius
  - SMA
  - Enphase
  - Tesla
  - Others? See here /Users/paulcooper/Documents/Repos/sourceful-marketing-site/public/images/partner-logos

---

## 8. Technical Implementation Notes

### What's Already in Place
- Next.js 16 with App Router
- Tailwind CSS + Sourceful Design System
- Framer Motion for animations
- Mapbox GL installed
- Dark mode support
- Mobile responsive
- Contact form working

### What We'll Need to Set Up
- [ ] Environment variables for API keys (Mapbox, analytics, etc.)
- [ ] CRM/email integration
- [ ] Chat widget (if using Intercom)
- [ ] A/B testing infrastructure
- [ ] i18n for Swedish translation
- [ ] Additional analytics events

---

## Priority Suggestions (My Take)

**High Impact, Lower Effort:**
1. Partner logos (just need assets)
2. V2X waitlist (simple form + landing section)
3. Replace email links with forms
4. Header animations (Framer Motion ready)

**High Impact, Medium Effort:**
5. Rewards/crypto section (need content)
6. Savings calculator (need formula)
7. Brand partner pages (template approach)

**Higher Effort:**
8. Swedish translation (need copy)
9. E-commerce/bulk sales flow (need requirements)
10. VPP/Installer dashboards (need designs)
11. A/B testing infrastructure

---

## Next Steps

1. **You:** Answer questions above (add links, files, context in comments)
2. **You:** Mark priorities (must-have vs nice-to-have)
3. **Me:** Start implementing based on your answers
4. **Iterate:** Review, refine, ship

---

*Leave your answers below each question, or paste additional context at the bottom of this file. See you in the morning!*

---

## Your Notes & Answers

<!-- Add your responses here -->


