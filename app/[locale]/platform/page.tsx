"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/src/i18n/routing";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MarketingNav } from "@/components/marketing-nav";
import { MarketingFooter } from "@/components/marketing-footer";
import { PlatformDashboardPreview } from "@/components/platform-dashboard-preview";
import { PartnerLogoCarousel } from "@/components/partner-logo-carousel";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animations";
import { ArrowRight, Layers, Zap, Cloud, Shield, Activity, Code, ExternalLink, Server, Gauge, BarChart3, Users } from "lucide-react";

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
      features: t.raw("architecture.edge.features") as string[],
    },
    {
      icon: Layers,
      title: t("architecture.coordination.title"),
      subtitle: t("architecture.coordination.subtitle"),
      description: t("architecture.coordination.description"),
      color: "text-primary",
      bgColor: "bg-primary/10",
      features: t.raw("architecture.coordination.features") as string[],
    },
    {
      icon: Cloud,
      title: t("architecture.cloud.title"),
      subtitle: t("architecture.cloud.subtitle"),
      description: t("architecture.cloud.description"),
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
      features: t.raw("architecture.cloud.features") as string[],
    },
  ];

  const capabilities = [
    {
      icon: Server,
      title: t("capabilities.deviceManagement.title"),
      description: t("capabilities.deviceManagement.description"),
    },
    {
      icon: Gauge,
      title: t("capabilities.energyOptimization.title"),
      description: t("capabilities.energyOptimization.description"),
    },
    {
      icon: Activity,
      title: t("capabilities.gridServices.title"),
      description: t("capabilities.gridServices.description"),
    },
    {
      icon: BarChart3,
      title: t("capabilities.analytics.title"),
      description: t("capabilities.analytics.description"),
    },
    {
      icon: Users,
      title: t("capabilities.whiteLabel.title"),
      description: t("capabilities.whiteLabel.description"),
    },
    {
      icon: Code,
      title: t("capabilities.api.title"),
      description: t("capabilities.api.description"),
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
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <FadeIn>
                <div>
                  <Badge variant="secondary" className="mb-6">
                    <Layers className="h-3 w-3 mr-1" />
                    {t("hero.badge")}
                  </Badge>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                    {t("hero.title")}{" "}
                    <span className="text-primary">{t("hero.titleHighlight")}</span>
                  </h1>
                  <p className="text-xl text-muted-foreground mb-8">
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
              <div className="hidden lg:block">
                <FadeIn delay={0.2}>
                  <div className="relative">
                    {/* Architecture diagram visualization */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-4 p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
                        <Cloud className="h-8 w-8 text-blue-500" />
                        <div>
                          <div className="font-semibold">{t("architecture.cloud.title")}</div>
                          <div className="text-sm text-muted-foreground">{t("architecture.cloud.subtitle")}</div>
                        </div>
                      </div>
                      <div className="flex justify-center">
                        <div className="w-0.5 h-8 bg-border" />
                      </div>
                      <div className="flex items-center gap-4 p-4 bg-primary/10 rounded-lg border border-primary/20">
                        <Layers className="h-8 w-8 text-primary" />
                        <div>
                          <div className="font-semibold">{t("architecture.coordination.title")}</div>
                          <div className="text-sm text-muted-foreground">{t("architecture.coordination.subtitle")}</div>
                        </div>
                      </div>
                      <div className="flex justify-center">
                        <div className="w-0.5 h-8 bg-border" />
                      </div>
                      <div className="flex items-center gap-4 p-4 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
                        <Zap className="h-8 w-8 text-yellow-500" />
                        <div>
                          <div className="font-semibold">{t("architecture.edge.title")}</div>
                          <div className="text-sm text-muted-foreground">{t("architecture.edge.subtitle")} • 200ms</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </FadeIn>
              </div>
            </div>
          </div>
        </section>

        {/* Dashboard Preview */}
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
            <PlatformDashboardPreview />
          </div>
        </section>

        {/* Architecture */}
        <section className="bg-muted/30">
          <div className="max-w-7xl mx-auto py-16 md:py-24 px-4 md:px-8">
            <FadeIn className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                {t("architecture.title")}
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {t("architecture.description")}
              </p>
            </FadeIn>

            <StaggerContainer className="grid md:grid-cols-3 gap-6" staggerDelay={0.1}>
              {layers.map((layer) => {
                const Icon = layer.icon;
                return (
                  <StaggerItem key={layer.title}>
                    <Card className="relative overflow-hidden h-full">
                      <div className={`absolute top-0 left-0 right-0 h-1 ${layer.bgColor.replace('/10', '')}`} />
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
                            <Badge key={feature} variant="outline" className="text-xs">
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

        {/* Key differentiator */}
        <section className="border-t">
          <div className="max-w-7xl mx-auto py-16 md:py-24 px-4 md:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <FadeIn>
                <div>
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
              <FadeIn delay={0.2}>
                <div className="bg-muted rounded-lg p-8">
                  <h3 className="font-semibold mb-4">{t("localExecution.protocols")}</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {["P1 (Smart Meters)", "Modbus RTU/TCP", "MQTT", "OCPP 1.6/2.0", "SunSpec", "REST API"].map((protocol) => (
                      <div key={protocol} className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-primary" />
                        <span className="text-sm">{protocol}</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground mt-4">
                    {t("localExecution.metersNote")}
                  </p>
                </div>
              </FadeIn>
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
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mb-3">
                          <Icon className="h-5 w-5 text-primary" />
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

        {/* Business model */}
        <section className="border-t bg-muted/30">
          <div className="max-w-7xl mx-auto py-16 md:py-24 px-4 md:px-8">
            <FadeIn className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                {t("pricing.title")}
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {t("pricing.description")}
              </p>
            </FadeIn>

            <StaggerContainer className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto" staggerDelay={0.1}>
              <StaggerItem>
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle className="text-lg">{t("pricing.saas.title")}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-primary mb-2">{t("pricing.saas.price")}</div>
                    <CardDescription>{t("pricing.saas.unit")}</CardDescription>
                  </CardContent>
                </Card>
              </StaggerItem>
              <StaggerItem>
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle className="text-lg">{t("pricing.gridServices.title")}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-primary mb-2">{t("pricing.gridServices.price")}</div>
                    <CardDescription>{t("pricing.gridServices.unit")}</CardDescription>
                  </CardContent>
                </Card>
              </StaggerItem>
              <StaggerItem>
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle className="text-lg">{t("pricing.api.title")}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-primary mb-2">{t("pricing.api.price")}</div>
                    <CardDescription>{t("pricing.api.unit")}</CardDescription>
                  </CardContent>
                </Card>
              </StaggerItem>
            </StaggerContainer>
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
                <Button size="lg" asChild>
                  <Link href="/contact">
                    {tCommon("buttons.scheduledDemo")}
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
            </FadeIn>
          </div>
        </section>
      </main>

      <MarketingFooter />
    </div>
  );
}
