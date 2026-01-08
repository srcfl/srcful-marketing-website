"use client";

import { MarketingNav } from "@/components/marketing-nav";
import { MarketingFooter } from "@/components/marketing-footer";
import { FadeIn } from "@/components/animations";

export default function PrivacyPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <MarketingNav />

      <main className="flex-1 pt-16">
        <section className="max-w-4xl mx-auto py-16 md:py-24 px-4 md:px-8">
          <FadeIn>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-8">
              Privacy Policy
            </h1>
            <p className="text-muted-foreground mb-12">
              Last updated: October 30, 2025
            </p>

            <div className="prose prose-gray dark:prose-invert max-w-none">
              <section className="mb-12">
                <h2 className="text-2xl font-semibold mb-4">Data Controller</h2>
                <p className="text-muted-foreground mb-4">
                  Sourceful Labs AB (Corporate ID: 559382-0458) is responsible for processing your personal data.
                  We are committed to protecting your privacy and handling your data in accordance with GDPR and applicable Swedish law.
                </p>
                <p className="text-muted-foreground">
                  <strong>Website:</strong> www.sourceful.energy
                </p>
              </section>

              <section className="mb-12">
                <h2 className="text-2xl font-semibold mb-4">Website Analytics</h2>
                <p className="text-muted-foreground mb-4">
                  We collect anonymized usage data through analytics cookies and Google Analytics, including an encrypted version of your IP address and device information. This data is retained for 26 months.
                </p>
                <p className="text-muted-foreground">
                  You may opt out of Google Analytics by using Google's browser add-on available at{" "}
                  <a href="https://tools.google.com/dlpage/gaoptout" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
                    tools.google.com/dlpage/gaoptout
                  </a>.
                </p>
              </section>

              <section className="mb-12">
                <h2 className="text-2xl font-semibold mb-4">Service Interest & Waitlist</h2>
                <p className="text-muted-foreground">
                  We process names, emails, and contact details from interest forms based on legitimate interest in reaching out to customers. This data is stored for one year after request handling.
                </p>
              </section>

              <section className="mb-12">
                <h2 className="text-2xl font-semibold mb-4">Contract & Hardware Provision</h2>
                <p className="text-muted-foreground">
                  Personal data including name, address, and payment information are processed to fulfill subscription agreements and device orders under contract performance requirements.
                </p>
              </section>

              <section className="mb-12">
                <h2 className="text-2xl font-semibold mb-4">Device Connectivity (Zap Device)</h2>
                <p className="text-muted-foreground">
                  Sourceful scans local networks to locate distributed energy resources. We retain inverter IP addresses and network configuration details for seamless functionality of the Zap device.
                </p>
              </section>

              <section className="mb-12">
                <h2 className="text-2xl font-semibold mb-4">Energy Data Collection</h2>
                <p className="text-muted-foreground">
                  Real-time electricity consumption data, timestamps, and meter readings are collected through the Zap device. This data is retained for 36 months after service termination for support purposes.
                </p>
              </section>

              <section className="mb-12">
                <h2 className="text-2xl font-semibold mb-4">Active Control Feature</h2>
                <p className="text-muted-foreground">
                  When you enable automated controls for batteries, chargers, and inverters, we process real-time energy data to optimize device performance.
                </p>
              </section>

              <section className="mb-12">
                <h2 className="text-2xl font-semibold mb-4">Marketing & Analytics Tools</h2>
                <p className="text-muted-foreground">
                  We use the following tools for advertising measurement and user behavior analysis:
                </p>
                <ul className="list-disc list-inside text-muted-foreground mt-4 space-y-2">
                  <li>Meta Pixel</li>
                  <li>TikTok Pixel</li>
                  <li>LinkedIn Insight Tag</li>
                  <li>Reddit Pixel</li>
                  <li>HubSpot</li>
                  <li>Microsoft Clarity</li>
                </ul>
              </section>

              <section className="mb-12">
                <h2 className="text-2xl font-semibold mb-4">Your Rights</h2>
                <p className="text-muted-foreground mb-4">
                  Under GDPR, you have the right to:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>Access your personal data</li>
                  <li>Rectify inaccurate data</li>
                  <li>Erase your data ("right to be forgotten")</li>
                  <li>Restrict processing</li>
                  <li>Data portability</li>
                  <li>Object to processing</li>
                  <li>Lodge a complaint with the Swedish Authority for Privacy Protection (IMY)</li>
                </ul>
              </section>

              <section className="mb-12">
                <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
                <p className="text-muted-foreground">
                  For privacy-related inquiries, please contact us at{" "}
                  <a href="mailto:privacy@sourceful.energy" className="text-primary hover:underline">
                    privacy@sourceful.energy
                  </a>
                </p>
              </section>
            </div>
          </FadeIn>
        </section>
      </main>

      <MarketingFooter />
    </div>
  );
}
