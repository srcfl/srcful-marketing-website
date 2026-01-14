"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

interface ZapImageProps {
  className?: string;
  alt?: string;
}

export function ZapImage({ className = "", alt = "Sourceful Energy Zap" }: ZapImageProps) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const imageSrc = mounted && resolvedTheme === "dark"
    ? "/assets/images/zap/Zap-Dark-Mode-v2.png"
    : "/assets/images/zap/Zap-Light-Mode.jpg";

  if (!mounted) {
    return <div className={`bg-muted rounded-2xl animate-pulse ${className}`} />;
  }

  const isLightMode = resolvedTheme === "light";

  return (
    <img
      src={imageSrc}
      alt={alt}
      className={className}
      style={isLightMode ? { borderRadius: "40px", overflow: "hidden" } : undefined}
    />
  );
}
