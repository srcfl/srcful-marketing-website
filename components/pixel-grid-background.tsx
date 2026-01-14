"use client";

import { PixelGrid } from "@/components/ui/pixel-grid";

interface PixelGridBackgroundProps {
  className?: string;
}

export function PixelGridBackground({ className = "" }: PixelGridBackgroundProps) {
  return (
    <div className={`flex justify-center mb-8 ${className}`}>
      <PixelGrid
        pattern="plus-hollow"
        color="green"
        size="lg"
        speed="slow"
      />
    </div>
  );
}
