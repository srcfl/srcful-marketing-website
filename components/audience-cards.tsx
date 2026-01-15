"use client";

import { useRef } from "react";
import { Link } from "@/src/i18n/routing";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { StaggerContainer, StaggerItem } from "@/components/animations";
import { motion, useInView } from "framer-motion";
import { LucideIcon } from "lucide-react";

export interface Audience {
  icon: LucideIcon;
  title: string;
  description: string;
  href: string;
  iconColor: string;
  bgColor: string;
  offsetY: number;
}

interface AudienceCardsProps {
  audiences: Audience[];
}

export function AudienceCards({ audiences }: AudienceCardsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <>
      {/* Desktop: Animated cards with stagger and bounce */}
      <div ref={containerRef} className="hidden xl:grid xl:grid-cols-5 gap-6">
        {audiences.map((audience, index) => {
          const Icon = audience.icon;
          return (
            <motion.div
              key={audience.title}
              initial={{ opacity: 0, y: 60 }}
              animate={isInView ? {
                opacity: 1,
                y: audience.offsetY
              } : { opacity: 0, y: 60 }}
              transition={{
                delay: index * 0.1,
                duration: 0.6,
                type: "spring",
                stiffness: 100,
                damping: 12,
              }}
              className="h-full"
            >
              <Link href={audience.href} className="no-underline hover:no-underline block h-full">
                <Card className="h-full transition-all hover:shadow-lg hover:border-primary/50 cursor-pointer">
                  <CardHeader>
                    <div className={`w-12 h-12 ${audience.bgColor} rounded-lg flex items-center justify-center mb-4`}>
                      <Icon className={`h-6 w-6 ${audience.iconColor}`} />
                    </div>
                    <CardTitle>{audience.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      {audience.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          );
        })}
      </div>

      {/* Mobile/Tablet: Standard stagger animation */}
      <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 xl:hidden" staggerDelay={0.1}>
        {audiences.map((audience) => {
          const Icon = audience.icon;
          return (
            <StaggerItem key={audience.title}>
              <Link href={audience.href} className="no-underline hover:no-underline block h-full">
                <Card className="h-full transition-all hover:shadow-lg hover:border-primary/50 cursor-pointer">
                  <CardHeader>
                    <div className={`w-12 h-12 ${audience.bgColor} rounded-lg flex items-center justify-center mb-4`}>
                      <Icon className={`h-6 w-6 ${audience.iconColor}`} />
                    </div>
                    <CardTitle>{audience.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      {audience.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </Link>
            </StaggerItem>
          );
        })}
      </StaggerContainer>
    </>
  );
}
