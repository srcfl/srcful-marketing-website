"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Zap } from "lucide-react";

export function SavingsCard() {
  return (
    <Card className="w-[420px] h-[220px] shadow-lg border-border/50">
      <CardContent className="p-5 h-full flex flex-col">
        <div className="flex items-start justify-between mb-3">
          <p className="text-sm text-muted-foreground">Today's Savings</p>
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
            <Zap className="h-4 w-4 text-primary" />
          </div>
        </div>
        <div className="mb-1">
          <p className="text-3xl font-bold text-primary">€12.40</p>
        </div>
        <p className="text-xs text-muted-foreground mb-2">vs grid-only</p>

        {/* Sparkline */}
        <div className="flex-1 h-[60px]">
          <svg viewBox="0 0 200 50" className="w-full h-full" preserveAspectRatio="none">
            {/* Area fill */}
            <path
              d="M0,45 L20,42 L40,38 L60,40 L80,32 L100,28 L120,25 L140,20 L160,18 L180,12 L200,8 L200,50 L0,50 Z"
              fill="hsl(var(--primary))"
              fillOpacity="0.1"
            />
            {/* Line */}
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
