"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Clock, Zap } from "lucide-react";
import { motion } from "framer-motion";

export function ResponseTimeCard() {
  return (
    <Card className="w-[420px] h-[220px] shadow-lg border-border/50">
      <CardContent className="p-5 h-full flex flex-col">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <p className="text-sm text-muted-foreground">Grid Response</p>
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10">
              <Clock className="h-3 w-3 text-primary" />
            </div>
          </div>
          <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary/10">
            <Zap className="h-3 w-3 text-primary" />
            <span className="text-xs font-medium text-primary">Local</span>
          </div>
        </div>

        <div className="flex items-baseline gap-1 mb-1">
          <p className="text-4xl font-bold text-primary">200</p>
          <p className="text-xl font-medium text-muted-foreground">ms</p>
        </div>
        <p className="text-xs text-muted-foreground mb-4">Average response time</p>

        {/* Comparison bar */}
        <div className="mt-auto space-y-3">
          <div className="flex items-center gap-3">
            <span className="text-xs text-muted-foreground w-16">Sourceful</span>
            <div className="flex-1 h-6 bg-muted rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-primary to-emerald-400 rounded-full flex items-center justify-end pr-2"
                initial={{ width: 0 }}
                animate={{ width: '8%' }}
                transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
              >
                <span className="text-[10px] font-medium text-white">200ms</span>
              </motion.div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-muted-foreground w-16">Cloud API</span>
            <div className="flex-1 h-6 bg-muted rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-gray-400 to-gray-500 rounded-full flex items-center justify-end pr-2"
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
              >
                <span className="text-[10px] font-medium text-white">2-5s</span>
              </motion.div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
