"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Battery } from "lucide-react";

export function BatteryCard() {
  return (
    <Card className="w-[280px] shadow-lg border-border/50">
      <CardContent className="p-5">
        <div className="flex items-start justify-between mb-3">
          <p className="text-sm text-muted-foreground">Battery SoC</p>
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-yellow-500/10">
            <Battery className="h-4 w-4 text-yellow-500" />
          </div>
        </div>
        <p className="text-3xl font-bold mb-2">78%</p>
        <p className="text-xs text-muted-foreground">7.8 kWh stored</p>
        {/* Battery visual */}
        <div className="mt-3 h-2 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full transition-all"
            style={{ width: '78%' }}
          />
        </div>
      </CardContent>
    </Card>
  );
}
