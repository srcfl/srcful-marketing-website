"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

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

// Card position variants - front card at origin, others offset down-left
const getCardStyle = (position: number) => {
  const configs = [
    // Front (focused) - at origin
    { x: 0, y: 0, scale: 1, opacity: 1, blur: 0, zIndex: 30 },
    // Middle - offset down-left
    { x: -40, y: 30, scale: 0.97, opacity: 0.6, blur: 1, zIndex: 20 },
    // Back - further offset
    { x: -80, y: 60, scale: 0.94, opacity: 0.3, blur: 2, zIndex: 10 },
    // Hidden (exit)
    { x: -120, y: 90, scale: 0.91, opacity: 0, blur: 3, zIndex: 0 },
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
      className={`relative ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      role="region"
      aria-label="Dashboard feature showcase"
      aria-live="polite"
    >
      {/* Cards wrapper with perspective */}
      <div
        className="relative pt-12"
        style={{
          perspective: "1200px",
          perspectiveOrigin: "center center",
        }}
      >
        {/* Cards container - positioned to allow left/down offsets */}
        <div
          className="relative ml-20"
          style={{
            transformStyle: "preserve-3d",
            transform: "rotateY(-22deg) rotateX(8deg)",
          }}
        >
          <AnimatePresence mode="popLayout">
            {getVisibleCards().map(({ index, position, Card }) => {
              const style = getCardStyle(position);

              return (
                <motion.div
                  key={index}
                  initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.9 }}
                  animate={{
                    x: style.x,
                    y: style.y,
                    scale: style.scale,
                    opacity: style.opacity,
                    filter: `blur(${style.blur}px)`,
                  }}
                  exit={prefersReducedMotion ? { opacity: 0 } : {
                    x: -120,
                    y: 90,
                    scale: 0.91,
                    opacity: 0,
                    filter: "blur(3px)",
                  }}
                  transition={{
                    duration: prefersReducedMotion ? 0.1 : 0.5,
                    ease,
                  }}
                  className={position === 0 ? "relative" : "absolute top-0 left-0"}
                  style={{ zIndex: style.zIndex }}
                >
                  <Card />
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>

    </div>
  );
}
