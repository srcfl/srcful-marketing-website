"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/src/i18n/routing";
import { Button } from "@/components/ui/button";
import { DashboardTabs } from "@/components/dashboard-tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Zap, Building2, Wrench, Code, Users, ExternalLink, CircuitBoard, Wifi, WifiOff, Database, Layers } from "lucide-react";
import { MarketingNav } from "@/components/marketing-nav";
import { MarketingFooter } from "@/components/marketing-footer";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animations";
import { Hero } from "@/components/hero";
import { PricingSection } from "@/components/pricing-section";
import { PixelGridBackground } from "@/components/pixel-grid-background";
import { PixelGrid } from "@/components/ui/pixel-grid";

export default function Home() {
  const t = useTranslations("home");
  const tCommon = useTranslations("common");

  const connectivityFeatures = [
    {
      icon: Wifi,
      title: t("connectivity.features.edgeConnectivity.title"),
      description: t("connectivity.features.edgeConnectivity.description"),
      iconColor: "text-emerald-500",
      bgColor: "bg-emerald-500/10",
    },
    {
      icon: WifiOff,
      title: t("connectivity.features.zeroOEM.title"),
      description: t("connectivity.features.zeroOEM.description"),
      iconColor: "text-cyan-500",
      bgColor: "bg-cyan-500/10",
    },
    {
      icon: Database,
      title: t("connectivity.features.sovereignData.title"),
      description: t("connectivity.features.sovereignData.description"),
      iconColor: "text-teal-500",
      bgColor: "bg-teal-500/10",
    },
    {
      icon: Layers,
      title: t("connectivity.features.unifiedAPI.title"),
      description: t("connectivity.features.unifiedAPI.description"),
      iconColor: "text-sky-500",
      bgColor: "bg-sky-500/10",
    },
  ];

  const audiences = [
    {
      icon: Users,
      title: t("audiences.homeowners.title"),
      description: t("audiences.homeowners.description"),
      href: "/use-cases/homeowners",
      iconColor: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    {
      icon: Building2,
      title: t("audiences.utilities.title"),
      description: t("audiences.utilities.description"),
      href: "/use-cases/utilities",
      iconColor: "text-violet-500",
      bgColor: "bg-violet-500/10",
    },
    {
      icon: CircuitBoard,
      title: t("audiences.oems.title"),
      description: t("audiences.oems.description"),
      href: "/use-cases/oems",
      iconColor: "text-amber-500",
      bgColor: "bg-amber-500/10",
    },
    {
      icon: Wrench,
      title: t("audiences.installers.title"),
      description: t("audiences.installers.description"),
      href: "/use-cases/installers",
      iconColor: "text-rose-500",
      bgColor: "bg-rose-500/10",
    },
    {
      icon: Code,
      title: t("audiences.developers.title"),
      description: t("audiences.developers.description"),
      href: "/developers",
      iconColor: "text-primary",
      bgColor: "bg-primary/10",
    },
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <MarketingNav />

      <main className="flex-1">
        {/* Hero */}
        <Hero />

        {/* Dashboard Demo */}
        <section className="max-w-7xl mx-auto py-16 md:py-24 px-4 md:px-8">
          <FadeIn className="text-center mb-12">
            <Badge variant="secondary" className="mb-4">{t("dashboard.badge")}</Badge>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              {t("dashboard.title")}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t("dashboard.description")}
            </p>
          </FadeIn>

          <DashboardTabs />
        </section>

        {/* Universal Connectivity Layer */}
        <section className="border-t bg-muted/30 min-h-screen flex items-center">
          <div className="max-w-7xl mx-auto w-full py-16 md:py-24 px-4 md:px-8">
            <FadeIn className="text-center mb-12">
              <PixelGridBackground />
              <Badge variant="secondary" className="mb-4">
                <Zap className="h-3 w-3 mr-1" />
                {t("connectivity.badge")}
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                {t("connectivity.title")}
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                {t("connectivity.description")}
              </p>
            </FadeIn>

            <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-4 gap-6" staggerDelay={0.1}>
              {connectivityFeatures.map((feature) => {
                const Icon = feature.icon;
                return (
                  <StaggerItem key={feature.title}>
                    <Card className="h-full text-center">
                      <CardHeader>
                        <div className={`w-12 h-12 ${feature.bgColor} rounded-lg flex items-center justify-center mx-auto mb-4`}>
                          <Icon className={`h-6 w-6 ${feature.iconColor}`} />
                        </div>
                        <CardTitle className="text-lg">{feature.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="text-sm">
                          {feature.description}
                        </CardDescription>
                      </CardContent>
                    </Card>
                  </StaggerItem>
                );
              })}
            </StaggerContainer>
          </div>
        </section>

        {/* The Zap */}
        <section className="border-t bg-muted/30 min-h-screen flex items-center">
          <div className="max-w-7xl mx-auto w-full py-16 md:py-24 px-4 md:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <Badge variant="secondary" className="mb-4">{t("zap.badge")}</Badge>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-left">
                  {t("zap.title")}
                </h2>
                <p className="text-lg text-muted-foreground mb-6 text-left">
                  {t("zap.description")}
                </p>

                <ul className="space-y-3 mb-8">
                  <li className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                    </div>
                    <span>{t("zap.features.response")}</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                    </div>
                    <span>{t("zap.features.offline")}</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                    </div>
                    <span>{t("zap.features.protocols")}</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                    </div>
                    <span>{t("zap.features.sovereignty")}</span>
                  </li>
                </ul>

                <Button asChild>
                  <a href="https://store.sourceful.energy/products/sourceful-energy-zap" target="_blank" rel="noopener noreferrer">
                    {tCommon("buttons.orderNow")}
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </div>

              <div className="flex items-center justify-center">
                <img
                  src="https://framerusercontent.com/images/52u6CS3UoJqPVCIoGLR1YrUww.png?scale-down-to=1024"
                  alt="Sourceful Energy Zap Gateway"
                  className="w-full max-w-md rounded-2xl"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Audiences */}
        <section className="border-t min-h-screen flex items-center">
          <div className="max-w-7xl mx-auto w-full py-16 md:py-24 px-4 md:px-8">
            <FadeIn className="text-center mb-12">
              <div className="flex justify-center mb-8">
                <PixelGrid pattern="corners-only" color="green" size="lg" speed="slow" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                {t("audiences.title")}
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {t("audiences.description")}
              </p>
            </FadeIn>

            <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6" staggerDelay={0.1}>
              {audiences.map((audience) => {
                const Icon = audience.icon;
                return (
                  <StaggerItem key={audience.title}>
                    <Link href={audience.href} className="no-underline hover:no-underline block h-full">
                      <Card className="h-full transition-all hover:shadow-lg hover:border-primary/50 cursor-pointer">
                        <CardHeader>
                          <div className={`w-12 h-12 ${audience.bgColor} rounded-lg flex items-center justify-center mb-4`}>
                            <Icon className={`h-6 w-6 ${audience.iconColor}`} />
                          </div>
                          <CardTitle>{audience.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <CardDescription className="text-base">
                            {audience.description}
                          </CardDescription>
                        </CardContent>
                      </Card>
                    </Link>
                  </StaggerItem>
                );
              })}
            </StaggerContainer>
          </div>
        </section>

        {/* Developer Section */}
        <section className="border-t min-h-screen flex items-center">
          <div className="max-w-7xl mx-auto w-full py-16 md:py-24 px-4 md:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <Badge variant="secondary" className="mb-4">
                  <Code className="h-3 w-3 mr-1" />
                  {t("developers.badge")}
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                  {t("developers.title")}
                </h2>
                <p className="text-lg text-muted-foreground mb-6">
                  {t("developers.description")}
                </p>

                <ul className="space-y-3 mb-8">
                  <li className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                    </div>
                    <span>{t("developers.features.rest")}</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                    </div>
                    <span>{t("developers.features.protocols")}</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                    </div>
                    <span>{t("developers.features.webhooks")}</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                    </div>
                    <span>{t("developers.features.community")}</span>
                  </li>
                </ul>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Button asChild>
                    <a href="https://developer.sourceful.energy" target="_blank" rel="noopener noreferrer">
                      {tCommon("buttons.openDevPortal")}
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href="/developers">
                      {tCommon("buttons.learnMore")}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>

              <div className="bg-muted rounded-lg p-6 font-mono text-sm">
                <div className="text-muted-foreground mb-4"># Control a device in milliseconds</div>
                <pre className="text-foreground overflow-hidden">
{`curl -X POST https://api.sourceful.energy/v1/devices/dev_123/control \\
  -H "Authorization: Bearer src_live_..." \\
  -d '{
    "action": "start_charging",
    "params": {
      "rate_kw": 7.4,
      "duration_minutes": 120
    }
  }'

# Response from local Zap gateway
{
  "status": "executed",
  "latency_ms": 187,
  "device": "dev_123",
  "action": "start_charging"
}`}
                </pre>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing */}
        <PricingSection />

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
                    <Button variant="outline" asChild>
                      <a href="https://discord.gg/srcful" target="_blank" rel="noopener noreferrer">
                        {tCommon("buttons.joinDiscord")}
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                    <Button asChild>
                      <a href="https://developer.sourceful.energy" target="_blank" rel="noopener noreferrer">
                        {tCommon("buttons.openDevPortal")}
                        <ArrowRight className="ml-2 h-4 w-4" />
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
