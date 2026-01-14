"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Users, TrendingUp } from "lucide-react";

interface CustomerSavingsCardProps {
  translations?: {
    title: string;
    avgSavings: string;
    customers: string;
    totalSaved: string;
    avgRating: string;
  };
}

export function CustomerSavingsCard({ translations }: CustomerSavingsCardProps) {
  const t = translations ?? {
    title: "Customer Savings",
    avgSavings: "Avg. annual savings per customer",
    customers: "Customers",
    totalSaved: "Total saved",
    avgRating: "Avg. rating",
  };
  return (
    <Card className="w-[420px] h-[280px] shadow-lg border-border/50">
      <CardContent className="p-5 h-full flex flex-col justify-center">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <p className="text-sm text-muted-foreground">{t.title}</p>
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10">
              <Users className="h-3 w-3 text-primary" />
            </div>
          </div>
          <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-green-500/10">
            <TrendingUp className="h-3 w-3 text-green-500" />
            <span className="text-xs font-medium text-green-600 dark:text-green-400">+15%</span>
          </div>
        </div>
        <p className="text-3xl font-bold text-primary mb-1">€266</p>
        <p className="text-xs text-muted-foreground mb-4">{t.avgSavings}</p>

        {/* Customer breakdown */}
        <div className="mt-auto grid grid-cols-3 gap-4 pt-4 border-t">
          <div>
            <p className="text-lg font-bold">138</p>
            <p className="text-xs text-muted-foreground">{t.customers}</p>
          </div>
          <div>
            <p className="text-lg font-bold text-primary">€36.7k</p>
            <p className="text-xs text-muted-foreground">{t.totalSaved}</p>
          </div>
          <div>
            <p className="text-lg font-bold">4.8 ★</p>
            <p className="text-xs text-muted-foreground">{t.avgRating}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
