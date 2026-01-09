"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Radio, CheckCircle, Clock } from "lucide-react";

export function DemandResponseCard() {
  const events = [
    { time: "14:00", status: "completed", load: "-0.8 MW" },
    { time: "18:30", status: "active", load: "-1.2 MW" },
    { time: "21:00", status: "scheduled", load: "-0.5 MW" },
  ];

  return (
    <Card className="w-[420px] h-[220px] shadow-lg border-border/50">
      <CardContent className="p-5 h-full flex flex-col">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <p className="text-sm text-muted-foreground">Demand Response</p>
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10">
              <Radio className="h-3 w-3 text-primary" />
            </div>
          </div>
          <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-green-500/10">
            <span className="text-xs font-medium text-green-600 dark:text-green-400">3 Events Today</span>
          </div>
        </div>

        {/* Event list */}
        <div className="flex-1 space-y-2">
          {events.map((event, i) => (
            <div
              key={i}
              className={`flex items-center justify-between p-2 rounded-lg ${
                event.status === "active"
                  ? "bg-primary/10 border border-primary/30"
                  : "bg-muted/50"
              }`}
            >
              <div className="flex items-center gap-2">
                {event.status === "completed" ? (
                  <CheckCircle className="h-4 w-4 text-green-500" />
                ) : event.status === "active" ? (
                  <div className="h-4 w-4 rounded-full bg-primary animate-pulse" />
                ) : (
                  <Clock className="h-4 w-4 text-muted-foreground" />
                )}
                <span className="text-sm font-medium">{event.time}</span>
              </div>
              <span className={`text-sm font-bold ${
                event.status === "active" ? "text-primary" : "text-muted-foreground"
              }`}>
                {event.load}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
