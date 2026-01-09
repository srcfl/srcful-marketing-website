"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Sun, TrendingUp } from "lucide-react";

export function ProductionCard() {
  return (
    <Card className="w-[420px] h-[220px] shadow-lg border-border/50">
      <CardContent className="p-5 h-full flex flex-col">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <p className="text-sm text-muted-foreground">Total Production</p>
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10">
              <Sun className="h-3 w-3 text-primary" />
            </div>
          </div>
          <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-green-500/10">
            <TrendingUp className="h-3 w-3 text-green-500" />
            <span className="text-xs font-medium text-green-600 dark:text-green-400">+12.5%</span>
          </div>
        </div>
        <p className="text-3xl font-bold mb-1">186.4 kWh</p>
        <p className="text-xs text-muted-foreground mb-2">vs last week</p>

        {/* Sparkline - solar production curve */}
        <div className="flex-1 h-[60px]">
          <svg viewBox="0 0 200 50" className="w-full h-full" preserveAspectRatio="none">
            <path
              d="M0,50 L0,48 C40,48 60,10 100,10 C140,10 160,48 200,48 L200,50 Z"
              fill="hsl(var(--primary))"
              fillOpacity="0.15"
            />
            <path
              d="M0,48 C40,48 60,10 100,10 C140,10 160,48 200,48"
              fill="none"
              stroke="hsl(var(--primary))"
              strokeWidth="2"
            />
          </svg>
        </div>
      </CardContent>
    </Card>
  );
}
