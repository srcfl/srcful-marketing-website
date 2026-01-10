import { NextRequest, NextResponse } from "next/server";

// SEO-optimized templates based on search intent for each page
const SEO_TEMPLATES: Record<string, { title: string; description: string; keywords: string[] }> = {
  "/": {
    title: "Smart Home Energy Management & Optimization Platform",
    description: "Connect your solar, battery, and EV charger to save money automatically. Real-time optimization, grid services, and rewards for distributed energy resources.",
    keywords: ["smart home energy", "energy management", "solar optimization", "home battery", "EV charging"]
  },
  "/platform": {
    title: "Energy Coordination Platform for DER Management",
    description: "Real-time coordination of distributed energy resources with 200ms local execution. Connect inverters, batteries, and EV chargers to one unified platform.",
    keywords: ["DER management", "energy platform", "distributed energy", "grid coordination", "energy API"]
  },
  "/zap": {
    title: "Zap Energy Gateway - Connect Any Solar or Battery",
    description: "Universal energy gateway that connects your solar inverter, home battery, or EV charger to smart optimization. Works with SolarEdge, Fronius, Huawei, and more.",
    keywords: ["energy gateway", "solar monitor", "Zap", "inverter connection", "battery monitor"]
  },
  "/v2x": {
    title: "V2X Vehicle-to-Grid & Vehicle-to-Home Charging",
    description: "Turn your EV into a home battery with bidirectional charging. Charge when electricity is cheap, power your home during peak prices, earn from grid services.",
    keywords: ["V2X", "vehicle to grid", "V2G", "V2H", "bidirectional charging", "EV battery"]
  },
  "/developers": {
    title: "Energy API & Developer Tools for Smart Grid Apps",
    description: "Build energy applications with our REST API, webhooks, and SDKs. Access real-time solar, battery, and grid data. Free tier available for developers.",
    keywords: ["energy API", "developer SDK", "smart grid API", "energy data", "IoT energy"]
  },
  "/use-cases/homeowners": {
    title: "Home Energy Management - Cut Bills & Earn Rewards",
    description: "Automate your home energy to save on electricity bills. Smart solar optimization, battery scheduling, and EV charging based on real-time prices.",
    keywords: ["home energy savings", "reduce electricity bill", "solar savings", "smart home energy"]
  },
  "/use-cases/utilities": {
    title: "Utility DER Management & Virtual Power Plant Platform",
    description: "Coordinate thousands of distributed energy resources in real-time. 200ms local execution for grid flexibility, demand response, and VPP services.",
    keywords: ["utility DER", "virtual power plant", "VPP", "grid flexibility", "demand response"]
  },
  "/use-cases/installers": {
    title: "Solar Installer Platform - White-Label Energy Apps",
    description: "Offer customers ongoing value with branded monitoring apps. Track installations, earn recurring revenue, and differentiate your solar business.",
    keywords: ["solar installer", "white-label app", "installer portal", "solar monitoring"]
  },
  "/use-cases/oems": {
    title: "OEM Energy Integration - Embedded Connectivity",
    description: "Pre-integrate Sourceful into your inverters, batteries, or chargers. Cloud services, grid connectivity, and smart features out of the box.",
    keywords: ["OEM integration", "embedded energy", "inverter OEM", "battery manufacturer"]
  },
  "/about": {
    title: "About Sourceful - Building the Energy Coordination Layer",
    description: "Swedish energy tech company building local coordination infrastructure for the distributed energy future. Meet our team and learn our mission.",
    keywords: ["about Sourceful", "energy startup", "Swedish energy tech", "energy transition"]
  },
  "/contact": {
    title: "Contact Sourceful - Partnerships & Support",
    description: "Get in touch for integration support, partnership opportunities, or technical questions. We help utilities, installers, and OEMs succeed with DERs.",
    keywords: ["contact", "energy support", "partnership", "integration help"]
  },
  "/community": {
    title: "Sourceful Community - Join the Energy Revolution",
    description: "Connect with other prosumers, share energy insights, and help shape the future of distributed energy. Discord, forums, and local meetups.",
    keywords: ["energy community", "prosumer network", "energy forum", "distributed energy"]
  },
  "/blog": {
    title: "Energy Insights Blog - Solar, Storage & Grid News",
    description: "Expert articles on home energy optimization, grid flexibility, V2X technology, and the distributed energy transition. Tips, guides, and industry news.",
    keywords: ["energy blog", "solar news", "grid flexibility", "V2X articles", "energy tips"]
  },
  "/integrations": {
    title: "Supported Inverters, Batteries & EV Chargers",
    description: "Sourceful works with SolarEdge, Fronius, Huawei, Sungrow, Tesla, Easee, Zaptec, and 50+ other brands. Check if your devices are compatible.",
    keywords: ["solar integration", "supported inverters", "compatible batteries", "EV charger brands"]
  },
  "/get-started": {
    title: "Get Started with Sourceful - Quick Setup Guide",
    description: "Set up your Zap energy gateway in minutes. Connect via P1 meter or direct inverter integration. Step-by-step guides for all supported devices.",
    keywords: ["Zap setup", "energy setup", "P1 meter", "inverter connection", "quick start"]
  },
  "/get-started/zap": {
    title: "Zap P1 Meter Setup Guide - Connect in 5 Minutes",
    description: "Step-by-step guide to connect your Zap via P1 meter. Monitor your home energy consumption and solar production with real-time data.",
    keywords: ["P1 meter setup", "Zap installation", "energy monitor", "P1 connection"]
  },
  "/get-started/zap-for-inverters": {
    title: "Zap Inverter Setup - Direct Solar Connection Guide",
    description: "Connect your Zap directly to SolarEdge, Fronius, Huawei, or other inverters. Full monitoring and control without P1 meter required.",
    keywords: ["inverter setup", "solar connection", "Zap inverter", "direct integration"]
  },
  "/tools": {
    title: "Free Energy Calculators & Planning Tools",
    description: "Calculate your potential savings with solar, batteries, and smart charging. Free tools for battery sizing, EV costs, and ROI analysis.",
    keywords: ["energy calculator", "solar calculator", "battery sizing", "savings calculator"]
  },
  "/tools/savings-calculator": {
    title: "Energy Savings Calculator - See Your Potential",
    description: "Calculate how much you could save with smart energy management. Based on Swedish spot prices and your actual consumption patterns.",
    keywords: ["savings calculator", "energy savings", "electricity costs", "spot price savings"]
  },
  "/tools/battery-sizing": {
    title: "Home Battery Sizing Calculator - Find Your Fit",
    description: "Calculate the optimal battery size for your home. Based on your solar production, consumption, and energy goals. Free instant results.",
    keywords: ["battery sizing", "home battery", "storage calculator", "kWh calculator"]
  },
  "/tools/ev-charging": {
    title: "EV Charging Cost Calculator - Home vs Public",
    description: "Compare home charging costs to public stations. See how smart charging with spot prices can cut your EV running costs by 50% or more.",
    keywords: ["EV charging cost", "electric car charging", "home charging", "charging calculator"]
  },
  "/tools/solar-roi": {
    title: "Solar Panel ROI Calculator - Payback & Savings",
    description: "Calculate your solar investment return. See payback period, lifetime savings, and how battery storage affects your ROI. Swedish prices.",
    keywords: ["solar ROI", "solar payback", "panel investment", "solar savings"]
  },
  "/tools/v2x-savings": {
    title: "V2X Savings Calculator - Earn From Your EV Battery",
    description: "Estimate earnings from vehicle-to-grid and vehicle-to-home. See how bidirectional charging can turn your EV into a profit center.",
    keywords: ["V2X savings", "V2G earnings", "EV arbitrage", "bidirectional profit"]
  },
  "/tools/negative-prices": {
    title: "Negative Electricity Price Analyzer - Get Paid to Use",
    description: "Track negative spot prices in your area. Get alerts when electricity prices go negative and you can get paid to consume energy.",
    keywords: ["negative prices", "spot price alerts", "free electricity", "price analyzer"]
  },
  "/privacy": {
    title: "Privacy Policy - How Sourceful Protects Your Data",
    description: "Learn how we collect, use, and protect your energy data. GDPR compliant, transparent data practices, and your rights explained clearly.",
    keywords: ["privacy policy", "GDPR", "data protection", "energy data privacy"]
  },
  "/terms": {
    title: "Terms of Service - Sourceful Platform Agreement",
    description: "Terms and conditions for using Sourceful products and services. User agreements, acceptable use, and service level commitments.",
    keywords: ["terms of service", "user agreement", "platform terms"]
  },
  "/app": {
    title: "Sourceful App - Monitor Energy on iOS & Android",
    description: "Download the free Sourceful app to monitor your solar, battery, and energy usage. Real-time data, smart alerts, and optimization controls.",
    keywords: ["energy app", "solar app", "iOS energy", "Android energy", "monitoring app"]
  },
  "/company": {
    title: "Sourceful Company - Our Team, Mission & Vision",
    description: "Meet the team building local energy coordination infrastructure. Based in Sweden, backed by leading investors, serving the global energy transition.",
    keywords: ["Sourceful team", "energy company", "Swedish startup", "company info"]
  },
  "/assets": {
    title: "Brand Assets & Press Kit - Logos and Media",
    description: "Download Sourceful logos, brand guidelines, and media resources. Assets for press, partners, and integrators in various formats.",
    keywords: ["brand assets", "press kit", "logos", "media resources"]
  }
};

