"use client";

import { Link } from "@/src/i18n/routing";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MarketingNav } from "@/components/marketing-nav";
import { MarketingFooter } from "@/components/marketing-footer";
import { ArrowRight, Zap, Plug, Cpu, HelpCircle, ExternalLink } from "lucide-react";

export default function GetStartedPage() {
  const t = useTranslations("getStarted");

  const deviceOptions = [
    {
      id: "meter",
      title: t("devices.meter.title"),
      subtitle: t("devices.meter.subtitle"),
      description: t("devices.meter.description"),
      icon: Plug,
      href: "/get-started/zap",
      features: [
        t("devices.meter.features.monitoring"),
        t("devices.meter.features.alerts"),
        t("devices.meter.features.history"),
        t("devices.meter.features.compatibility"),
      ],
      image: "/images/get-started/p1-meter.png",
    },
    {
      id: "inverter",
      title: t("devices.inverter.title"),
      subtitle: t("devices.inverter.subtitle"),
      description: t("devices.inverter.description"),
      icon: Cpu,
      href: "/get-started/zap-for-inverters",
      features: [
        t("devices.inverter.features.monitoring"),
        t("devices.inverter.features.optimization"),
        t("devices.inverter.features.export"),
        t("devices.inverter.features.compatibility"),
      ],
      image: "/images/get-started/inverter.png",
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
            <div className="max-w-3xl mx-auto text-center">
              <Badge variant="secondary" className="mb-6">
                <Zap className="h-3 w-3 mr-1" />
                {t("hero.badge")}
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                {t("hero.title")}{" "}
                <span className="text-primary">{t("hero.titleHighlight")}</span>
              </h1>
              <p className="text-xl text-muted-foreground">
                {t("hero.description")}
              </p>
            </div>
          </div>
        </section>

        {/* Device Selection */}
        <section className="max-w-7xl mx-auto py-16 px-4 md:px-8">
          <div className="grid gap-8 md:grid-cols-2">
            {deviceOptions.map((option) => (
              <Card key={option.id} className="overflow-hidden group hover:shadow-lg transition-all">
                <Link href={option.href} className="block">
                  <div className="relative h-64 bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center p-4">
                    <Image
                      src={option.image}
                      alt={option.title}
                      width={280}
                      height={280}
                      className="object-contain max-h-56 w-auto group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline">{option.subtitle}</Badge>
                    </div>
                    <CardTitle className="text-2xl group-hover:text-primary transition-colors">
                      {option.title}
                    </CardTitle>
                    <CardDescription className="text-base">
                      {option.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 mb-6">
                      {option.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Button className="w-full group-hover:bg-primary/90">
                      {t("buttons.startSetup")}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Link>
              </Card>
            ))}
          </div>
        </section>

        {/* Compatibility Note */}
        <section className="border-t bg-muted/30">
          <div className="max-w-7xl mx-auto py-12 px-4 md:px-8">
            <div className="flex flex-col md:flex-row items-start gap-6 md:gap-12">
              <div className="flex-1">
                <h2 className="text-lg font-semibold mb-2">{t("compatibility.title")}</h2>
                <p className="text-muted-foreground">
                  {t("compatibility.description")}
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button variant="outline" asChild>
                  <a href="https://support.sourceful.energy/en/" target="_blank" rel="noopener noreferrer">
                    <HelpCircle className="mr-2 h-4 w-4" />
                    {t("buttons.helpCentre")}
                    <ExternalLink className="ml-2 h-3 w-3" />
                  </a>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/integrations">
                    {t("buttons.viewIntegrations")}
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Don't have a Zap? */}
        <section className="border-t">
          <div className="max-w-7xl mx-auto py-16 md:py-24 px-4 md:px-8 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              {t("noZap.title")}
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              {t("noZap.description")}
            </p>
            <Button size="lg" asChild>
              <Link href="/zap">
                {t("buttons.getTheZap")}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>
      </main>

      <MarketingFooter />
    </div>
  );
}
