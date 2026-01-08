"use client";

import { MarketingNav } from "@/components/marketing-nav";
import { MarketingFooter } from "@/components/marketing-footer";
import { FadeIn } from "@/components/animations";

export default function TermsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <MarketingNav />

      <main className="flex-1 pt-16">
        <section className="max-w-4xl mx-auto py-16 md:py-24 px-4 md:px-8">
          <FadeIn>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-8">
              Terms and Conditions
            </h1>
            <p className="text-muted-foreground mb-12">
              Effective Date: October 30, 2025
            </p>

            <div className="prose prose-gray dark:prose-invert max-w-none">
              <section className="mb-12">
                <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
                <p className="text-muted-foreground mb-4">
                  These Terms and Conditions govern your use of services provided by Sourceful Labs AB
                  (Swedish registration number: 559382-0458), including the Sourceful Platform,
                  Zap hardware device, mobile application, and cloud services.
                </p>
                <p className="text-muted-foreground">
                  By using our services, you agree to these terms. Please read them carefully.
                </p>
              </section>

              <section className="mb-12">
                <h2 className="text-2xl font-semibold mb-4">2. Services Overview</h2>
                <p className="text-muted-foreground">
                  Sourceful provides an energy management platform including the Zap hardware device,
                  mobile app, and cloud services for monitoring and controlling distributed energy
                  resources such as solar panels, batteries, EV chargers, and heat pumps.
                </p>
              </section>

              <section className="mb-12">
                <h2 className="text-2xl font-semibold mb-4">3A. Zap Device Purchase</h2>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>The Zap device is a one-time purchase with ownership transfer upon delivery</li>
                  <li>You have a 30-day right of withdrawal from the date of delivery</li>
                  <li>Device must be returned in resalable condition for full refund</li>
                  <li>Self-installation with provided instructions</li>
                  <li>One-year commercial warranty covering manufacturing defects</li>
                </ul>
              </section>

              <section className="mb-12">
                <h2 className="text-2xl font-semibold mb-4">3B. Subscription Services</h2>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>Optional paid plans available for additional features beyond the free tier</li>
                  <li>Billed monthly or annually in advance</li>
                  <li>Cancellation available anytime; takes effect at billing period end</li>
                  <li>Sourceful may terminate with 30 days notice or immediately for material breach</li>
                  <li>Free tier remains accessible after subscription ends</li>
                </ul>
              </section>

              <section className="mb-12">
                <h2 className="text-2xl font-semibold mb-4">4. User Responsibilities</h2>
                <p className="text-muted-foreground mb-4">
                  You are responsible for:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>Providing accurate account information</li>
                  <li>Maintaining the security of your account credentials</li>
                  <li>Ensuring proper installation and use of hardware</li>
                  <li>Complying with local electrical codes and regulations</li>
                  <li>Using services only for lawful purposes</li>
                </ul>
              </section>

              <section className="mb-12">
                <h2 className="text-2xl font-semibold mb-4">5. Prohibited Activities</h2>
                <p className="text-muted-foreground mb-4">
                  You may not:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>Reverse-engineer, copy, or modify the software or hardware</li>
                  <li>Manipulate energy data or readings</li>
                  <li>Automate interactions beyond intended use</li>
                  <li>Commit fraud or misrepresent information</li>
                  <li>Use services to harm the grid or other users</li>
                </ul>
                <p className="text-muted-foreground mt-4">
                  Violations may result in access suspension or termination.
                </p>
              </section>

              <section className="mb-12">
                <h2 className="text-2xl font-semibold mb-4">6. Consumer Protections</h2>
                <p className="text-muted-foreground mb-4">
                  Under Swedish consumer law, defective devices qualify for remedies in the following priority:
                </p>
                <ol className="list-decimal list-inside text-muted-foreground space-y-2">
                  <li>Repair or replacement</li>
                  <li>Price reduction</li>
                  <li>Cancellation with full refund</li>
                </ol>
                <p className="text-muted-foreground mt-4">
                  Claims are valid for three years after delivery.
                </p>
              </section>

              <section className="mb-12">
                <h2 className="text-2xl font-semibold mb-4">7. Limitation of Liability</h2>
                <p className="text-muted-foreground">
                  To the maximum extent permitted by law, Sourceful's liability is limited to the
                  amount you paid for the services. We are not liable for indirect, incidental,
                  or consequential damages, including lost profits or data loss.
                </p>
              </section>

              <section className="mb-12">
                <h2 className="text-2xl font-semibold mb-4">8. Data & Privacy</h2>
                <p className="text-muted-foreground">
                  Personal data handling follows our{" "}
                  <a href="/privacy" className="text-primary hover:underline">
                    Privacy Policy
                  </a>
                  . Authentication is handled via Privy. Data may be shared with partners under
                  GDPR compliance requirements.
                </p>
              </section>

              <section className="mb-12">
                <h2 className="text-2xl font-semibold mb-4">9. Intellectual Property</h2>
                <p className="text-muted-foreground">
                  All software, hardware designs, trademarks, and content are owned by Sourceful Labs AB.
                  Your purchase grants a license to use, not ownership of intellectual property.
                </p>
              </section>

              <section className="mb-12">
                <h2 className="text-2xl font-semibold mb-4">10. Changes to Terms</h2>
                <p className="text-muted-foreground">
                  We may update these terms with reasonable notice. Continued use after changes
                  constitutes acceptance. Material changes will be communicated via email or in-app notification.
                </p>
              </section>

              <section className="mb-12">
                <h2 className="text-2xl font-semibold mb-4">11. Governing Law</h2>
                <p className="text-muted-foreground">
                  These terms are governed by Swedish substantive law. Disputes will be resolved
                  through negotiation or Swedish courts. Consumers may also contact the Swedish
                  Consumer Agency (Konsumentverket) or the National Board for Consumer Disputes (ARN).
                </p>
              </section>

              <section className="mb-12">
                <h2 className="text-2xl font-semibold mb-4">12. Contact</h2>
                <p className="text-muted-foreground">
                  For questions about these terms, contact us at{" "}
                  <a href="mailto:legal@sourceful.energy" className="text-primary hover:underline">
                    legal@sourceful.energy
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
