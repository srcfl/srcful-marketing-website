"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Zap } from "lucide-react";

const partnerLogos = [
  { name: "SolarEdge", logo: "solaredge" },
  { name: "Sungrow", logo: "sungrow" },
  { name: "Deye", logo: "deye" },
  { name: "Easee", logo: "easee" },
  { name: "Ferroamp", logo: "ferroamp" },
  { name: "Pixii", logo: "pixii" },
  { name: "Huawei", logo: "huawei" },
  { name: "Fronius", logo: "fronius" },
];

export function ZapPartnerAnimation() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % partnerLogos.length);
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  const currentPartner = partnerLogos[currentIndex];

  return (
    <div className="relative flex items-center justify-center gap-4 md:gap-6">
      {/* Zap Box */}
      <motion.div
        className="relative w-32 h-32 md:w-40 md:h-40 rounded-2xl bg-card border border-border shadow-xl flex items-center justify-center overflow-hidden"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <Image
          src="/images/zap.png"
          alt="Zap Gateway"
          width={140}
          height={140}
          className="w-24 h-24 md:w-32 md:h-32 object-contain"
        />
        {/* Glow effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent pointer-events-none" />
      </motion.div>

      {/* Connection line with flowing dots */}
      <div className="relative flex items-center w-16 md:w-24">
        {/* Base line */}
        <div className="absolute inset-0 flex items-center">
          <div className="w-full h-px bg-gradient-to-r from-border via-primary/30 to-border" />
        </div>
        {/* Center zap icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            animate={{
              scale: [1, 1.15, 1],
            }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          >
            <Zap className="h-4 w-4 text-primary fill-primary/20" />
          </motion.div>
        </div>
        {/* Flowing dots */}
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 rounded-full bg-primary"
            initial={{ left: "0%", opacity: 0 }}
            animate={{
              left: ["0%", "100%"],
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: i * 0.5,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Partner Logo Box */}
      <motion.div
        className="relative w-32 h-32 md:w-40 md:h-40 rounded-2xl bg-card border border-border shadow-xl flex items-center justify-center overflow-hidden"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPartner.logo}
            className="absolute inset-0 flex items-center justify-center p-4"
            initial={{
              x: 80,
              opacity: 0,
              scale: 0.6,
              rotate: 12,
            }}
            animate={{
              x: 0,
              opacity: 1,
              scale: 1,
              rotate: [12, -3, 1.5, -0.5, 0],
            }}
            exit={{
              x: -50,
              opacity: 0,
              scale: 0.8,
              rotate: -8,
              transition: {
                duration: 0.25,
                ease: "easeIn",
              },
            }}
            transition={{
              x: {
                type: "spring",
                stiffness: 300,
                damping: 20,
              },
              opacity: {
                duration: 0.2,
              },
              scale: {
                type: "spring",
                stiffness: 400,
                damping: 15,
              },
              rotate: {
                duration: 0.6,
                times: [0, 0.4, 0.6, 0.8, 1],
                ease: "easeOut",
              },
            }}
          >
            <Image
              src={`/images/partner-logos/light-mode/${currentPartner.logo}.svg`}
              alt={currentPartner.name}
              width={120}
              height={80}
              className="max-w-full max-h-20 md:max-h-24 object-contain dark:hidden"
            />
            <Image
              src={`/images/partner-logos/dark-mode/${currentPartner.logo}.svg`}
              alt={currentPartner.name}
              width={120}
              height={80}
              className="max-w-full max-h-20 md:max-h-24 object-contain hidden dark:block"
            />
          </motion.div>
        </AnimatePresence>

        {/* Impact ring on logo landing */}
        <motion.div
          key={`ring-${currentIndex}`}
          className="absolute inset-0 rounded-2xl border-2 border-primary"
          initial={{ opacity: 0.6, scale: 0.9 }}
          animate={{ opacity: 0, scale: 1.08 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </motion.div>
    </div>
  );
}
