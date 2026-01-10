"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/animations";
import {
  DashboardShowcase,
  ProductionCard,
  SavingsCard,
  BatteryCard,
  EnergyFlowCard,
  ScheduleCard,
  ResponseTimeCard,
  FleetOverviewCard,
  ConnectedDevicesCard,
} from "@/components/dashboard-showcase";
import { PartnerLogoCarousel } from "@/components/partner-logo-carousel";
import { ArrowRight, ExternalLink } from "lucide-react";

export function Hero() {
  const t = useTranslations("home");
  const tCommon = useTranslations("common");

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-dot-pattern" />

      <div className="relative max-w-7xl mx-auto pt-24 md:pt-32 pb-12 md:pb-16 px-4 md:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <FadeIn>
            <div>
              <div className="flex items-center gap-2 mb-6">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="text-xs font-medium tracking-wider uppercase text-primary">
                  {t("hero.badge")}
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] mb-6">
                {t("hero.title")}{" "}
                <span className="text-primary">{t("hero.titleHighlight")}</span>
              </h1>

              <p className="text-lg md:text-xl text-muted-foreground max-w-xl mb-8 leading-relaxed">
                {t("hero.description")}
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild>
                  <a
                    href="https://developer.sourceful.energy"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {tCommon("buttons.startBuilding")}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <a
                    href="https://store.sourceful.energy/products/sourceful-energy-zap"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {tCommon("buttons.getTheZap")}
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="flex items-start justify-center lg:justify-end">
              <DashboardShowcase
                cards={[
                  EnergyFlowCard,
                  ProductionCard,
                  SavingsCard,
                  BatteryCard,
                  ScheduleCard,
                  ResponseTimeCard,
                  FleetOverviewCard,
                  ConnectedDevicesCard,
                ]}
                interval={4000}
                pauseOnHover
              />
            </div>
          </FadeIn>
        </div>
      </div>

      {/* Logo carousel */}
      <div className="relative">
        <div className="max-w-7xl mx-auto py-8 md:py-12 px-4 md:px-8">
          <FadeIn delay={0.3}>
            <p className="text-center text-sm text-muted-foreground mb-8">
              {t("hero.partnersLabel")}
            </p>
            <PartnerLogoCarousel speed={40} logoSize="lg" />
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
