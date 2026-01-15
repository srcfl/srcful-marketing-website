"use client";

import { useRef } from "react";
import { Card } from "@/components/ui/card";
import { motion, useInView } from "framer-motion";

interface InstallerStatsProps {
  stats: {
    num: string;
    unit: string;
    label: string;
    unitSpace?: boolean;
  }[];
}

export function InstallerStats({ stats }: InstallerStatsProps) {
  const statsRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(statsRef, { once: true, margin: "-50px" });

  return (
    <div ref={statsRef} className="grid grid-cols-2 gap-3 w-fit ml-auto">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.num}
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={isInView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.8, y: 20 }}
          transition={{
            delay: index * 0.1,
            duration: 0.5,
            type: "spring",
            stiffness: 100,
            damping: 12,
          }}
        >
          <Card className="w-[180px] h-[180px] flex flex-col items-center justify-center text-center p-3">
            <div className="font-bold text-indigo-500 mb-1">
              <span className="text-5xl">{stat.num}</span>
              <span className={`text-lg ${stat.unitSpace ? "ml-1" : ""}`}>{stat.unit}</span>
            </div>
            <div className="text-xs text-muted-foreground">
              {stat.label}
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
