"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Gauge, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

export function ApiLatencyCard() {
  return (
    <Card className="w-[420px] h-[220px] shadow-lg border-border/50">
      <CardContent className="p-5 h-full flex flex-col">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <p className="text-sm text-muted-foreground">API Latency</p>
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10">
              <Gauge className="h-3 w-3 text-primary" />
            </div>
          </div>
          <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-green-500/10">
            <CheckCircle className="h-3 w-3 text-green-500" />
            <span className="text-xs font-medium text-green-600 dark:text-green-400">Excellent</span>
          </div>
        </div>

        <div className="flex items-baseline gap-1 mb-1">
          <p className="text-4xl font-bold text-primary">&lt;50</p>
          <p className="text-xl font-medium text-muted-foreground">ms</p>
        </div>
        <p className="text-xs text-muted-foreground mb-4">P95 response time</p>

        {/* Latency histogram */}
        <div className="mt-auto">
          <div className="flex items-end gap-0.5 h-[50px]">
            {[5, 12, 28, 45, 72, 85, 65, 35, 18, 8, 4, 2].map((value, i) => (
              <motion.div
                key={i}
                className={`flex-1 rounded-t ${i < 6 ? "bg-primary" : "bg-muted-foreground/30"}`}
                initial={{ height: 0 }}
                animate={{ height: `${value}%` }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.03 * i }}
              />
            ))}
          </div>
          <div className="flex justify-between mt-1 text-[10px] text-muted-foreground">
            <span>10ms</span>
            <span>50ms</span>
            <span>100ms</span>
            <span>200ms</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
