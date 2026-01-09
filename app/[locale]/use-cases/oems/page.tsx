"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/src/i18n/routing";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MarketingNav } from "@/components/marketing-nav";
import { MarketingFooter } from "@/components/marketing-footer";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animations";
import {
  DashboardShowcase,
  ConnectedDevicesCard,
  ApiLatencyCard,
  ProtocolsCard,
  UptimeCard,
  ResponseTimeCard,
  FlexibilityCard,
} from "@/components/dashboard-showcase";
import { ArrowRight, Zap, Cpu, Plug, Shield, Clock, Code, ExternalLink } from "lucide-react";

export default function OEMsPage() {
  const t = useTranslations("useCases.oems");
  const tCommon = useTranslations("common");

  const benefitKeys = [
    { key: "localExecution", icon: Clock },
    { key: "protocolAgnostic", icon: Plug },
    { key: "gridReady", icon: Shield },
    { key: "developerExperience", icon: Code },
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <MarketingNav />

      <main className="flex-1 pt-16">
        {/* Hero */}
        <section className="relative overflow-hidden border-b">
          <div className="absolute inset-0 bg-dot-pattern" />
          <div className="relative max-w-7xl mx-auto py-24 md:py-32 px-4 md:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <FadeIn>
                <div>
                  <Badge variant="secondary" className="mb-6">
                    <Cpu className="h-3 w-3 mr-1" />
                    {t("hero.badge")}
                  </Badge>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-left">
                    {t("hero.title")}{" "}
                    <span className="text-primary">{t("hero.titleHighlight")}</span>
                  </h1>
                  <p className="text-xl text-muted-foreground mb-8 text-left">
                    {t("hero.description")}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button size="lg" asChild>
                      <Link href="/contact">
                        {tCommon("buttons.contactSales")}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                    <Button size="lg" variant="outline" asChild>
                      <a href="https://developer.sourceful.energy/hardware" target="_blank" rel="noopener noreferrer">
                        {tCommon("buttons.viewDocs")}
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                </div>
              </FadeIn>
              <FadeIn delay={0.2}>
                <div className="flex items-start justify-center lg:justify-end">
                  <DashboardShowcase
                    cards={[
                      ConnectedDevicesCard,
                      ApiLatencyCard,
                      ProtocolsCard,
                      UptimeCard,
                      ResponseTimeCard,
                      FlexibilityCard,
                    ]}
                    interval={4000}
                    pauseOnHover
                  />
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* Integrations */}
        <section className="bg-muted/30 border-b">
          <div className="max-w-7xl mx-auto py-12 px-4 md:px-8">
            <div className="flex flex-wrap items-center justify-center gap-4">
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <Badge key={i} variant="outline" className="text-sm py-2 px-4">
                  {t(`integrations.${i}`)}
                </Badge>
              ))}
            </div>
          </div>
        </section>

        {/* Problem/Solution */}
        <section className="max-w-7xl mx-auto py-16 md:py-24 px-4 md:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <FadeIn>
              <div>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
                  {t("problem.title")}
                </h2>
                <p className="text-lg text-muted-foreground mb-6">
                  {t("problem.paragraph1")}
                </p>
                <p className="text-lg text-muted-foreground mb-6">
                  {t("problem.paragraph2")}
                </p>
                <div className="flex items-center gap-4 p-4 bg-muted rounded-lg">
                  <Zap className="h-8 w-8 text-primary" />
                  <div>
                    <div className="font-semibold">{t("problem.zapGateway")}</div>
                    <div className="text-sm text-muted-foreground">{t("problem.zapGatewaySpecs")}</div>
                  </div>
                </div>
              </div>
            </FadeIn>
            <FadeIn delay={0.2}>
              <div className="space-y-4">
                <Card className="border-destructive/50 bg-destructive/5">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg text-destructive">{t("comparison.withoutTitle")}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      {[0, 1, 2, 3].map((i) => (
                        <li key={i}>• {t(`comparison.withoutItems.${i}`)}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
                <Card className="border-primary/50 bg-primary/5">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg text-primary">{t("comparison.withTitle")}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      {[0, 1, 2, 3].map((i) => (
                        <li key={i}>• {t(`comparison.withItems.${i}`)}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* Benefits */}
        <section className="border-t bg-muted/30">
          <div className="max-w-7xl mx-auto py-16 md:py-24 px-4 md:px-8">
            <FadeIn className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                {t("benefits.title")}
              </h2>
            </FadeIn>

            <StaggerContainer className="grid md:grid-cols-2 gap-6" staggerDelay={0.1}>
              {benefitKeys.map((benefit) => {
                const Icon = benefit.icon;
                return (
                  <StaggerItem key={benefit.key}>
                    <Card className="h-full">
                      <CardHeader>
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                          <Icon className="h-6 w-6 text-primary" />
                        </div>
                        <CardTitle>{t(`benefits.${benefit.key}.title`)}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="text-base">
                          {t(`benefits.${benefit.key}.description`)}
                        </CardDescription>
                      </CardContent>
                    </Card>
                  </StaggerItem>
                );
              })}
            </StaggerContainer>
          </div>
        </section>

        {/* Integration path */}
        <section className="border-t">
          <div className="max-w-7xl mx-auto py-16 md:py-24 px-4 md:px-8">
            <FadeIn className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                {t("integrationPath.title")}
              </h2>
            </FadeIn>

            <StaggerContainer className="grid md:grid-cols-4 gap-6" staggerDelay={0.1}>
              {["step1", "step2", "step3", "step4"].map((stepKey, index) => (
                <StaggerItem key={stepKey}>
                  <div className="text-center">
                    <div className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 font-bold">
                      {index + 1}
                    </div>
                    <h3 className="font-semibold mb-2">{t(`integrationPath.${stepKey}.title`)}</h3>
                    <p className="text-sm text-muted-foreground">{t(`integrationPath.${stepKey}.description`)}</p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* CTA */}
        <section className="border-t bg-gradient-to-br from-primary/10 via-primary/5 to-background">
          <div className="max-w-7xl mx-auto py-16 md:py-24 px-4 md:px-8 text-center">
            <FadeIn>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                {t("cta.title")}
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
                {t("cta.description")}
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button size="lg" asChild>
                  <Link href="/contact">
                    {tCommon("buttons.contactSales")}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <a href="https://developer.sourceful.energy/hardware" target="_blank" rel="noopener noreferrer">
                    {tCommon("buttons.viewDocs")}
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </div>
            </FadeIn>
          </div>
        </section>
      </main>

      <MarketingFooter />
    </div>
  );
}
