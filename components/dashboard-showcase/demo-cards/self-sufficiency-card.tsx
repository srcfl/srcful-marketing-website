"use client";

import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, Home } from "lucide-react";
import { motion } from "framer-motion";

export function SelfSufficiencyCard() {
  const percentage = 84;
  const circumference = 2 * Math.PI * 54; // r=54
  const strokeDasharray = `${(percentage / 100) * circumference} ${circumference}`;

  return (
    <Card className="w-[420px] h-[220px] shadow-lg border-border/50">
      <CardContent className="p-5 h-full flex items-center">
        {/* Left side - text */}
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-3">
            <p className="text-sm text-muted-foreground">Self-Sufficiency</p>
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10">
              <Home className="h-3 w-3 text-primary" />
            </div>
          </div>
          <div className="flex items-baseline gap-2 mb-1">
            <p className="text-3xl font-bold">84%</p>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </div>
          <p className="text-xs text-muted-foreground mb-3">Last 24 hours</p>
          <p className="text-xs text-muted-foreground">From solar + battery</p>
        </div>

        {/* Right side - donut */}
        <div className="relative w-[130px] h-[130px] flex items-center justify-center">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
            <circle
              cx="60" cy="60" r="54"
              fill="none"
              stroke="currentColor"
              strokeWidth="10"
              className="text-primary/15"
            />
            <motion.circle
              cx="60" cy="60" r="54"
              fill="none"
              stroke="hsl(var(--primary))"
              strokeWidth="10"
              strokeLinecap="round"
              initial={{ strokeDasharray: `0 ${circumference}` }}
              animate={{ strokeDasharray: strokeDasharray }}
              transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
            />
          </svg>
          <span className="absolute text-lg font-bold text-primary">84%</span>
        </div>
      </CardContent>
    </Card>
  );
}
