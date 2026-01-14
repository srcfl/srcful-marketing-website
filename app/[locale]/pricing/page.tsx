"use client";

import { MarketingNav } from "@/components/marketing-nav";
import { MarketingFooter } from "@/components/marketing-footer";
import { PricingSection } from "@/components/pricing-section";

export default function PricingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <MarketingNav />

      <main className="flex-1 pt-16">
        <PricingSection />
      </main>

      <MarketingFooter />
    </div>
  );
}
