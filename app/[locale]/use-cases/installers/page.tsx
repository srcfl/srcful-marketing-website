"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/src/i18n/routing";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MarketingNav } from "@/components/marketing-nav";
import { MarketingFooter } from "@/components/marketing-footer";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animations";
import { InstallerPricingSection } from "@/components/installer-pricing-section";
import { VideoPlaceholder } from "@/components/video-placeholder";
import { PartnerLogoCarousel } from "@/components/partner-logo-carousel";
import {
  ArrowRight,
  Wrench,
  ExternalLink,
  Puzzle,
  PhoneCall,
  AlertTriangle,
  Check,
  Activity,
  Cpu,
  Headphones,
  Smartphone,
  ChevronDown,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function InstallersPage() {
  const t = useTranslations("useCases.installers");
  const tCommon = useTranslations("common");

  const painPoints = [
    { key: "softwareSpaghetti", icon: Puzzle },
    { key: "supportCallbacks", icon: PhoneCall },
    { key: "ecosystemConflicts", icon: AlertTriangle },
  ];

  const whatCustomersGetItems = [
    { key: "0", icon: Activity },
    { key: "1", icon: Cpu },
    { key: "2", icon: Headphones },
    { key: "3", icon: Smartphone },
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
              <Badge variant="secondary" className="mb-6 bg-indigo-500/10 text-indigo-600 border-indigo-500/20">
                <Wrench className="h-3 w-3 mr-1" />
                {t("hero.badge")}
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-left">
                {t("hero.title")}{" "}
                <span className="text-indigo-500">{t("hero.titleHighlight")}</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 text-left max-w-2xl">
                {t("hero.description")}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-indigo-500 hover:bg-indigo-600" asChild>
                  <a href="https://store.sourceful.energy/products/sourceful-energy-zap" target="_blank" rel="noopener noreferrer">
                    {tCommon("buttons.orderNow")}
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/contact">
                    {tCommon("buttons.contactSales")}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* Partner highlight */}
        <section className="bg-muted/30 border-b">
          <div className="max-w-7xl mx-auto py-12 px-4 md:px-8">
            <div className="flex flex-col items-center justify-center gap-2">
              <div className="text-sm text-muted-foreground uppercase tracking-wider">{t("partner.trustedBy")}</div>
              <div className="text-center">
                <div className="text-2xl font-bold text-indigo-500">Elkedjan</div>
                <div className="text-sm text-muted-foreground">{t("partner.elkedjanDescription")}</div>
              </div>
            </div>
          </div>
        </section>

        {/* Pain Points */}
        <section className="max-w-7xl mx-auto py-16 md:py-24 px-4 md:px-8">
          <FadeIn className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              {t("painPoints.title")}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t("painPoints.description")}
            </p>
          </FadeIn>

          <StaggerContainer className="grid md:grid-cols-3 gap-6" staggerDelay={0.1}>
            {painPoints.map((point) => {
              const Icon = point.icon;
              return (
                <StaggerItem key={point.key}>
                  <Card className="h-full border-destructive/20 bg-destructive/5">
                    <CardHeader>
                      <div className="w-12 h-12 bg-destructive/10 rounded-lg flex items-center justify-center mb-4">
                        <Icon className="h-6 w-6 text-destructive" />
                      </div>
                      <CardTitle>{t(`painPoints.${point.key}.title`)}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-base">
                        {t(`painPoints.${point.key}.description`)}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </section>

        {/* Responsibility Split */}
        <section className="border-t bg-muted/30">
          <div className="max-w-7xl mx-auto py-16 md:py-24 px-4 md:px-8">
            <FadeIn className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                {t("responsibility.title")}
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {t("responsibility.description")}
              </p>
            </FadeIn>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <FadeIn>
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle className="text-xl text-indigo-500">{t("responsibility.installer.title")}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {[0, 1, 2, 3].map((i) => (
                        <li key={i} className="flex items-center gap-3">
                          <Check className="h-5 w-5 text-indigo-500 shrink-0" />
                          <span>{t(`responsibility.installer.items.${i}`)}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </FadeIn>
              <FadeIn delay={0.1}>
                <Card className="h-full border-indigo-500/20 bg-indigo-500/5">
                  <CardHeader>
                    <CardTitle className="text-xl text-indigo-500">{t("responsibility.sourceful.title")}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {[0, 1, 2, 3].map((i) => (
                        <li key={i} className="flex items-center gap-3">
                          <Check className="h-5 w-5 text-indigo-500 shrink-0" />
                          <span>{t(`responsibility.sourceful.items.${i}`)}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* What Customers Get */}
        <section className="border-t">
          <div className="max-w-7xl mx-auto py-16 md:py-24 px-4 md:px-8">
            <FadeIn className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                {t("whatCustomersGet.title")}
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {t("whatCustomersGet.description")}
              </p>
            </FadeIn>

            <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-4 gap-6" staggerDelay={0.1}>
              {whatCustomersGetItems.map((item) => {
                const Icon = item.icon;
                return (
                  <StaggerItem key={item.key}>
                    <Card className="h-full text-center">
                      <CardHeader>
                        <div className="w-12 h-12 bg-indigo-500/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                          <Icon className="h-6 w-6 text-indigo-500" />
                        </div>
                        <CardTitle className="text-lg">{t(`whatCustomersGet.items.${item.key}.title`)}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CardDescription>
                          {t(`whatCustomersGet.items.${item.key}.description`)}
                        </CardDescription>
                      </CardContent>
                    </Card>
                  </StaggerItem>
                );
              })}
            </StaggerContainer>
          </div>
        </section>

        {/* Brand Compatibility */}
        <section className="border-t bg-muted/30">
          <div className="max-w-7xl mx-auto py-16 md:py-24 px-4 md:px-8">
            <FadeIn className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                {t("compatibility.title")}
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {t("compatibility.description")}
              </p>
            </FadeIn>
            <PartnerLogoCarousel />
            <div className="text-center mt-8">
              <Button variant="outline" asChild>
                <Link href="/integrations">
                  See all integrations
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Installer Pricing */}
        <section className="border-t">
          <InstallerPricingSection />
        </section>

        {/* Video Placeholder */}
        <section className="border-t bg-muted/30">
          <div className="max-w-4xl mx-auto py-16 md:py-24 px-4 md:px-8">
            <FadeIn className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                {t("video.title")}
              </h2>
            </FadeIn>
            <VideoPlaceholder
              title={t("video.title")}
              comingSoonText={t("video.comingSoon")}
            />
          </div>
        </section>

        {/* How it works */}
        <section className="border-t">
          <div className="max-w-7xl mx-auto py-16 md:py-24 px-4 md:px-8">
            <FadeIn className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                {t("howItWorks.title")}
              </h2>
            </FadeIn>

            <StaggerContainer className="grid md:grid-cols-3 gap-8" staggerDelay={0.1}>
              <StaggerItem>
                <div className="text-center">
                  <div className="w-12 h-12 bg-indigo-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                    1
                  </div>
                  <h3 className="font-semibold mb-2">{t("howItWorks.step1.title")}</h3>
                  <p className="text-muted-foreground">
                    {t("howItWorks.step1.description")}
                  </p>
                </div>
              </StaggerItem>
              <StaggerItem>
                <div className="text-center">
                  <div className="w-12 h-12 bg-indigo-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                    2
                  </div>
                  <h3 className="font-semibold mb-2">{t("howItWorks.step2.title")}</h3>
                  <p className="text-muted-foreground">
                    {t("howItWorks.step2.description")}
                  </p>
                </div>
              </StaggerItem>
              <StaggerItem>
                <div className="text-center">
                  <div className="w-12 h-12 bg-indigo-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                    3
                  </div>
                  <h3 className="font-semibold mb-2">{t("howItWorks.step3.title")}</h3>
                  <p className="text-muted-foreground">
                    {t("howItWorks.step3.description")}
                  </p>
                </div>
              </StaggerItem>
            </StaggerContainer>
          </div>
        </section>

        {/* FAQ */}
        <section className="border-t bg-muted/30">
          <div className="max-w-3xl mx-auto py-16 md:py-24 px-4 md:px-8">
            <FadeIn className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                {t("faq.title")}
              </h2>
            </FadeIn>

            <Accordion type="single" collapsible className="w-full">
              {[0, 1, 2, 3].map((i) => (
                <AccordionItem key={i} value={`item-${i}`}>
                  <AccordionTrigger className="text-left">
                    {t(`faq.items.${i}.question`)}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {t(`faq.items.${i}.answer`)}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* CTA */}
        <section className="border-t bg-gradient-to-br from-indigo-500/10 via-indigo-500/5 to-background">
          <div className="max-w-7xl mx-auto py-16 md:py-24 px-4 md:px-8 text-center">
            <FadeIn>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                {t("cta.title")}
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
                {t("cta.description")}
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button size="lg" className="bg-indigo-500 hover:bg-indigo-600" asChild>
                  <a href="https://store.sourceful.energy/products/sourceful-energy-zap" target="_blank" rel="noopener noreferrer">
                    {tCommon("buttons.orderNow")}
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/contact">
                    {tCommon("buttons.contactSales")}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
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
