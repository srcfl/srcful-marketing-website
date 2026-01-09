"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Battery } from "lucide-react";
import { motion } from "framer-motion";

export function BatteryCard() {
  return (
    <Card className="w-[420px] h-[220px] shadow-lg border-border/50">
      <CardContent className="p-5 h-full flex flex-col">
        <div className="flex items-start justify-between mb-3">
          <p className="text-sm text-muted-foreground">Battery SoC</p>
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
            <Battery className="h-4 w-4 text-primary" />
          </div>
        </div>
        <p className="text-3xl font-bold mb-2">78%</p>
        <p className="text-xs text-muted-foreground">7.8 kWh stored</p>
        {/* Battery visual */}
        <div className="mt-auto h-3 bg-muted rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-emerald-400 to-primary rounded-full"
            initial={{ width: 0 }}
            animate={{ width: '78%' }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
          />
        </div>
      </CardContent>
    </Card>
  );
}
