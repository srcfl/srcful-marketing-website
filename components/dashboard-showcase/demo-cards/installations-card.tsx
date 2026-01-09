"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Wrench, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

export function InstallationsCard() {
  return (
    <Card className="w-[420px] h-[220px] shadow-lg border-border/50">
      <CardContent className="p-5 h-full flex flex-col">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <p className="text-sm text-muted-foreground">Installations</p>
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10">
              <Wrench className="h-3 w-3 text-primary" />
            </div>
          </div>
          <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-green-500/10">
            <TrendingUp className="h-3 w-3 text-green-500" />
            <span className="text-xs font-medium text-green-600 dark:text-green-400">+8 this month</span>
          </div>
        </div>
        <p className="text-3xl font-bold mb-1">142</p>
        <p className="text-xs text-muted-foreground mb-4">Total Zap installations</p>

        {/* Monthly installations chart */}
        <div className="flex-1 flex items-end gap-2 mt-2">
          {[8, 12, 10, 15, 11, 14].map((value, i) => (
            <div key={i} className="flex-1 flex flex-col items-center">
              <motion.div
                className="w-full bg-gradient-to-t from-primary to-emerald-400 rounded-t"
                initial={{ height: 0 }}
                animate={{ height: `${(value / 15) * 60}px` }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 * i }}
              />
              <span className="text-[10px] text-muted-foreground mt-1">{value}</span>
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-1 text-[10px] text-muted-foreground">
          <span>Jul</span>
          <span>Aug</span>
          <span>Sep</span>
          <span>Oct</span>
          <span>Nov</span>
          <span>Dec</span>
        </div>
      </CardContent>
    </Card>
  );
}
