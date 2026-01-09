"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, type Transition } from "framer-motion";

export interface DashboardShowcaseProps {
  /** Array of card components to display in the carousel */
  cards: React.ComponentType[];
  /** Auto-rotation interval in milliseconds (default: 4000) */
  interval?: number;
  /** Whether to pause on hover (default: true) */
  pauseOnHover?: boolean;
  /** Custom className for the container */
  className?: string;
}

// Easing curve consistent with animations.tsx
const ease: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

// Card position variants for stacked effect
const getCardStyle = (position: number) => {
  // position: 0 = front (focused), 1 = middle, 2 = back, 3+ = hidden
  const configs = [
    // Front (focused)
    { x: 0, y: 0, scale: 1, opacity: 1, blur: 0, zIndex: 30 },
    // Middle
    { x: -50, y: -35, scale: 0.92, opacity: 0.7, blur: 1, zIndex: 20 },
    // Back
    { x: -100, y: -70, scale: 0.84, opacity: 0.4, blur: 2, zIndex: 10 },
    // Hidden (exit)
    { x: -150, y: -105, scale: 0.76, opacity: 0, blur: 3, zIndex: 0 },
  ];

  return configs[Math.min(position, 3)];
};

export function DashboardShowcase({
  cards,
  interval = 4000,
  pauseOnHover = true,
  className = "",
}: DashboardShowcaseProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Check for reduced motion preference
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  // Auto-rotation
  useEffect(() => {
    if (isPaused || prefersReducedMotion) return;

    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % cards.length);
    }, interval);

    return () => clearInterval(timer);
  }, [isPaused, interval, cards.length, prefersReducedMotion]);

  const handleMouseEnter = useCallback(() => {
    if (pauseOnHover) setIsPaused(true);
  }, [pauseOnHover]);

  const handleMouseLeave = useCallback(() => {
    if (pauseOnHover) setIsPaused(false);
  }, [pauseOnHover]);

  // Get visible cards (show 3 at a time)
  const getVisibleCards = () => {
    const visible = [];
    for (let i = 0; i < Math.min(3, cards.length); i++) {
      const cardIndex = (activeIndex + cards.length - i) % cards.length;
      visible.push({ index: cardIndex, position: i, Card: cards[cardIndex] });
    }
    return visible.reverse(); // Render back-to-front for correct stacking
  };

  return (
    <div
      className={`relative h-[260px] w-[340px] ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      role="region"
      aria-label="Dashboard feature showcase"
      aria-live="polite"
    >
      {/* Gradient mask for depth effect */}
      <div className="absolute inset-0 pointer-events-none z-40">
        <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-background via-background/50 to-transparent" />
      </div>

      {/* Cards container */}
      <div className="absolute bottom-0 right-0">
        <AnimatePresence mode="popLayout">
          {getVisibleCards().map(({ index, position, Card }) => {
            const style = getCardStyle(position);

            return (
              <motion.div
                key={index}
                initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.8 }}
                animate={{
                  x: style.x,
                  y: style.y,
                  scale: style.scale,
                  opacity: style.opacity,
                  filter: `blur(${style.blur}px)`,
                  zIndex: style.zIndex,
                }}
                exit={prefersReducedMotion ? { opacity: 0 } : {
                  x: -150,
                  y: -105,
                  scale: 0.76,
                  opacity: 0,
                  filter: "blur(3px)",
                }}
                transition={{
                  duration: prefersReducedMotion ? 0.1 : 0.6,
                  ease,
                }}
                className="absolute bottom-0 right-0 origin-bottom-right"
                style={{ zIndex: style.zIndex }}
              >
                <Card />
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Navigation dots */}
      <div className="absolute bottom-[-30px] left-1/2 -translate-x-1/2 flex gap-1.5">
        {cards.map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveIndex(i)}
            className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
              i === activeIndex
                ? "bg-primary w-4"
                : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
            }`}
            aria-label={`Go to card ${i + 1}`}
            aria-current={i === activeIndex ? "true" : undefined}
          />
        ))}
      </div>
    </div>
  );
}
