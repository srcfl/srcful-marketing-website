"use client";

import { Play } from "lucide-react";

interface VideoPlaceholderProps {
  title: string;
  comingSoonText?: string;
  className?: string;
}

export function VideoPlaceholder({
  title,
  comingSoonText = "Video coming soon",
  className = ""
}: VideoPlaceholderProps) {
  return (
    <div className={`w-full ${className}`}>
      <div className="aspect-video bg-muted/50 rounded-xl border-2 border-dashed border-muted-foreground/20 flex flex-col items-center justify-center gap-4">
        <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
          <Play className="h-8 w-8 text-muted-foreground ml-1" />
        </div>
        <div className="text-center">
          <h3 className="font-semibold text-lg mb-1">{title}</h3>
          <p className="text-sm text-muted-foreground">{comingSoonText}</p>
        </div>
      </div>
    </div>
  );
}
