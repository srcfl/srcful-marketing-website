"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Building2, TrendingUp } from "lucide-react";

export function FleetOverviewCard() {
  return (
    <Card className="w-[420px] h-[220px] shadow-lg border-border/50">
      <CardContent className="p-5 h-full flex flex-col">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <p className="text-sm text-muted-foreground">Fleet Overview</p>
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10">
              <Building2 className="h-3 w-3 text-primary" />
            </div>
          </div>
          <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-green-500/10">
            <TrendingUp className="h-3 w-3 text-green-500" />
            <span className="text-xs font-medium text-green-600 dark:text-green-400">+847</span>
          </div>
        </div>
        <p className="text-3xl font-bold mb-1">12,847</p>
        <p className="text-xs text-muted-foreground mb-4">Connected devices</p>

        {/* Mini fleet stats */}
        <div className="mt-auto grid grid-cols-3 gap-4 pt-4 border-t">
          <div>
            <p className="text-lg font-bold text-primary">2.4 MW</p>
            <p className="text-xs text-muted-foreground">Total capacity</p>
          </div>
          <div>
            <p className="text-lg font-bold text-primary">98.2%</p>
            <p className="text-xs text-muted-foreground">Online</p>
          </div>
          <div>
            <p className="text-lg font-bold text-primary">156</p>
            <p className="text-xs text-muted-foreground">Sites</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
