"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Cpu, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

export function ConnectedDevicesCard() {
  return (
    <Card className="w-[420px] h-[220px] shadow-lg border-border/50">
      <CardContent className="p-5 h-full flex flex-col">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <p className="text-sm text-muted-foreground">Connected Devices</p>
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10">
              <Cpu className="h-3 w-3 text-primary" />
            </div>
          </div>
          <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-green-500/10">
            <TrendingUp className="h-3 w-3 text-green-500" />
            <span className="text-xs font-medium text-green-600 dark:text-green-400">+1,240</span>
          </div>
        </div>
        <p className="text-3xl font-bold mb-1">8,456</p>
        <p className="text-xs text-muted-foreground mb-4">Via your integration</p>

        {/* Growth chart */}
        <div className="flex-1 flex items-end gap-1 mt-2">
          {[35, 42, 48, 55, 62, 70, 78, 85, 92, 100].map((value, i) => (
            <motion.div
              key={i}
              className="flex-1 bg-gradient-to-t from-primary to-emerald-400 rounded-t"
              initial={{ height: 0 }}
              animate={{ height: `${value}%` }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.05 * i }}
            />
          ))}
        </div>
        <div className="flex justify-between mt-2 text-[10px] text-muted-foreground">
          <span>Q1</span>
          <span>Q2</span>
          <span>Q3</span>
          <span>Q4</span>
        </div>
      </CardContent>
    </Card>
  );
}
