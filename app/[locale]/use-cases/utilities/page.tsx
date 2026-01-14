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
  FleetOverviewCard,
  ResponseTimeCard,
  FlexibilityCard,
  DemandResponseCard,
  CustomerSatisfactionCard,
  ScheduleCard,
} from "@/components/dashboard-showcase";
import { PixelGrid } from "@/components/ui/pixel-grid";
import { VideoPlaceholder } from "@/components/video-placeholder";
import { RewardsSection } from "@/components/rewards-section";
import { ArrowRight, Building2, Zap, Clock, Shield, TrendingUp, Users, Github, CheckCircle2 } from "lucide-react";

export default function UtilitiesPage() {
  const t = useTranslations("useCases.utilities");
  const tCommon = useTranslations("common");

  const benefitKeys = [
    { key: "gridServices", icon: Clock, color: "text-blue-500", bgColor: "bg-blue-500/10" },
    { key: "coordinationFailures", icon: Shield, color: "text-cyan-500", bgColor: "bg-cyan-500/10" },
    { key: "distributedFlexibility", icon: TrendingUp, color: "text-emerald-500", bgColor: "bg-emerald-500/10" },
    { key: "whiteLabel", icon: Users, color: "text-violet-500", bgColor: "bg-violet-500/10" },
  ];

  const stats = [
    { value: "€2.5B", labelKey: "coordinationLosses", color: "text-red-500" },
    { value: "700+", labelKey: "negativePricing", color: "text-amber-500" },
    { value: "200ms", labelKey: "ourResponse", color: "text-cyan-500" },
    { value: "2-5s", labelKey: "cloudResponse", color: "text-muted-foreground" },
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <MarketingNav />

      <main className="flex-1 pt-16">
        {/* Hero */}
        <section className="relative overflow-hidden border-b">
          <div className="absolute inset-0 bg-dot-pattern" />
          <div className="absolute top-20 right-10 opacity-30">
            <PixelGrid pattern="corners-only" color="green" size="md" speed="slow" />
          </div>
          <div className="relative max-w-7xl mx-auto py-24 md:py-32 px-4 md:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <FadeIn>
                <div>
                  <Badge variant="secondary" className="mb-6 bg-cyan-500/10 text-cyan-600 border-cyan-500/20">
                    <Building2 className="h-3 w-3 mr-1" />
                    {t("hero.badge")}
                  </Badge>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-left">
                    {t("hero.title")}{" "}
                    <span className="text-cyan-500">{t("hero.titleHighlight")}</span>
                  </h1>
                  <p className="text-xl text-muted-foreground mb-8 text-left">
                    {t("hero.description")}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button size="lg" className="bg-cyan-500 hover:bg-cyan-600" asChild>
                      <Link href="/contact">
                        {tCommon("buttons.contactSales")}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                    <Button size="lg" variant="outline" className="hover:bg-cyan-500/10 hover:text-cyan-600" asChild>
                      <Link href="/platform">
                        {tCommon("buttons.learnMore")}
                      </Link>
                    </Button>
                  </div>
                </div>
              </FadeIn>
              <FadeIn delay={0.2}>
                <div className="flex items-start justify-center lg:justify-end">
                  <DashboardShowcase
                    cards={[
                      FleetOverviewCard,
                      ResponseTimeCard,
                      FlexibilityCard,
                      DemandResponseCard,
                      CustomerSatisfactionCard,
                      ScheduleCard,
                    ]}
                    interval={4000}
                    pauseOnHover
                  />
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="bg-muted/30 border-b">
          <div className="max-w-7xl mx-auto py-12 px-4 md:px-8">
            <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-8" staggerDelay={0.1}>
              {stats.map((stat) => (
                <StaggerItem key={stat.labelKey}>
                  <div className="text-center">
                    <div className={`text-3xl md:text-4xl font-bold ${stat.color}`}>{stat.value}</div>
                    <div className="text-sm text-muted-foreground mt-1">{t(`stats.${stat.labelKey}`)}</div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* Problem */}
        <section className="relative">
          <div className="relative max-w-7xl mx-auto py-16 md:py-24 px-4 md:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <FadeIn>
                <div>
                  <Badge variant="secondary" className="mb-4 bg-cyan-500/10 text-cyan-600 border-cyan-500/20">
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
                  <p className="text-lg font-medium">
                    {t("problem.paragraph3")}
                  </p>
                </div>
              </FadeIn>
              <FadeIn delay={0.2}>
                <Card className="bg-cyan-500/5 border-cyan-500/20">
                  <CardHeader>
                    <CardTitle className="text-cyan-500">{t("problem.partnerships.title")}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-4">
                      <li className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                        </div>
                        <div>
                          <span className="font-semibold">{t("problem.partnerships.kalmar.name")}</span>
                          <span className="text-muted-foreground"> - {t("problem.partnerships.kalmar.status")}</span>
                        </div>
                      </li>
                      <li className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center">
                          <CheckCircle2 className="w-4 h-4 text-blue-500" />
                        </div>
                        <div>
                          <span className="font-semibold">{t("problem.partnerships.nrgi.name")}</span>
                          <span className="text-muted-foreground"> - {t("problem.partnerships.nrgi.status")}</span>
                        </div>
                      </li>
                      <li className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-violet-500/10 flex items-center justify-center">
                          <CheckCircle2 className="w-4 h-4 text-violet-500" />
                        </div>
                        <div>
                          <span className="font-semibold">{t("problem.partnerships.fortum.name")}</span>
                          <span className="text-muted-foreground"> - {t("problem.partnerships.fortum.status")}</span>
                        </div>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
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
                    <Card className="h-full hover:shadow-lg hover:border-cyan-500/30 transition-all duration-300">
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

        {/* How it works */}
        <section className="border-t bg-muted/30">
          <div className="max-w-7xl mx-auto py-16 md:py-24 px-4 md:px-8">
            <FadeIn className="text-center mb-12">
              <Badge variant="secondary" className="mb-4">{t("howItWorks.badge")}</Badge>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                {t("howItWorks.title")}
              </h2>
            </FadeIn>

            <StaggerContainer className="grid md:grid-cols-3 gap-8" staggerDelay={0.1}>
              <StaggerItem>
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 bg-cyan-500 text-white rounded-full flex items-center justify-center mb-4 text-xl font-bold">
                    1
                  </div>
                  <h3 className="font-semibold mb-2">{t("howItWorks.step1.title")}</h3>
                  <p className="text-muted-foreground max-w-[200px]">
                    {t("howItWorks.step1.description")}
                  </p>
                </div>
              </StaggerItem>
              <StaggerItem>
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 bg-cyan-500 text-white rounded-full flex items-center justify-center mb-4 text-xl font-bold">
                    2
                  </div>
                  <h3 className="font-semibold mb-2">{t("howItWorks.step2.title")}</h3>
                  <p className="text-muted-foreground max-w-[200px]">
                    {t("howItWorks.step2.description")}
                  </p>
                </div>
              </StaggerItem>
              <StaggerItem>
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 bg-cyan-500 text-white rounded-full flex items-center justify-center mb-4 text-xl font-bold">
                    3
                  </div>
                  <h3 className="font-semibold mb-2">{t("howItWorks.step3.title")}</h3>
                  <p className="text-muted-foreground max-w-[200px]">
                    {t("howItWorks.step3.description")}
                  </p>
                </div>
              </StaggerItem>
            </StaggerContainer>
          </div>
        </section>

        {/* Rewards */}
        <RewardsSection audience="utilities" />

        {/* Community CTA */}
        <section className="border-t">
          <div className="max-w-7xl mx-auto py-16 md:py-24 px-4 md:px-8">
            <Card className="bg-gradient-to-br from-cyan-500/10 via-cyan-500/5 to-background border-cyan-500/20">
              <CardContent className="p-8 md:p-12">
                <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                  <div className="flex items-center gap-6">
                    <div className="w-16 h-16 bg-cyan-500/10 rounded-full flex items-center justify-center">
                      <Users className="h-8 w-8 text-cyan-500" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold mb-2">{t("community.title")}</h3>
                      <p className="text-muted-foreground">
                        {t("community.description")}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button className="bg-cyan-500 hover:bg-cyan-600" asChild>
                      <Link href="/contact">
                        {tCommon("buttons.contactSales")}
                      </Link>
                    </Button>
                    <Button variant="outline" className="hover:bg-cyan-500/10 hover:text-cyan-600" asChild>
                      <Link href="/platform">
                        {tCommon("buttons.learnMore")}
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CTA */}
        <section className="border-t bg-gradient-to-br from-cyan-500/10 via-cyan-500/5 to-background">
          <div className="max-w-7xl mx-auto py-16 md:py-24 px-4 md:px-8 text-center">
            <FadeIn>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                {t("cta.title")}
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
                {t("cta.description")}
              </p>
              <Button size="lg" className="bg-cyan-500 hover:bg-cyan-600" asChild>
                <Link href="/contact">
                  {tCommon("buttons.contactSales")}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </FadeIn>
          </div>
        </section>
      </main>

      <MarketingFooter />
    </div>
  );
}
