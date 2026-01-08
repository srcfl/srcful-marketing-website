"use client";

import Image from "next/image";
import { Link } from "@/src/i18n/routing";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { MarketingNav } from "@/components/marketing-nav";
import { MarketingFooter } from "@/components/marketing-footer";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  AlertTriangle,
  Cpu,
  Wifi,
  Smartphone,
  Zap,
  HelpCircle,
  ExternalLink,
  Info,
  Battery,
} from "lucide-react";

export default function ZapForInvertersPage() {
  const t = useTranslations("getStarted");

  const supportedInverters = [
    { name: t("inverter.inverters.solis.name"), models: t("inverter.inverters.solis.models") },
    { name: t("inverter.inverters.sungrow.name"), models: t("inverter.inverters.sungrow.models") },
    { name: t("inverter.inverters.deye.name"), models: t("inverter.inverters.deye.models") },
  ];

  const steps = [
    {
      number: 1,
      title: t("inverter.steps.step1.title"),
      icon: Cpu,
      description: t("inverter.steps.step1.description"),
      tips: [
        t("inverter.steps.step1.tips.tip1"),
        t("inverter.steps.step1.tips.tip2"),
        t("inverter.steps.step1.tips.tip3"),
      ],
      info: {
        title: t("inverter.steps.step1.info.title"),
        message: t("inverter.steps.step1.info.message"),
      },
    },
    {
      number: 2,
      title: t("inverter.steps.step2.title"),
      icon: Battery,
      description: t("inverter.steps.step2.description"),
      options: [
        {
          title: t("inverter.steps.step2.options.optionA.title"),
          description: t("inverter.steps.step2.options.optionA.description"),
        },
        {
          title: t("inverter.steps.step2.options.optionB.title"),
          description: t("inverter.steps.step2.options.optionB.description"),
        },
      ],
      tips: [
        t("inverter.steps.step2.tips.tip1"),
        t("inverter.steps.step2.tips.tip2"),
        t("inverter.steps.step2.tips.tip3"),
      ],
    },
    {
      number: 3,
      title: t("inverter.steps.step3.title"),
      icon: CheckCircle,
      description: t("inverter.steps.step3.description"),
      leds: [
        { color: "green", label: t("zap.leds.power"), status: t("zap.leds.solidOn") },
        { color: "blue", label: t("zap.leds.status"), status: t("zap.leds.setupMode") },
      ],
      tips: [
        t("inverter.steps.step3.tips.tip1"),
        t("inverter.steps.step3.tips.tip2"),
        t("inverter.steps.step3.tips.tip3"),
      ],
      image: "/images/get-started/zap-led-powered.png",
    },
    {
      number: 4,
      title: t("inverter.steps.step4.title"),
      icon: Smartphone,
      description: t("inverter.steps.step4.description"),
      tips: [
        t("inverter.steps.step4.tips.tip1"),
        t("inverter.steps.step4.tips.tip2"),
        t("inverter.steps.step4.tips.tip3"),
      ],
      appLinks: true,
      image: "/images/get-started/app-setup.png",
    },
    {
      number: 5,
      title: t("inverter.steps.step5.title"),
      icon: Wifi,
      description: t("inverter.steps.step5.description"),
      tips: [
        t("inverter.steps.step5.tips.tip1"),
        t("inverter.steps.step5.tips.tip2"),
        t("inverter.steps.step5.tips.tip3"),
      ],
      info: {
        title: t("inverter.steps.step5.info.title"),
        message: t("inverter.steps.step5.info.message"),
      },
      image: "/images/get-started/app-inverter-setup.png",
    },
    {
      number: 6,
      title: t("inverter.steps.step6.title"),
      icon: CheckCircle,
      description: t("inverter.steps.step6.description"),
      leds: [
        { color: "green", label: t("zap.leds.power"), status: t("zap.leds.solidOn") },
        { color: "green", label: t("zap.leds.data"), status: t("zap.leds.blinking") },
        { color: "blue", label: t("zap.leds.status"), status: t("zap.leds.off") },
      ],
      tips: [
        t("inverter.steps.step6.tips.tip1"),
        t("inverter.steps.step6.tips.tip2"),
        t("inverter.steps.step6.tips.tip3"),
      ],
      image: "/images/get-started/app-energy-data.png",
    },
  ];
  return (
    <div className="flex min-h-screen flex-col">
      <MarketingNav />

      <main className="flex-1 pt-16">
        {/* Hero */}
        <section className="relative overflow-hidden border-b">
          <div className="absolute inset-0 bg-dot-pattern" />
          <div className="relative max-w-4xl mx-auto py-16 md:py-24 px-4 md:px-8">
            <Link
              href="/get-started"
              className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-4"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              {t("buttons.backToSelection")}
            </Link>

            <Badge variant="secondary" className="mb-6">
              <Cpu className="h-3 w-3 mr-1" />
              {t("inverter.badge")}
            </Badge>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
              {t("inverter.title")}{" "}
              <span className="text-primary">{t("inverter.titleHighlight")}</span>
            </h1>

            <p className="text-lg text-muted-foreground max-w-2xl">
              {t("inverter.description")}
            </p>

            {/* Supported Inverters */}
            <div className="mt-8 p-4 bg-muted/50 rounded-lg">
              <h3 className="font-medium mb-3">{t("inverter.supportedInverters")}</h3>
              <div className="flex flex-wrap gap-4">
                {supportedInverters.map((inv) => (
                  <div key={inv.name} className="flex items-center gap-2">
                    <Badge variant="outline">{inv.name}</Badge>
                    <span className="text-sm text-muted-foreground">{inv.models}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Steps */}
        <section className="max-w-4xl mx-auto py-12 px-4 md:px-8">
          <div className="space-y-8">
            {steps.map((step) => (
              <Card key={step.number} className="overflow-hidden">
                <CardHeader className="bg-muted/30">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary text-primary-foreground font-bold text-lg">
                      {step.number}
                    </div>
                    <div>
                      <CardTitle className="text-xl">{step.title}</CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex-1">
                      <p className="text-muted-foreground mb-4">{step.description}</p>

                  {step.info && (
                    <Alert className="mb-4">
                      <Info className="h-4 w-4" />
                      <AlertTitle>{step.info.title}</AlertTitle>
                      <AlertDescription>{step.info.message}</AlertDescription>
                    </Alert>
                  )}

                  {step.options && (
                    <div className="grid gap-3 mb-4">
                      {step.options.map((option, i) => (
                        <div key={i} className="bg-muted/50 rounded-lg p-4">
                          <h4 className="font-medium mb-1">{option.title}</h4>
                          <p className="text-sm text-muted-foreground">{option.description}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {step.leds && (
                    <div className="bg-muted/50 rounded-lg p-4 mb-4">
                      <h4 className="font-medium mb-3">LED Status:</h4>
                      <div className="space-y-2">
                        {step.leds.map((led, i) => (
                          <div key={i} className="flex items-center gap-3">
                            <div
                              className={`h-3 w-3 rounded-full ${
                                led.color === "green"
                                  ? "bg-green-500"
                                  : led.color === "blue"
                                  ? "bg-blue-500"
                                  : "bg-gray-500"
                              }`}
                            />
                            <span className="font-medium">{led.label}:</span>
                            <span className="text-muted-foreground">{led.status}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {step.tips && (
                    <div className="space-y-2">
                      {step.tips.map((tip, i) => (
                        <div key={i} className="flex items-start gap-2 text-sm">
                          <CheckCircle className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                          <span className="text-muted-foreground">{tip}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {step.appLinks && (
                    <div className="flex gap-3 mt-4">
                      <Button variant="outline" asChild>
                        <a
                          href="https://apps.apple.com/app/sourceful-energy"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {t("buttons.appStore")}
                          <ExternalLink className="ml-2 h-3 w-3" />
                        </a>
                      </Button>
                      <Button variant="outline" asChild>
                        <a
                          href="https://play.google.com/store/apps/details?id=energy.sourceful"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {t("buttons.googlePlay")}
                          <ExternalLink className="ml-2 h-3 w-3" />
                        </a>
                      </Button>
                    </div>
                  )}
                    </div>
                    {step.image && (
                      <div className="flex-shrink-0 flex items-center justify-center">
                        <Image
                          src={step.image}
                          alt={step.title}
                          width={200}
                          height={200}
                          className="rounded-lg object-contain"
                        />
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Help Section */}
        <section className="border-t bg-muted/30">
          <div className="max-w-4xl mx-auto py-12 px-4 md:px-8">
            <div className="flex flex-col md:flex-row items-start gap-6 md:gap-12">
              <div className="flex-1">
                <h2 className="text-lg font-semibold mb-2">{t("inverter.help.title")}</h2>
                <p className="text-muted-foreground">
                  {t("inverter.help.description")}
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button variant="outline" asChild>
                  <a
                    href="https://support.sourceful.energy/en/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <HelpCircle className="mr-2 h-4 w-4" />
                    {t("buttons.helpCentre")}
                    <ExternalLink className="ml-2 h-3 w-3" />
                  </a>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/community">{t("buttons.joinCommunity")}</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Next Steps */}
        <section className="border-t">
          <div className="max-w-4xl mx-auto py-16 px-4 md:px-8 text-center">
            <h2 className="text-2xl font-bold mb-4">{t("inverter.next.title")}</h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              {t("inverter.next.description")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild>
                <Link href="/platform">
                  {t("buttons.explorePlatform")}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/get-started/zap">{t("buttons.connectMeter")}</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <MarketingFooter />
    </div>
  );
}
