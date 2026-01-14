"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Zap, Clock, Radio, Code, CheckCircle } from "lucide-react";

const cards = [
  {
    id: "api-response",
    icon: Clock,
    color: "text-green-500",
    bgColor: "bg-green-500/10",
  },
  {
    id: "websocket",
    icon: Radio,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
  },
  {
    id: "code",
    icon: Code,
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
  },
];

export function DevCardAnimation() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [responseTime, setResponseTime] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % cards.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Animate response time for API card
  useEffect(() => {
    if (activeIndex === 0) {
      setIsAnimating(true);
      setResponseTime(0);
      const start = Date.now();
      const targetTime = 180 + Math.random() * 40; // 180-220ms

      const animate = () => {
        const elapsed = Date.now() - start;
        if (elapsed < 500) {
          setResponseTime(Math.min(targetTime, (elapsed / 500) * targetTime));
          requestAnimationFrame(animate);
        } else {
          setResponseTime(Math.round(targetTime));
          setIsAnimating(false);
        }
      };
      requestAnimationFrame(animate);
    }
  }, [activeIndex]);

  return (
    <div className="relative w-80 h-72">
      <AnimatePresence mode="wait">
        {activeIndex === 0 && (
          <motion.div
            key="api"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0"
          >
            <Card className="h-full shadow-lg border-border/50">
              <CardContent className="p-6 h-full flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className={`w-8 h-8 rounded-md ${cards[0].bgColor} flex items-center justify-center`}>
                      <Clock className={`h-4 w-4 ${cards[0].color}`} />
                    </div>
                    <span className="font-medium text-sm">API Response</span>
                  </div>
                  <Badge variant="secondary" className="text-xs">Local</Badge>
                </div>

                <div className="flex-1 flex flex-col justify-center">
                  <div className="text-center mb-4">
                    <div className="text-5xl font-bold text-primary tabular-nums">
                      {Math.round(responseTime)}
                      <span className="text-2xl text-muted-foreground ml-1">ms</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">Response Time</p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">GET /api/device/status</span>
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    </div>
                    <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-primary rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: isAnimating ? "100%" : "100%" }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {activeIndex === 1 && (
          <motion.div
            key="websocket"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0"
          >
            <Card className="h-full shadow-lg border-border/50">
              <CardContent className="p-6 h-full flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className={`w-8 h-8 rounded-md ${cards[1].bgColor} flex items-center justify-center`}>
                      <Radio className={`h-4 w-4 ${cards[1].color}`} />
                    </div>
                    <span className="font-medium text-sm">WebSocket Stream</span>
                  </div>
                  <motion.div
                    animate={{ opacity: [1, 0.5, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <Badge variant="default" className="text-xs bg-green-500">Live</Badge>
                  </motion.div>
                </div>

                <div className="flex-1 font-mono text-xs space-y-1.5 overflow-hidden">
                  <WebSocketMessage delay={0} data={{ type: "power", value: "3.2 kW" }} />
                  <WebSocketMessage delay={0.8} data={{ type: "frequency", value: "50.01 Hz" }} />
                  <WebSocketMessage delay={1.6} data={{ type: "voltage", value: "230.4 V" }} />
                  <WebSocketMessage delay={2.4} data={{ type: "power", value: "3.4 kW" }} />
                  <WebSocketMessage delay={3.2} data={{ type: "frequency", value: "49.98 Hz" }} />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {activeIndex === 2 && (
          <motion.div
            key="code"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0"
          >
            <Card className="h-full shadow-lg border-border/50 bg-[#1a1a1a]">
              <CardContent className="p-4 h-full flex flex-col">
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                  </div>
                  <span className="text-xs text-muted-foreground ml-2">example.ts</span>
                </div>

                <div className="flex-1 font-mono text-xs leading-relaxed overflow-hidden">
                  <CodeLine delay={0}><span className="text-purple-400">const</span> <span className="text-blue-300">zap</span> = <span className="text-purple-400">await</span> <span className="text-yellow-300">connect</span>();</CodeLine>
                  <CodeLine delay={0.3}></CodeLine>
                  <CodeLine delay={0.6}><span className="text-gray-500">// Subscribe to real-time data</span></CodeLine>
                  <CodeLine delay={0.9}><span className="text-blue-300">zap</span>.<span className="text-yellow-300">subscribe</span>(<span className="text-green-400">&apos;power&apos;</span>, (data) =&gt; {"{"}</CodeLine>
                  <CodeLine delay={1.2}>  console.<span className="text-yellow-300">log</span>(data.<span className="text-blue-300">value</span>);</CodeLine>
                  <CodeLine delay={1.5}>{"}"});</CodeLine>
                  <CodeLine delay={1.8}></CodeLine>
                  <CodeLine delay={2.1}><span className="text-gray-500">// Response: 197ms ✓</span></CodeLine>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Card indicators */}
      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
        {cards.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setActiveIndex(idx)}
            className={`w-2 h-2 rounded-full transition-colors ${
              idx === activeIndex ? "bg-primary" : "bg-muted-foreground/30"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

function WebSocketMessage({ delay, data }: { delay: number; data: { type: string; value: string } }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.3 }}
      className="flex items-center gap-2 text-muted-foreground"
    >
      <span className="text-green-400">→</span>
      <span className="text-blue-300">{data.type}</span>
      <span className="text-gray-500">:</span>
      <span className="text-yellow-300">{data.value}</span>
    </motion.div>
  );
}

function CodeLine({ children, delay }: { children?: React.ReactNode; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay, duration: 0.2 }}
      className="text-gray-300"
    >
      {children || "\u00A0"}
    </motion.div>
  );
}
