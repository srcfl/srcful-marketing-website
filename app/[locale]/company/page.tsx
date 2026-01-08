"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/src/i18n/routing";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MarketingNav } from "@/components/marketing-nav";
import { MarketingFooter } from "@/components/marketing-footer";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animations";
import { ArrowRight, Zap, TrendingUp, Network, Globe, Building2, Mail, ExternalLink } from "lucide-react";

export default function CompanyPage() {
  const t = useTranslations("company");
  const tCommon = useTranslations("common");

  const investors = [
    { name: "Crucible Capital", isLead: true },
    { name: "Eviny Ventures", isLead: true },
    { name: "Variant Fund", isLead: false },
    { name: "Paper Ventures", isLead: false },
    { name: "Kosmos Capital", isLead: false },
  ];

  const milestoneKeys = ["1000", "10000", "100000", "100M"];

  const whyWinKeys = ["utilities", "manufacturers", "traditional"];

  const valuePropKeys = ["coordinator", "subscription", "architecture", "network"];

  return (
    <div className="flex min-h-screen flex-col">
      <MarketingNav />

      <main className="flex-1 pt-16">
        {/* Hero */}
        <section className="relative overflow-hidden border-b bg-background">
          <div className="absolute inset-0 bg-dot-pattern" />
          <div className="relative max-w-7xl mx-auto py-24 md:py-32 px-4 md:px-8">
            <FadeIn className="max-w-4xl">
              <Badge variant="secondary" className="mb-6">
                <Building2 className="h-3 w-3 mr-1" />
                {t("hero.badge")}
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-left">
                {t("hero.title")}{" "}
                <span className="text-primary">{t("hero.titleHighlight")}</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-6 text-left">
                {t("hero.description")}
              </p>
              <p className="text-xl text-muted-foreground mb-8 text-left">
                {t("hero.paragraph2")}
              </p>
              <p className="text-xl font-medium text-left">
                {t("hero.paragraph3")}
              </p>
            </FadeIn>
          </div>
        </section>

        {/* Value Proposition */}
        <section className="bg-muted/30 border-b">
          <div className="max-w-7xl mx-auto py-16 md:py-24 px-4 md:px-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {valuePropKeys.map((key) => (
                <Card key={key}>
                  <CardHeader>
                    <div className="text-3xl font-bold text-primary">{t(`valueProps.${key}.value`)}</div>
                    <CardTitle className="text-lg">{t(`valueProps.${key}.title`)}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>
                      {t(`valueProps.${key}.description`)}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Why We'll Win */}
        <section className="border-b">
          <div className="max-w-7xl mx-auto py-16 md:py-24 px-4 md:px-8">
            <div className="max-w-3xl mb-12">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-left">
                {t("whyWin.title")}
              </h2>
              <p className="text-lg text-muted-foreground text-left">
                {t("whyWin.description")}
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {whyWinKeys.map((key) => (
                <Card key={key}>
                  <CardHeader>
                    <CardTitle className="text-lg">{t(`whyWin.${key}.title`)}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      {t(`whyWin.${key}.description`)}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="bg-muted rounded-lg p-8 max-w-2xl">
              <p className="text-lg font-medium mb-2">{t("whyWin.winnerTakemost.title")}</p>
              <p className="text-muted-foreground">
                {t("whyWin.winnerTakemost.description")}
              </p>
            </div>
          </div>
        </section>

        {/* Funding */}
        <section className="border-b bg-muted/30">
          <div className="max-w-7xl mx-auto py-16 md:py-24 px-4 md:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <Badge variant="secondary" className="mb-4">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  {t("funding.badge")}
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-left">
                  {t("funding.title")}
                </h2>
                <p className="text-lg text-muted-foreground mb-6 text-left">
                  {t("funding.paragraph1")}
                </p>
                <p className="text-lg text-muted-foreground text-left">
                  {t("funding.paragraph2")}
                </p>
              </div>

              <div className="bg-background rounded-lg p-8 border">
                <h3 className="font-semibold mb-6">{t("funding.investorsTitle")}</h3>
                <div className="space-y-4">
                  {investors.map((investor) => (
                    <div key={investor.name} className="flex items-center justify-between">
                      <span className="font-medium">{investor.name}</span>
                      {investor.isLead && (
                        <Badge variant="outline">{t("funding.lead")}</Badge>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Growth Roadmap */}
        <section className="border-b">
          <div className="max-w-7xl mx-auto py-16 md:py-24 px-4 md:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                {t("roadmap.title")}
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {t("roadmap.description")}
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {milestoneKeys.map((key, index) => (
                <Card key={key} className="relative">
                  <CardHeader>
                    <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center mb-4 text-sm font-bold">
                      {index + 1}
                    </div>
                    <div className="text-3xl font-bold text-primary">{t(`roadmap.milestones.${key}.connections`)}</div>
                    <CardTitle className="text-lg">{t(`roadmap.milestones.${key}.status`)}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{t(`roadmap.milestones.${key}.description`)}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Series A CTA */}
        <section className="bg-gradient-to-br from-primary/10 via-primary/5 to-background">
          <div className="max-w-7xl mx-auto py-16 md:py-24 px-4 md:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <Badge variant="secondary" className="mb-4">
                <Network className="h-3 w-3 mr-1" />
                {t("seriesA.badge")}
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                {t("seriesA.title")}
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                {t("seriesA.paragraph1")}
              </p>
              <p className="text-lg text-muted-foreground mb-8">
                {t("seriesA.paragraph2")}
              </p>
              <Button size="lg" asChild>
                <a href="mailto:invest@sourceful.energy">
                  <Mail className="mr-2 h-4 w-4" />
                  invest@sourceful.energy
                </a>
              </Button>
            </div>
          </div>
        </section>

        {/* Company Info */}
        <section className="border-t">
          <div className="max-w-7xl mx-auto py-12 px-4 md:px-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">{t("companyInfo.location")}</span>
                </div>
                <div className="text-sm text-muted-foreground">
                  {t("companyInfo.regNumber")}
                </div>
              </div>
              <p className="text-xs text-muted-foreground max-w-xl text-center md:text-right">
                {t("companyInfo.disclaimer")}
              </p>
            </div>
          </div>
        </section>
      </main>

      <MarketingFooter />
    </div>
  );
}
