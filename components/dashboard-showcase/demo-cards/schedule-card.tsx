"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Calendar } from "lucide-react";

// Schedule mode colors and ring colors
const modeColors: Record<string, { bg: string; ring: string; label: string }> = {
  idle: { bg: "bg-gray-300 dark:bg-gray-600", ring: "ring-gray-400", label: "Idle" },
  "self-consumption": { bg: "bg-emerald-400", ring: "ring-emerald-500", label: "Self-use" },
  charging: { bg: "bg-pink-400", ring: "ring-pink-500", label: "Charging" },
  exporting: { bg: "bg-blue-400", ring: "ring-blue-500", label: "Exporting" },
  discharging: { bg: "bg-orange-400", ring: "ring-orange-500", label: "Discharge" },
};

// Demo schedule data (24 hours)
const scheduleData = [
  "idle", "idle", "idle", "idle", "idle", "idle",           // 00-05
  "charging", "charging", "self-consumption", "self-consumption", // 06-09
  "self-consumption", "self-consumption", "self-consumption", "exporting", // 10-13
  "exporting", "exporting", "self-consumption", "self-consumption", // 14-17
  "discharging", "discharging", "discharging", "idle",      // 18-21
  "idle", "idle"                                             // 22-23
];

export function ScheduleCard() {
  const currentHour = 14; // Demo: 2pm
  const tooltipHour = 19; // Show tooltip on 19:00 (discharging)

  return (
    <Card className="w-[420px] h-[220px] shadow-lg border-border/50">
      <CardContent className="p-5 h-full flex flex-col justify-center">
        <div className="flex items-start justify-between mb-4">
          <p className="text-sm font-medium flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            Today's Schedule
          </p>
        </div>

        {/* Timeline */}
        <div className="flex gap-0.5 mb-2 relative">
          {scheduleData.map((mode, i) => {
            const colors = modeColors[mode];
            const isCurrent = i === currentHour;
            const showTooltip = i === tooltipHour;
            return (
              <div
                key={i}
                className={`h-6 flex-1 ${colors.bg} ${isCurrent ? `ring-2 ${colors.ring} ring-offset-1 ring-offset-background rounded-sm relative z-10` : ''} first:rounded-l last:rounded-r relative`}
              >
                {showTooltip && (
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-card border border-border text-foreground text-[10px] px-2 py-1 rounded shadow-sm whitespace-nowrap z-20">
                    19:00 – {colors.label}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-border" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Time labels */}
        <div className="flex justify-between text-[10px] text-muted-foreground mb-4">
          <span>00:00</span>
          <span>06:00</span>
          <span>12:00</span>
          <span>18:00</span>
          <span>24:00</span>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-x-3 gap-y-1 text-[10px]">
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-sm bg-emerald-400" />
            <span className="text-muted-foreground">Self-use</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-sm bg-pink-400" />
            <span className="text-muted-foreground">Charging</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-sm bg-blue-400" />
            <span className="text-muted-foreground">Exporting</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-sm bg-orange-400" />
            <span className="text-muted-foreground">Discharge</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
