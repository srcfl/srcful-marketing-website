"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/src/i18n/routing";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MarketingNav } from "@/components/marketing-nav";
import { MarketingFooter } from "@/components/marketing-footer";
import { V2XWaitlistSection } from "@/components/v2x-waitlist-section";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animations";
import { ArrowRight, Zap, Clock, Wifi, WifiOff, Shield, Cpu, ExternalLink } from "lucide-react";

export default function ZapPage() {
  const t = useTranslations("zap");
  const tCommon = useTranslations("common");

  const specs = [
    { label: t("features.speed.title"), value: "200ms", description: t("features.speed.description").substring(0, 30) + "..." },
    { label: t("hero.price"), value: t("hero.price"), description: t("hero.priceNote") },
    { label: "Compatibility", value: "180M", description: "EU smart meters" },
    { label: t("features.protocols.title"), value: "5+", description: "P1, Modbus, MQTT, OCPP" },
  ];

  const features = [
    {
      icon: Clock,
      title: t("features.speed.title"),
      description: t("features.speed.description"),
    },
    {
      icon: WifiOff,
      title: t("features.offline.title"),
      description: t("features.offline.description"),
    },
    {
      icon: Shield,
      title: t("features.sovereignty.title"),
      description: t("features.sovereignty.description"),
    },
    {
      icon: Cpu,
      title: t("features.protocols.title"),
      description: t("features.protocols.description"),
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
                      <a href="https://store.sourceful.energy/products/sourceful-energy-zap" target="_blank" rel="noopener noreferrer">
                        {tCommon("buttons.orderNow")}
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </a>
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
                  <img
                    src="https://framerusercontent.com/images/52u6CS3UoJqPVCIoGLR1YrUww.png?scale-down-to=1024"
                    alt="Sourceful Energy Zap Gateway"
                    className="w-full max-w-md rounded-2xl"
                  />
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
                  <div className="text-sm text-muted-foreground">Local execution</div>
                </div>
              </StaggerItem>
              <StaggerItem>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-primary">{t("hero.price")}</div>
                  <div className="font-medium">Price</div>
                  <div className="text-sm text-muted-foreground">{t("hero.priceNote")}</div>
                </div>
              </StaggerItem>
              <StaggerItem>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-primary">180M</div>
                  <div className="font-medium">Compatibility</div>
                  <div className="text-sm text-muted-foreground">EU smart meters</div>
                </div>
              </StaggerItem>
              <StaggerItem>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-primary">5+</div>
                  <div className="font-medium">Protocols</div>
                  <div className="text-sm text-muted-foreground">P1, Modbus, MQTT, OCPP</div>
                </div>
              </StaggerItem>
            </StaggerContainer>
          </div>
        </section>

        {/* Problem */}
        <section className="max-w-7xl mx-auto py-16 md:py-24 px-4 md:px-8">
          <FadeIn className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
              {t("features.title")}
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              {t("features.description")}
            </p>
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
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                          <Icon className="h-6 w-6 text-primary" />
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
                      <span className="text-muted-foreground">Protocols</span>
                      <span className="font-medium">P1, Modbus, MQTT, OCPP</span>
                    </div>
                    <div className="flex justify-between py-3 border-b">
                      <span className="text-muted-foreground">{t("specs.power")}</span>
                      <span className="font-medium">USB-C, 5V</span>
                    </div>
                    <div className="flex justify-between py-3 border-b">
                      <span className="text-muted-foreground">Response Time</span>
                      <span className="font-medium">&lt;200ms local</span>
                    </div>
                    <div className="flex justify-between py-3">
                      <span className="text-muted-foreground">Firmware</span>
                      <span className="font-medium">OTA updates</span>
                    </div>
                  </div>
                </div>
              </FadeIn>
              <FadeIn delay={0.2}>
                <div className="bg-muted rounded-lg p-8">
                  <h3 className="font-semibold mb-4">{t("compatibility.title")}</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      "Smart Meters (P1)",
                      "EV Chargers",
                      "Battery Systems",
                      "Inverters",
                      "Heat Pumps",
                      "V2X Systems",
                    ].map((device) => (
                      <div key={device} className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-primary" />
                        <span className="text-sm">{device}</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground mt-6">
                    {t("compatibility.description")}
                  </p>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* V2X Waitlist */}
        <V2XWaitlistSection />

        {/* Pricing */}
        <section className="border-t bg-muted/30">
          <div className="max-w-7xl mx-auto py-16 md:py-24 px-4 md:px-8">
            <FadeIn className="max-w-xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
                Sold at cost
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                We're a platform company, not a hardware company. The Zap is sold
                at BOM cost to maximize adoption. We make money on platform services.
              </p>
              <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
                <CardContent className="p-8">
                  <div className="text-5xl font-bold text-primary mb-2">{t("hero.price")}</div>
                  <div className="text-muted-foreground mb-6">BOM cost per unit</div>
                  <Button size="lg" asChild>
                    <a href="https://store.sourceful.energy/products/sourceful-energy-zap" target="_blank" rel="noopener noreferrer">
                      {tCommon("buttons.orderNow")}
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </FadeIn>
          </div>
        </section>

        {/* CTA */}
        <section className="border-t">
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
                  <a href="https://store.sourceful.energy/products/sourceful-energy-zap" target="_blank" rel="noopener noreferrer">
                    {tCommon("buttons.orderNow")}
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <a href="https://developer.sourceful.energy" target="_blank" rel="noopener noreferrer">
                    {tCommon("buttons.viewDocs")}
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
