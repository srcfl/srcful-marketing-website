"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { Map, BarChart3, Table2, Activity, Cpu, Coins, Play, Pause } from "lucide-react";
import { SitesOverviewExample } from "@/components/examples/sites-overview";
import { AnalyticsDashboardExample } from "@/components/examples/analytics-dashboard";
import { FleetDashboardExample } from "@/components/examples/fleet-dashboard";
import { EnergyMonitorExample } from "@/components/examples/energy-monitor";
import { EMSDashboardExample } from "@/components/examples/ems-dashboard";
import { SavingsRewardsExample } from "@/components/examples/savings-rewards";

const tabs = [
  { id: "ems", icon: Cpu, labelKey: "automate", component: EMSDashboardExample },
  { id: "savings", icon: Coins, labelKey: "savings", component: SavingsRewardsExample },
  { id: "monitor", icon: Activity, labelKey: "monitor", component: EnergyMonitorExample },
  { id: "analytics", icon: BarChart3, labelKey: "analytics", component: AnalyticsDashboardExample },
  { id: "vpp", icon: Map, labelKey: "vpp", component: SitesOverviewExample },
  { id: "fleet", icon: Table2, labelKey: "fleet", component: FleetDashboardExample },
];

const CYCLE_DURATION = 6000; // 6 seconds per tab

export function DashboardTabs() {
  const t = useTranslations("home.dashboard");
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = backward

  // Auto-cycle through tabs
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setDirection(1);
      setActiveIndex((prev) => (prev + 1) % tabs.length);
    }, CYCLE_DURATION);

    return () => clearInterval(interval);
  }, [isPaused]);

  const handleTabClick = useCallback((index: number) => {
    setDirection(index > activeIndex ? 1 : -1);
    setActiveIndex(index);
  }, [activeIndex]);

  const togglePause = useCallback(() => {
    setIsPaused(prev => !prev);
  }, []);

  const ActiveComponent = tabs[activeIndex].component;
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const [tabDimensions, setTabDimensions] = useState<{ left: number; width: number }[]>([]);

  // Measure tab dimensions
  useEffect(() => {
    const measureTabs = () => {
      const dimensions = tabsRef.current.map((tab) => {
        if (!tab) return { left: 0, width: 0 };
        return { left: tab.offsetLeft, width: tab.offsetWidth };
      });
      setTabDimensions(dimensions);
    };

    measureTabs();
    window.addEventListener("resize", measureTabs);
    return () => window.removeEventListener("resize", measureTabs);
  }, []);

  // Animation variants for content
  const contentVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 60 : -60,
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -60 : 60,
      opacity: 0,
      scale: 0.95,
    }),
  };

  return (
    <div>
      {/* Tab list */}
      <div className="flex items-center justify-center mb-8">
        <div className="relative inline-flex items-center bg-muted rounded-lg p-1.5">
          {/* Animated background pill */}
          {tabDimensions.length > 0 && tabDimensions[activeIndex] && (
            <motion.div
              className="absolute h-[calc(100%-12px)] bg-background rounded-md shadow-sm"
              initial={false}
              animate={{
                x: tabDimensions[activeIndex].left,
                width: tabDimensions[activeIndex].width,
              }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 30,
              }}
              style={{ top: 6, left: 0 }}
            />
          )}

          {/* Tab buttons */}
          {tabs.map((tab, index) => {
            const Icon = tab.icon;
            const isActive = index === activeIndex;

            return (
              <button
                key={tab.id}
                ref={(el) => { tabsRef.current[index] = el; }}
                onClick={() => handleTabClick(index)}
                className={cn(
                  "relative z-10 flex items-center gap-2 px-3 sm:px-4 py-2 text-sm font-medium transition-colors duration-200",
                  isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                )}
              >
                <Icon className="h-4 w-4" />
                <span className="hidden sm:inline">{t(`tabs.${tab.labelKey}`)}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Content area - clip only bottom, allow side overflow for shadows */}
      <div
        className="relative h-[600px] md:h-[700px]"
        style={{ clipPath: "inset(0 -100px 0 -100px)" }}
      >
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={activeIndex}
            custom={direction}
            variants={contentVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.25 },
              scale: { duration: 0.25 },
            }}
          >
            <ActiveComponent />
          </motion.div>
        </AnimatePresence>
        {/* Bottom fade gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
      </div>

      {/* Progress bar with play/pause */}
      <div className="flex justify-center items-center gap-3 mt-6">
        <div className="flex gap-1.5">
          {tabs.slice(0, 3).map((_, index) => (
            <div
              key={index}
              className="relative h-1 w-8 bg-muted rounded-full overflow-hidden cursor-pointer"
              onClick={() => handleTabClick(index)}
            >
              {index === activeIndex && !isPaused && (
                <motion.div
                  className="absolute inset-0 bg-primary rounded-full"
                  initial={{ scaleX: 0, originX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: CYCLE_DURATION / 1000, ease: "linear" }}
                  key={activeIndex}
                />
              )}
              {index === activeIndex && isPaused && (
                <div className="absolute inset-0 bg-primary rounded-full" />
              )}
              {index < activeIndex && (
                <div className="absolute inset-0 bg-primary/40 rounded-full" />
              )}
            </div>
          ))}
        </div>

        {/* Play/Pause button */}
        <button
          onClick={togglePause}
          className="h-6 w-6 flex items-center justify-center rounded-full bg-muted hover:bg-muted/80 transition-colors"
        >
          {isPaused ? (
            <Play className="h-3 w-3 text-foreground ml-0.5" />
          ) : (
            <Pause className="h-3 w-3 text-foreground" />
          )}
        </button>

        <div className="flex gap-1.5">
          {tabs.slice(3).map((_, i) => {
            const index = i + 3;
            return (
              <div
                key={index}
                className="relative h-1 w-8 bg-muted rounded-full overflow-hidden cursor-pointer"
                onClick={() => handleTabClick(index)}
              >
                {index === activeIndex && !isPaused && (
                  <motion.div
                    className="absolute inset-0 bg-primary rounded-full"
                    initial={{ scaleX: 0, originX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: CYCLE_DURATION / 1000, ease: "linear" }}
                    key={activeIndex}
                  />
                )}
                {index === activeIndex && isPaused && (
                  <div className="absolute inset-0 bg-primary rounded-full" />
                )}
                {index < activeIndex && (
                  <div className="absolute inset-0 bg-primary/40 rounded-full" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
