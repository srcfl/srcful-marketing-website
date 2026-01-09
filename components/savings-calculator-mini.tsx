"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "@/src/i18n/routing";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { ArrowRight, Sun, Battery, Car } from "lucide-react";

// Simplified calculation (matching the full calculator logic)
const calculateSavings = (
  solarSize: number,
  hasBattery: boolean,
  batterySize: number,
  hasEV: boolean,
  evKmPerYear: number
) => {
  // Using SE3 (Stockholm) prices as default
  const avgPriceKr = 0.85; // 85 öre = 0.85 kr
  const peakPrice = 1.50;
  const offPeakPrice = 0.40;

  // Solar production
  const solarProductionPerKwp = 900;
  const solarProduction = solarSize * solarProductionPerKwp;

  // Self-consumption (higher with battery)
  const selfConsumptionRate = hasBattery ? 0.7 : 0.4;
  const selfConsumedSolar = solarProduction * selfConsumptionRate;

  // Grid export
  const exportedSolar = solarProduction - selfConsumedSolar;
  const exportPrice = avgPriceKr * 0.5;

  // Savings
  const selfConsumptionSavings = selfConsumedSolar * avgPriceKr;
  const exportRevenue = exportedSolar * exportPrice;

  // Battery arbitrage
  let batterySavings = 0;
  if (hasBattery) {
    const annualCycles = 365;
    const priceSpreadKr = peakPrice - offPeakPrice;
    batterySavings = batterySize * annualCycles * priceSpreadKr * 0.9;
  }

  // EV smart charging savings
  let evSavings = 0;
  if (hasEV) {
    const evConsumptionPer100km = 18; // kWh per 100km
    const evAnnualConsumption = (evKmPerYear / 100) * evConsumptionPer100km;
    const priceSpreadKr = avgPriceKr - offPeakPrice;
    evSavings = evAnnualConsumption * priceSpreadKr * 0.8; // 80% of charging is smart
  }

  return Math.round(selfConsumptionSavings + exportRevenue + batterySavings + evSavings);
};

export function SavingsCalculatorMini() {
  const [solarSize, setSolarSize] = useState(10);
  const [hasBattery, setHasBattery] = useState(true);
  const [batterySize, setBatterySize] = useState(10);
  const [hasEV, setHasEV] = useState(false);
  const [evKmPerYear, setEvKmPerYear] = useState(15000);
  const [displayedSavings, setDisplayedSavings] = useState(0);

  const actualSavings = calculateSavings(solarSize, hasBattery, batterySize, hasEV, evKmPerYear);

  // Animate the number counting up
  useEffect(() => {
    const duration = 800;
    const steps = 30;
    const stepDuration = duration / steps;
    const diff = actualSavings - displayedSavings;
    const increment = diff / steps;

    let step = 0;
    const timer = setInterval(() => {
      step++;
      if (step >= steps) {
        setDisplayedSavings(actualSavings);
        clearInterval(timer);
      } else {
        setDisplayedSavings((prev) => Math.round(prev + increment));
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [actualSavings]);

  return (
    <div className="w-full">
      {/* Big savings number */}
      <div className="text-center mb-8">
        <p className="text-sm text-muted-foreground mb-2">Estimated annual savings</p>
        <div className="flex items-baseline justify-center gap-2">
          <motion.span
            key={displayedSavings}
            className="text-6xl md:text-7xl font-bold text-primary tabular-nums"
          >
            {displayedSavings.toLocaleString()}
          </motion.span>
          <span className="text-3xl md:text-4xl font-bold text-primary">SEK</span>
        </div>
        <p className="text-xs text-muted-foreground mt-2">Based on Stockholm (SE3) electricity prices</p>
      </div>

      {/* Simple inputs */}
      <div className="space-y-6 max-w-md mx-auto">
        {/* Solar size */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="flex items-center gap-2">
              <Sun className="h-4 w-4 text-yellow-500" />
              Solar system size
            </Label>
            <span className="text-sm font-medium tabular-nums">{solarSize} kWp</span>
          </div>
          <Slider
            value={[solarSize]}
            onValueChange={(v) => setSolarSize(v[0])}
            min={3}
            max={20}
            step={1}
          />
          <p className="text-xs text-muted-foreground">
            Produces ~{(solarSize * 900).toLocaleString()} kWh/year
          </p>
        </div>

        {/* Battery toggle */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="flex items-center gap-2">
              <Battery className="h-4 w-4 text-green-500" />
              Home battery
            </Label>
            <Switch checked={hasBattery} onCheckedChange={setHasBattery} />
          </div>

          <AnimatePresence>
            {hasBattery && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <div className="pt-2 pb-1 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Battery capacity</span>
                    <span className="text-sm font-medium tabular-nums">{batterySize} kWh</span>
                  </div>
                  <Slider
                    value={[batterySize]}
                    onValueChange={(v) => setBatterySize(v[0])}
                    min={5}
                    max={20}
                    step={1}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* EV toggle */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="flex items-center gap-2">
              <Car className="h-4 w-4 text-blue-500" />
              Electric vehicle
            </Label>
            <Switch checked={hasEV} onCheckedChange={setHasEV} />
          </div>

          <AnimatePresence>
            {hasEV && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <div className="pt-2 pb-1 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Annual driving</span>
                    <span className="text-sm font-medium tabular-nums">{evKmPerYear.toLocaleString()} km</span>
                  </div>
                  <Slider
                    value={[evKmPerYear]}
                    onValueChange={(v) => setEvKmPerYear(v[0])}
                    min={5000}
                    max={40000}
                    step={1000}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* CTA */}
      <div className="mt-8 text-center space-y-3">
        <Button asChild size="lg">
          <Link href="/tools/savings-calculator">
            Get detailed breakdown
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
        <p className="text-xs text-muted-foreground">
          Adjust region, consumption & more in our full calculator
        </p>
      </div>
    </div>
  );
}
