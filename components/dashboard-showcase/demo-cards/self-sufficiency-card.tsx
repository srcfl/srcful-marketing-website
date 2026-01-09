"use client";

import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, Home } from "lucide-react";

export function SelfSufficiencyCard() {
  return (
    <Card className="w-[280px] shadow-lg border-border/50">
      <CardContent className="p-5">
        <div className="flex items-start justify-between mb-3">
          <p className="text-sm text-muted-foreground">Self-Sufficiency</p>
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500/10">
            <Home className="h-4 w-4 text-blue-500" />
          </div>
        </div>
        <div className="flex items-baseline gap-2 mb-2">
          <p className="text-3xl font-bold">84%</p>
          <TrendingUp className="h-4 w-4 text-green-500" />
        </div>
        <p className="text-xs text-muted-foreground">Last 24 hours</p>
        {/* Progress ring visual */}
        <div className="mt-3 flex items-center gap-2">
          <div className="relative w-10 h-10">
            <svg className="w-10 h-10 -rotate-90">
              <circle cx="20" cy="20" r="16" fill="none" stroke="currentColor" strokeWidth="3" className="text-muted" />
              <circle
                cx="20" cy="20" r="16" fill="none" stroke="currentColor" strokeWidth="3"
                strokeDasharray={`${84 * 1.005} 100.5`}
                className="text-blue-500"
              />
            </svg>
          </div>
          <span className="text-xs text-muted-foreground">From solar + battery</span>
        </div>
      </CardContent>
    </Card>
  );
}