function generateKeywords(title: string, description: string): string[] {
  const text = `${title} ${description}`.toLowerCase();

  // Common energy-related keywords to look for
  const energyKeywords = [
    "energy", "solar", "battery", "EV", "charging", "grid", "power",
    "electricity", "renewable", "smart home", "V2X", "V2G", "inverter",
    "DER", "VPP", "utility", "installer", "homeowner", "savings",
    "optimization", "monitoring", "API", "developer", "integration"
  ];

  const found = energyKeywords.filter(kw => text.includes(kw.toLowerCase()));

  // Add some based on the title
  const words = title.split(/\s+/).filter(w => w.length > 4);

  return [...new Set([...found, ...words.slice(0, 3)])].slice(0, 6);
}

export async function POST(request: NextRequest) {
  try {
    const { pagePath } = await request.json();

    if (!pagePath) {
      return NextResponse.json({ error: "Page path required" }, { status: 400 });
    }

    // Check if we have a pre-defined SEO template for this page
    const template = SEO_TEMPLATES[pagePath];

    if (template) {
      return NextResponse.json({
        title: template.title,
        description: template.description,
        keywords: template.keywords,
      });
    }

    // Fallback for unknown pages: generate from path
    const pathParts = pagePath.split("/").filter(Boolean);
    const pageName = pathParts
      .map((part: string) => part.charAt(0).toUpperCase() + part.slice(1).replace(/-/g, " "))
      .join(" ") || "Home";

    // Generate SEO-optimized fallback (targeting green zone)
    const title = `${pageName} - Sourceful Energy Platform`;
    const description = `Learn about ${pageName.toLowerCase()} on Sourceful. Smart energy management, real-time optimization, and grid services for distributed energy resources.`;
    const keywords = generateKeywords(title, description);

    return NextResponse.json({
      title: title.length > 60 ? title.slice(0, 57) + "..." : title,
      description: description.length > 160 ? description.slice(0, 157) + "..." : description,
      keywords,
    });
  } catch (error) {
    console.error("Generate SEO error:", error);
    return NextResponse.json(
      { error: "Failed to generate SEO metadata" },
      { status: 500 }
    );
  }
}
