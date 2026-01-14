"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Star, TrendingUp } from "lucide-react";

interface CustomerSatisfactionCardProps {
  translations?: {
    title: string;
    basedOnReviews: string;
  };
}

export function CustomerSatisfactionCard({ translations }: CustomerSatisfactionCardProps) {
  const t = translations ?? {
    title: "Customer Satisfaction",
    basedOnReviews: "Based on {count} reviews",
  };
  return (
    <Card className="w-[420px] h-[280px] shadow-lg border-border/50">
      <CardContent className="p-5 h-full flex flex-col justify-center">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <p className="text-sm text-muted-foreground">{t.title}</p>
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10">
              <Star className="h-3 w-3 text-primary" />
            </div>
          </div>
          <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-green-500/10">
            <TrendingUp className="h-3 w-3 text-green-500" />
            <span className="text-xs font-medium text-green-600 dark:text-green-400">+0.2</span>
          </div>
        </div>

        <div className="flex items-baseline gap-2 mb-1">
          <p className="text-3xl font-bold">4.8</p>
          <div className="flex items-center gap-0.5">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`h-5 w-5 ${
                  star <= 4
                    ? "fill-yellow-400 text-yellow-400"
                    : "fill-yellow-400/80 text-yellow-400/80"
                }`}
              />
            ))}
          </div>
        </div>
        <p className="text-xs text-muted-foreground mb-4">{t.basedOnReviews.replace("{count}", "1,247")}</p>

        {/* Rating breakdown */}
        <div className="mt-auto space-y-1.5">
          {[
            { stars: 5, percent: 72 },
            { stars: 4, percent: 18 },
            { stars: 3, percent: 7 },
            { stars: 2, percent: 2 },
            { stars: 1, percent: 1 },
          ].map((row) => (
            <div key={row.stars} className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground w-3">{row.stars}</span>
              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
              <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-yellow-400 rounded-full"
                  style={{ width: `${row.percent}%` }}
                />
              </div>
              <span className="text-xs text-muted-foreground w-8">{row.percent}%</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
