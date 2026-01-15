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
  Plug,
  Wifi,
  Smartphone,
  Zap,
  HelpCircle,
  ExternalLink,
} from "lucide-react";

export default function ZapSetupPage() {
  const t = useTranslations("getStarted");

  const steps = [
    {
      number: 1,
      title: t("zap.steps.step1.title"),
      icon: Plug,
      description: t("zap.steps.step1.description"),
      tips: [
        t("zap.steps.step1.tips.tip1"),
        t("zap.steps.step1.tips.tip2"),
        t("zap.steps.step1.tips.tip3"),
      ],
      warning: {
        title: t("zap.steps.step1.warning.title"),
        message: t("zap.steps.step1.warning.message"),
      },
    },
    {
      number: 2,
      title: t("zap.steps.step2.title"),
      icon: Zap,
      description: t("zap.steps.step2.description"),
      tips: [
        t("zap.steps.step2.tips.tip1"),
        t("zap.steps.step2.tips.tip2"),
        t("zap.steps.step2.tips.tip3"),
      ],
      image: "/images/get-started/zap-meter-connection.png",
    },
    {
      number: 3,
      title: t("zap.steps.step3.title"),
      icon: CheckCircle,
      description: t("zap.steps.step3.description"),
      leds: [
        { color: "green", label: t("zap.leds.power"), status: t("zap.leds.solidOn") },
        { color: "blue", label: t("zap.leds.status"), status: t("zap.leds.setupMode") },
      ],
      tips: [
        t("zap.steps.step3.tips.tip1"),
        t("zap.steps.step3.tips.tip2"),
      ],
      image: "/images/get-started/zap-led-powered.png",
    },
    {
      number: 4,
      title: t("zap.steps.step4.title"),
      icon: Wifi,
      description: t("zap.steps.step4.description"),
      tips: [
        t("zap.steps.step4.tips.tip1"),
        t("zap.steps.step4.tips.tip2"),
        t("zap.steps.step4.tips.tip3"),
      ],
      image: "/images/get-started/zap-led-blinking.png",
    },
    {
      number: 5,
      title: t("zap.steps.step5.title"),
      icon: Smartphone,
      description: t("zap.steps.step5.description"),
      tips: [
        t("zap.steps.step5.tips.tip1"),
        t("zap.steps.step5.tips.tip2"),
        t("zap.steps.step5.tips.tip3"),
      ],
      appLinks: true,
      image: "/images/get-started/app-setup.png",
    },
    {
      number: 6,
      title: t("zap.steps.step6.title"),
      icon: CheckCircle,
      description: t("zap.steps.step6.description"),
      leds: [
        { color: "green", label: t("zap.leds.power"), status: t("zap.leds.solidOn") },
        { color: "green", label: t("zap.leds.data"), status: t("zap.leds.blinking") },
        { color: "blue", label: t("zap.leds.status"), status: t("zap.leds.off") },
      ],
      tips: [
        t("zap.steps.step6.tips.tip1"),
        t("zap.steps.step6.tips.tip2"),
        t("zap.steps.step6.tips.tip3"),
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
              <Plug className="h-3 w-3 mr-1" />
              {t("zap.badge")}
            </Badge>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
              {t("zap.title")}{" "}
              <span className="text-primary">{t("zap.titleHighlight")}</span>
            </h1>

            <p className="text-lg text-muted-foreground max-w-2xl">
              {t("zap.description")}
            </p>
          </div>
        </section>

        {/* Steps */}
        <section className="max-w-4xl mx-auto py-12 px-4 md:px-8">
          <div className="space-y-8">
            {steps.map((step, index) => (
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

                  {step.warning && (
                    <Alert variant="destructive" className="mb-4">
                      <AlertTriangle className="h-4 w-4" />
                      <AlertTitle>{step.warning.title}</AlertTitle>
                      <AlertDescription>{step.warning.message}</AlertDescription>
                    </Alert>
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
            <div className="flex flex-col items-start gap-6">
              <div>
                <h2 className="text-lg font-semibold mb-2">{t("zap.help.title")}</h2>
                <p className="text-muted-foreground">
                  {t("zap.help.description")}
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
            <h2 className="text-2xl font-bold mb-4">{t("zap.next.title")}</h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              {t("zap.next.description")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild>
                <Link href="/platform">
                  {t("buttons.explorePlatform")}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/get-started/zap-for-inverters">
                  {t("buttons.connectInverter")}
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <MarketingFooter />
    </div>
  );
}
