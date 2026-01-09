"use client";

import { motion } from "framer-motion";

// Floating particles component
function Particles({ count = 6, color = "primary" }: { count?: number; color?: string }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          className={`absolute w-1 h-1 rounded-full bg-${color === "primary" ? "primary" : color}`}
          style={{
            left: `${15 + Math.random() * 70}%`,
            top: `${20 + Math.random() * 60}%`,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 0.6, 0],
            scale: [0, 1, 0],
            y: [0, -20 - Math.random() * 20],
            x: [0, (Math.random() - 0.5) * 20],
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            delay: i * 0.4,
            repeat: Infinity,
            repeatDelay: Math.random() * 2,
            ease: "easeOut",
          }}
        />
      ))}
    </>
  );
}

// Smart Home - Green gradient with energy particles
export function SmartHomeViz() {
  return (
    <div className="relative w-full h-32 rounded-md overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-primary/10 to-transparent" />

      {/* Animated gradient overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-tr from-transparent via-primary/10 to-primary/20"
        animate={{
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Particles */}
      <Particles count={8} />
    </div>
  );
}

// Solar & Battery - Yellow/orange warm gradient
export function SolarBatteryViz() {
  return (
    <div className="relative w-full h-32 rounded-md overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/20 via-orange-500/10 to-transparent" />

      {/* Animated sun glow */}
      <motion.div
        className="absolute top-0 right-0 w-40 h-40 -translate-y-1/2 translate-x-1/4 rounded-full bg-yellow-500/20 blur-2xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.4, 0.7, 0.4],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Particles - yellow tinted */}
      <div className="absolute inset-0">
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-yellow-500"
            style={{
              left: `${10 + Math.random() * 80}%`,
              top: `${30 + Math.random() * 50}%`,
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 0.7, 0],
              scale: [0, 1, 0],
              y: [0, -30 - Math.random() * 20],
            }}
            transition={{
              duration: 2.5 + Math.random() * 1.5,
              delay: i * 0.4,
              repeat: Infinity,
              repeatDelay: Math.random() * 2,
              ease: "easeOut",
            }}
          />
        ))}
      </div>
    </div>
  );
}

// V2X - Blue/cyan gradient with bidirectional flow
export function V2xViz() {
  return (
    <div className="relative w-full h-32 rounded-md overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-cyan-500/10 to-transparent" />

      {/* Animated flow lines */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/15 to-transparent"
        animate={{
          x: ["-100%", "100%"],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Particles - blue tinted */}
      <div className="absolute inset-0">
        {Array.from({ length: 10 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 rounded-full bg-blue-500"
            style={{
              left: `${5 + Math.random() * 90}%`,
              top: `${20 + Math.random() * 60}%`,
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 0.6, 0],
              scale: [0, 1, 0],
              x: [0, (i % 2 === 0 ? 40 : -40)],
            }}
            transition={{
              duration: 2 + Math.random() * 1,
              delay: i * 0.25,
              repeat: Infinity,
              repeatDelay: Math.random() * 1.5,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </div>
  );
}
