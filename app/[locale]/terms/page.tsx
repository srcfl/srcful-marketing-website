"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/src/i18n/routing";
import { MarketingNav } from "@/components/marketing-nav";
import { MarketingFooter } from "@/components/marketing-footer";
import { FadeIn } from "@/components/animations";

export default function TermsPage() {
  const t = useTranslations("terms");

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
              {t("effectiveDate")}
            </p>

            <div className="prose prose-gray dark:prose-invert max-w-none">
              <section className="mb-12">
                <h2 className="text-2xl font-semibold mb-4">{t("introduction.title")}</h2>
                <p className="text-muted-foreground mb-4">
                  {t("introduction.paragraph1")}
                </p>
                <p className="text-muted-foreground">
                  {t("introduction.paragraph2")}
                </p>
              </section>

              <section className="mb-12">
                <h2 className="text-2xl font-semibold mb-4">{t("services.title")}</h2>
                <p className="text-muted-foreground">
                  {t("services.paragraph1")}
                </p>
              </section>

              <section className="mb-12">
                <h2 className="text-2xl font-semibold mb-4">{t("zapPurchase.title")}</h2>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  {(t.raw("zapPurchase.list") as string[]).map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </section>

              <section className="mb-12">
                <h2 className="text-2xl font-semibold mb-4">{t("subscription.title")}</h2>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  {(t.raw("subscription.list") as string[]).map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </section>

              <section className="mb-12">
                <h2 className="text-2xl font-semibold mb-4">{t("responsibilities.title")}</h2>
                <p className="text-muted-foreground mb-4">
                  {t("responsibilities.paragraph1")}
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  {(t.raw("responsibilities.list") as string[]).map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </section>

              <section className="mb-12">
                <h2 className="text-2xl font-semibold mb-4">{t("prohibited.title")}</h2>
                <p className="text-muted-foreground mb-4">
                  {t("prohibited.paragraph1")}
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  {(t.raw("prohibited.list") as string[]).map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
                <p className="text-muted-foreground mt-4">
                  {t("prohibited.paragraph2")}
                </p>
              </section>

              <section className="mb-12">
                <h2 className="text-2xl font-semibold mb-4">{t("consumer.title")}</h2>
                <p className="text-muted-foreground mb-4">
                  {t("consumer.paragraph1")}
                </p>
                <ol className="list-decimal list-inside text-muted-foreground space-y-2">
                  {(t.raw("consumer.list") as string[]).map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ol>
                <p className="text-muted-foreground mt-4">
                  {t("consumer.paragraph2")}
                </p>
              </section>

              <section className="mb-12">
                <h2 className="text-2xl font-semibold mb-4">{t("liability.title")}</h2>
                <p className="text-muted-foreground">
                  {t("liability.paragraph1")}
                </p>
              </section>

              <section className="mb-12">
                <h2 className="text-2xl font-semibold mb-4">{t("dataPrivacy.title")}</h2>
                <p className="text-muted-foreground">
                  {t("dataPrivacy.paragraph1")}{" "}
                  <Link href="/privacy" className="text-primary hover:underline">
                    {t("dataPrivacy.privacyPolicy")}
                  </Link>
                  {t("dataPrivacy.paragraph2")}
                </p>
              </section>

              <section className="mb-12">
                <h2 className="text-2xl font-semibold mb-4">{t("ip.title")}</h2>
                <p className="text-muted-foreground">
                  {t("ip.paragraph1")}
                </p>
              </section>

              <section className="mb-12">
                <h2 className="text-2xl font-semibold mb-4">{t("changes.title")}</h2>
                <p className="text-muted-foreground">
                  {t("changes.paragraph1")}
                </p>
              </section>

              <section className="mb-12">
                <h2 className="text-2xl font-semibold mb-4">{t("governing.title")}</h2>
                <p className="text-muted-foreground">
                  {t("governing.paragraph1")}
                </p>
              </section>

              <section className="mb-12">
                <h2 className="text-2xl font-semibold mb-4">{t("contact.title")}</h2>
                <p className="text-muted-foreground">
                  {t("contact.paragraph1")}{" "}
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
