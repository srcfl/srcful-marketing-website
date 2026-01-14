"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Zap, Sun, ArrowDownUp } from "lucide-react";
import { motion } from "framer-motion";

interface ConnectedDevicesCardProps {
  translations?: {
    title: string;
    solarProduction: string;
    producedToday: string;
    exportedToGrid: string;
  };
}

export function ConnectedDevicesCard({ translations }: ConnectedDevicesCardProps) {
  const t = translations ?? {
    title: "Grid & Production",
    solarProduction: "Solar production",
    producedToday: "Produced today",
    exportedToGrid: "Exported to grid",
  };
  // Hourly data for the chart (6am to 9pm)
  const hourlyData = [
    { hour: "06", price: 0.8, production: 5, exchange: -10 },
    { hour: "08", price: 1.2, production: 35, exchange: 15 },
    { hour: "10", price: 0.9, production: 70, exchange: 45 },
    { hour: "12", price: 0.6, production: 95, exchange: 70 },
    { hour: "14", price: 0.4, production: 85, exchange: 60 },
    { hour: "16", price: 0.7, production: 55, exchange: 30 },
    { hour: "18", price: 1.5, production: 20, exchange: -25 },
    { hour: "20", price: 1.8, production: 0, exchange: -40 },
  ];

  const maxPrice = 2;

  return (
    <Card className="w-[420px] h-[280px] shadow-lg border-border/50">
      <CardContent className="p-5 h-full flex flex-col justify-center">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-2">
            <p className="text-sm text-muted-foreground">{t.title}</p>
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10">
              <ArrowDownUp className="h-3 w-3 text-primary" />
            </div>
          </div>
          <div className="flex items-center gap-1 text-[10px]">
            <div className="w-2 h-2 rounded-full bg-yellow-400" />
            <span className="text-muted-foreground">{t.solarProduction}</span>
          </div>
        </div>

        {/* Chart area */}
        <div className="flex-1 relative">
          {/* Production bars */}
          <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between h-[100px] px-1">
            {hourlyData.map((d, i) => (
              <motion.div
                key={i}
                className="w-8 bg-gradient-to-t from-yellow-500 to-yellow-300 rounded-t"
                initial={{ height: 0 }}
                animate={{ height: `${d.production}%` }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.08 * i }}
              />
            ))}
          </div>
        </div>

        {/* X-axis labels */}
        <div className="flex justify-between mt-2 text-[10px] text-muted-foreground px-1">
          {hourlyData.map((d) => (
            <span key={d.hour}>{d.hour}:00</span>
          ))}
        </div>

        {/* Summary stats */}
        <div className="flex justify-between mt-3 pt-3 border-t border-border/50">
          <div className="flex items-center gap-2">
            <Sun className="h-4 w-4 text-yellow-500" />
            <div>
              <p className="text-sm font-semibold">24.5 kWh</p>
              <p className="text-[10px] text-muted-foreground">{t.producedToday}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Zap className="h-4 w-4 text-emerald-500" />
            <div>
              <p className="text-sm font-semibold">18.2 kWh</p>
              <p className="text-[10px] text-muted-foreground">{t.exportedToGrid}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
