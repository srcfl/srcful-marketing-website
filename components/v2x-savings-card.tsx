"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Car, TrendingUp, Zap, Battery, Sun } from "lucide-react";
import { motion } from "framer-motion";
import { useLocale } from "next-intl";

// Currency conversion: SEK to EUR (approximate rate)
const SEK_TO_EUR = 0.085;

interface SavingsRowProps {
  icon: React.ReactNode;
  label: string;
  value: number;
  delay: number;
  isEUR: boolean;
  currencySymbol: string;
}

function AnimatedValue({ value, delay }: { value: number; delay: number }) {
  const [displayed, setDisplayed] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (hasAnimated) return;

    const timeout = setTimeout(() => {
      setHasAnimated(true);
      const duration = 1000;
      const steps = 40;
      const stepDuration = duration / steps;
      const increment = value / steps;

      let step = 0;
      const timer = setInterval(() => {
        step++;
        if (step >= steps) {
          setDisplayed(value);
          clearInterval(timer);
        } else {
          setDisplayed(Math.round(increment * step));
        }
      }, stepDuration);

      return () => clearInterval(timer);
    }, delay);

    return () => clearTimeout(timeout);
  }, [value, delay, hasAnimated]);

  return <span className="tabular-nums">{displayed.toLocaleString()}</span>;
}

function SavingsRow({ icon, label, value, delay, isEUR, currencySymbol }: SavingsRowProps) {
  const displayValue = isEUR ? Math.round(value * SEK_TO_EUR) : value;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: delay / 1000 }}
      className="flex items-center justify-between py-3"
    >
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
          {icon}
        </div>
        <span className="text-sm text-muted-foreground">{label}</span>
      </div>
      <span className="font-semibold text-primary">
        {isEUR && currencySymbol}
        <AnimatedValue value={displayValue} delay={delay} />
        {!isEUR && ` ${currencySymbol}`}
      </span>
    </motion.div>
  );
}

export function V2xSavingsCard() {
  const locale = useLocale();
  const isEUR = locale === "en";
  const currencySymbol = isEUR ? "€" : "kr";

  const [totalDisplayed, setTotalDisplayed] = useState(0);
  const totalValueSEK = 12200;
  const totalValue = isEUR ? Math.round(totalValueSEK * SEK_TO_EUR) : totalValueSEK;

  useEffect(() => {
    const timeout = setTimeout(() => {
      const duration = 1200;
      const steps = 50;
      const stepDuration = duration / steps;
      const increment = totalValue / steps;

      let step = 0;
      const timer = setInterval(() => {
        step++;
        if (step >= steps) {
          setTotalDisplayed(totalValue);
          clearInterval(timer);
        } else {
          setTotalDisplayed(Math.round(increment * step));
        }
      }, stepDuration);

      return () => clearInterval(timer);
    }, 1200); // Start after row animations

    return () => clearTimeout(timeout);
  }, [totalValue]);

  return (
    <Card className="w-full shadow-lg border-border/50 overflow-hidden">
      <CardContent className="p-0">
        {/* Header */}
        <div className="p-5 border-b border-border/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <p className="text-sm text-muted-foreground">V2X Savings Example</p>
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10">
                <Car className="h-3 w-3 text-primary" />
              </div>
            </div>
            <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-green-500/10">
              <TrendingUp className="h-3 w-3 text-green-500" />
              <span className="text-xs font-medium text-green-600 dark:text-green-400">Annual</span>
            </div>
          </div>
        </div>

        {/* Rows */}
        <div className="px-5 py-2 space-y-1 divide-y divide-border/30">
          <SavingsRow
            icon={<Zap className="h-4 w-4 text-yellow-500" />}
            label="Energy trading profit"
            value={5200}
            delay={200}
            isEUR={isEUR}
            currencySymbol={currencySymbol}
          />
          <SavingsRow
            icon={<Battery className="h-4 w-4 text-green-500" />}
            label="Peak demand reduction"
            value={4800}
            delay={400}
            isEUR={isEUR}
            currencySymbol={currencySymbol}
          />
          <SavingsRow
            icon={<Sun className="h-4 w-4 text-orange-500" />}
            label="Grid services rewards"
            value={2200}
            delay={600}
            isEUR={isEUR}
            currencySymbol={currencySymbol}
          />
        </div>

        {/* Total */}
        <div className="p-5 bg-primary/5 border-t border-primary/20">
          <div className="flex items-center justify-between">
            <span className="font-medium">Total annual benefit</span>
            <motion.span
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 1 }}
              className="text-3xl font-bold text-primary tabular-nums"
            >
              {isEUR && currencySymbol}{totalDisplayed.toLocaleString()}{!isEUR && ` ${currencySymbol}`}
            </motion.span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
