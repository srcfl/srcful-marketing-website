"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Calendar } from "lucide-react";

// Schedule mode colors
const modeColors: Record<string, string> = {
  idle: "bg-gray-300 dark:bg-gray-600",
  "self-consumption": "bg-emerald-400",
  charging: "bg-pink-400",
  exporting: "bg-blue-400",
  discharging: "bg-orange-400",
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

  return (
    <Card className="w-[280px] shadow-lg border-border/50">
      <CardContent className="p-5">
        <div className="flex items-start justify-between mb-3">
          <div>
            <p className="text-sm font-medium flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              Today's Schedule
            </p>
          </div>
        </div>

        {/* Timeline */}
        <div className="flex gap-0.5 mb-2">
          {scheduleData.map((mode, i) => (
            <div
              key={i}
              className={`h-6 flex-1 ${modeColors[mode]} ${i === currentHour ? 'ring-2 ring-foreground ring-offset-1 ring-offset-background rounded-sm' : ''} first:rounded-l last:rounded-r`}
            />
          ))}
        </div>

        {/* Time labels */}
        <div className="flex justify-between text-[10px] text-muted-foreground mb-3">
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
