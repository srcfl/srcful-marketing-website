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
} from "@/components/dashboard-showcase";
import { SavingsCalculatorMini } from "@/components/savings-calculator-mini";
import { V2xSavingsCard } from "@/components/v2x-savings-card";
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
  ExternalLink
} from "lucide-react";

export default function HomeownersPage() {
  const t = useTranslations("useCases.homeowners");
  const tCommon = useTranslations("common");

  const benefits = [
    {
      icon: TrendingDown,
      title: t("benefits.cutPeakDemand.title"),
      description: t("benefits.cutPeakDemand.description"),
    },
    {
      icon: BarChart3,
      title: t("benefits.seeEveryKwh.title"),
      description: t("benefits.seeEveryKwh.description"),
    },
    {
      icon: Coins,
      title: t("benefits.earnRewards.title"),
      description: t("benefits.earnRewards.description"),
    },
    {
      icon: Shield,
      title: t("benefits.multiBrand.title"),
      description: t("benefits.multiBrand.description"),
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
      color: "pink",
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
                      <a href="https://store.sourceful.energy/products/sourceful-energy-zap" target="_blank" rel="noopener noreferrer">
                        {tCommon("buttons.getTheZap")}
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                    <Button size="lg" variant="outline" asChild>
                      <a href="https://sourceful.energy/app-downloads" target="_blank" rel="noopener noreferrer">
                        <Smartphone className="mr-2 h-4 w-4" />
                        {t("cta.downloadApp")}
                      </a>
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
                  <div className="text-3xl md:text-4xl font-bold text-primary">€39</div>
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
                          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Icon className="h-5 w-5 text-primary" />
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
                  <img
                    src="https://framerusercontent.com/images/52u6CS3UoJqPVCIoGLR1YrUww.png?scale-down-to=1024"
                    alt="Sourceful Energy Zap"
                    className="w-full max-w-sm rounded-2xl"
                  />
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
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button size="lg" asChild>
                      <a href="https://store.sourceful.energy/products/sourceful-energy-zap" target="_blank" rel="noopener noreferrer">
                        {tCommon("buttons.getTheZap")}
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                    <Button size="lg" variant="outline" asChild>
                      <Link href="/zap">
                        {tCommon("buttons.learnMore")}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
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

        {/* How it works */}
        <section className="border-t bg-muted/30">
          <div className="max-w-7xl mx-auto py-16 md:py-24 px-4 md:px-8">
            <FadeIn className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                {t("howItWorks.title")}
              </h2>
            </FadeIn>

            <StaggerContainer className="grid md:grid-cols-4 gap-6" staggerDelay={0.1}>
              {howItWorks.map((step) => (
                <StaggerItem key={step.step}>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                      {step.step}
                    </div>
                    <h3 className="font-semibold mb-2">{step.title}</h3>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* CTA */}
        <section className="border-t">
          <div className="max-w-7xl mx-auto py-16 md:py-24 px-4 md:px-8">
            <Card className="bg-gradient-to-br from-primary/10 via-primary/5 to-background border-primary/20">
              <CardContent className="p-8 md:p-12">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <FadeIn>
                    <div>
                      <h2 className="text-3xl font-bold mb-4">{t("cta.title")}</h2>
                      <p className="text-muted-foreground mb-6">
                        {t("cta.description")}
                      </p>
                      <div className="flex flex-col sm:flex-row gap-3">
                        <Button size="lg" asChild>
                          <a href="https://store.sourceful.energy/products/sourceful-energy-zap" target="_blank" rel="noopener noreferrer">
                            {tCommon("buttons.getTheZap")}
                            <ExternalLink className="ml-2 h-4 w-4" />
                          </a>
                        </Button>
                        <Button size="lg" variant="outline" asChild>
                          <a href="https://sourceful.energy/app-downloads" target="_blank" rel="noopener noreferrer">
                            <Smartphone className="mr-2 h-4 w-4" />
                            {t("cta.getTheApp")}
                          </a>
                        </Button>
                      </div>
                    </div>
                  </FadeIn>
                  <FadeIn delay={0.2}>
                    <div className="flex justify-center">
                      <div className="text-center">
                        <div className="text-6xl font-bold text-primary mb-2">€39</div>
                        <div className="text-muted-foreground">{t("cta.oneTimePurchase")}</div>
                        <div className="text-sm text-muted-foreground mt-1">{t("cta.freeShipping")}</div>
                      </div>
                    </div>
                  </FadeIn>
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
