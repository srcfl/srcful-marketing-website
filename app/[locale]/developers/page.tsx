"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MarketingNav } from "@/components/marketing-nav";
import { MarketingFooter } from "@/components/marketing-footer";
import { FadeIn } from "@/components/animations";
import { DevCardAnimation } from "@/components/dev-card-animation";
import { PixelGrid } from "@/components/ui/pixel-grid";
import { PricingSection } from "@/components/pricing-section";
import {
  ExternalLink,
  Code,
  Zap,
  Book,
  MessageSquare,
  Terminal,
  Palette,
  Cpu,
  Users,
  Github,
  Activity,
  Layers,
  Shield,
  TestTube,
  Coins
} from "lucide-react";

export default function DevelopersPage() {
  const t = useTranslations("developers");
  const tCommon = useTranslations("common");

  const toolsList = [
    {
      key: "devPortal",
      icon: Terminal,
      href: "https://developer.sourceful.energy",
      external: true,
      isPrimary: true,
    },
    {
      key: "apiRef",
      icon: Book,
      href: "https://developer.sourceful.energy/api",
      external: true,
      isPrimary: false,
    },
    {
      key: "designSystem",
      icon: Palette,
      href: "https://design.sourceful.energy",
      external: true,
      isPrimary: false,
    },
    {
      key: "hardware",
      icon: Cpu,
      href: "/zap",
      external: false,
      isPrimary: false,
    },
  ];

  const features = [
    {
      key: "localResponse",
      icon: Zap,
      color: "text-yellow-500",
      bgColor: "bg-yellow-500/10",
      borderColor: "border-yellow-500/20",
    },
    {
      key: "protocolAgnostic",
      icon: Layers,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/20",
    },
    {
      key: "realtime",
      icon: Activity,
      color: "text-emerald-500",
      bgColor: "bg-emerald-500/10",
      borderColor: "border-emerald-500/20",
    },
    {
      key: "auth",
      icon: Shield,
      color: "text-violet-500",
      bgColor: "bg-violet-500/10",
      borderColor: "border-violet-500/20",
    },
    {
      key: "sandbox",
      icon: TestTube,
      color: "text-orange-500",
      bgColor: "bg-orange-500/10",
      borderColor: "border-orange-500/20",
    },
    {
      key: "solana",
      icon: Coins,
      color: "text-purple-500",
      bgColor: "bg-gradient-to-br from-purple-500/10 to-pink-500/10",
      borderColor: "border-purple-500/20",
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
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <FadeIn className="max-w-xl">
                <Badge variant="secondary" className="mb-6">
                  <Code className="h-3 w-3 mr-1" />
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
                    <a href="https://developer.sourceful.energy" target="_blank" rel="noopener noreferrer">
                      {tCommon("buttons.openDevPortal")}
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <a href="https://discord.gg/srcful" target="_blank" rel="noopener noreferrer">
                      {tCommon("buttons.joinDiscord")}
                      <MessageSquare className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </FadeIn>
              <div className="hidden lg:flex items-center justify-center">
                <DevCardAnimation />
              </div>
            </div>
          </div>
        </section>

        {/* Developer Tools */}
        <section className="max-w-7xl mx-auto py-16 md:py-24 px-4 md:px-8">
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <PixelGrid pattern="line-v-mid" color="green" size="md" speed="fast" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              {t("tools.title")}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
              {t("tools.description")}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {toolsList.map((tool) => {
              const Icon = tool.icon;
              return (
                <a
                  key={tool.key}
                  href={tool.href}
                  target={tool.external ? "_blank" : undefined}
                  rel={tool.external ? "noopener noreferrer" : undefined}
                  className="no-underline hover:no-underline"
                >
                  <Card className="h-full transition-all hover:shadow-lg hover:border-primary/50 cursor-pointer">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                            <Icon className="h-5 w-5 text-primary" />
                          </div>
                          <CardTitle>{t(`tools.${tool.key}.title`)}</CardTitle>
                        </div>
                        {tool.isPrimary && (
                          <Badge variant="default">{t("tools.primary")}</Badge>
                        )}
                        {tool.external && !tool.isPrimary && (
                          <ExternalLink className="h-4 w-4 text-muted-foreground" />
                        )}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-base">
                        {t(`tools.${tool.key}.description`)}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </a>
              );
            })}
          </div>
        </section>

        {/* Features Grid */}
        <section className="border-t bg-muted/30">
          <div className="max-w-7xl mx-auto py-16 md:py-24 px-4 md:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                {t("features.title")}
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {t("features.description")}
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature) => {
                const Icon = feature.icon;
                return (
                  <Card key={feature.key} className={`${feature.borderColor} border`}>
                    <CardHeader>
                      <div className="flex items-center gap-3 mb-2">
                        <div className={`w-10 h-10 ${feature.bgColor} rounded-lg flex items-center justify-center`}>
                          <Icon className={`h-5 w-5 ${feature.color}`} />
                        </div>
                        <CardTitle className="text-lg">{t(`features.${feature.key}.title`)}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-base">{t(`features.${feature.key}.description`)}</CardDescription>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Code Example */}
        <section className="border-t">
          <div className="max-w-7xl mx-auto py-16 md:py-24 px-4 md:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                  {t("api.title")}
                </h2>
                <p className="text-lg text-muted-foreground mb-6">
                  {t("api.description")}
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                    </div>
                    <span>{t("api.feature1")}</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                    </div>
                    <span>{t("api.feature2")}</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                    </div>
                    <span>{t("api.feature3")}</span>
                  </li>
                </ul>
                <Button asChild>
                  <a href="https://developer.sourceful.energy" target="_blank" rel="noopener noreferrer">
                    {tCommon("buttons.openDevPortal")}
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </div>

              <div className="bg-muted rounded-lg p-6 font-mono text-sm overflow-x-auto">
                <div className="text-muted-foreground mb-4">{t("api.codeComment")}</div>
                <pre className="text-foreground">
{`curl https://api.sourceful.energy/v1/devices \\
  -H "Authorization: Bearer src_live_..."

{
  "devices": [
    {
      "id": "dev_abc123",
      "type": "ev_charger",
      "status": "online",
      "power_kw": 7.4,
      "location": {
        "site_id": "site_xyz",
        "name": "Stockholm HQ"
      }
    }
  ],
  "total": 1
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
                    <Button asChild>
                      <a href="https://discord.gg/srcful" target="_blank" rel="noopener noreferrer">
                        {tCommon("buttons.joinDiscord")}
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                    <Button variant="outline" asChild>
                      <a href="https://github.com/srcfl" target="_blank" rel="noopener noreferrer">
                        <Github className="mr-2 h-4 w-4" />
                        GitHub
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
