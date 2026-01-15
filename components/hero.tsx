"use client";

import { useState, useEffect, lazy, Suspense } from "react";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
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

// Lazy load heavy WebGL animation
const UnicornScene = lazy(() => import("unicornstudio-react").then(mod => ({ default: mod.UnicornScene })));

export function Hero() {
  const t = useTranslations("home");
  const tCommon = useTranslations("common");
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Only render theme-dependent content after mounting to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <section className="relative overflow-hidden min-h-screen flex flex-col bg-background dark:bg-[#0a0a0a]">
      {/* Light mode: dot pattern (also shown during SSR to avoid hydration mismatch) */}
      <div className={`absolute inset-0 bg-dot-pattern transition-opacity duration-300 ${isDark ? 'opacity-0' : 'opacity-100'}`} />

      {/* Dark mode: Unicorn animation (lazy loaded, only rendered after mount) */}
      {mounted && isDark && (
        <div className="absolute inset-0 opacity-25">
          <Suspense fallback={null}>
            <UnicornScene
              jsonFilePath="/unicorn-hero.json"
              scale={1}
              dpi={1}
              fps={30}
              altText="Animated background"
              ariaLabel="Decorative animated background"
            />
          </Suspense>
        </div>
      )}

      <div className="relative flex-1 flex flex-col justify-center max-w-7xl mx-auto w-full pt-32 md:pt-40 pb-16 md:pb-24 px-4 md:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <FadeIn>
            <div>
              <div className="flex items-center gap-2 mb-6">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse dark:shadow-[0_0_8px_rgba(0,255,132,0.6)]" />
                <span className="text-xs font-medium tracking-wider uppercase text-primary">
                  {t("hero.badge")}
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] mb-6 text-foreground">
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

      {/* Logo carousel - anchored at bottom */}
      <div className="relative mt-auto pb-8 md:pb-12">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
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
