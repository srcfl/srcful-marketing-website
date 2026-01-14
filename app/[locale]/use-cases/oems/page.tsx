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
import { PixelGrid } from "@/components/ui/pixel-grid";
import { VideoPlaceholder } from "@/components/video-placeholder";
import { ArrowRight, Zap, Cpu, Plug, Shield, Clock, Code, ExternalLink, Users, Github } from "lucide-react";

export default function OEMsPage() {
  const t = useTranslations("useCases.oems");
  const tCommon = useTranslations("common");

  const benefitKeys = [
    { key: "localExecution", icon: Clock, color: "text-blue-500", bgColor: "bg-blue-500/10" },
    { key: "protocolAgnostic", icon: Plug, color: "text-orange-500", bgColor: "bg-orange-500/10" },
    { key: "gridReady", icon: Shield, color: "text-emerald-500", bgColor: "bg-emerald-500/10" },
    { key: "developerExperience", icon: Code, color: "text-violet-500", bgColor: "bg-violet-500/10" },
  ];

  const integrations = [
    { key: "0", color: "text-orange-600 border-orange-500/30 bg-orange-500/10" },
    { key: "1", color: "text-blue-600 border-blue-500/30 bg-blue-500/10" },
    { key: "2", color: "text-emerald-600 border-emerald-500/30 bg-emerald-500/10" },
    { key: "3", color: "text-violet-600 border-violet-500/30 bg-violet-500/10" },
    { key: "4", color: "text-cyan-600 border-cyan-500/30 bg-cyan-500/10" },
    { key: "5", color: "text-amber-600 border-amber-500/30 bg-amber-500/10" },
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <MarketingNav />

      <main className="flex-1 pt-16">
        {/* Hero */}
        <section className="relative overflow-hidden border-b">
          <div className="absolute inset-0 bg-dot-pattern" />
          <div className="absolute top-20 right-10 opacity-30">
            <PixelGrid pattern="corners-only" color="orange" size="md" speed="slow" />
          </div>
          <div className="relative max-w-7xl mx-auto py-24 md:py-32 px-4 md:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <FadeIn>
                <div>
                  <Badge variant="secondary" className="mb-6 bg-orange-500/10 text-orange-600 border-orange-500/20">
                    <Cpu className="h-3 w-3 mr-1" />
                    {t("hero.badge")}
                  </Badge>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-left">
                    {t("hero.title")}{" "}
                    <span className="text-orange-500">{t("hero.titleHighlight")}</span>
                  </h1>
                  <p className="text-xl text-muted-foreground mb-8 text-left">
                    {t("hero.description")}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button size="lg" className="bg-orange-500 hover:bg-orange-600" asChild>
                      <Link href="/contact">
                        {tCommon("buttons.contactSales")}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                    <Button size="lg" variant="outline" className="hover:bg-orange-500/10 hover:text-orange-600" asChild>
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
            <FadeIn className="text-center mb-6">
              <p className="text-sm text-muted-foreground">{t("integrations.label")}</p>
            </FadeIn>
            <StaggerContainer className="flex flex-wrap items-center justify-center gap-4" staggerDelay={0.05}>
              {integrations.map((integration) => (
                <StaggerItem key={integration.key}>
                  <Badge variant="outline" className={`text-sm py-2 px-4 ${integration.color}`}>
                    {t(`integrations.${integration.key}`)}
                  </Badge>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* Problem/Solution */}
        <section className="relative">
          <div className="relative max-w-7xl mx-auto py-16 md:py-24 px-4 md:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <FadeIn>
                <div>
                  <Badge variant="secondary" className="mb-4 bg-orange-500/10 text-orange-600 border-orange-500/20">
                    {t("problem.badge")}
                  </Badge>
                  <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
                    {t("problem.title")}
                  </h2>
                  <p className="text-lg text-muted-foreground mb-6">
                    {t("problem.paragraph1")}
                  </p>
                  <p className="text-lg text-muted-foreground mb-6">
                    {t("problem.paragraph2")}
                  </p>
                  <div className="flex items-center gap-4 p-4 bg-orange-500/10 border border-orange-500/20 rounded-lg">
                    <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center">
                      <Zap className="h-6 w-6 text-orange-500" />
                    </div>
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
                          <li key={i} className="flex items-start gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-destructive mt-2 shrink-0" />
                            {t(`comparison.withoutItems.${i}`)}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                  <Card className="border-orange-500/50 bg-orange-500/5">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg text-orange-500">{t("comparison.withTitle")}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-sm">
                        {[0, 1, 2, 3].map((i) => (
                          <li key={i} className="flex items-start gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-2 shrink-0" />
                            {t(`comparison.withItems.${i}`)}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="border-t bg-muted/30">
          <div className="max-w-7xl mx-auto py-16 md:py-24 px-4 md:px-8">
            <FadeIn className="text-center mb-12">
              <Badge variant="secondary" className="mb-4">{t("benefits.badge")}</Badge>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                {t("benefits.title")}
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {t("benefits.description")}
              </p>
            </FadeIn>

            <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-4 gap-6" staggerDelay={0.1}>
              {benefitKeys.map((benefit) => {
                const Icon = benefit.icon;
                return (
                  <StaggerItem key={benefit.key}>
                    <Card className="h-full hover:shadow-lg hover:border-orange-500/30 transition-all duration-300">
                      <CardHeader>
                        <div className={`w-12 h-12 ${benefit.bgColor} rounded-lg flex items-center justify-center mb-4`}>
                          <Icon className={`h-6 w-6 ${benefit.color}`} />
                        </div>
                        <CardTitle className="text-lg">{t(`benefits.${benefit.key}.title`)}</CardTitle>
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

        {/* Video */}
        <section className="border-t">
          <div className="max-w-4xl mx-auto py-16 md:py-24 px-4 md:px-8">
            <FadeIn className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                {t("video.title")}
              </h2>
            </FadeIn>
            <VideoPlaceholder
              title={t("video.title")}
              comingSoonText={t("video.comingSoon")}
            />
          </div>
        </section>

        {/* Integration path */}
        <section className="border-t bg-muted/30">
          <div className="max-w-7xl mx-auto py-16 md:py-24 px-4 md:px-8">
            <FadeIn className="text-center mb-12">
              <Badge variant="secondary" className="mb-4">{t("integrationPath.badge")}</Badge>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                {t("integrationPath.title")}
              </h2>
            </FadeIn>

            <StaggerContainer className="grid md:grid-cols-4 gap-8" staggerDelay={0.1}>
              {["step1", "step2", "step3", "step4"].map((stepKey, index) => (
                <StaggerItem key={stepKey}>
                  <div className="flex flex-col items-center text-center">
                    <div className="w-12 h-12 bg-orange-500 text-white rounded-full flex items-center justify-center mb-4 text-xl font-bold">
                      {index + 1}
                    </div>
                    <h3 className="font-semibold mb-2">{t(`integrationPath.${stepKey}.title`)}</h3>
                    <p className="text-sm text-muted-foreground max-w-[180px]">{t(`integrationPath.${stepKey}.description`)}</p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* Community CTA */}
        <section className="border-t">
          <div className="max-w-7xl mx-auto py-16 md:py-24 px-4 md:px-8">
            <Card className="bg-gradient-to-br from-orange-500/10 via-orange-500/5 to-background border-orange-500/20">
              <CardContent className="p-8 md:p-12">
                <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                  <div className="flex items-center gap-6">
                    <div className="w-16 h-16 bg-orange-500/10 rounded-full flex items-center justify-center">
                      <Users className="h-8 w-8 text-orange-500" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold mb-2">{t("community.title")}</h3>
                      <p className="text-muted-foreground">
                        {t("community.description")}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button className="bg-orange-500 hover:bg-orange-600" asChild>
                      <a href="https://discord.gg/hEvKcxNH8C" target="_blank" rel="noopener noreferrer">
                        {t("community.discord")}
                      </a>
                    </Button>
                    <Button variant="outline" className="hover:bg-orange-500/10 hover:text-orange-600" asChild>
                      <a href="https://github.com/srcfl" target="_blank" rel="noopener noreferrer">
                        <Github className="mr-2 h-4 w-4" />
                        {t("community.github")}
                      </a>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CTA */}
        <section className="border-t bg-gradient-to-br from-orange-500/10 via-orange-500/5 to-background">
          <div className="max-w-7xl mx-auto py-16 md:py-24 px-4 md:px-8 text-center">
            <FadeIn>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                {t("cta.title")}
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
                {t("cta.description")}
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button size="lg" className="bg-orange-500 hover:bg-orange-600" asChild>
                  <Link href="/contact">
                    {tCommon("buttons.contactSales")}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="hover:bg-orange-500/10 hover:text-orange-600" asChild>
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
