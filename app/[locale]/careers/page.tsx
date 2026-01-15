"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/src/i18n/routing";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MarketingNav } from "@/components/marketing-nav";
import { MarketingFooter } from "@/components/marketing-footer";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animations";
import { Briefcase, Hammer, Lightbulb, Target, MapPin, Mail, ArrowRight } from "lucide-react";
import { KalmarMap } from "@/components/kalmar-map";

export default function CareersPage() {
  const t = useTranslations("careers");

  const traits = [
    { key: "builder", icon: Hammer },
    { key: "curious", icon: Lightbulb },
    { key: "ownership", icon: Target },
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <MarketingNav />

      <main className="flex-1 pt-16">
        {/* Hero */}
        <section className="relative overflow-hidden border-b">
          <div className="absolute inset-0 bg-dot-pattern" />
          <div className="relative max-w-7xl mx-auto py-24 md:py-32 px-4 md:px-8 text-center">
            <FadeIn className="max-w-3xl mx-auto">
              <Badge variant="secondary" className="mb-6">
                <Briefcase className="h-3 w-3 mr-1" />
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

        {/* No Jobs - Main Content */}
        <section className="max-w-7xl mx-auto py-16 md:py-24 px-4 md:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <FadeIn>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                {t("noJobs.title")}
              </h2>
              <p className="text-xl text-primary font-medium mb-6">
                {t("noJobs.subtitle")}
              </p>
              <p className="text-lg text-muted-foreground">
                {t("noJobs.description")}
              </p>
            </FadeIn>
          </div>

          {/* What We Look For */}
          <FadeIn delay={0.1}>
            <h3 className="text-2xl font-bold text-center mb-8">
              {t("noJobs.whatWeLookFor")}
            </h3>
          </FadeIn>

          <StaggerContainer className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto" staggerDelay={0.1}>
            {traits.map((trait) => {
              const Icon = trait.icon;
              return (
                <StaggerItem key={trait.key}>
                  <Card className="h-full text-center">
                    <CardHeader>
                      <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <CardTitle className="text-lg">
                        {t(`noJobs.traits.${trait.key}.title`)}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">
                        {t(`noJobs.traits.${trait.key}.description`)}
                      </p>
                    </CardContent>
                  </Card>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </section>

        {/* Apply CTA */}
        <section className="border-t bg-muted/30">
          <div className="max-w-7xl mx-auto py-16 md:py-24 px-4 md:px-8">
            <div className="max-w-2xl mx-auto text-center">
              <FadeIn>
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Mail className="w-8 h-8 text-primary" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                  {t("apply.title")}
                </h2>
                <p className="text-lg text-muted-foreground mb-8">
                  {t("apply.description")}
                </p>
                <Button size="lg" asChild>
                  <a href={`mailto:${t("apply.email")}`}>
                    {t("apply.button")}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
                <p className="text-sm text-muted-foreground mt-4">
                  {t("apply.email")}
                </p>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* Location */}
        <section className="border-t">
          <div className="max-w-7xl mx-auto py-16 md:py-24 px-4 md:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <FadeIn>
                <div className="flex items-center gap-2 mb-4">
                  <MapPin className="h-5 w-5 text-primary" />
                  <span className="font-medium">Kalmar, Sweden</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
                  {t("location.title")}
                </h2>
                <p className="text-lg text-muted-foreground">
                  {t("location.description")}
                </p>
              </FadeIn>
              <FadeIn delay={0.2}>
                <KalmarMap className="h-[400px] w-full" />
              </FadeIn>
            </div>
          </div>
        </section>
      </main>

      <MarketingFooter />
    </div>
  );
}
