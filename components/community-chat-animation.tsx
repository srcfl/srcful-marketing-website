"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Users } from "lucide-react";

interface ChatBubble {
  id: number;
  content: string;
  x: number;
}

const messages = [
  // Homeowner chats
  "anyone else seeing negative prices?",
  "my battery charged at -2kr/kWh lol",
  "V2X finally working after update",
  "which inverter firmware you on?",
  "Zap just paid for itself",
  // Developer chats
  "anyone tried the new websocket endpoint?",
  "modbus RTU or TCP for Sungrow?",
  "PR merged, thanks for review",
  "where's the P1 port docs?",
  "got 50ms response times now",
  // Installer chats
  "what's the wifi range on these?",
  "customer wants 3 phase monitoring",
  "anyone done a Deye install?",
  "fixed it, was the RS485 cable",
  // Savings chats
  "saved 847kr this month",
  "bill down 40% since install",
  "export earnings covered dinner",
  "best month yet, 1200kr saved",
  "finally in profit this quarter",
  "electricity bill was €12 lol",
  // Positive chats
  "this community is great",
  "welcome to the crew!",
  "congrats on the install!",
  "nice setup!",
  "that's a solid result",
  // General community
  "thanks that worked!",
  "can confirm, same issue here",
  "check #announcements",
  "screenshot?",
  "will test tomorrow",
];

export function CommunityChatAnimation() {
  const [bubbles, setBubbles] = useState<ChatBubble[]>([]);
  const [nextId, setNextId] = useState(0);

  useEffect(() => {
    // Spawn a new bubble every 3.5 seconds (very slow)
    const interval = setInterval(() => {
      const newBubble: ChatBubble = {
        id: nextId,
        content: messages[Math.floor(Math.random() * messages.length)],
        x: 15 + Math.random() * 70, // Keep within visible area
      };

      setBubbles((prev) => [...prev.slice(-6), newBubble]);
      setNextId((prev) => prev + 1);
    }, 3500);

    return () => clearInterval(interval);
  }, [nextId]);

  return (
    <div className="relative w-64 h-64 md:w-80 md:h-80">
      {/* Outer pulsing circle - voice-like animation */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-violet-500/20 to-indigo-500/10 rounded-full flex items-center justify-center"
        animate={{
          scale: [1, 1.03, 1.01, 1.05, 1, 1.02, 1.04, 1, 1.03, 1.01, 1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div className="w-48 h-48 md:w-60 md:h-60 bg-gradient-to-br from-violet-500/30 to-indigo-500/20 rounded-full flex items-center justify-center">
          <Users className="h-24 w-24 md:h-32 md:w-32 text-violet-500" />
        </div>
      </motion.div>

      {/* Chat bubbles overlay - not clipped, above circle */}
      <div className="absolute inset-0 z-10">
        <AnimatePresence>
          {bubbles.map((bubble) => (
            <motion.div
              key={bubble.id}
              initial={{ opacity: 0, y: 320 }}
              animate={{ opacity: [0, 1, 1, 0], y: -80 }}
              transition={{
                duration: 12, // Very slow - 12 seconds to rise
                ease: "linear",
                opacity: {
                  times: [0, 0.1, 0.75, 1], // Fade in 10%, stay visible until 75%, fade out last 25%
                  duration: 12,
                  ease: "easeInOut"
                },
              }}
              className="absolute"
              style={{ left: `${bubble.x}%`, transform: "translateX(-50%)" }}
            >
              <div className="bg-background/95 border border-violet-500/30 rounded-xl px-3 py-1.5 shadow-lg backdrop-blur-sm">
                <p className="text-xs md:text-sm text-foreground whitespace-nowrap">
                  {bubble.content}
                </p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
