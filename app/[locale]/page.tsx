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
import { TypewriterCode } from "@/components/typewriter-code";
import { ZapImage } from "@/components/zap-image";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { LucideIcon } from "lucide-react";

interface Audience {
  icon: LucideIcon;
  title: string;
  description: string;
  href: string;
  iconColor: string;
  bgColor: string;
  offsetY: number;
}

function AudienceCards({ audiences }: { audiences: Audience[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <>
      {/* Desktop: Animated cards with stagger and bounce */}
      <div ref={containerRef} className="hidden xl:grid xl:grid-cols-5 gap-6">
        {audiences.map((audience, index) => {
          const Icon = audience.icon;
          return (
            <motion.div
              key={audience.title}
              initial={{ opacity: 0, y: 60 }}
              animate={isInView ? {
                opacity: 1,
                y: audience.offsetY
              } : { opacity: 0, y: 60 }}
              transition={{
                delay: index * 0.1,
                duration: 0.6,
                type: "spring",
                stiffness: 100,
                damping: 12,
              }}
              className="h-full"
            >
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
            </motion.div>
          );
        })}
      </div>

      {/* Mobile/Tablet: Standard stagger animation */}
      <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 xl:hidden" staggerDelay={0.1}>
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
    </>
  );
}

function InstallerStats({ t }: { t: ReturnType<typeof useTranslations<"home">> }) {
  const statsRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(statsRef, { once: true, margin: "-50px" });

  const stats = [
    { num: "supportReductionNum", unit: "supportReductionUnit", label: "supportReductionLabel" },
    { num: "installTimeNum", unit: "installTimeUnit", label: "installTimeLabel", unitSpace: true },
    { num: "brandsNum", unit: "brandsUnit", label: "brandsLabel" },
    { num: "subscriptionNum", unit: "subscriptionUnit", label: "subscriptionLabel", unitSpace: true },
  ];

  return (
    <div ref={statsRef} className="grid grid-cols-2 gap-3 w-fit ml-auto">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.num}
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={isInView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.8, y: 20 }}
          transition={{
            delay: index * 0.1,
            duration: 0.5,
            type: "spring",
            stiffness: 100,
            damping: 12,
          }}
        >
          <Card className="w-[180px] h-[180px] flex flex-col items-center justify-center text-center p-3">
            <div className="font-bold text-indigo-500 mb-1">
              <span className="text-5xl">{t(`installers.stats.${stat.num}`)}</span>
              <span className={`text-lg ${stat.unitSpace ? "ml-1" : ""}`}>{t(`installers.stats.${stat.unit}`)}</span>
            </div>
            <div className="text-xs text-muted-foreground">
              {t(`installers.stats.${stat.label}`)}
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}

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
      icon: Building2,
      title: t("audiences.utilities.title"),
      description: t("audiences.utilities.description"),
      href: "/use-cases/utilities",
      iconColor: "text-violet-500",
      bgColor: "bg-violet-500/10",
      offsetY: 48,
    },
    {
      icon: CircuitBoard,
      title: t("audiences.oems.title"),
      description: t("audiences.oems.description"),
      href: "/use-cases/oems",
      iconColor: "text-amber-500",
      bgColor: "bg-amber-500/10",
      offsetY: 24,
    },
    {
      icon: Users,
      title: t("audiences.homeowners.title"),
      description: t("audiences.homeowners.description"),
      href: "/use-cases/homeowners",
      iconColor: "text-blue-500",
      bgColor: "bg-blue-500/10",
      offsetY: 0,
    },
    {
      icon: Wrench,
      title: t("audiences.installers.title"),
      description: t("audiences.installers.description"),
      href: "/use-cases/installers",
      iconColor: "text-indigo-500",
      bgColor: "bg-indigo-500/10",
      offsetY: 24,
    },
    {
      icon: Code,
      title: t("audiences.developers.title"),
      description: t("audiences.developers.description"),
      href: "/developers",
      iconColor: "text-primary",
      bgColor: "bg-primary/10",
      offsetY: 48,
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
                  <Link href="/pricing">
                    {tCommon("buttons.orderNow")}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>

              <div className="flex items-center justify-center">
                <ZapImage className="w-full max-w-md" alt="Sourceful Energy Zap Gateway" />
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

            <AudienceCards audiences={audiences} />
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

              <TypewriterCode
                comment="# Control a device in milliseconds"
                speed={8}
                code={`curl -X POST https://api.sourceful.energy/v1/devices/dev_123/control \\
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
              />
            </div>
          </div>
        </section>

        {/* For Installers Section */}
        <section className="border-t bg-muted/30 min-h-screen flex items-center">
          <div className="max-w-7xl mx-auto w-full py-16 md:py-24 px-4 md:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <Badge variant="secondary" className="mb-4">
                  <Wrench className="h-3 w-3 mr-1" />
                  {t("installers.badge")}
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                  {t("installers.title")}
                </h2>
                <p className="text-lg text-muted-foreground mb-6">
                  {t("installers.description")}
                </p>

                <ul className="space-y-3 mb-8">
                  <li className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-indigo-500/10 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-indigo-500" />
                    </div>
                    <span>{t("installers.features.brandAgnostic")}</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-indigo-500/10 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-indigo-500" />
                    </div>
                    <span>{t("installers.features.oneInterface")}</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-indigo-500/10 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-indigo-500" />
                    </div>
                    <span>{t("installers.features.weHandleSupport")}</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-indigo-500/10 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-indigo-500" />
                    </div>
                    <span>{t("installers.features.noLicenseAdmin")}</span>
                  </li>
                </ul>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Button className="bg-indigo-500 hover:bg-indigo-600" asChild>
                    <Link href="/use-cases/installers">
                      {tCommon("buttons.learnMore")}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <a href="https://store.sourceful.energy/products/sourceful-energy-zap" target="_blank" rel="noopener noreferrer">
                      {tCommon("buttons.orderNow")}
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </div>

              <InstallerStats t={t} />
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
                    <Button asChild>
                      <a href="https://discord.gg/srcful" target="_blank" rel="noopener noreferrer">
                        {tCommon("buttons.joinDiscord")}
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                    <Button variant="outline" asChild>
                      <Link href="/contact">
                        {tCommon("nav.contact")}
                      </Link>
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
