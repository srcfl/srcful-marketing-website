"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/src/i18n/routing";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MarketingNav } from "@/components/marketing-nav";
import { MarketingFooter } from "@/components/marketing-footer";
import { WaitlistForm } from "@/components/waitlist-form";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animations";
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
  CheckCircle,
} from "lucide-react";

export default function V2XPage() {
  const t = useTranslations("v2x");
  const tCommon = useTranslations("common");

  const benefits = [
    {
      icon: Battery,
      title: t("benefits.earn.title"),
      description: t("benefits.earn.description"),
    },
    {
      icon: Home,
      title: t("benefits.backup.title"),
      description: t("benefits.backup.description"),
    },
    {
      icon: TrendingUp,
      title: t("benefits.optimize.title"),
      description: t("benefits.optimize.description"),
    },
    {
      icon: Grid3X3,
      title: t("benefits.grid.title"),
      description: t("benefits.grid.description"),
    },
  ];

  const useCases = [
    {
      title: "V2H (Vehicle-to-Home)",
      description: "Power your home from your EV. Ideal for off-peak arbitrage and backup power.",
      savings: "€500-800/year",
    },
    {
      title: "V2G (Vehicle-to-Grid)",
      description: "Sell energy back to the grid during high demand. Requires utility partnership.",
      savings: "€200-500/year",
    },
    {
      title: "V2L (Vehicle-to-Load)",
      description: "Power external devices directly. Great for camping, construction, or emergencies.",
      savings: "Convenience",
    },
  ];

  const compatibleChargers = [
    { name: "Easee Home", status: "Testing" },
    { name: "Zaptec Go", status: "Testing" },
    { name: "ChargeAmps Halo", status: "Planned" },
    { name: "Wallbox Quasar 2", status: "Planned" },
  ];

  const compatibleEVs = [
    "Hyundai Ioniq 5/6",
    "Kia EV6/EV9",
    "Genesis GV60/70",
    "Ford F-150 Lightning",
    "Nissan Leaf (CHAdeMO)",
    "BYD models (selected)",
  ];

  const requirements = [
    "Zap gateway (€39)",
    "Bidirectional EV charger",
    "V2X-capable electric vehicle",
    "Sourceful platform subscription",
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <MarketingNav />

      <main className="flex-1 pt-16">
        {/* Hero */}
        <section className="relative overflow-hidden border-b">
          <div className="absolute inset-0 bg-dot-pattern" />
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 via-transparent to-transparent" />
          <div className="relative max-w-7xl mx-auto py-24 md:py-32 px-4 md:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <FadeIn>
                <div>
                  <Badge variant="outline" className="mb-6 border-yellow-500/50 text-yellow-600 dark:text-yellow-400">
                    <Car className="h-3 w-3 mr-1" />
                    {t("hero.badge")}
                  </Badge>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                    {t("hero.title")}{" "}
                    <span className="text-yellow-600 dark:text-yellow-400">{t("hero.titleHighlight")}</span>
                  </h1>
                  <p className="text-xl text-muted-foreground mb-8">
                    {t("hero.description")}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button size="lg" className="bg-yellow-600 hover:bg-yellow-700 text-white" asChild>
                      <a href="#waitlist">
                        {tCommon("buttons.joinWaitlist")}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                    <Button size="lg" variant="outline" asChild>
                      <Link href="/zap">
                        {tCommon("buttons.learnMore")}
                      </Link>
                    </Button>
                  </div>
                </div>
              </FadeIn>
              <FadeIn delay={0.2}>
                <div className="flex items-center justify-center">
                  <div className="relative">
                    <div className="w-64 h-64 md:w-80 md:h-80 bg-gradient-to-br from-yellow-500/20 to-yellow-500/5 rounded-full flex items-center justify-center">
                      <div className="w-48 h-48 md:w-60 md:h-60 bg-gradient-to-br from-yellow-500/30 to-yellow-500/10 rounded-full flex items-center justify-center">
                        <Car className="h-24 w-24 md:h-32 md:w-32 text-yellow-600 dark:text-yellow-400" />
                      </div>
                    </div>
                    <div className="absolute -bottom-2 -right-2 bg-background rounded-lg p-3 shadow-lg border">
                      <div className="flex items-center gap-2">
                        <Zap className="h-5 w-5 text-primary" />
                        <span className="font-semibold">50-100 kWh</span>
                      </div>
                      <span className="text-xs text-muted-foreground">{t("stats.capacity")}</span>
                    </div>
                  </div>
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
                  <div className="text-3xl md:text-4xl font-bold text-yellow-600 dark:text-yellow-400">€500-1,500</div>
                  <div className="text-sm text-muted-foreground">{t("stats.savings")}</div>
                </div>
              </StaggerItem>
              <StaggerItem>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-yellow-600 dark:text-yellow-400">2-4</div>
                  <div className="text-sm text-muted-foreground">{t("stats.backup")}</div>
                </div>
              </StaggerItem>
              <StaggerItem>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-yellow-600 dark:text-yellow-400">50-100 kWh</div>
                  <div className="text-sm text-muted-foreground">{t("stats.capacity")}</div>
                </div>
              </StaggerItem>
              <StaggerItem>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-yellow-600 dark:text-yellow-400">2026</div>
                  <div className="text-sm text-muted-foreground">Launch target</div>
                </div>
              </StaggerItem>
            </StaggerContainer>
          </div>
        </section>

        {/* Benefits */}
        <section className="max-w-7xl mx-auto py-16 md:py-24 px-4 md:px-8">
          <FadeIn className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              {t("benefits.title")}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t("benefits.description")}
            </p>
          </FadeIn>

          <StaggerContainer className="grid md:grid-cols-2 gap-6" staggerDelay={0.1}>
            {benefits.map((benefit) => {
              const Icon = benefit.icon;
              return (
                <StaggerItem key={benefit.title}>
                  <Card className="h-full">
                    <CardHeader>
                      <div className="w-12 h-12 bg-yellow-500/10 rounded-lg flex items-center justify-center mb-4">
                        <Icon className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
                      </div>
                      <CardTitle>{benefit.title}</CardTitle>
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
        </section>

        {/* How It Works */}
        <section className="border-t bg-muted/30">
          <div className="max-w-7xl mx-auto py-16 md:py-24 px-4 md:px-8">
            <FadeIn className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                {t("howItWorks.title")}
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {t("howItWorks.description")}
              </p>
            </FadeIn>

            <StaggerContainer className="grid md:grid-cols-3 gap-6" staggerDelay={0.1}>
              <StaggerItem>
                <Card className="text-center h-full">
                  <CardHeader>
                    <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                      1
                    </div>
                    <CardTitle className="text-lg">{t("howItWorks.steps.connect.title")}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>
                      {t("howItWorks.steps.connect.description")}
                    </CardDescription>
                  </CardContent>
                </Card>
              </StaggerItem>
              <StaggerItem>
                <Card className="text-center h-full">
                  <CardHeader>
                    <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                      2
                    </div>
                    <CardTitle className="text-lg">{t("howItWorks.steps.optimize.title")}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>
                      {t("howItWorks.steps.optimize.description")}
                    </CardDescription>
                  </CardContent>
                </Card>
              </StaggerItem>
              <StaggerItem>
                <Card className="text-center h-full">
                  <CardHeader>
                    <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                      3
                    </div>
                    <CardTitle className="text-lg">{t("howItWorks.steps.earn.title")}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>
                      {t("howItWorks.steps.earn.description")}
                    </CardDescription>
                  </CardContent>
                </Card>
              </StaggerItem>
            </StaggerContainer>
          </div>
        </section>

        {/* Compatibility */}
        <section className="border-t">
          <div className="max-w-7xl mx-auto py-16 md:py-24 px-4 md:px-8">
            <div className="grid lg:grid-cols-2 gap-12">
              <FadeIn>
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
                    {t("compatibility.title")}
                  </h2>
                  <p className="text-lg text-muted-foreground mb-8">
                    {t("compatibility.description")}
                  </p>

                  <div className="mb-8">
                    <h3 className="font-semibold mb-4">Chargers</h3>
                    <div className="space-y-3">
                      {compatibleChargers.map((charger) => (
                        <div key={charger.name} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                          <span className="font-medium">{charger.name}</span>
                          <Badge variant={charger.status === "Testing" ? "secondary" : "outline"}>
                            {charger.status}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </FadeIn>

              <FadeIn delay={0.2}>
                <div>
                  <div className="bg-muted rounded-lg p-6 mb-6">
                    <h3 className="font-semibold mb-4">Compatible EVs</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {compatibleEVs.map((ev) => (
                        <div key={ev} className="flex items-center gap-2 text-sm">
                          <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                          <span>{ev}</span>
                        </div>
                      ))}
                    </div>
                    <p className="text-xs text-muted-foreground mt-4">
                      {t("compatibility.note")}
                    </p>
                  </div>

                  <div className="bg-background border rounded-lg p-6">
                    <h3 className="font-semibold mb-4">Requirements</h3>
                    <ul className="space-y-2">
                      {requirements.map((req) => (
                        <li key={req} className="flex items-center gap-2 text-sm">
                          <div className="w-1.5 h-1.5 rounded-full bg-yellow-500" />
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* Waitlist Section */}
        <section id="waitlist" className="border-t bg-gradient-to-br from-yellow-500/10 via-yellow-500/5 to-background">
          <div className="max-w-7xl mx-auto py-16 md:py-24 px-4 md:px-8">
            <FadeIn className="max-w-xl mx-auto text-center">
              <Badge variant="outline" className="mb-4 border-yellow-500/50 text-yellow-600 dark:text-yellow-400">
                Early Access
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                {t("waitlist.title")}
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                {t("waitlist.description")}
              </p>

              <Card className="bg-background/80 backdrop-blur">
                <CardContent className="p-6">
                  <WaitlistForm
                    feature="v2x"
                    title={t("waitlist.title")}
                    description={t("waitlist.description")}
                    buttonText={tCommon("buttons.joinWaitlist")}
                    successMessage="You're on the list! We'll be in touch when V2X is ready for testing."
                  />
                </CardContent>
              </Card>

              <div className="mt-6 space-y-2 text-sm text-muted-foreground">
                <p>✓ {t("waitlist.benefits.early")}</p>
                <p>✓ {t("waitlist.benefits.priority")}</p>
                <p>✓ {t("waitlist.benefits.updates")}</p>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* CTA */}
        <section className="border-t">
          <div className="max-w-7xl mx-auto py-16 md:py-24 px-4 md:px-8 text-center">
            <FadeIn>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                Start with the Zap today
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
                Get the Zap gateway now and be ready for V2X when it launches.
                Start optimizing your energy today.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button size="lg" asChild>
                  <a href="https://store.sourceful.energy/products/sourceful-energy-zap" target="_blank" rel="noopener noreferrer">
                    {tCommon("buttons.orderNow")}
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/use-cases/homeowners">
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
