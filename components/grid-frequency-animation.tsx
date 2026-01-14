"use client";

import { motion, useSpring, useTransform } from "framer-motion";
import { useEffect, useState, useMemo } from "react";

// Seeded random for consistent results
function seededRandom(seed: number) {
  const x = Math.sin(seed * 12.9898 + seed * 78.233) * 43758.5453;
  return x - Math.floor(x);
}

export function GridFrequencyAnimation() {
  const [baseSeed, setBaseSeed] = useState(0);
  const [eventConfig, setEventConfig] = useState({ position: 400, direction: 1, active: false });

  // Smooth spring for deviation amount - this controls how much the wave deviates
  const deviationSpring = useSpring(0, {
    stiffness: 100,
    damping: 20,
    mass: 0.5
  });

  // Generate wave path based on current deviation
  const generatePath = useMemo(() => {
    return (seed: number, deviationAmount: number, eventPos: number, eventDir: number) => {
      const width = 800;
      const height = 100;
      const centerY = height / 2;
      const baseAmplitude = 12;

      let path = `M 0 ${centerY}`;
      let prevY = centerY;

      for (let x = 0; x <= width; x += 2) {
        // Base oscillation from multiple frequencies - higher frequency
        const f1 = Math.sin(x * 0.06 + seed * 0.15) * baseAmplitude * 0.6;
        const f2 = Math.sin(x * 0.12 + seed * 0.2) * baseAmplitude * 0.35;
        const f3 = Math.sin(x * 0.25 + seed * 0.1) * baseAmplitude * 0.2;
        const f4 = Math.sin(x * 0.4 + seed * 0.25) * baseAmplitude * 0.1;

        // More variation with noise
        const noise = (seededRandom(x * 0.15 + seed) - 0.5) * 7;

        // Event deviation - gaussian-like bump centered at eventPos
        let eventDeviation = 0;
        const distFromEvent = Math.abs(x - eventPos);
        if (distFromEvent < 180) {
          const gaussian = Math.exp(-Math.pow(distFromEvent / 80, 2));
          eventDeviation = gaussian * 30 * eventDir * deviationAmount;
        }

        // Smoothing for natural movement
        const targetY = centerY + f1 + f2 + f3 + f4 + noise + eventDeviation;
        const y = prevY + (targetY - prevY) * 0.35;
        prevY = y;

        path += ` L ${x} ${Math.max(8, Math.min(height - 8, y))}`;
      }

      return path;
    };
  }, []);

  // Animate the base seed for continuous wave movement
  useEffect(() => {
    let frame: number;
    let startTime = Date.now();

    const animate = () => {
      const elapsed = (Date.now() - startTime) / 1000;
      setBaseSeed(elapsed * 2); // Slow continuous drift
      frame = requestAnimationFrame(animate);
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, []);

  // Trigger events periodically
  useEffect(() => {
    const triggerEvent = () => {
      // Random position and direction for variety
      const newPos = 300 + Math.random() * 200;
      const newDir = Math.random() > 0.5 ? 1 : -1;

      setEventConfig({ position: newPos, direction: newDir, active: true });

      // Gradual build-up (like real grid stress)
      deviationSpring.set(1);

      // Quick snap back after delay (Zap's fast response)
      setTimeout(() => {
        deviationSpring.set(0);
        setTimeout(() => {
          setEventConfig(prev => ({ ...prev, active: false }));
        }, 300);
      }, 1200);
    };

    const initialTimeout = setTimeout(triggerEvent, 2500);
    const interval = setInterval(triggerEvent, 7000);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, [deviationSpring]);

  // Current deviation value for color interpolation
  const [currentDeviation, setCurrentDeviation] = useState(0);

  useEffect(() => {
    const unsubscribe = deviationSpring.on("change", (v) => {
      setCurrentDeviation(v);
    });
    return unsubscribe;
  }, [deviationSpring]);

  // Generate current path
  const currentPath = generatePath(
    baseSeed,
    currentDeviation,
    eventConfig.position,
    eventConfig.direction
  );

  // Interpolate color based on deviation
  const strokeColor = currentDeviation > 0.3
    ? `rgb(${Math.round(239 * currentDeviation + 34 * (1 - currentDeviation))}, ${Math.round(68 * currentDeviation + 197 * (1 - currentDeviation))}, ${Math.round(68 * currentDeviation + 94 * (1 - currentDeviation))})`
    : "hsl(var(--primary))";

  const displayHz = (50 - currentDeviation * 0.08 * eventConfig.direction).toFixed(2);

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="relative h-24 overflow-hidden">
        {/* Upper limit line */}
        <div className="absolute inset-x-0 top-[20%] h-px bg-muted-foreground/15" />

        {/* Center line - 50Hz reference */}
        <div className="absolute inset-0 flex items-center">
          <div className="w-full h-px bg-muted-foreground/30" />
        </div>

        {/* Lower limit line */}
        <div className="absolute inset-x-0 bottom-[20%] h-px bg-muted-foreground/15" />

        {/* Frequency labels */}
        <div className="absolute left-0 top-[20%] -translate-y-1/2 text-[10px] text-muted-foreground/30 font-mono">
          50.05
        </div>
        <div className="absolute left-0 top-1/2 -translate-y-1/2 text-[10px] text-muted-foreground/40 font-mono">
          50.00
        </div>
        <div className="absolute left-0 bottom-[20%] translate-y-1/2 text-[10px] text-muted-foreground/30 font-mono">
          49.95
        </div>

        {/* Animated wave */}
        <svg
          viewBox="0 0 800 100"
          className="absolute inset-0 w-full h-full"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="waveGradientDynamic" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={strokeColor} stopOpacity="0.2" />
              <stop offset="15%" stopColor={strokeColor} stopOpacity="1" />
              <stop offset="85%" stopColor={strokeColor} stopOpacity="1" />
              <stop offset="100%" stopColor={strokeColor} stopOpacity="0.2" />
            </linearGradient>
          </defs>

          {/* Main wave */}
          <path
            d={currentPath}
            fill="none"
            stroke="url(#waveGradientDynamic)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Glow effect */}
          <path
            d={currentPath}
            fill="none"
            stroke={strokeColor}
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity={0.15}
            style={{ filter: "blur(4px)" }}
          />
        </svg>

        {/* Live indicator */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center gap-1.5 bg-background/80 backdrop-blur-sm pl-2">
          <div
            className="w-1.5 h-1.5 rounded-full transition-colors duration-150"
            style={{ backgroundColor: strokeColor }}
          />
          <span className="text-xs font-mono text-muted-foreground tabular-nums">
            {displayHz} Hz
          </span>
        </div>
      </div>
    </div>
  );
}
