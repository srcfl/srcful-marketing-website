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
  DashboardShowcase,
  CustomerSavingsCard,
  CustomerSatisfactionCard,
  ConnectedDevicesCard,
} from "@/components/dashboard-showcase";
import { PixelGrid } from "@/components/ui/pixel-grid";
import {
  ArrowRight,
  Wrench,
  ExternalLink,
  Puzzle,
  PhoneCall,
  AlertTriangle,
  Check,
  Activity,
  Headphones,
  Smartphone,
  Users,
} from "lucide-react";

export default function InstallersPage() {
  const t = useTranslations("useCases.installers");
  const tCommon = useTranslations("common");
  const tHome = useTranslations("home");

  // Translated dashboard card wrappers
  const TranslatedGridProductionCard = () => (
    <ConnectedDevicesCard
      translations={{
        title: t("dashboardCards.gridProduction.title"),
        solarProduction: t("dashboardCards.gridProduction.solarProduction"),
        producedToday: t("dashboardCards.gridProduction.producedToday"),
        exportedToGrid: t("dashboardCards.gridProduction.exportedToGrid"),
      }}
    />
  );

  const TranslatedCustomerSatisfactionCard = () => (
    <CustomerSatisfactionCard
      translations={{
        title: t("dashboardCards.customerSatisfaction.title"),
        basedOnReviews: t("dashboardCards.customerSatisfaction.basedOnReviews", { count: "1,247" }),
      }}
    />
  );

  const TranslatedCustomerSavingsCard = () => (
    <CustomerSavingsCard
      translations={{
        title: t("dashboardCards.customerSavings.title"),
        avgSavings: t("dashboardCards.customerSavings.avgSavings"),
        customers: t("dashboardCards.customerSavings.customers"),
        totalSaved: t("dashboardCards.customerSavings.totalSaved"),
        avgRating: t("dashboardCards.customerSavings.avgRating"),
      }}
    />
  );

  const painPoints = [
    { key: "softwareSpaghetti", icon: Puzzle },
    { key: "supportCallbacks", icon: PhoneCall },
    { key: "ecosystemConflicts", icon: AlertTriangle },
  ];

  const whatCustomersGetItems = [
    { key: "0", icon: Activity, DemoCard: TranslatedGridProductionCard },
    { key: "1", icon: Headphones, DemoCard: TranslatedCustomerSatisfactionCard },
    { key: "2", icon: Smartphone, DemoCard: TranslatedCustomerSavingsCard },
  ];

  const scrollToPricing = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const pricingSection = document.getElementById("installer-pricing");
    if (pricingSection) {
      pricingSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToHowItWorks = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const section = document.getElementById("how-it-works");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <MarketingNav />

      <main className="flex-1 pt-16">
        {/* Hero */}
        <section className="relative overflow-hidden border-b min-h-screen flex items-center pb-24">
          <div className="absolute inset-0 bg-dot-pattern" />
          <div className="relative max-w-7xl mx-auto w-full py-16 md:py-24 px-4 md:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <FadeIn>
                <Badge variant="secondary" className="mb-6 bg-primary/10 text-primary border-primary/20">
                  <Wrench className="h-3 w-3 mr-1" />
                  {t("hero.badge")}
                </Badge>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-left">
                  {t("hero.title")}<br />
                  <span className="text-primary">{t("hero.titleHighlight")}</span>
                </h1>
                <p className="text-xl text-muted-foreground mb-8 text-left max-w-2xl">
                  {t("hero.description")}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <Button size="lg" className="bg-primary hover:bg-primary" asChild>
                    <a href="#installer-pricing" onClick={scrollToPricing}>
                      {tCommon("buttons.orderNow")}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                  <Button size="lg" variant="outline" className="hover:bg-primary/10 hover:text-primary" asChild>
                    <a href="#how-it-works" onClick={scrollToHowItWorks}>
                      {tCommon("buttons.howItWorks")}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-4">
                    {tHome("hero.partnersLabel")}
                  </div>
                  <PartnerLogoCarousel />
                </div>
              </FadeIn>
              <FadeIn delay={0.2}>
                <div className="flex items-center justify-center lg:justify-end">
                  <DashboardShowcase
                    cards={[
                      TranslatedCustomerSavingsCard,
                      TranslatedCustomerSatisfactionCard,
                      TranslatedGridProductionCard,
                    ]}
                    interval={4000}
                    pauseOnHover
                  />
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* Pain Points */}
        <section id="how-it-works" className="min-h-screen flex items-center">
          <div className="max-w-7xl mx-auto w-full py-16 md:py-24 px-4 md:px-8">
            <FadeIn className="text-center mb-12">
              <div className="flex justify-center mb-8">
                <PixelGrid pattern="corners-only" color="indigo" size="lg" speed="slow" />
              </div>
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
                    <Card className="h-full border-primary/20 bg-primary/5">
                      <CardHeader>
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                          <Icon className="h-6 w-6 text-primary" />
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
          </div>
        </section>

        {/* Responsibility Split */}
        <section className="border-t bg-muted/30">
          <div className="max-w-7xl mx-auto w-full py-16 md:py-24 px-4 md:px-8">
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
                    <CardTitle className="text-xl text-primary">{t("responsibility.installer.title")}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {[0, 1, 2, 3].map((i) => (
                        <li key={i} className="flex items-center gap-3">
                          <Check className="h-5 w-5 text-primary shrink-0" />
                          <span>{t(`responsibility.installer.items.${i}`)}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </FadeIn>
              <FadeIn delay={0.1}>
                <Card className="h-full border-primary/20 bg-primary/5">
                  <CardHeader>
                    <CardTitle className="text-xl text-primary">{t("responsibility.sourceful.title")}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {[0, 1, 2, 3].map((i) => (
                        <li key={i} className="flex items-center gap-3">
                          <Check className="h-5 w-5 text-primary shrink-0" />
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

        {/* What Customers Get - Alternating Layout */}
        <section className="border-t">
          <div className="max-w-5xl mx-auto py-16 md:py-24 px-4 md:px-8">
            <FadeIn className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                {t("whatCustomersGet.title")}
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {t("whatCustomersGet.description")}
              </p>
            </FadeIn>

            <div className="space-y-24">
              {whatCustomersGetItems.map((item, index) => {
                const Icon = item.icon;
                const DemoCard = item.DemoCard;
                const isReversed = index % 2 === 1;

                return (
                  <FadeIn key={item.key} delay={0.1 * index}>
                    <div className={`grid lg:grid-cols-2 gap-8 items-center ${isReversed ? "lg:flex-row-reverse" : ""}`}>
                      <div className={`${isReversed ? "lg:order-2" : ""}`}>
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                          <Icon className="h-6 w-6 text-primary" />
                        </div>
                        <h3 className="text-2xl font-bold mb-4">{t(`whatCustomersGet.items.${item.key}.title`)}</h3>
                        <p className="text-lg text-muted-foreground">
                          {t(`whatCustomersGet.items.${item.key}.description`)}
                        </p>
                      </div>
                      <div className={`flex justify-center ${isReversed ? "lg:order-1 lg:justify-start" : "lg:justify-end"}`}>
                        <DemoCard />
                      </div>
                    </div>
                  </FadeIn>
                );
              })}
            </div>
          </div>
        </section>

        {/* Brand Compatibility */}
        <section className="border-t bg-muted/30">
          <div className="max-w-7xl mx-auto w-full py-16 md:py-24 px-4 md:px-8">
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
              <Button variant="outline" className="hover:bg-primary/10 hover:text-primary" asChild>
                <Link href="/integrations">
                  {t("compatibility.seeAll")}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
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
          <div className="max-w-7xl mx-auto w-full py-16 md:py-24 px-4 md:px-8">
            <FadeIn className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                {t("howItWorks.title")}
              </h2>
            </FadeIn>

            <StaggerContainer className="grid md:grid-cols-3 gap-8" staggerDelay={0.1}>
              <StaggerItem>
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                    1
                  </div>
                  <h3 className="font-semibold mb-2">{t("howItWorks.step1.title")}</h3>
                  <p className="text-muted-foreground max-w-[200px] mx-auto">
                    {t("howItWorks.step1.description")}
                  </p>
                </div>
              </StaggerItem>
              <StaggerItem>
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                    2
                  </div>
                  <h3 className="font-semibold mb-2">{t("howItWorks.step2.title")}</h3>
                  <p className="text-muted-foreground max-w-[200px] mx-auto">
                    {t("howItWorks.step2.description")}
                  </p>
                </div>
              </StaggerItem>
              <StaggerItem>
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                    3
                  </div>
                  <h3 className="font-semibold mb-2">{t("howItWorks.step3.title")}</h3>
                  <p className="text-muted-foreground max-w-[200px] mx-auto">
                    {t("howItWorks.step3.description")}
                  </p>
                </div>
              </StaggerItem>
            </StaggerContainer>
          </div>
        </section>

        {/* Installer Pricing */}
        <section id="installer-pricing" className="border-t bg-muted/30">
          <div className="w-full">
            <InstallerPricingSection />
          </div>
        </section>

        {/* FAQ */}
        <section className="border-t bg-muted/30 min-h-screen flex items-center">
          <div className="max-w-3xl mx-auto w-full py-16 md:py-24 px-4 md:px-8">
            <FadeIn className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                {t("faq.title")}
              </h2>
            </FadeIn>

            <div className="space-y-6">
              {[0, 1, 2, 3].map((i) => (
                <FadeIn key={i} delay={0.1 * i}>
                  <div>
                    <h3 className="font-semibold mb-2">{t(`faq.items.${i}.question`)}</h3>
                    <p className="text-muted-foreground">
                      {t(`faq.items.${i}.answer`)}
                    </p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* CTA - Community style like home page */}
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
                      <h3 className="text-2xl font-bold mb-2">{tHome("community.title")}</h3>
                      <p className="text-muted-foreground">
                        {tHome("community.description")}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button className="bg-primary hover:bg-primary" asChild>
                      <a href="https://discord.gg/srcful" target="_blank" rel="noopener noreferrer">
                        {tCommon("buttons.joinDiscord")}
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                    <Button variant="outline" className="hover:bg-primary/10 hover:text-primary" asChild>
                      <Link href="/contact">
                        {tCommon("nav.contact")}
                      </Link>
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
