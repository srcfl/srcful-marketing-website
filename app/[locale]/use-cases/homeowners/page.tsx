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
  ProductionCard,
  SavingsCard,
  BatteryCard,
  SelfSufficiencyCard,
  EnergyFlowCard,
  ScheduleCard,
  ConnectedDevicesCard,
} from "@/components/dashboard-showcase";
import { SavingsCalculatorMini } from "@/components/savings-calculator-mini";
import { V2xSavingsCard } from "@/components/v2x-savings-card";
import { RewardsSection } from "@/components/rewards-section";
import { VideoPlaceholder } from "@/components/video-placeholder";
import { ZapImage } from "@/components/zap-image";
import { PixelGrid, type PixelGridColor, type PatternType } from "@/components/ui/pixel-grid";
import {
  ArrowRight,
  Home,
  Zap,
  Sun,
  Car,
  TrendingDown,
  Coins,
  Clock,
  Smartphone,
  Battery,
  BarChart3,
  Shield,
  ExternalLink,
  Users,
  Github,
  Activity,
  Settings,
  PiggyBank
} from "lucide-react";

export default function HomeownersPage() {
  const t = useTranslations("useCases.homeowners");
  const tCommon = useTranslations("common");

  const benefits = [
    {
      icon: TrendingDown,
      title: t("benefits.cutPeakDemand.title"),
      description: t("benefits.cutPeakDemand.description"),
      color: "text-yellow-500",
      bgColor: "bg-yellow-500/10",
    },
    {
      icon: BarChart3,
      title: t("benefits.seeEveryKwh.title"),
      description: t("benefits.seeEveryKwh.description"),
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    {
      icon: Coins,
      title: t("benefits.earnRewards.title"),
      description: t("benefits.earnRewards.description"),
      color: "text-emerald-500",
      bgColor: "bg-emerald-500/10",
    },
    {
      icon: Shield,
      title: t("benefits.multiBrand.title"),
      description: t("benefits.multiBrand.description"),
      color: "text-violet-500",
      bgColor: "bg-violet-500/10",
    },
  ];

  const useCases: {
    id: string;
    pattern: PatternType;
    color: PixelGridColor;
    title: string;
    description: string;
    savings: string;
    savingsLabel: string;
  }[] = [
    {
      id: "smartHome",
      pattern: "sparse-1",
      color: "green",
      title: t("useCasesSection.smartHome.title"),
      description: t("useCasesSection.smartHome.description"),
      savings: t("useCasesSection.smartHome.savings"),
      savingsLabel: t("useCasesSection.smartHome.savingsLabel"),
    },
    {
      id: "solarBattery",
      pattern: "plus-hollow",
      color: "orange",
      title: t("useCasesSection.solarBattery.title"),
      description: t("useCasesSection.solarBattery.description"),
      savings: t("useCasesSection.solarBattery.savings"),
      savingsLabel: t("useCasesSection.solarBattery.savingsLabel"),
    },
    {
      id: "v2x",
      pattern: "frame",
      color: "blue",
      title: t("useCasesSection.v2x.title"),
      description: t("useCasesSection.v2x.description"),
      savings: t("useCasesSection.v2x.savings"),
      savingsLabel: t("useCasesSection.v2x.savingsLabel"),
    },
  ];

  const howItWorks = [
    {
      step: "1",
      title: t("howItWorks.step1.title"),
      description: t("howItWorks.step1.description"),
    },
    {
      step: "2",
      title: t("howItWorks.step2.title"),
      description: t("howItWorks.step2.description"),
    },
    {
      step: "3",
      title: t("howItWorks.step3.title"),
      description: t("howItWorks.step3.description"),
    },
    {
      step: "4",
      title: t("howItWorks.step4.title"),
      description: t("howItWorks.step4.description"),
    },
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
                    <Home className="h-3 w-3 mr-1" />
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
                      <Link href="/zap">
                        {tCommon("buttons.getTheZap")}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                    <Button size="lg" variant="outline" asChild>
                      <Link href="/app">
                        <Smartphone className="mr-2 h-4 w-4" />
                        {t("cta.downloadApp")}
                      </Link>
                    </Button>
                  </div>
                </div>
              </FadeIn>
              <FadeIn delay={0.2}>
                <div className="flex items-start justify-center lg:justify-end">
                  <DashboardShowcase
                    cards={[
                      ProductionCard,
                      SavingsCard,
                      BatteryCard,
                      SelfSufficiencyCard,
                      EnergyFlowCard,
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
              <StaggerItem>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-primary">€69</div>
                  <div className="text-sm text-muted-foreground">{t("stats.oneTimeCost")}</div>
                </div>
              </StaggerItem>
              <StaggerItem>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-primary">5 min</div>
                  <div className="text-sm text-muted-foreground">{t("stats.setupTime")}</div>
                </div>
              </StaggerItem>
              <StaggerItem>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-primary">€266+</div>
                  <div className="text-sm text-muted-foreground">{t("stats.annualSavings")}</div>
                </div>
              </StaggerItem>
              <StaggerItem>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-primary">30 day</div>
                  <div className="text-sm text-muted-foreground">{t("stats.moneyBackGuarantee")}</div>
                </div>
              </StaggerItem>
            </StaggerContainer>
          </div>
        </section>

        {/* Use Cases Grid */}
        <section className="max-w-7xl mx-auto py-16 md:py-24 px-4 md:px-8">
          <FadeIn className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              {t("useCasesSection.title")}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t("useCasesSection.description")}
            </p>
          </FadeIn>

          <StaggerContainer className="grid md:grid-cols-3 gap-6" staggerDelay={0.1}>
            {useCases.map((useCase) => (
                <StaggerItem key={useCase.id}>
                  <Card className="h-full">
                    <CardHeader className="pb-2">
                      <div className="mb-4 flex py-4">
                        <PixelGrid pattern={useCase.pattern} color={useCase.color} size="md" />
                      </div>
                      <CardTitle>{useCase.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <CardDescription className="text-base">
                        {useCase.description}
                      </CardDescription>
                      <div className="pt-4 border-t">
                        <div className="text-2xl font-bold text-primary">{useCase.savings}</div>
                        <div className="text-sm text-muted-foreground">{useCase.savingsLabel}</div>
                      </div>
                    </CardContent>
                  </Card>
                </StaggerItem>
            ))}
          </StaggerContainer>
        </section>

        {/* Savings Calculator */}
        <section className="border-t bg-muted/30">
          <div className="max-w-7xl mx-auto py-16 md:py-24 px-4 md:px-8">
            <FadeIn className="text-center mb-8">
              <div className="flex justify-center mb-6">
                <PixelGrid pattern="line-v-mid" color="green" size="md" speed="fast" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                Calculate your savings
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                See how much you could save with solar and battery optimization
              </p>
            </FadeIn>
            <FadeIn delay={0.2}>
              <div className="max-w-xl mx-auto">
                <SavingsCalculatorMini />
              </div>
            </FadeIn>
          </div>
        </section>

        {/* Benefits */}
        <section className="border-t">
          <div className="max-w-7xl mx-auto py-16 md:py-24 px-4 md:px-8">
            <FadeIn className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                {t("whyLoveZap")}
              </h2>
            </FadeIn>

            <StaggerContainer className="grid md:grid-cols-2 gap-6" staggerDelay={0.1}>
              {benefits.map((benefit) => {
                const Icon = benefit.icon;
                return (
                  <StaggerItem key={benefit.title}>
                    <Card>
                      <CardHeader>
                        <div className="flex items-start gap-4">
                          <div className={`w-10 h-10 ${benefit.bgColor} rounded-lg flex items-center justify-center flex-shrink-0`}>
                            <Icon className={`h-5 w-5 ${benefit.color}`} />
                          </div>
                          <div>
                            <CardTitle className="text-lg mb-2">{benefit.title}</CardTitle>
                            <CardDescription className="text-base">
                              {benefit.description}
                            </CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                    </Card>
                  </StaggerItem>
                );
              })}
            </StaggerContainer>
          </div>
        </section>

        {/* Meet the Zap */}
        <section className="border-t bg-muted/30">
          <div className="max-w-7xl mx-auto py-16 md:py-24 px-4 md:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <FadeIn>
                <div className="flex items-center justify-center">
                  <ZapImage className="w-full max-w-sm" />
                </div>
              </FadeIn>
              <FadeIn delay={0.2}>
                <div>
                  <Badge variant="secondary" className="mb-4">
                    <Zap className="h-3 w-3 mr-1" />
                    {t("zapSection.badge")}
                  </Badge>
                  <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                    {t("zapSection.title")}
                  </h2>
                  <p className="text-lg text-muted-foreground mb-6">
                    {t("zapSection.description")}
                  </p>
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                        <Clock className="h-3 w-3 text-primary" />
                      </div>
                      <span>{t("zapSection.feature1")}</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                        <Battery className="h-3 w-3 text-primary" />
                      </div>
                      <span>{t("zapSection.feature2")}</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                        <Shield className="h-3 w-3 text-primary" />
                      </div>
                      <span>{t("zapSection.feature3")}</span>
                    </li>
                  </ul>
                  <Button size="lg" asChild>
                    <Link href="/zap">
                      {tCommon("buttons.getTheZap")}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* What You Get - Alternating Layout */}
        <section className="border-t">
          <div className="max-w-5xl mx-auto py-16 md:py-24 px-4 md:px-8">
            <FadeIn className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                {t("whatYouGet.title")}
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {t("whatYouGet.description")}
              </p>
            </FadeIn>

            <div className="space-y-24">
              {/* Full visibility */}
              <FadeIn>
                <div className="grid lg:grid-cols-2 gap-8 items-center">
                  <div>
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                      <Activity className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4">{t("whatYouGet.items.0.title")}</h3>
                    <p className="text-lg text-muted-foreground">
                      {t("whatYouGet.items.0.description")}
                    </p>
                  </div>
                  <div className="flex justify-center lg:justify-end">
                    <ConnectedDevicesCard
                      translations={{
                        title: t("whatYouGet.dashboardCards.gridProduction.title"),
                        solarProduction: t("whatYouGet.dashboardCards.gridProduction.solarProduction"),
                        producedToday: t("whatYouGet.dashboardCards.gridProduction.producedToday"),
                        exportedToGrid: t("whatYouGet.dashboardCards.gridProduction.exportedToGrid"),
                      }}
                    />
                  </div>
                </div>
              </FadeIn>

              {/* Smart automation */}
              <FadeIn delay={0.1}>
                <div className="grid lg:grid-cols-2 gap-8 items-center">
                  <div className="lg:order-2">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                      <Settings className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4">{t("whatYouGet.items.1.title")}</h3>
                    <p className="text-lg text-muted-foreground">
                      {t("whatYouGet.items.1.description")}
                    </p>
                  </div>
                  <div className="flex justify-center lg:order-1 lg:justify-start">
                    <ScheduleCard />
                  </div>
                </div>
              </FadeIn>

              {/* Total savings */}
              <FadeIn delay={0.2}>
                <div className="grid lg:grid-cols-2 gap-8 items-center">
                  <div>
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                      <PiggyBank className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4">{t("whatYouGet.items.2.title")}</h3>
                    <p className="text-lg text-muted-foreground">
                      {t("whatYouGet.items.2.description")}
                    </p>
                  </div>
                  <div className="flex justify-center lg:justify-end">
                    <SavingsCard />
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* V2X Feature */}
        <section className="border-t">
          <div className="max-w-7xl mx-auto py-16 md:py-24 px-4 md:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <FadeIn>
                <div>
                  <Badge variant="secondary" className="mb-4">
                    <Car className="h-3 w-3 mr-1" />
                    {t("v2xSection.badge")}
                  </Badge>
                  <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6 text-left">
                    {t("v2xSection.title")}
                  </h2>
                  <p className="text-lg text-muted-foreground mb-6 text-left">
                    {t("v2xSection.description")}
                  </p>
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-primary" />
                      </div>
                      <span><strong>V2H</strong> - {t("v2xSection.v2h")}</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-primary" />
                      </div>
                      <span><strong>V2G</strong> - {t("v2xSection.v2g")}</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-primary" />
                      </div>
                      <span><strong>Smart charging</strong> - {t("v2xSection.smartCharging")}</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-primary" />
                      </div>
                      <span><strong>Solar integration</strong> - {t("v2xSection.solarIntegration")}</span>
                    </li>
                  </ul>
                </div>
              </FadeIn>
              <FadeIn delay={0.2}>
                <V2xSavingsCard />
              </FadeIn>
            </div>
          </div>
        </section>

        {/* Rewards */}
        <RewardsSection audience="homeowners" />

        {/* Video */}
        <section className="border-t bg-muted/30">
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
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                {t("howItWorks.title")}
              </h2>
            </FadeIn>

            <StaggerContainer className="grid md:grid-cols-4 gap-8" staggerDelay={0.1}>
              {howItWorks.map((step) => (
                <StaggerItem key={step.step}>
                  <div className="flex flex-col items-center text-center">
                    <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mb-4 text-xl font-bold">
                      {step.step}
                    </div>
                    <h3 className="font-semibold mb-2">{step.title}</h3>
                    <p className="text-sm text-muted-foreground max-w-[180px]">{step.description}</p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* Community CTA */}
        <section className="border-t">
          <div className="max-w-7xl mx-auto py-16 md:py-24 px-4 md:px-8">
            <Card className="bg-gradient-to-br from-primary/10 via-primary/5 to-background border-primary/20">
              <CardContent className="p-8 md:p-12">
                <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                  <div className="flex items-center gap-6">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                      <Users className="h-8 w-8 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold mb-2">{t("community.title")}</h3>
                      <p className="text-muted-foreground">
                        {t("community.description")}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button asChild>
                      <a href="https://discord.gg/srcful" target="_blank" rel="noopener noreferrer">
                        {tCommon("buttons.joinDiscord")}
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                    <Button variant="outline" asChild>
                      <a href="https://github.com/srcfl" target="_blank" rel="noopener noreferrer">
                        <Github className="mr-2 h-4 w-4" />
                        GitHub
                      </a>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <MarketingFooter />
    </div>
  );
}
