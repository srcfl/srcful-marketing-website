"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Zap, TrendingUp } from "lucide-react";

export function SavingsCard() {
  return (
    <Card className="w-[280px] shadow-lg border-border/50">
      <CardContent className="p-5">
        <div className="flex items-start justify-between mb-3">
          <p className="text-sm text-muted-foreground">Today's Savings</p>
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
            <Zap className="h-4 w-4 text-primary" />
          </div>
        </div>
        <div className="flex items-baseline gap-2 mb-2">
          <p className="text-3xl font-bold text-primary">€12.40</p>
          <TrendingUp className="h-4 w-4 text-green-500" />
        </div>
        <p className="text-xs text-muted-foreground">vs grid-only</p>
      </CardContent>
    </Card>
  );
}
