"use client";

import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, Coins } from "lucide-react";

export function RecurringRevenueCard() {
  return (
    <Card className="w-[420px] h-[220px] shadow-lg border-border/50">
      <CardContent className="p-5 h-full flex flex-col">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <p className="text-sm text-muted-foreground">Recurring Revenue</p>
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10">
              <Coins className="h-3 w-3 text-primary" />
            </div>
          </div>
          <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-green-500/10">
            <TrendingUp className="h-3 w-3 text-green-500" />
            <span className="text-xs font-medium text-green-600 dark:text-green-400">+22%</span>
          </div>
        </div>
        <p className="text-3xl font-bold text-primary mb-1">€2,840</p>
        <p className="text-xs text-muted-foreground mb-4">Monthly commission</p>

        {/* Sparkline - upward trend */}
        <div className="flex-1 h-[60px]">
          <svg viewBox="0 0 200 50" className="w-full h-full" preserveAspectRatio="none">
            <path
              d="M0,45 L20,42 L40,38 L60,40 L80,32 L100,28 L120,25 L140,20 L160,18 L180,12 L200,8 L200,50 L0,50 Z"
              fill="hsl(var(--primary))"
              fillOpacity="0.1"
            />
            <path
              d="M0,45 L20,42 L40,38 L60,40 L80,32 L100,28 L120,25 L140,20 L160,18 L180,12 L200,8"
              fill="none"
              stroke="hsl(var(--primary))"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </CardContent>
    </Card>
  );
}
