"use client";

import { useState, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/src/i18n/routing";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MarketingNav } from "@/components/marketing-nav";
import { MarketingFooter } from "@/components/marketing-footer";
import { PricingSection } from "@/components/pricing-section";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animations";
import { V2XSavingsCalculatorMini } from "@/components/v2x-savings-calculator-mini";
import {
  Car,
  Zap,
  TrendingUp,
  Shield,
  Battery,
  Home,
  Grid3X3,
  ArrowRight,
  ExternalLink,
  Users,
} from "lucide-react";

// Schedule data and status labels
const scheduleData = [
  { mode: "idle", label: "Idle" },
  { mode: "idle", label: "Idle" },
  { mode: "charging", label: "Charging" },
  { mode: "charging", label: "Charging" },
  { mode: "self", label: "Self-use" },
  { mode: "self", label: "Self-use" },
  { mode: "export", label: "Selling" },
  { mode: "export", label: "Selling" },
  { mode: "discharge", label: "Powering home" },
  { mode: "idle", label: "Idle" },
];

const modeColors: Record<string, { bg: string; badge: string; ring: string }> = {
  idle: { bg: "bg-gray-300 dark:bg-gray-600", badge: "bg-gray-500/10 text-gray-600 dark:text-gray-400", ring: "ring-gray-400" },
  charging: { bg: "bg-pink-400", badge: "bg-pink-500/10 text-pink-600", ring: "ring-pink-400" },
  self: { bg: "bg-emerald-400", badge: "bg-emerald-500/10 text-emerald-600", ring: "ring-emerald-400" },
  export: { bg: "bg-blue-400", badge: "bg-blue-500/10 text-blue-600", ring: "ring-blue-400" },
  discharge: { bg: "bg-orange-400", badge: "bg-orange-500/10 text-orange-600", ring: "ring-orange-400" },
};

function AnimatedScheduleCard() {
  const [currentHour, setCurrentHour] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHour((prev) => (prev + 1) % scheduleData.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const currentMode = scheduleData[currentHour];
  const colors = modeColors[currentMode.mode];

  return (
    <div className="bg-background rounded-xl p-3 shadow-xl border border-border/50 w-44 md:w-52">
      <div className="flex items-center justify-between mb-2">
        <p className="text-xs font-medium text-muted-foreground">Schedule</p>
        <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium transition-all duration-300 ${colors.badge}`}>
          {currentMode.label}
        </span>
      </div>
      <div className="flex gap-[2px] mb-1.5">
        {scheduleData.map((item, i) => {
          const itemColors = modeColors[item.mode];
          const isCurrent = i === currentHour;
          return (
            <div
              key={i}
              className={`h-4 flex-1 first:rounded-l last:rounded-r transition-all duration-300 ${itemColors.bg} ${
                isCurrent ? `ring-2 ${itemColors.ring} ring-offset-1 ring-offset-background scale-y-125 z-10` : ""
              }`}
            />
          );
        })}
      </div>
      <div className="flex justify-between text-[10px] text-muted-foreground">
        <span>00</span>
        <span>12</span>
        <span>24</span>
      </div>
    </div>
  );
}

// Energy flow states
const energyFlowStates = [
  { from: "car", to: "house", label: "Powering Home", particleColor: "bg-orange-500", badge: "bg-orange-500/10 text-orange-600" },
  { from: "solar", to: "car", label: "Solar Charging", particleColor: "bg-yellow-500", badge: "bg-yellow-500/10 text-yellow-600" },
  { from: "car", to: "grid", label: "Selling to Grid", particleColor: "bg-blue-500", badge: "bg-blue-500/10 text-blue-600" },
];

// Icon colors - each icon type has consistent color
const iconStyles: Record<string, { icon: string; bg: string }> = {
  car: { icon: "text-primary", bg: "bg-primary/20" },
  house: { icon: "text-orange-500", bg: "bg-orange-500/20" },
  solar: { icon: "text-yellow-500", bg: "bg-yellow-500/20" },
  grid: { icon: "text-blue-500", bg: "bg-blue-500/20" },
};

function AnimatedEnergyFlowCard() {
  const [flowIndex, setFlowIndex] = useState(0);
  const [particleKey, setParticleKey] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setFlowIndex((prev) => (prev + 1) % energyFlowStates.length);
      setParticleKey((prev) => prev + 1);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const currentFlow = energyFlowStates[flowIndex];

  const getIcon = (type: string) => {
    const style = iconStyles[type];
    const baseClass = `w-4 h-4 transition-all duration-500 ${style.icon}`;
    switch (type) {
      case "car":
        return <Car className={baseClass} />;
      case "house":
        return <Home className={baseClass} />;
      case "solar":
        return (
          <svg className={baseClass} viewBox="0 0 24 24" fill="currentColor">
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v3M12 19v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M2 12h3M19 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
          </svg>
        );
      case "grid":
        return <Grid3X3 className={baseClass} />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-background rounded-xl p-3 shadow-xl border border-border/50 w-44 md:w-52">
      <div className="flex items-center justify-between mb-3">
        <p className="text-xs font-medium text-muted-foreground">Energy Flow</p>
        <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium transition-all duration-500 ${currentFlow.badge}`}>
          {currentFlow.label}
        </span>
      </div>

      <div className="flex items-center justify-between px-2">
        {/* Source */}
        <div className={`w-10 h-10 rounded-full ${iconStyles[currentFlow.from].bg} flex items-center justify-center transition-all duration-500`}>
          {getIcon(currentFlow.from)}
        </div>

        {/* Animated flow line with particles */}
        <div className="flex-1 mx-2 h-6 relative overflow-hidden">
          {/* Base line */}
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-border -translate-y-1/2" />

          {/* Animated particles using CSS animation */}
          {[0, 1, 2].map((i) => (
            <div
              key={`${particleKey}-${i}`}
              className={`absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full ${currentFlow.particleColor}`}
              style={{
                left: '-8px',
                animation: `flowParticle 1.5s ease-in-out infinite`,
                animationDelay: `${i * 0.4}s`,
              }}
            />
          ))}
        </div>

        {/* Destination */}
        <div className={`w-10 h-10 rounded-full ${iconStyles[currentFlow.to].bg} flex items-center justify-center transition-all duration-500`}>
          {getIcon(currentFlow.to)}
        </div>
      </div>
    </div>
  );
}

function AnimatedEarningsCard() {
  const [earnings, setEarnings] = useState(47.50);

  useEffect(() => {
    const interval = setInterval(() => {
      setEarnings((prev) => {
        const increment = Math.random() * 0.03 + 0.01;
        return Math.round((prev + increment) * 100) / 100;
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-background rounded-xl p-3 shadow-xl border border-border/50 w-44 md:w-52">
      <div className="flex items-center justify-between mb-2">
        <p className="text-xs font-medium text-muted-foreground">This Month</p>
        <span className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          <span className="text-[10px] text-muted-foreground">Live</span>
        </span>
      </div>
      <div className="flex items-baseline gap-1">
        <span className="text-2xl font-bold text-primary tabular-nums transition-all duration-500">
          €{earnings.toFixed(2)}
        </span>
      </div>
      <p className="text-[10px] text-muted-foreground mt-1">V2X earnings</p>
    </div>
  );
}

export default function V2XPage() {
  const t = useTranslations("v2x");
  const tCommon = useTranslations("common");
  const locale = useLocale();

  const evSupportUrl = locale === "sv"
    ? "https://support.sourceful.energy/sv/articles/12927601-vilka-elbilar-ar-kompatibla-med-sourceful-energy"
    : "https://support.sourceful.energy/en/articles/12927601-which-electric-vehicles-evs-are-compatible-with-sourceful-energy";

  const chargerSupportUrl = locale === "sv"
    ? "https://support.sourceful.energy/sv/articles/12927601-vilka-elbilar-ar-kompatibla-med-sourceful-energy"
    : "https://support.sourceful.energy/en/articles/12927601-which-electric-vehicles-evs-are-compatible-with-sourceful-energy";

  const benefits = [
    {
      icon: Battery,
      title: t("benefits.earn.title"),
      description: t("benefits.earn.description"),
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      icon: Home,
      title: t("benefits.backup.title"),
      description: t("benefits.backup.description"),
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    {
      icon: TrendingUp,
      title: t("benefits.optimize.title"),
      description: t("benefits.optimize.description"),
      color: "text-emerald-500",
      bgColor: "bg-emerald-500/10",
    },
    {
      icon: Grid3X3,
      title: t("benefits.grid.title"),
      description: t("benefits.grid.description"),
      color: "text-violet-500",
      bgColor: "bg-violet-500/10",
    },
  ];

  const compatibleChargers = [
    { name: "Ambibox", status: t("chargers.supported"), statusColor: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20" },
    { name: "Ferroamp", status: t("chargers.comingSoon"), statusColor: "bg-blue-500/10 text-blue-600 border-blue-500/20" },
    { name: "Charge Amps", status: t("chargers.comingSoon"), statusColor: "bg-blue-500/10 text-blue-600 border-blue-500/20" },
    { name: "Easee", status: t("chargers.comingSoon"), statusColor: "bg-blue-500/10 text-blue-600 border-blue-500/20" },
    { name: "Zaptec", status: t("chargers.comingSoon"), statusColor: "bg-blue-500/10 text-blue-600 border-blue-500/20" },
  ];

  const requirements = [
    t("requirements.charger"),
    t("requirements.vehicle"),
    t("requirements.subscription"),
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <MarketingNav />

      <main className="flex-1 pt-16">
        {/* Hero */}
        <section className="relative overflow-hidden border-b">
          <div className="absolute inset-0 bg-dot-pattern" />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent" />
          <div className="relative max-w-7xl mx-auto py-24 md:py-32 px-4 md:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <FadeIn>
                <div>
                  <Badge variant="secondary" className="mb-6 bg-primary/10 text-primary border-primary/20">
                    <Car className="h-3 w-3 mr-1" />
                    {t("hero.badge")}
                  </Badge>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-balance">
                    {t("hero.title")}{" "}
                    <span className="text-primary">{t("hero.titleHighlight")}</span>
                  </h1>
                  <p className="text-xl text-muted-foreground mb-8">
                    {t("hero.description")}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button size="lg" className="bg-primary hover:bg-primary text-primary-foreground" asChild>
                      <Link href="/pricing">
                        {t("hero.getStarted")}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                    <Button size="lg" variant="outline" className="hover:bg-primary/10 hover:text-primary" asChild>
                      <Link href="/zap">
                        {tCommon("buttons.learnMore")}
                      </Link>
                    </Button>
                  </div>
                </div>
              </FadeIn>
              <div className="flex items-center justify-center">
                <div className="relative w-72 h-72 md:w-80 md:h-80">
                  {/* Pulse ring */}
                  <div
                    className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 rounded-full"
                    style={{
                      animation: 'pulse-ring 3s ease-out infinite',
                    }}
                  />
                  {/* Circle background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 rounded-full flex items-center justify-center">
                    <div className="w-52 h-52 md:w-60 md:h-60 bg-gradient-to-br from-primary/30 to-primary/10 rounded-full flex items-center justify-center">
                      <Car className="h-24 w-24 md:h-28 md:w-28 text-primary" />
                    </div>
                  </div>

                  {/* Schedule Card - 11 o'clock */}
                  <div className="absolute" style={{ top: '5%', left: '-37%' }}>
                    <FadeIn delay={0.3}>
                      <AnimatedScheduleCard />
                    </FadeIn>
                  </div>

                  {/* Energy Flow Card - 3 o'clock */}
                  <div className="absolute" style={{ top: '35%', right: '-45%' }}>
                    <FadeIn delay={0.5}>
                      <AnimatedEnergyFlowCard />
                    </FadeIn>
                  </div>

                  {/* Earnings Card - 7 o'clock */}
                  <div className="absolute" style={{ bottom: '5%', left: '-32%' }}>
                    <FadeIn delay={0.7}>
                      <AnimatedEarningsCard />
                    </FadeIn>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="relative">
          <div className="relative max-w-7xl mx-auto py-16 md:py-24 px-4 md:px-8">
            <FadeIn className="text-center mb-12">
              <Badge variant="secondary" className="mb-4">{t("benefits.badge")}</Badge>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                {t("benefits.title")}
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
                {t("benefits.description")}
              </p>
            </FadeIn>

            <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-4 gap-6" staggerDelay={0.1}>
              {benefits.map((benefit) => {
                const Icon = benefit.icon;
                return (
                  <StaggerItem key={benefit.title}>
                    <Card className="h-full hover:shadow-lg hover:border-primary/30 transition-all duration-300">
                      <CardHeader>
                        <div className={`w-12 h-12 ${benefit.bgColor} rounded-lg flex items-center justify-center mb-4`}>
                          <Icon className={`h-6 w-6 ${benefit.color}`} />
                        </div>
                        <CardTitle className="text-lg">{benefit.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="text-base">
                          {benefit.description}
                        </CardDescription>
                      </CardContent>
                    </Card>
                  </StaggerItem>
                );
              })}
            </StaggerContainer>
          </div>
        </section>

        {/* How It Works */}
        <section className="border-t">
          <div className="max-w-7xl mx-auto py-16 md:py-24 px-4 md:px-8">
            <FadeIn className="text-center mb-12">
              <Badge variant="secondary" className="mb-4">{t("howItWorks.badge")}</Badge>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                {t("howItWorks.title")}
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {t("howItWorks.description")}
              </p>
            </FadeIn>

            <StaggerContainer className="grid md:grid-cols-3 gap-8" staggerDelay={0.1}>
              <StaggerItem>
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mb-4 text-xl font-bold">
                    1
                  </div>
                  <h3 className="font-semibold mb-2">{t("howItWorks.steps.connect.title")}</h3>
                  <p className="text-muted-foreground max-w-[200px]">
                    {t("howItWorks.steps.connect.description")}
                  </p>
                </div>
              </StaggerItem>
              <StaggerItem>
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mb-4 text-xl font-bold">
                    2
                  </div>
                  <h3 className="font-semibold mb-2">{t("howItWorks.steps.optimize.title")}</h3>
                  <p className="text-muted-foreground max-w-[200px]">
                    {t("howItWorks.steps.optimize.description")}
                  </p>
                </div>
              </StaggerItem>
              <StaggerItem>
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mb-4 text-xl font-bold">
                    3
                  </div>
                  <h3 className="font-semibold mb-2">{t("howItWorks.steps.earn.title")}</h3>
                  <p className="text-muted-foreground max-w-[200px]">
                    {t("howItWorks.steps.earn.description")}
                  </p>
                </div>
              </StaggerItem>
            </StaggerContainer>
          </div>
        </section>

        {/* V2X Savings Calculator */}
        <section className="border-t bg-muted/30">
          <div className="max-w-2xl mx-auto py-16 md:py-24 px-4 md:px-8">
            <FadeIn>
              <V2XSavingsCalculatorMini />
            </FadeIn>
          </div>
        </section>

        {/* Compatibility */}
        <section className="border-t bg-muted/30">
          <div className="max-w-7xl mx-auto py-16 md:py-24 px-4 md:px-8">
            <FadeIn className="text-center mb-12">
              <Badge variant="secondary" className="mb-4">{t("compatibility.badge")}</Badge>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                {t("compatibility.title")}
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {t("compatibility.description")}
              </p>
            </FadeIn>

            <div className="grid lg:grid-cols-2 gap-12">
              <FadeIn>
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle>{t("chargers.title")}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {compatibleChargers.map((charger) => (
                        <div key={charger.name} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                          <span className="font-medium">{charger.name}</span>
                          <Badge variant="outline" className={charger.statusColor}>
                            {charger.status}
                          </Badge>
                        </div>
                      ))}
                    </div>
                    <Button variant="outline" className="w-full mt-4 hover:bg-primary/10 hover:text-primary" asChild>
                      <a href={chargerSupportUrl} target="_blank" rel="noopener noreferrer">
                        {t("chargers.viewList")}
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              </FadeIn>

              <FadeIn delay={0.2}>
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>{t("evs.title")}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-4">
                        {t("evs.description")}
                      </p>
                      <Button variant="outline" className="w-full hover:bg-primary/10 hover:text-primary" asChild>
                        <a href={evSupportUrl} target="_blank" rel="noopener noreferrer">
                          {t("evs.viewList")}
                          <ExternalLink className="ml-2 h-4 w-4" />
                        </a>
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="border-primary/20 bg-primary/5">
                    <CardHeader>
                      <CardTitle className="text-primary">{t("requirements.title")}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {requirements.map((req, index) => (
                          <li key={index} className="flex items-center gap-2 text-sm">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                            <span>{req}</span>
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

        {/* Pricing Section */}
        <PricingSection />

        {/* V2X FAQ */}
        <section className="border-t bg-muted/30">
          <div className="max-w-3xl mx-auto py-16 md:py-24 px-4 md:px-8">
            <FadeIn>
              <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
                {t("faq.title")}
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-2">{t("faq.whatIsV2X.question")}</h3>
                  <p className="text-muted-foreground">{t("faq.whatIsV2X.answer")}</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">{t("faq.requirements.question")}</h3>
                  <p className="text-muted-foreground">{t("faq.requirements.answer")}</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">{t("faq.savings.question")}</h3>
                  <p className="text-muted-foreground">{t("faq.savings.answer")}</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">{t("faq.batteryHealth.question")}</h3>
                  <p className="text-muted-foreground">{t("faq.batteryHealth.answer")}</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">{t("faq.scheduling.question")}</h3>
                  <p className="text-muted-foreground">{t("faq.scheduling.answer")}</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">{t("faq.batteryDrained.question")}</h3>
                  <p className="text-muted-foreground">{t("faq.batteryDrained.answer")}</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">{t("faq.compatibleEVs.question")}</h3>
                  <p className="text-muted-foreground">
                    {t("faq.compatibleEVs.answer")}{" "}
                    <a href={evSupportUrl} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                      View compatible vehicles →
                    </a>
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">{t("faq.technicalExpertise.question")}</h3>
                  <p className="text-muted-foreground">{t("faq.technicalExpertise.answer")}</p>
                </div>
              </div>
            </FadeIn>
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
                    <Button className="bg-primary hover:bg-primary" asChild>
                      <a href="https://discord.gg/hEvKcxNH8C" target="_blank" rel="noopener noreferrer">
                        {t("community.discord")}
                      </a>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
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
                <Button size="lg" className="bg-primary hover:bg-primary" asChild>
                  <Link href="/pricing">
                    {t("hero.getStarted")}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="hover:bg-primary/10 hover:text-primary" asChild>
                  <Link href="/zap">
                    {tCommon("buttons.learnMore")}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
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
