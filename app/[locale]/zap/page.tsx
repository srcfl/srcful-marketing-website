"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/src/i18n/routing";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MarketingNav } from "@/components/marketing-nav";
import { MarketingFooter } from "@/components/marketing-footer";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animations";
import { ZapImage } from "@/components/zap-image";
import { PixelGrid } from "@/components/ui/pixel-grid";
import { PricingSection } from "@/components/pricing-section";
import { GridFrequencyAnimation } from "@/components/grid-frequency-animation";
import { ArrowRight, Zap, Clock, WifiOff, Shield, Cpu, Gauge, Plug, Battery, Sun, Thermometer, Car, Users, ExternalLink } from "lucide-react";

export default function ZapPage() {
  const t = useTranslations("zap");
  const tCommon = useTranslations("common");

  const features = [
    {
      icon: Clock,
      title: t("features.speed.title"),
      description: t("features.speed.description"),
      color: "bg-yellow-500/10 text-yellow-500",
    },
    {
      icon: WifiOff,
      title: t("features.offline.title"),
      description: t("features.offline.description"),
      color: "bg-blue-500/10 text-blue-500",
    },
    {
      icon: Shield,
      title: t("features.sovereignty.title"),
      description: t("features.sovereignty.description"),
      color: "bg-purple-500/10 text-purple-500",
    },
    {
      icon: Cpu,
      title: t("features.protocols.title"),
      description: t("features.protocols.description"),
      color: "bg-green-500/10 text-green-500",
    },
  ];

  const devices = [
    { key: "smartMeters", icon: Gauge, color: "bg-blue-500/10 text-blue-500" },
    { key: "evChargers", icon: Plug, color: "bg-green-500/10 text-green-500" },
    { key: "batterySystems", icon: Battery, color: "bg-purple-500/10 text-purple-500" },
    { key: "inverters", icon: Sun, color: "bg-yellow-500/10 text-yellow-500" },
    { key: "heatPumps", icon: Thermometer, color: "bg-red-500/10 text-red-500" },
    { key: "v2xSystems", icon: Car, color: "bg-indigo-500/10 text-indigo-500" },
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
                <div className="text-left">
                  <Badge variant="secondary" className="mb-6">
                    <Zap className="h-3 w-3 mr-1" />
                    {t("hero.badge")}
                  </Badge>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-left">
                    {t("hero.title")}
                  </h1>
                  <p className="text-xl text-muted-foreground mb-8 text-left">
                    {t("hero.description")}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button size="lg" asChild>
                      <Link href="/pricing">
                        {tCommon("buttons.orderNow")}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                    <Button size="lg" variant="outline" asChild>
                      <a href="https://developer.sourceful.energy/hardware" target="_blank" rel="noopener noreferrer">
                        {tCommon("buttons.viewDocs")}
                      </a>
                    </Button>
                  </div>
                </div>
              </FadeIn>
              <FadeIn delay={0.2}>
                <div className="flex items-center justify-center">
                  <ZapImage className="w-full max-w-md" alt="Sourceful Energy Zap Gateway" />
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* Specs */}
        <section className="bg-muted/30 border-b">
          <div className="max-w-7xl mx-auto py-12 px-4 md:px-8">
            <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-8" staggerDelay={0.1}>
              <StaggerItem>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-primary">200ms</div>
                  <div className="font-medium">{t("features.speed.title")}</div>
                  <div className="text-sm text-muted-foreground">{t("specs.localExecution")}</div>
                </div>
              </StaggerItem>
              <StaggerItem>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-primary">{t("hero.price")}</div>
                  <div className="font-medium">{t("specs.price")}</div>
                  <div className="text-sm text-muted-foreground">{t("hero.priceNote")}</div>
                </div>
              </StaggerItem>
              <StaggerItem>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-primary">180M</div>
                  <div className="font-medium">{t("specs.compatibility")}</div>
                  <div className="text-sm text-muted-foreground">{t("specs.euSmartMeters")}</div>
                </div>
              </StaggerItem>
              <StaggerItem>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-primary">5+</div>
                  <div className="font-medium">{t("specs.protocols")}</div>
                  <div className="text-sm text-muted-foreground">P1, Modbus, MQTT, OCPP</div>
                </div>
              </StaggerItem>
            </StaggerContainer>
          </div>
        </section>

        {/* Problem */}
        <section className="max-w-7xl mx-auto py-24 md:py-32 px-4 md:px-8">
          <FadeIn className="max-w-3xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <PixelGrid pattern="sparse-1" color="green" size="md" speed="slow" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
              {t("features.title")}
            </h2>
            <p className="text-lg text-muted-foreground mb-8 text-balance">
              {t("features.description")}
            </p>
            <GridFrequencyAnimation />
          </FadeIn>
        </section>

        {/* Features */}
        <section className="border-t bg-muted/30">
          <div className="max-w-7xl mx-auto py-16 md:py-24 px-4 md:px-8">
            <StaggerContainer className="grid md:grid-cols-2 gap-6" staggerDelay={0.1}>
              {features.map((feature) => {
                const Icon = feature.icon;
                return (
                  <StaggerItem key={feature.title}>
                    <Card className="h-full">
                      <CardHeader>
                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${feature.color.split(' ')[0]}`}>
                          <Icon className={`h-6 w-6 ${feature.color.split(' ')[1]}`} />
                        </div>
                        <CardTitle>{feature.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="text-base">
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

        {/* Technical */}
        <section className="border-t">
          <div className="max-w-7xl mx-auto py-16 md:py-24 px-4 md:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <FadeIn>
                <div>
                  <PixelGrid pattern="plus-hollow" color="green" size="md" speed="slow" className="mb-6" />
                  <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
                    {t("specs.title")}
                  </h2>
                  <div className="space-y-4">
                    <div className="flex justify-between py-3 border-b">
                      <span className="text-muted-foreground">{t("specs.processor")}</span>
                      <span className="font-medium">ESP32-S3</span>
                    </div>
                    <div className="flex justify-between py-3 border-b">
                      <span className="text-muted-foreground">{t("specs.connectivity")}</span>
                      <span className="font-medium">WiFi, Ethernet, RS485</span>
                    </div>
                    <div className="flex justify-between py-3 border-b">
                      <span className="text-muted-foreground">{t("specs.protocols")}</span>
                      <span className="font-medium">P1, Modbus, MQTT, OCPP</span>
                    </div>
                    <div className="flex justify-between py-3 border-b">
                      <span className="text-muted-foreground">{t("specs.power")}</span>
                      <span className="font-medium">USB-C, 5V</span>
                    </div>
                    <div className="flex justify-between py-3 border-b">
                      <span className="text-muted-foreground">{t("specs.responseTime")}</span>
                      <span className="font-medium">{t("specs.responseValue")}</span>
                    </div>
                    <div className="flex justify-between py-3">
                      <span className="text-muted-foreground">{t("specs.firmware")}</span>
                      <span className="font-medium">{t("specs.firmwareValue")}</span>
                    </div>
                  </div>
                </div>
              </FadeIn>
              <FadeIn delay={0.2}>
                <Card className="shadow-lg border-border/50 max-w-md mx-auto">
                  <CardHeader className="pb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Plug className="h-5 w-5 text-primary" />
                      </div>
                      <CardTitle className="text-lg">{t("compatibility.title")}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <StaggerContainer staggerDelay={0.05}>
                      {devices.map((device) => {
                        const Icon = device.icon;
                        return (
                          <StaggerItem key={device.key}>
                            <div className="flex items-center gap-3 py-2 border-b border-border/50 last:border-0">
                              <div className={`w-8 h-8 rounded-md flex items-center justify-center ${device.color}`}>
                                <Icon className="h-4 w-4" />
                              </div>
                              <span className="text-sm font-medium">{t(`devices.${device.key}`)}</span>
                            </div>
                          </StaggerItem>
                        );
                      })}
                    </StaggerContainer>
                    <p className="text-sm text-muted-foreground pt-2">
                      {t("compatibility.description")}{" "}
                      <Link href="/integrations" className="text-primary hover:underline">
                        {t("compatibility.viewAll")}
                      </Link>
                    </p>
                  </CardContent>
                </Card>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* V2X Section */}
        <section className="border-t bg-gradient-to-br from-primary/5 via-primary/3 to-background">
          <div className="max-w-7xl mx-auto py-16 md:py-24 px-4 md:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <FadeIn>
                <div>
                  <Badge variant="outline" className="mb-4 border-primary/50 text-primary">
                    <Car className="h-3 w-3 mr-1" />
                    {t("v2x.badge")}
                  </Badge>
                  <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                    {t("v2x.title")}
                  </h2>
                  <p className="text-lg text-muted-foreground mb-6">
                    {t("v2x.description")}
                  </p>
                  <div className="space-y-3 mb-8">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Battery className="h-4 w-4 text-primary" />
                      </div>
                      <span className="text-sm">{t("v2x.benefits.earn.title")}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Zap className="h-4 w-4 text-primary" />
                      </div>
                      <span className="text-sm">{t("v2x.benefits.backup.title")}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Sun className="h-4 w-4 text-primary" />
                      </div>
                      <span className="text-sm">{t("v2x.benefits.optimize.title")}</span>
                    </div>
                  </div>
                  <Button asChild>
                    <Link href="/v2x">
                      {tCommon("buttons.learnMore")}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </FadeIn>
              <FadeIn delay={0.2}>
                <Card className="bg-background/80 backdrop-blur border-primary/20">
                  <CardHeader>
                    <CardTitle>{t("v2x.requiresProTitle")}</CardTitle>
                    <CardDescription>{t("v2x.requiresProDescription")}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-primary mb-2">€60<span className="text-lg font-normal text-muted-foreground">/year</span></div>
                    <p className="text-sm text-muted-foreground mb-4">{t("v2x.proIncludes")}</p>
                    <Button className="w-full" asChild>
                      <Link href="/pricing">
                        {t("v2x.getZapPro")}
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </FadeIn>
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
