"use client";

import { useTranslations } from "next-intl";
import { MarketingNav } from "@/components/marketing-nav";
import { MarketingFooter } from "@/components/marketing-footer";
import { FadeIn } from "@/components/animations";

export default function PrivacyPage() {
  const t = useTranslations("privacy");

  return (
    <div className="flex min-h-screen flex-col">
      <MarketingNav />

      <main className="flex-1 pt-16">
        <section className="max-w-4xl mx-auto py-16 md:py-24 px-4 md:px-8">
          <FadeIn>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-8">
              {t("title")}
            </h1>
            <p className="text-muted-foreground mb-12">
              {t("lastUpdated")}
            </p>

            <div className="prose prose-gray dark:prose-invert max-w-none">
              <section className="mb-12">
                <h2 className="text-2xl font-semibold mb-4">{t("dataController.title")}</h2>
                <p className="text-muted-foreground mb-4">
                  {t("dataController.paragraph1")}
                </p>
                <p className="text-muted-foreground">
                  <strong>{t("dataController.website")}:</strong> www.sourceful.energy
                </p>
              </section>

              <section className="mb-12">
                <h2 className="text-2xl font-semibold mb-4">{t("analytics.title")}</h2>
                <p className="text-muted-foreground mb-4">
                  {t("analytics.paragraph1")}
                </p>
                <p className="text-muted-foreground">
                  {t("analytics.optOut")}{" "}
                  <a href="https://tools.google.com/dlpage/gaoptout" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
                    tools.google.com/dlpage/gaoptout
                  </a>.
                </p>
              </section>

              <section className="mb-12">
                <h2 className="text-2xl font-semibold mb-4">{t("waitlist.title")}</h2>
                <p className="text-muted-foreground">
                  {t("waitlist.paragraph1")}
                </p>
              </section>

              <section className="mb-12">
                <h2 className="text-2xl font-semibold mb-4">{t("contract.title")}</h2>
                <p className="text-muted-foreground">
                  {t("contract.paragraph1")}
                </p>
              </section>

              <section className="mb-12">
                <h2 className="text-2xl font-semibold mb-4">{t("device.title")}</h2>
                <p className="text-muted-foreground">
                  {t("device.paragraph1")}
                </p>
              </section>

              <section className="mb-12">
                <h2 className="text-2xl font-semibold mb-4">{t("energyData.title")}</h2>
                <p className="text-muted-foreground">
                  {t("energyData.paragraph1")}
                </p>
              </section>

              <section className="mb-12">
                <h2 className="text-2xl font-semibold mb-4">{t("activeControl.title")}</h2>
                <p className="text-muted-foreground">
                  {t("activeControl.paragraph1")}
                </p>
              </section>

              <section className="mb-12">
                <h2 className="text-2xl font-semibold mb-4">{t("marketing.title")}</h2>
                <p className="text-muted-foreground">
                  {t("marketing.paragraph1")}
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
                <h2 className="text-2xl font-semibold mb-4">{t("rights.title")}</h2>
                <p className="text-muted-foreground mb-4">
                  {t("rights.paragraph1")}
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  {(t.raw("rights.list") as string[]).map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </section>

              <section className="mb-12">
                <h2 className="text-2xl font-semibold mb-4">{t("contact.title")}</h2>
                <p className="text-muted-foreground">
                  {t("contact.paragraph1")}{" "}
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
