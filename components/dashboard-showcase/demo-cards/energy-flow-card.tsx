"use client";

import { Card, CardContent } from "@/components/ui/card";

// Simple static SVG chart (no recharts dependency for lightweight card)
export function EnergyFlowCard() {
  return (
    <Card className="w-[420px] h-[220px] shadow-lg border-border/50">
      <CardContent className="p-5 h-full flex flex-col">
        <div className="mb-3">
          <p className="text-sm font-medium">Today's Energy Flow</p>
          <p className="text-xs text-muted-foreground">Solar production vs consumption</p>
        </div>
        {/* Mini area chart SVG */}
        <div className="flex-1 relative min-h-0">
          <svg viewBox="0 0 240 80" className="w-full h-full">
            {/* Grid lines */}
            <line x1="0" y1="20" x2="240" y2="20" stroke="currentColor" strokeOpacity="0.1" />
            <line x1="0" y1="40" x2="240" y2="40" stroke="currentColor" strokeOpacity="0.1" />
            <line x1="0" y1="60" x2="240" y2="60" stroke="currentColor" strokeOpacity="0.1" />

            {/* Consumption area (gray) */}
            <path
              d="M0,70 L30,65 L60,60 L90,50 L120,45 L150,40 L180,55 L210,50 L240,60 L240,80 L0,80 Z"
              fill="currentColor"
              fillOpacity="0.1"
              className="text-muted-foreground"
            />
            <path
              d="M0,70 L30,65 L60,60 L90,50 L120,45 L150,40 L180,55 L210,50 L240,60"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeOpacity="0.3"
              className="text-muted-foreground"
            />

            {/* Solar production area (green) */}
            <path
              d="M0,75 L30,70 L60,55 L90,30 L120,15 L150,25 L180,45 L210,65 L240,75 L240,80 L0,80 Z"
              fill="hsl(var(--primary))"
              fillOpacity="0.2"
            />
            <path
              d="M0,75 L30,70 L60,55 L90,30 L120,15 L150,25 L180,45 L210,65 L240,75"
              fill="none"
              stroke="hsl(var(--primary))"
              strokeWidth="2"
            />
          </svg>
          {/* Time labels */}
          <div className="absolute bottom-0 left-0 right-0 flex justify-between text-[10px] text-muted-foreground">
            <span>00:00</span>
            <span>12:00</span>
            <span>Now</span>
          </div>
        </div>
        {/* Legend */}
        <div className="flex items-center gap-4 mt-2 text-xs">
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-primary" />
            <span className="text-muted-foreground">Solar</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-muted-foreground/30" />
            <span className="text-muted-foreground">Consumption</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
