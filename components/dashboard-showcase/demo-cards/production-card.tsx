"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Sun, TrendingUp } from "lucide-react";

export function ProductionCard() {
  return (
    <Card className="w-[280px] shadow-lg border-border/50">
      <CardContent className="p-5">
        <div className="flex items-start justify-between mb-3">
          <p className="text-sm text-muted-foreground">Total Production</p>
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
            <Sun className="h-4 w-4 text-primary" />
          </div>
        </div>
        <p className="text-3xl font-bold mb-2">186.4 kWh</p>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-green-500/10">
            <TrendingUp className="h-3 w-3 text-green-500" />
            <span className="text-xs font-medium text-green-600 dark:text-green-400">+12.5%</span>
          </div>
          <span className="text-xs text-muted-foreground">vs last week</span>
        </div>
      </CardContent>
    </Card>
  );
}
