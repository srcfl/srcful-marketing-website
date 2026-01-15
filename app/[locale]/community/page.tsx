"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/src/i18n/routing";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MarketingNav } from "@/components/marketing-nav";
import { MarketingFooter } from "@/components/marketing-footer";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animations";
import { CommunityChatAnimation } from "@/components/community-chat-animation";
import { ArrowRight, Users, MessageSquare, Github, ExternalLink, Book, Headphones, Heart, Check } from "lucide-react";

export default function CommunityPage() {
  const t = useTranslations("community");
  const tCommon = useTranslations("common");

  const channels = [
    {
      key: "discord",
      icon: MessageSquare,
      href: "https://discord.gg/hEvKcxNH8C",
      external: true,
      color: "text-indigo-500",
      bgColor: "bg-indigo-500/10",
      borderColor: "hover:border-indigo-500/30",
    },
    {
      key: "github",
      icon: Github,
      href: "https://github.com/srcfl",
      external: true,
      color: "text-violet-500",
      bgColor: "bg-violet-500/10",
      borderColor: "hover:border-violet-500/30",
    },
    {
      key: "docs",
      icon: Book,
      href: "https://developer.sourceful.energy",
      external: true,
      color: "text-emerald-500",
      bgColor: "bg-emerald-500/10",
      borderColor: "hover:border-emerald-500/30",
    },
    {
      key: "support",
      icon: Headphones,
      href: "/contact",
      external: false,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
      borderColor: "hover:border-blue-500/30",
    },
  ];

  const benefits = [
    { key: "earlyAccess", color: "text-violet-500", bgColor: "bg-violet-500/10" },
    { key: "feedback", color: "text-blue-500", bgColor: "bg-blue-500/10" },
    { key: "recognition", color: "text-amber-500", bgColor: "bg-amber-500/10" },
    { key: "openSource", color: "text-emerald-500", bgColor: "bg-emerald-500/10" },
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
                  <Badge variant="secondary" className="mb-6 bg-violet-500/10 text-violet-600 border-violet-500/20">
                    <Users className="h-3 w-3 mr-1" />
                    {t("hero.badge")}
                  </Badge>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                    {t("hero.title")}{" "}
                    <span className="text-violet-500">{t("hero.titleHighlight")}</span>
                  </h1>
                  <p className="text-xl text-muted-foreground mb-8">
                    {t("hero.description")}
                  </p>
                  <Button size="lg" className="bg-violet-500 hover:bg-violet-600" asChild>
                    <a href="https://discord.gg/hEvKcxNH8C" target="_blank" rel="noopener noreferrer">
                      {t("hero.joinDiscord")}
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </FadeIn>
              <FadeIn delay={0.2}>
                <div className="flex items-center justify-center">
                  <CommunityChatAnimation />
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* Channels */}
        <section className="relative">
          <div className="relative max-w-7xl mx-auto py-16 md:py-24 px-4 md:px-8">
            <FadeIn className="text-center mb-12">
              <Badge variant="secondary" className="mb-4">{t("channels.badge")}</Badge>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                {t("channels.title")}
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {t("channels.description")}
              </p>
            </FadeIn>

            <StaggerContainer className="grid md:grid-cols-2 gap-6" staggerDelay={0.1}>
              {channels.map((channel) => {
                const Icon = channel.icon;
                return (
                  <StaggerItem key={channel.key}>
                    <Card className={`h-full hover:shadow-lg transition-all duration-300 ${channel.borderColor} flex flex-col`}>
                      <CardHeader>
                        <div className={`w-12 h-12 ${channel.bgColor} rounded-lg flex items-center justify-center mb-4`}>
                          <Icon className={`h-6 w-6 ${channel.color}`} />
                        </div>
                        <CardTitle>{t(`channels.${channel.key}.title`)}</CardTitle>
                      </CardHeader>
                      <CardContent className="flex flex-col flex-grow">
                        <CardDescription className="text-base flex-grow mb-4">
                          {t(`channels.${channel.key}.description`)}
                        </CardDescription>
                        <Button variant="outline" asChild className="w-fit mt-auto">
                          {channel.external ? (
                            <a href={channel.href} target="_blank" rel="noopener noreferrer">
                              {t(`channels.${channel.key}.cta`)}
                              <ExternalLink className="ml-2 h-4 w-4" />
                            </a>
                          ) : (
                            <Link href={channel.href}>{t(`channels.${channel.key}.cta`)}</Link>
                          )}
                        </Button>
                      </CardContent>
                    </Card>
                  </StaggerItem>
                );
              })}
            </StaggerContainer>
          </div>
        </section>

        {/* 10% Community */}
        <section className="border-t">
          <div className="max-w-7xl mx-auto py-16 md:py-24 px-4 md:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <FadeIn>
                <div>
                  <Badge variant="secondary" className="mb-4 bg-violet-500/10 text-violet-600 border-violet-500/20">
                    <Heart className="h-3 w-3 mr-1" />
                    {t("tenPercent.label")}
                  </Badge>
                  <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
                    {t("tenPercent.title")}
                  </h2>
                  <p className="text-lg text-muted-foreground mb-6">
                    {t("tenPercent.paragraph1")}
                  </p>
                  <p className="text-lg text-muted-foreground">
                    {t("tenPercent.paragraph2")}
                  </p>
                </div>
              </FadeIn>
              <FadeIn delay={0.2}>
                <Card className="border-violet-500/20 bg-violet-500/5">
                  <CardHeader>
                    <CardTitle className="text-violet-500">{t("tenPercent.whatYouGet")}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-4">
                      {benefits.map((benefit) => (
                        <li key={benefit.key} className="flex items-start gap-3">
                          <div className={`w-8 h-8 ${benefit.bgColor} rounded-full flex items-center justify-center shrink-0`}>
                            <Check className={`w-4 h-4 ${benefit.color}`} />
                          </div>
                          <div>
                            <div className="font-medium">{t(`tenPercent.benefits.${benefit.key}.title`)}</div>
                            <div className="text-sm text-muted-foreground">{t(`tenPercent.benefits.${benefit.key}.description`)}</div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="border-t bg-gradient-to-br from-violet-500/10 via-violet-500/5 to-background">
          <div className="max-w-7xl mx-auto py-16 md:py-24 px-4 md:px-8 text-center">
            <FadeIn>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                {t("cta.title")}
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
                {t("cta.description")}
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button size="lg" className="bg-violet-500 hover:bg-violet-600" asChild>
                  <a href="https://discord.gg/hEvKcxNH8C" target="_blank" rel="noopener noreferrer">
                    {t("cta.joinDiscord")}
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
                <Button size="lg" variant="outline" className="hover:bg-violet-500/10 hover:text-violet-600" asChild>
                  <a href="https://developer.sourceful.energy" target="_blank" rel="noopener noreferrer">
                    {t("cta.startBuilding")}
                    <ArrowRight className="ml-2 h-4 w-4" />
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
