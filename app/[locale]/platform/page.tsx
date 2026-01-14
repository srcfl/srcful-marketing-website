"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/src/i18n/routing";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MarketingNav } from "@/components/marketing-nav";
import { MarketingFooter } from "@/components/marketing-footer";
import { DashboardTabs } from "@/components/dashboard-tabs";
import { PartnerLogoCarousel } from "@/components/partner-logo-carousel";
import { PricingSection } from "@/components/pricing-section";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animations";
import { PixelGrid } from "@/components/ui/pixel-grid";
import { ArrowRight, Layers, Zap, Cloud, ExternalLink, Server, Gauge, Activity, BarChart3, Users, Code, Wifi, Cable, Radio, Plug, Sun, Globe } from "lucide-react";

export default function PlatformPage() {
  const t = useTranslations("platform");
  const tCommon = useTranslations("common");

  const layers = [
    {
      icon: Zap,
      title: t("architecture.edge.title"),
      subtitle: t("architecture.edge.subtitle"),
      description: t("architecture.edge.description"),
      color: "text-yellow-500",
      bgColor: "bg-yellow-500/10",
      badgeVariant: "warning-soft" as const,
      features: t.raw("architecture.edge.features") as string[],
      offsetY: 0,
    },
    {
      icon: Layers,
      title: t("architecture.coordination.title"),
      subtitle: t("architecture.coordination.subtitle"),
      description: t("architecture.coordination.description"),
      color: "text-primary",
      bgColor: "bg-primary/10",
      badgeVariant: "energy-soft" as const,
      features: t.raw("architecture.coordination.features") as string[],
      offsetY: -24,
    },
    {
      icon: Cloud,
      title: t("architecture.cloud.title"),
      subtitle: t("architecture.cloud.subtitle"),
      description: t("architecture.cloud.description"),
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
      badgeVariant: "info-soft" as const,
      features: t.raw("architecture.cloud.features") as string[],
      offsetY: 0,
    },
  ];

  const capabilities = [
    {
      icon: Server,
      title: t("capabilities.deviceManagement.title"),
      description: t("capabilities.deviceManagement.description"),
      color: "text-emerald-500",
      bgColor: "bg-emerald-500/10",
    },
    {
      icon: Gauge,
      title: t("capabilities.energyOptimization.title"),
      description: t("capabilities.energyOptimization.description"),
      color: "text-yellow-500",
      bgColor: "bg-yellow-500/10",
    },
    {
      icon: Activity,
      title: t("capabilities.gridServices.title"),
      description: t("capabilities.gridServices.description"),
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    {
      icon: BarChart3,
      title: t("capabilities.analytics.title"),
      description: t("capabilities.analytics.description"),
      color: "text-violet-500",
      bgColor: "bg-violet-500/10",
    },
    {
      icon: Users,
      title: t("capabilities.whiteLabel.title"),
      description: t("capabilities.whiteLabel.description"),
      color: "text-pink-500",
      bgColor: "bg-pink-500/10",
    },
    {
      icon: Code,
      title: t("capabilities.api.title"),
      description: t("capabilities.api.description"),
      color: "text-orange-500",
      bgColor: "bg-orange-500/10",
    },
  ];

  const protocols = [
    { name: "P1", description: "Smart Meters", icon: Wifi, note: "180M compatible" },
    { name: "Modbus RTU/TCP", description: "Industrial standard", icon: Cable },
    { name: "MQTT", description: "IoT messaging", icon: Radio },
    { name: "NATS", description: "Cloud native messaging", icon: Zap },
    { name: "OCPP 1.6/2.0", description: "EV charging", icon: Plug },
    { name: "SunSpec", description: "Solar inverters", icon: Sun },
    { name: "REST API", description: "Custom integrations", icon: Globe },
  ];

  // Refs for scroll animations
  const architectureRef = useRef(null);
  const architectureInView = useInView(architectureRef, { once: true, margin: "-100px" });

  const heroLayersRef = useRef(null);
  const heroLayersInView = useInView(heroLayersRef, { once: true, margin: "-50px" });

  const protocolsRef = useRef(null);
  const protocolsInView = useInView(protocolsRef, { once: true, margin: "-50px" });

  return (
    <div className="flex min-h-screen flex-col">
      <MarketingNav />

      <main className="flex-1 pt-16">
        {/* Hero */}
        <section className="relative overflow-hidden border-b">
          <div className="absolute inset-0 bg-dot-pattern" />
          <div className="relative max-w-7xl mx-auto py-24 md:py-32 px-4 md:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <FadeIn>
                <div>
                  <Badge variant="secondary" className="mb-6">
                    <Layers className="h-3 w-3 mr-1" />
                    {t("hero.badge")}
                  </Badge>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                    {t("hero.title")}
                    <br />
                    <span className="text-primary">{t("hero.titleHighlight")}</span>
                  </h1>
                  <p className="text-xl text-muted-foreground mb-8 text-balance">
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
                      <a href="https://developer.sourceful.energy" target="_blank" rel="noopener noreferrer">
                        {tCommon("buttons.viewDocs")}
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                </div>
              </FadeIn>

              {/* Enhanced Hero Visual */}
              <div className="hidden lg:block" ref={heroLayersRef}>
                <div className="relative max-w-sm ml-auto" style={{ perspective: "1000px" }}>
                  {/* 3D Tilted Layer Stack */}
                  <motion.div
                    className="flex flex-col items-center"
                    style={{ transformStyle: "preserve-3d" }}
                    initial={{ rotateX: 15, opacity: 0 }}
                    animate={heroLayersInView ? { rotateX: 10, opacity: 1 } : { rotateX: 15, opacity: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  >
                    {/* Cloud Layer */}
                    <motion.div
                      initial={{ opacity: 0, y: -30, x: -20 }}
                      animate={heroLayersInView ? { opacity: 1, y: 0, x: 0 } : { opacity: 0, y: -30, x: -20 }}
                      transition={{ delay: 0.5, duration: 0.6, type: "spring", stiffness: 100, damping: 15 }}
                      className="relative w-full"
                    >
                      {/* Animated glow - pulses at position 0 and 4 in the sequence */}
                      <motion.div
                        className="absolute inset-0 bg-blue-500/30 rounded-lg blur-xl"
                        initial={{ opacity: 0 }}
                        animate={heroLayersInView ? {
                          opacity: [0, 1, 0, 0, 0, 1, 0],
                        } : { opacity: 0 }}
                        transition={{
                          delay: 1.5,
                          duration: 4,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      />
                      <div className="relative flex items-center gap-4 p-4 bg-blue-500/10 rounded-lg border border-blue-500/20 shadow-lg shadow-blue-500/5">
                        <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                          <Cloud className="h-6 w-6 text-blue-500" />
                        </div>
                        <div className="flex-1">
                          <div className="font-semibold">{t("architecture.cloud.title")}</div>
                          <div className="text-sm text-muted-foreground">{t("architecture.cloud.subtitle")}</div>
                        </div>
                      </div>
                    </motion.div>

                    {/* Connector */}
                    <motion.div
                      initial={{ opacity: 0, scaleY: 0 }}
                      animate={heroLayersInView ? { opacity: 1, scaleY: 1 } : { opacity: 0, scaleY: 0 }}
                      transition={{ delay: 0.7, duration: 0.3 }}
                    >
                      <div className="w-0.5 h-6 bg-gradient-to-b from-blue-500/50 to-primary/50" />
                    </motion.div>

                    {/* Coordination Layer */}
                    <motion.div
                      initial={{ opacity: 0, y: -30, x: -20 }}
                      animate={heroLayersInView ? { opacity: 1, y: 0, x: 0 } : { opacity: 0, y: -30, x: -20 }}
                      transition={{ delay: 0.3, duration: 0.6, type: "spring", stiffness: 100, damping: 15 }}
                      className="relative w-full"
                    >
                      {/* Animated glow - pulses at position 1 and 3 in the sequence */}
                      <motion.div
                        className="absolute inset-0 bg-primary/30 rounded-lg blur-xl"
                        initial={{ opacity: 0 }}
                        animate={heroLayersInView ? {
                          opacity: [0, 0, 1, 0, 1, 0, 0],
                        } : { opacity: 0 }}
                        transition={{
                          delay: 1.5,
                          duration: 4,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      />
                      <div className="relative flex items-center gap-4 p-4 bg-primary/10 rounded-lg border border-primary/20 shadow-lg shadow-primary/10">
                        <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                          <Layers className="h-6 w-6 text-primary" />
                        </div>
                        <div className="flex-1">
                          <div className="font-semibold">{t("architecture.coordination.title")}</div>
                          <div className="text-sm text-muted-foreground">{t("architecture.coordination.subtitle")}</div>
                        </div>
                      </div>
                    </motion.div>

                    {/* Connector */}
                    <motion.div
                      initial={{ opacity: 0, scaleY: 0 }}
                      animate={heroLayersInView ? { opacity: 1, scaleY: 1 } : { opacity: 0, scaleY: 0 }}
                      transition={{ delay: 0.5, duration: 0.3 }}
                    >
                      <div className="w-0.5 h-6 bg-gradient-to-b from-primary/50 to-yellow-500/50" />
                    </motion.div>

                    {/* Edge Layer */}
                    <motion.div
                      initial={{ opacity: 0, y: -30, x: -20 }}
                      animate={heroLayersInView ? { opacity: 1, y: 0, x: 0 } : { opacity: 0, y: -30, x: -20 }}
                      transition={{ delay: 0.1, duration: 0.6, type: "spring", stiffness: 100, damping: 15 }}
                      className="relative w-full"
                    >
                      {/* Animated glow - pulses at position 2 in the sequence */}
                      <motion.div
                        className="absolute inset-0 bg-yellow-500/30 rounded-lg blur-xl"
                        initial={{ opacity: 0 }}
                        animate={heroLayersInView ? {
                          opacity: [0, 0, 0, 1, 0, 0, 0],
                        } : { opacity: 0 }}
                        transition={{
                          delay: 1.5,
                          duration: 4,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      />
                      <div className="relative flex items-center gap-4 p-4 bg-yellow-500/10 rounded-lg border border-yellow-500/30 shadow-lg shadow-yellow-500/20">
                        <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                          <Zap className="h-6 w-6 text-yellow-500" />
                        </div>
                        <div className="flex-1">
                          <div className="font-semibold">{t("architecture.edge.title")}</div>
                          <div className="text-sm text-muted-foreground">{t("architecture.edge.subtitle")}</div>
                        </div>
                        <Badge variant="outline" className="bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/30">
                          200ms
                        </Badge>
                      </div>
                    </motion.div>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Dashboard Preview - Using DashboardTabs from home page */}
        <section className="border-b">
          <div className="max-w-7xl mx-auto py-16 md:py-24 px-4 md:px-8">
            <FadeIn className="text-center mb-12">
              <Badge variant="secondary" className="mb-4">{t("preview.badge")}</Badge>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                {t("preview.title")}
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {t("preview.description")}
              </p>
            </FadeIn>
            <DashboardTabs />
          </div>
        </section>

        {/* Architecture - Staggered Cards */}
        <section className="bg-muted/30">
          <div className="max-w-7xl mx-auto py-24 md:py-32 px-4 md:px-8">
            <FadeIn className="text-center mb-16 md:mb-20">
              <div className="flex justify-center mb-6">
                <PixelGrid pattern="plus-hollow" color="green" size="lg" speed="slow" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                {t("architecture.title")}
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {t("architecture.description")}
              </p>
            </FadeIn>

            {/* Desktop: Staggered layout */}
            <div ref={architectureRef} className="hidden lg:grid lg:grid-cols-3 gap-6">
              {layers.map((layer, index) => {
                const Icon = layer.icon;
                return (
                  <motion.div
                    key={layer.title}
                    initial={{ opacity: 0, y: 60 }}
                    animate={architectureInView ? { opacity: 1, y: layer.offsetY } : { opacity: 0, y: 60 }}
                    transition={{
                      delay: index * 0.15,
                      duration: 0.6,
                      type: "spring",
                      stiffness: 100,
                      damping: 12,
                    }}
                  >
                    <Card className="h-full transition-all hover:shadow-lg">
                      <CardHeader>
                        <div className={`w-14 h-14 ${layer.bgColor} rounded-xl flex items-center justify-center mb-4`}>
                          <Icon className={`h-7 w-7 ${layer.color}`} />
                        </div>
                        <CardTitle>{layer.title}</CardTitle>
                        <p className="text-sm text-muted-foreground">{layer.subtitle}</p>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="text-base mb-4">
                          {layer.description}
                        </CardDescription>
                        <div className="flex flex-wrap gap-2">
                          {layer.features.map((feature) => (
                            <Badge key={feature} variant={layer.badgeVariant} className="text-xs">
                              {feature}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>

            {/* Mobile/Tablet: Standard stagger */}
            <StaggerContainer className="grid md:grid-cols-3 gap-6 lg:hidden" staggerDelay={0.1}>
              {layers.map((layer) => {
                const Icon = layer.icon;
                return (
                  <StaggerItem key={layer.title}>
                    <Card className="h-full">
                      <CardHeader>
                        <div className={`w-14 h-14 ${layer.bgColor} rounded-xl flex items-center justify-center mb-4`}>
                          <Icon className={`h-7 w-7 ${layer.color}`} />
                        </div>
                        <CardTitle>{layer.title}</CardTitle>
                        <p className="text-sm text-muted-foreground">{layer.subtitle}</p>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="text-base mb-4">
                          {layer.description}
                        </CardDescription>
                        <div className="flex flex-wrap gap-2">
                          {layer.features.map((feature) => (
                            <Badge key={feature} variant={layer.badgeVariant} className="text-xs">
                              {feature}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </StaggerItem>
                );
              })}
            </StaggerContainer>
          </div>
        </section>

        {/* Local Execution + Protocols - Redesigned */}
        <section className="border-t">
          <div className="max-w-7xl mx-auto py-16 md:py-24 px-4 md:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <FadeIn>
                <div>
                  <div className="mb-6">
                    <PixelGrid pattern="sparse-1" color="green" size="md" speed="slow" />
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
                    {t("localExecution.title")}
                  </h2>
                  <p className="text-lg text-muted-foreground mb-6">
                    {t("localExecution.description1")}
                  </p>
                  <p className="text-lg text-muted-foreground mb-6">
                    {t("localExecution.description2")}
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-primary/10 rounded-lg p-4 text-center border border-primary/20">
                      <div className="text-3xl font-bold text-primary">200ms</div>
                      <div className="text-sm text-muted-foreground">{t("localExecution.localResponse")}</div>
                    </div>
                    <div className="bg-muted rounded-lg p-4 text-center">
                      <div className="text-3xl font-bold text-muted-foreground">2-5s</div>
                      <div className="text-sm text-muted-foreground">{t("localExecution.cloudResponse")}</div>
                    </div>
                  </div>
                </div>
              </FadeIn>

              {/* Protocols Card - V2X Savings style */}
              <div ref={protocolsRef}>
                <Card className="shadow-lg border-border/50">
                  <CardHeader className="border-b">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                          <Cable className="h-5 w-5 text-primary" />
                        </div>
                        <CardTitle className="text-lg">{t("localExecution.protocols")}</CardTitle>
                      </div>
                      <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20">
                        Universal
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="divide-y divide-border/30">
                      {protocols.map((protocol, index) => {
                        const Icon = protocol.icon;
                        return (
                          <motion.div
                            key={protocol.name}
                            initial={{ opacity: 0, x: -20 }}
                            animate={protocolsInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                            transition={{ delay: index * 0.1, duration: 0.4 }}
                            className="flex items-center justify-between px-6 py-4"
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center">
                                <Icon className="h-4 w-4 text-muted-foreground" />
                              </div>
                              <div>
                                <div className="font-medium text-sm">{protocol.name}</div>
                                <div className="text-xs text-muted-foreground">{protocol.description}</div>
                              </div>
                            </div>
                            {protocol.note && (
                              <Badge variant="secondary" className="text-xs">
                                {protocol.note}
                              </Badge>
                            )}
                          </motion.div>
                        );
                      })}
                    </div>
                    <div className="px-6 py-4 bg-muted/30 border-t">
                      <p className="text-sm text-muted-foreground">
                        {t("localExecution.metersNote")}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Capabilities */}
        <section className="border-t bg-muted/30">
          <div className="max-w-7xl mx-auto py-16 md:py-24 px-4 md:px-8">
            <FadeIn className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                {t("capabilities.title")}
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {t("capabilities.description")}
              </p>
            </FadeIn>

            <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" staggerDelay={0.1}>
              {capabilities.map((capability) => {
                const Icon = capability.icon;
                return (
                  <StaggerItem key={capability.title}>
                    <Card className="h-full">
                      <CardHeader>
                        <div className={`w-10 h-10 ${capability.bgColor} rounded-lg flex items-center justify-center mb-3`}>
                          <Icon className={`h-5 w-5 ${capability.color}`} />
                        </div>
                        <CardTitle className="text-lg">{capability.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="text-base">{capability.description}</CardDescription>
                      </CardContent>
                    </Card>
                  </StaggerItem>
                );
              })}
            </StaggerContainer>
          </div>
        </section>

        {/* Partner Logos */}
        <section className="border-t">
          <div className="max-w-7xl mx-auto py-12 md:py-16 px-4 md:px-8">
            <div className="text-center mb-8">
              <p className="text-sm text-muted-foreground uppercase tracking-wider font-medium">
                {t("partners.title")}
              </p>
            </div>
            <PartnerLogoCarousel speed={35} />
          </div>
        </section>

        {/* Pricing Section - Replaces old pricing and CTA */}
        <PricingSection />
      </main>

      <MarketingFooter />
    </div>
  );
}
