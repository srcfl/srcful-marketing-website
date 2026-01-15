"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/src/i18n/routing";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MarketingNav } from "@/components/marketing-nav";
import { MarketingFooter } from "@/components/marketing-footer";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animations";
import { Smartphone, Zap, BarChart3, Bell, Shield, Wallet, Users, Github } from "lucide-react";

export default function AppPage() {
  const t = useTranslations("app");

  const features = [
    {
      icon: BarChart3,
      title: t("features.realtime.title"),
      description: t("features.realtime.description"),
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      icon: Zap,
      title: t("features.spotPrices.title"),
      description: t("features.spotPrices.description"),
      color: "text-amber-500",
      bgColor: "bg-amber-500/10",
    },
    {
      icon: Bell,
      title: t("features.alerts.title"),
      description: t("features.alerts.description"),
      color: "text-rose-500",
      bgColor: "bg-rose-500/10",
    },
    {
      icon: Shield,
      title: t("features.security.title"),
      description: t("features.security.description"),
      color: "text-emerald-500",
      bgColor: "bg-emerald-500/10",
    },
    {
      icon: Wallet,
      title: t("features.rewards.title"),
      description: t("features.rewards.description"),
      color: "text-violet-500",
      bgColor: "bg-violet-500/10",
    },
    {
      icon: Smartphone,
      title: t("features.control.title"),
      description: t("features.control.description"),
      color: "text-cyan-500",
      bgColor: "bg-cyan-500/10",
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
                <div className="text-left -mt-32">
                  <Badge variant="secondary" className="mb-6 bg-primary/10 text-primary border-primary/20">
                    <Smartphone className="h-3 w-3 mr-1" />
                    {t("hero.badge")}
                  </Badge>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-left">
                    {t("hero.title")}
                    <br />
                    <span className="text-primary">{t("hero.titleHighlight")}</span>
                  </h1>
                  <p className="text-xl text-muted-foreground mb-8 text-left">
                    {t("hero.description")}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button size="lg" className="bg-primary hover:bg-primary/90" asChild>
                      <a
                        href="https://apps.apple.com/se/app/sourceful-energy/id6736659172"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                        </svg>
                        {t("hero.downloadIOS")}
                      </a>
                    </Button>
                    <Button size="lg" variant="outline" className="hover:bg-primary/10 hover:text-primary" asChild>
                      <a
                        href="https://play.google.com/store/apps/details?id=com.sourceful_labs.energy"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                        </svg>
                        {t("hero.downloadAndroid")}
                      </a>
                    </Button>
                  </div>
                </div>
              </FadeIn>
              <FadeIn delay={0.2}>
                <div className="flex items-center justify-center lg:justify-end lg:pr-4">
                  <img
                    src="/assets/app-flow.png"
                    alt="Sourceful Energy App"
                    className="w-full max-w-md drop-shadow-2xl"
                  />
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="relative">
          <div className="relative max-w-7xl mx-auto py-16 md:py-24 px-4 md:px-8">
            <FadeIn className="text-center mb-12">
              <Badge variant="secondary" className="mb-4">{t("features.badge")}</Badge>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                {t("features.title")}
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {t("features.description")}
              </p>
            </FadeIn>

            <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" staggerDelay={0.1}>
              {features.map((feature) => {
                const Icon = feature.icon;
                return (
                  <StaggerItem key={feature.title}>
                    <Card className="h-full hover:shadow-lg hover:border-primary/30 transition-all duration-300">
                      <CardHeader>
                        <div className={`w-12 h-12 ${feature.bgColor} rounded-lg flex items-center justify-center mb-4`}>
                          <Icon className={`h-6 w-6 ${feature.color}`} />
                        </div>
                        <CardTitle className="text-lg">{feature.title}</CardTitle>
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

        {/* How it works */}
        <section className="border-t">
          <div className="max-w-7xl mx-auto py-16 md:py-24 px-4 md:px-8">
            <FadeIn className="text-center mb-12">
              <Badge variant="secondary" className="mb-4">{t("howItWorks.badge")}</Badge>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                {t("howItWorks.title")}
              </h2>
            </FadeIn>

            <StaggerContainer className="grid md:grid-cols-3 gap-8" staggerDelay={0.15}>
              <StaggerItem>
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mb-4 text-xl font-bold">
                    1
                  </div>
                  <h3 className="font-semibold mb-2">{t("howItWorks.step1.title")}</h3>
                  <p className="text-muted-foreground max-w-[200px]">{t("howItWorks.step1.description")}</p>
                </div>
              </StaggerItem>
              <StaggerItem>
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mb-4 text-xl font-bold">
                    2
                  </div>
                  <h3 className="font-semibold mb-2">{t("howItWorks.step2.title")}</h3>
                  <p className="text-muted-foreground max-w-[200px]">{t("howItWorks.step2.description")}</p>
                </div>
              </StaggerItem>
              <StaggerItem>
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mb-4 text-xl font-bold">
                    3
                  </div>
                  <h3 className="font-semibold mb-2">{t("howItWorks.step3.title")}</h3>
                  <p className="text-muted-foreground max-w-[200px]">{t("howItWorks.step3.description")}</p>
                </div>
              </StaggerItem>
            </StaggerContainer>
          </div>
        </section>

        {/* Community CTA */}
        <section className="border-t bg-muted/30">
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
                    <Button className="bg-primary hover:bg-primary/90" asChild>
                      <a href="https://discord.gg/hEvKcxNH8C" target="_blank" rel="noopener noreferrer">
                        {t("community.discord")}
                      </a>
                    </Button>
                    <Button variant="outline" className="hover:bg-primary/10 hover:text-primary" asChild>
                      <a href="https://github.com/srcfl" target="_blank" rel="noopener noreferrer">
                        <Github className="mr-2 h-4 w-4" />
                        {t("community.github")}
                      </a>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
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
                <Button size="lg" className="bg-primary hover:bg-primary/90" asChild>
                  <a
                    href="https://apps.apple.com/se/app/sourceful-energy/id6736659172"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                    </svg>
                    {t("hero.downloadIOS")}
                  </a>
                </Button>
                <Button size="lg" variant="outline" className="hover:bg-primary/10 hover:text-primary" asChild>
                  <a
                    href="https://play.google.com/store/apps/details?id=com.sourceful_labs.energy"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                    </svg>
                    {t("hero.downloadAndroid")}
                  </a>
                </Button>
              </div>
              <p className="text-sm text-muted-foreground mt-6">
                {t("cta.zapNote")}{" "}
                <Link href="/zap" className="text-primary hover:underline">
                  {t("cta.getZap")}
                </Link>
              </p>
            </FadeIn>
          </div>
        </section>
      </main>

      <MarketingFooter />
    </div>
  );
}
