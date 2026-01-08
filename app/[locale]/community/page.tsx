"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/src/i18n/routing";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MarketingNav } from "@/components/marketing-nav";
import { MarketingFooter } from "@/components/marketing-footer";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animations";
import { ArrowRight, Users, MessageSquare, Github, ExternalLink, Book, Headphones, Heart } from "lucide-react";

export default function CommunityPage() {
  const t = useTranslations("community");
  const tCommon = useTranslations("common");

  const channels = [
    {
      key: "discord",
      icon: MessageSquare,
      href: "https://discord.gg/srcful",
      external: true,
    },
    {
      key: "github",
      icon: Github,
      href: "https://github.com/srcfl",
      external: true,
    },
    {
      key: "docs",
      icon: Book,
      href: "https://developer.sourceful.energy",
      external: true,
    },
    {
      key: "support",
      icon: Headphones,
      href: "/contact",
      external: false,
    },
  ];

  const stats = {
    developers: "500+",
    countries: "20+",
    discord: t("stats.discordValue"),
    response: "< 24h",
  };

  const benefits = [
    { key: "earlyAccess" },
    { key: "feedback" },
    { key: "recognition" },
    { key: "openSource" },
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <MarketingNav />

      <main className="flex-1 pt-16">
        {/* Hero */}
        <section className="relative overflow-hidden border-b">
          <div className="absolute inset-0 bg-dot-pattern" />
          <div className="relative max-w-7xl mx-auto py-24 md:py-32 px-4 md:px-8">
            <FadeIn className="max-w-3xl">
              <Badge variant="secondary" className="mb-6">
                <Users className="h-3 w-3 mr-1" />
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
                  <a href="https://discord.gg/srcful" target="_blank" rel="noopener noreferrer">
                    {t("hero.joinDiscord")}
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <a href="https://github.com/srcfl" target="_blank" rel="noopener noreferrer">
                    <Github className="mr-2 h-4 w-4" />
                    {t("hero.github")}
                  </a>
                </Button>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* Stats */}
        <section className="bg-muted/30 border-b">
          <div className="max-w-7xl mx-auto py-12 px-4 md:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary">{stats.developers}</div>
                <div className="text-sm text-muted-foreground">{t("stats.developers")}</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary">{stats.countries}</div>
                <div className="text-sm text-muted-foreground">{t("stats.countries")}</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary">{stats.discord}</div>
                <div className="text-sm text-muted-foreground">{t("stats.discord")}</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary">{stats.response}</div>
                <div className="text-sm text-muted-foreground">{t("stats.supportResponse")}</div>
              </div>
            </div>
          </div>
        </section>

        {/* Channels */}
        <section className="max-w-7xl mx-auto py-16 md:py-24 px-4 md:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              {t("channels.title")}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t("channels.description")}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {channels.map((channel) => {
              const Icon = channel.icon;
              return (
                <Card key={channel.key} className="h-full">
                  <CardHeader>
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle>{t(`channels.${channel.key}.title`)}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-col h-full">
                    <CardDescription className="text-base flex-grow mb-4">
                      {t(`channels.${channel.key}.description`)}
                    </CardDescription>
                    <Button variant="outline" asChild className="w-fit">
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
              );
            })}
          </div>
        </section>

        {/* 10% Community */}
        <section className="border-t bg-muted/30">
          <div className="max-w-7xl mx-auto py-16 md:py-24 px-4 md:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Heart className="h-5 w-5 text-primary" />
                  <span className="font-medium">{t("tenPercent.label")}</span>
                </div>
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
              <div className="bg-background rounded-lg p-8 border">
                <h3 className="font-semibold mb-6">{t("tenPercent.whatYouGet")}</h3>
                <ul className="space-y-4">
                  {benefits.map((benefit) => (
                    <li key={benefit.key} className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                      <div>
                        <div className="font-medium">{t(`tenPercent.benefits.${benefit.key}.title`)}</div>
                        <div className="text-sm text-muted-foreground">{t(`tenPercent.benefits.${benefit.key}.description`)}</div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="border-t">
          <div className="max-w-7xl mx-auto py-16 md:py-24 px-4 md:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              {t("cta.title")}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              {t("cta.description")}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" asChild>
                <a href="https://discord.gg/srcful" target="_blank" rel="noopener noreferrer">
                  {t("cta.joinDiscord")}
                  <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="https://developer.sourceful.energy" target="_blank" rel="noopener noreferrer">
                  {t("cta.startBuilding")}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <MarketingFooter />
    </div>
  );
}
