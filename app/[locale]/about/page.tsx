"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/src/i18n/routing";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MarketingNav } from "@/components/marketing-nav";
import { MarketingFooter } from "@/components/marketing-footer";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animations";
import { ArrowRight, Zap, Users, Globe, Target } from "lucide-react";

export default function AboutPage() {
  const t = useTranslations("about");
  const tCommon = useTranslations("common");
  const values = [
    {
      key: "physicsBeforeCode",
      title: t("values.physicsBeforeCode.title"),
      description: t("values.physicsBeforeCode.description"),
    },
    {
      key: "simpleOverClever",
      title: t("values.simpleOverClever.title"),
      description: t("values.simpleOverClever.description"),
    },
    {
      key: "localOverCloud",
      title: t("values.localOverCloud.title"),
      description: t("values.localOverCloud.description"),
    },
    {
      key: "robustOverFeatureRich",
      title: t("values.robustOverFeatureRich.title"),
      description: t("values.robustOverFeatureRich.description"),
    },
    {
      key: "openOverProprietary",
      title: t("values.openOverProprietary.title"),
      description: t("values.openOverProprietary.description"),
    },
  ];

  const milestones = [
    { year: "2023", event: t("journey.founded") },
    { year: "2024", event: t("journey.seed") },
    { year: "2025", event: t("journey.partnerships") },
    { year: "2026", event: t("journey.seedPlus") },
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <MarketingNav />

      <main className="flex-1 pt-16">
        {/* Hero */}
        <section className="relative overflow-hidden border-b">
          <div className="absolute inset-0 bg-dot-pattern" />
          <div className="relative max-w-7xl mx-auto py-24 md:py-32 px-4 md:px-8">
            <FadeIn className="max-w-3xl">
              <Badge variant="secondary" className="mb-6">
                <Users className="h-3 w-3 mr-1" />
                {t("hero.badge")}
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                {t("hero.title")}{" "}
                <span className="text-primary">{t("hero.titleHighlight")}</span>
              </h1>
              <p className="text-xl text-muted-foreground">
                {t("hero.description")}
              </p>
            </FadeIn>
          </div>
        </section>

        {/* Mission */}
        <section className="max-w-7xl mx-auto py-16 md:py-24 px-4 md:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
                {t("mission.title")}
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                {t("mission.paragraph1")}
              </p>
              <p className="text-lg text-muted-foreground mb-6">
                {t("mission.paragraph2")}
              </p>
              <p className="text-lg font-medium">
                {t("mission.paragraph3")}
              </p>
            </div>
            <div className="bg-muted rounded-lg p-8">
              <h3 className="font-semibold mb-6">{t("numbers.title")}</h3>
              <div className="space-y-6">
                <div>
                  <div className="text-3xl font-bold text-primary">{tCommon("currency.symbol")}2.5B</div>
                  <div className="text-muted-foreground">{t("numbers.destroyed")}</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary">700+</div>
                  <div className="text-muted-foreground">{t("numbers.negativeHours")}</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary">2,800 GWh</div>
                  <div className="text-muted-foreground">{t("numbers.storage")}</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="border-t bg-muted/30">
          <div className="max-w-7xl mx-auto py-16 md:py-24 px-4 md:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                {t("principles.title")}
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {t("principles.description")}
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {values.map((value, index) => (
                <Card key={value.key}>
                  <CardHeader>
                    <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center mb-4 text-sm font-bold">
                      {index + 1}
                    </div>
                    <CardTitle className="text-lg">{value.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{value.description}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="border-t">
          <div className="max-w-7xl mx-auto py-16 md:py-24 px-4 md:px-8">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-12 text-center">
                {t("journey.title")}
              </h2>
              <div className="space-y-8">
                {milestones.map((milestone, index) => (
                  <div key={milestone.year} className="flex items-start gap-6">
                    <div className="flex-shrink-0 w-20 text-right">
                      <div className="text-xl font-bold text-primary">{milestone.year}</div>
                    </div>
                    <div className="flex-shrink-0 flex flex-col items-center">
                      <div className="w-4 h-4 rounded-full bg-primary" />
                      {index < milestones.length - 1 && (
                        <div className="w-0.5 h-16 bg-border" />
                      )}
                    </div>
                    <div className="pt-0.5">
                      <div className="text-lg">{milestone.event}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Location */}
        <section className="border-t bg-muted/30">
          <div className="max-w-7xl mx-auto py-16 md:py-24 px-4 md:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Globe className="h-5 w-5 text-primary" />
                  <span className="font-medium">{t("location.city")}</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
                  {t("location.title")}
                </h2>
                <p className="text-lg text-muted-foreground mb-6">
                  {t("location.paragraph1")}
                </p>
                <p className="text-lg text-muted-foreground">
                  {t("location.paragraph2")}
                </p>
              </div>
              <div className="bg-background rounded-lg p-8 border">
                <h3 className="font-semibold mb-4">{t("traction.title")}</h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                    <div>
                      <div className="font-medium">{t("traction.kalmarEnergi.name")}</div>
                      <div className="text-sm text-muted-foreground">{t("traction.kalmarEnergi.status")}</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                    <div>
                      <div className="font-medium">{t("traction.nrgi.name")}</div>
                      <div className="text-sm text-muted-foreground">{t("traction.nrgi.status")}</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                    <div>
                      <div className="font-medium">{t("traction.elkedjan.name")}</div>
                      <div className="text-sm text-muted-foreground">{t("traction.elkedjan.status")}</div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="border-t">
          <div className="max-w-7xl mx-auto py-16 md:py-24 px-4 md:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              {t("cta.title")}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              {t("cta.description")}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" asChild>
                <Link href="/contact">
                  {t("cta.getInTouch")}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/community">
                  {t("cta.joinCommunity")}
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <MarketingFooter />
    </div>
  );
}
