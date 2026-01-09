"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Wallet, ArrowUpRight } from "lucide-react";

export function CommissionCard() {
  return (
    <Card className="w-[420px] h-[220px] shadow-lg border-border/50">
      <CardContent className="p-5 h-full flex flex-col">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <p className="text-sm text-muted-foreground">Commission Earned</p>
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10">
              <Wallet className="h-3 w-3 text-primary" />
            </div>
          </div>
        </div>
        <p className="text-3xl font-bold text-primary mb-1">€34,080</p>
        <p className="text-xs text-muted-foreground mb-4">Total this year</p>

        {/* Breakdown */}
        <div className="mt-auto space-y-2 pt-4 border-t">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Installation fee</span>
            <div className="flex items-center gap-1">
              <span className="text-sm font-medium">€14,200</span>
              <ArrowUpRight className="h-3 w-3 text-green-500" />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Recurring commission</span>
            <div className="flex items-center gap-1">
              <span className="text-sm font-medium">€19,880</span>
              <ArrowUpRight className="h-3 w-3 text-green-500" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
