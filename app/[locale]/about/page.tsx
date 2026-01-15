"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/src/i18n/routing";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MarketingNav } from "@/components/marketing-nav";
import { MarketingFooter } from "@/components/marketing-footer";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animations";
import { ArrowRight, Users, Globe, Rocket, DollarSign, Handshake, TrendingUp } from "lucide-react";
import { KalmarMap } from "@/components/kalmar-map";

export default function AboutPage() {
  const t = useTranslations("about");
  const tCommon = useTranslations("common");

  const values = [
    {
      key: "physicsBeforeCode",
      title: t("values.physicsBeforeCode.title"),
      description: t("values.physicsBeforeCode.description"),
    },
    {
      key: "simpleOverClever",
      title: t("values.simpleOverClever.title"),
      description: t("values.simpleOverClever.description"),
    },
    {
      key: "localOverCloud",
      title: t("values.localOverCloud.title"),
      description: t("values.localOverCloud.description"),
    },
    {
      key: "robustOverFeatureRich",
      title: t("values.robustOverFeatureRich.title"),
      description: t("values.robustOverFeatureRich.description"),
    },
    {
      key: "openOverProprietary",
      title: t("values.openOverProprietary.title"),
      description: t("values.openOverProprietary.description"),
    },
  ];

  const milestones = [
    { year: "2023", event: t("journey.founded"), icon: Rocket, color: "from-violet-500 to-violet-600" },
    { year: "2024", event: t("journey.seed"), icon: DollarSign, color: "from-emerald-500 to-emerald-600" },
    { year: "2025", event: t("journey.partnerships"), icon: Handshake, color: "from-blue-500 to-blue-600" },
    { year: "2026", event: t("journey.seedPlus"), icon: TrendingUp, color: "from-primary to-primary", isCurrent: true },
  ];

  const teamMembers = [
    { key: "fredrik", image: "/images/team/fredrik.png", isFounder: true },
    { key: "viktor", image: "/images/team/viktor.png", isFounder: true },
    { key: "tobias", image: "/images/team/tobias.png", isFounder: true },
    { key: "johan", image: "/images/team/johan.png", isFounder: true },
    { key: "niklas", image: "/images/team/niklas.png", isFounder: true },
    { key: "david", image: "/images/team/david.png", isFounder: true },
    { key: "paul", image: "/images/team/paul.png", isFounder: false },
    { key: "hampus", image: "/images/team/hampus.png", isFounder: false },
    { key: "thyra", image: "/images/team/thyra.jpeg", isFounder: false },
    { key: "frida", image: "/images/team/frida.png", isFounder: false },
    { key: "melinda", image: "/images/team/melinda.png", isFounder: false },
  ];

  const advisors = [
    { key: "patrik", image: "/images/team/patrik-stolt.png" },
    { key: "mark", image: "/images/team/mark-phillips.png" },
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
              <p className="text-xl text-muted-foreground">
                {t("hero.description")}
              </p>
            </FadeIn>
          </div>
        </section>

        {/* Mission */}
        <section className="max-w-7xl mx-auto py-16 md:py-24 px-4 md:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
                {t("mission.title")}
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                {t("mission.paragraph1")}
              </p>
              <p className="text-lg text-muted-foreground mb-6">
                {t("mission.paragraph2")}
              </p>
              <p className="text-lg font-medium">
                {t("mission.paragraph3")}
              </p>
            </div>
            <div className="bg-muted rounded-lg p-8">
              <h3 className="font-semibold mb-6">{t("numbers.title")}</h3>
              <div className="space-y-6">
                <div>
                  <div className="text-3xl font-bold text-primary">{tCommon("currency.symbol")}2.5B</div>
                  <div className="text-muted-foreground">{t("numbers.destroyed")}</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary">700+</div>
                  <div className="text-muted-foreground">{t("numbers.negativeHours")}</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary">2,800 GWh</div>
                  <div className="text-muted-foreground">{t("numbers.storage")}</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="border-t bg-muted/30">
          <div className="max-w-7xl mx-auto py-16 md:py-24 px-4 md:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                {t("principles.title")}
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {t("principles.description")}
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {values.map((value, index) => (
                <Card key={value.key}>
                  <CardHeader>
                    <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center mb-4 text-sm font-bold">
                      {index + 1}
                    </div>
                    <CardTitle className="text-lg">{value.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{value.description}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="border-t overflow-hidden">
          <div className="max-w-7xl mx-auto py-16 md:py-24 px-4 md:px-8">
            <FadeIn className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                {t("journey.title")}
              </h2>
            </FadeIn>

            {/* Horizontal timeline for desktop */}
            <div className="hidden md:block relative">
              {/* Background line */}
              <div className="absolute top-12 left-[12.5%] right-[12.5%] h-1 bg-muted rounded-full" />
              {/* Progress line */}
              <div className="absolute top-12 left-[12.5%] w-[75%] h-1 bg-gradient-to-r from-violet-500 via-emerald-500 via-blue-500 to-primary rounded-full" />

              <StaggerContainer className="grid grid-cols-4 gap-6" staggerDelay={0.15}>
                {milestones.map((milestone, index) => {
                  const Icon = milestone.icon;
                  return (
                    <StaggerItem key={milestone.year}>
                      <div className="relative pt-24 group">
                        {/* Icon circle */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 z-10">
                          <div className={`w-24 h-24 rounded-2xl bg-gradient-to-br ${milestone.color} p-0.5 group-hover:scale-105 transition-all duration-300 ${milestone.isCurrent ? 'shadow-lg shadow-primary/30' : ''}`}>
                            <div className="w-full h-full rounded-2xl bg-background flex items-center justify-center">
                              <Icon className={`w-10 h-10 bg-gradient-to-br ${milestone.color} bg-clip-text`} style={{ color: milestone.isCurrent ? 'hsl(var(--primary))' : undefined }} />
                            </div>
                          </div>
                          {milestone.isCurrent && (
                            <div className="absolute -inset-1 rounded-2xl bg-primary/20 animate-pulse -z-10" />
                          )}
                        </div>

                        {/* Content */}
                        <div className="text-center pt-4">
                          <div className={`text-4xl font-bold mb-2 ${milestone.isCurrent ? 'text-primary' : 'text-foreground'}`}>
                            {milestone.year}
                          </div>
                          <div className="text-muted-foreground text-sm leading-relaxed">
                            {milestone.event}
                          </div>
                        </div>
                      </div>
                    </StaggerItem>
                  );
                })}
              </StaggerContainer>
            </div>

            {/* Vertical timeline for mobile */}
            <div className="md:hidden relative">
              <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-violet-500 via-emerald-500 via-blue-500 to-primary rounded-full" />

              <StaggerContainer className="space-y-8" staggerDelay={0.1}>
                {milestones.map((milestone, index) => {
                  const Icon = milestone.icon;
                  return (
                    <StaggerItem key={milestone.year}>
                      <div className="relative pl-20">
                        {/* Icon */}
                        <div className="absolute left-0 top-0 z-10">
                          <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${milestone.color} p-0.5`}>
                            <div className="w-full h-full rounded-xl bg-background flex items-center justify-center">
                              <Icon className="w-7 h-7 text-foreground" />
                            </div>
                          </div>
                        </div>

                        {/* Content */}
                        <div className="pt-2">
                          <div className={`text-2xl font-bold mb-1 ${milestone.isCurrent ? 'text-primary' : 'text-foreground'}`}>
                            {milestone.year}
                          </div>
                          <div className="text-muted-foreground">{milestone.event}</div>
                        </div>
                      </div>
                    </StaggerItem>
                  );
                })}
              </StaggerContainer>
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="border-t bg-muted/30">
          <div className="max-w-7xl mx-auto py-16 md:py-24 px-4 md:px-8">
            <FadeIn className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                {t("team.title")}
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {t("team.description")}
              </p>
            </FadeIn>

            <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6" staggerDelay={0.05}>
              {teamMembers.map((member) => (
                <StaggerItem key={member.key}>
                  <div className="text-center">
                    <div className="relative w-full aspect-square mb-4 rounded-xl overflow-hidden bg-muted">
                      <Image
                        src={member.image}
                        alt={t(`team.${member.key}.name`)}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <h3 className="font-semibold">
                      {t(`team.${member.key}.name`).split(" ")[0]}{" "}
                      <span className="text-primary">{t(`team.${member.key}.name`).split(" ").slice(1).join(" ")}</span>
                    </h3>
                    <p className="text-sm text-muted-foreground">{t(`team.${member.key}.role`)}</p>
                    {t(`team.${member.key}.credentials`) && (
                      <p className="text-xs text-muted-foreground mt-1">{t(`team.${member.key}.credentials`)}</p>
                    )}
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* Advisors */}
        <section className="border-t">
          <div className="max-w-7xl mx-auto py-16 md:py-24 px-4 md:px-8">
            <FadeIn className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                {t("advisors.title")}
              </h2>
            </FadeIn>

            <div className="flex justify-center gap-8">
              {advisors.map((advisor) => (
                <div key={advisor.key} className="text-center max-w-[200px]">
                  <div className="relative w-40 h-40 mx-auto mb-4 rounded-xl overflow-hidden bg-muted border">
                    {advisor.image ? (
                      <Image
                        src={advisor.image}
                        alt={t(`advisors.${advisor.key}.name`)}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                        <Users className="w-12 h-12" />
                      </div>
                    )}
                  </div>
                  <h3 className="font-semibold">
                    {t(`advisors.${advisor.key}.name`).split(" ")[0]}{" "}
                    <span className="text-primary">{t(`advisors.${advisor.key}.name`).split(" ").slice(1).join(" ")}</span>
                  </h3>
                  <p className="text-sm text-muted-foreground">{t(`advisors.${advisor.key}.role`)}</p>
                  <p className="text-xs text-muted-foreground">{t(`advisors.${advisor.key}.company`)}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Backed By */}
        <section className="border-t bg-muted/30">
          <div className="max-w-7xl mx-auto py-16 md:py-24 px-4 md:px-8">
            <FadeIn className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                {t("backedBy.title")}
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {t("backedBy.description")}
              </p>
            </FadeIn>

            <StaggerContainer className="flex flex-wrap justify-center items-center gap-x-20 gap-y-10" staggerDelay={0.1}>
              {[
                { src: "/images/investors/eviny.svg", alt: "Eviny Ventures" },
                { src: "/images/investors/crucible.svg", alt: "Crucible" },
                { src: "/images/investors/variant.svg", alt: "Variant Fund" },
                { src: "/images/investors/paper-ventures.svg", alt: "Paper Ventures" },
              ].map((investor) => (
                <StaggerItem key={investor.alt}>
                  <Image
                    src={investor.src}
                    alt={investor.alt}
                    width={200}
                    height={60}
                    className="h-12 md:h-16 w-auto opacity-80 hover:opacity-100 transition-opacity brightness-0 dark:brightness-0 dark:invert"
                  />
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* Location */}
        <section className="border-t">
          <div className="max-w-7xl mx-auto py-16 md:py-24 px-4 md:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <FadeIn>
                <div className="flex items-center gap-2 mb-4">
                  <Globe className="h-5 w-5 text-primary" />
                  <span className="font-medium">{t("location.city")}</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
                  {t("location.title")}
                </h2>
                <p className="text-lg text-muted-foreground mb-6">
                  {t("location.paragraph1")}
                </p>
                <p className="text-lg text-muted-foreground">
                  {t("location.paragraph2")}
                </p>
              </FadeIn>
              <FadeIn delay={0.2}>
                <KalmarMap className="h-[400px] w-full" />
              </FadeIn>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="border-t bg-muted/30">
          <div className="max-w-7xl mx-auto py-16 md:py-24 px-4 md:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              {t("cta.title")}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              {t("cta.description")}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" asChild>
                <Link href="/careers">
                  {t("cta.joinTeam")}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/community">
                  {t("cta.joinCommunity")}
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
