"use client";

import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/src/i18n/routing";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MarketingNav } from "@/components/marketing-nav";
import { MarketingFooter } from "@/components/marketing-footer";
import { WaitlistForm } from "@/components/waitlist-form";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animations";
import { VideoPlaceholder } from "@/components/video-placeholder";
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
  Github,
} from "lucide-react";

export default function V2XPage() {
  const t = useTranslations("v2x");
  const tCommon = useTranslations("common");
  const locale = useLocale();

  const evSupportUrl = locale === "sv"
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
    { name: "Easee Home", status: t("chargers.testing"), statusColor: "bg-blue-500/10 text-blue-600 border-blue-500/20" },
    { name: "Zaptec Go", status: t("chargers.testing"), statusColor: "bg-blue-500/10 text-blue-600 border-blue-500/20" },
    { name: "ChargeAmps Halo", status: t("chargers.planned"), statusColor: "bg-orange-500/10 text-orange-600 border-orange-500/20" },
    { name: "Wallbox Quasar 2", status: t("chargers.planned"), statusColor: "bg-orange-500/10 text-orange-600 border-orange-500/20" },
  ];

  const requirements = [
    t("requirements.zap"),
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
                      <a href="#waitlist">
                        {tCommon("buttons.joinWaitlist")}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                    <Button size="lg" variant="outline" className="hover:bg-primary/10 hover:text-primary" asChild>
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
                    <div className="w-64 h-64 md:w-80 md:h-80 bg-gradient-to-br from-primary/20 to-primary/5 rounded-full flex items-center justify-center">
                      <div className="w-48 h-48 md:w-60 md:h-60 bg-gradient-to-br from-primary/30 to-primary/10 rounded-full flex items-center justify-center">
                        <Car className="h-24 w-24 md:h-32 md:w-32 text-primary" />
                      </div>
                    </div>
                    <div className="absolute -bottom-2 -right-2 bg-background rounded-lg p-3 shadow-lg border border-primary/20">
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
                  <div className="text-3xl md:text-4xl font-bold text-primary">€500-1,500</div>
                  <div className="text-sm text-muted-foreground">{t("stats.savings")}</div>
                </div>
              </StaggerItem>
              <StaggerItem>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-blue-500">2-4</div>
                  <div className="text-sm text-muted-foreground">{t("stats.backup")}</div>
                </div>
              </StaggerItem>
              <StaggerItem>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-emerald-500">50-100 kWh</div>
                  <div className="text-sm text-muted-foreground">{t("stats.capacity")}</div>
                </div>
              </StaggerItem>
              <StaggerItem>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-violet-500">2026</div>
                  <div className="text-sm text-muted-foreground">{t("launchTarget")}</div>
                </div>
              </StaggerItem>
            </StaggerContainer>
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
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
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

        {/* Waitlist Section */}
        <section id="waitlist" className="border-t bg-gradient-to-br from-primary/10 via-primary/5 to-background">
          <div className="max-w-7xl mx-auto py-16 md:py-24 px-4 md:px-8">
            <FadeIn className="max-w-xl mx-auto text-center">
              <Badge variant="secondary" className="mb-4 bg-primary/10 text-primary border-primary/20">
                {t("earlyAccess")}
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                {t("waitlist.title")}
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                {t("waitlist.description")}
              </p>

              <Card className="bg-background/80 backdrop-blur border-primary/20">
                <CardContent className="p-6">
                  <WaitlistForm
                    feature="v2x"
                    title={t("waitlist.title")}
                    description={t("waitlist.description")}
                    buttonText={tCommon("buttons.joinWaitlist")}
                    successMessage={t("waitlist.successMessage")}
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
                    <Button variant="outline" className="hover:bg-primary/10 hover:text-primary" asChild>
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
                  <a href="https://store.sourceful.energy/products/sourceful-energy-zap" target="_blank" rel="noopener noreferrer">
                    {tCommon("buttons.orderNow")}
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
                <Button size="lg" variant="outline" className="hover:bg-primary/10 hover:text-primary" asChild>
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
