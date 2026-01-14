"use client";

import { useTranslations } from "next-intl";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "@/src/i18n/routing";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animations";
import { motion } from "framer-motion";
import {
  Gift,
  Zap,
  TrendingUp,
  Users,
  Coins,
  ArrowRight,
  Sparkles,
  Star,
} from "lucide-react";

type Audience = "homeowners" | "utilities" | "installers";

interface RewardsSectionProps {
  audience: Audience;
}

// Animated points counter
function AnimatedPoints({ value }: { value: number }) {
  return (
    <motion.span
      initial={{ scale: 0.5, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ type: "spring", stiffness: 200, damping: 10 }}
      className="text-5xl md:text-6xl font-bold text-primary"
    >
      {value.toLocaleString()}
    </motion.span>
  );
}

export function RewardsSection({ audience }: RewardsSectionProps) {
  const t = useTranslations("rewards");

  const audienceConfig = {
    homeowners: {
      icon: Gift,
      color: "from-green-500/20 to-emerald-500/10",
      borderColor: "border-green-500/20",
      features: [
        { icon: Zap, key: "connectDevices" },
        { icon: TrendingUp, key: "optimizeUsage" },
        { icon: Coins, key: "earnPoints" },
      ],
    },
    utilities: {
      icon: Users,
      color: "from-blue-500/20 to-cyan-500/10",
      borderColor: "border-blue-500/20",
      features: [
        { icon: Users, key: "customerLoyalty" },
        { icon: Gift, key: "brandedRewards" },
        { icon: TrendingUp, key: "increaseEngagement" },
      ],
    },
    installers: {
      icon: Star,
      color: "from-amber-500/20 to-yellow-500/10",
      borderColor: "border-amber-500/20",
      features: [
        { icon: Coins, key: "earnPerInstall" },
        { icon: TrendingUp, key: "recurringRewards" },
        { icon: Users, key: "customerReferrals" },
      ],
    },
  };

  const config = audienceConfig[audience];
  const Icon = config.icon;

  return (
    <section className="border-t">
      <div className="max-w-7xl mx-auto py-16 md:py-24 px-4 md:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Content */}
          <FadeIn>
            <div>
              <Badge variant="secondary" className="mb-4">
                <Sparkles className="h-3 w-3 mr-1" />
                {t("badge")}
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                {t(`${audience}.title`)}
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                {t(`${audience}.description`)}
              </p>

              <StaggerContainer className="space-y-4 mb-8" staggerDelay={0.1}>
                {config.features.map((feature) => {
                  const FeatureIcon = feature.icon;
                  return (
                    <StaggerItem key={feature.key}>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                          <FeatureIcon className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <div className="font-medium">
                            {t(`features.${feature.key}.title`)}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {t(`features.${feature.key}.description`)}
                          </div>
                        </div>
                      </div>
                    </StaggerItem>
                  );
                })}
              </StaggerContainer>

              <Button size="lg" asChild>
                <Link href="/zap">
                  {t("cta")}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </FadeIn>

          {/* Right: Visual */}
          <FadeIn delay={0.2}>
            <Card
              className={`relative overflow-hidden bg-gradient-to-br ${config.color} ${config.borderColor}`}
            >
              <CardContent className="p-8 md:p-12">
                <div className="text-center relative z-10">
                  <motion.div
                    initial={{ rotate: -10, scale: 0.9 }}
                    whileInView={{ rotate: 0, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 200 }}
                    className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6"
                  >
                    <Icon className="h-10 w-10 text-primary" />
                  </motion.div>

                  <div className="mb-2">
                    <AnimatedPoints value={1250} />
                  </div>
                  <div className="text-lg text-muted-foreground mb-6">
                    {t("pointsLabel")}
                  </div>

                  <div className="grid grid-cols-3 gap-4 pt-6 border-t border-border/50">
                    <div>
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="text-3xl md:text-4xl font-bold text-primary"
                      >
                        50+
                      </motion.div>
                      <div className="text-xs text-muted-foreground">
                        {t("stats.perDay")}
                      </div>
                    </div>
                    <div>
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                        className="text-3xl md:text-4xl font-bold text-primary"
                      >
                        3x
                      </motion.div>
                      <div className="text-xs text-muted-foreground">
                        {t("stats.multiplier")}
                      </div>
                    </div>
                    <div>
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 }}
                        className="text-3xl md:text-4xl font-bold text-primary"
                      >
                        ∞
                      </motion.div>
                      <div className="text-xs text-muted-foreground">
                        {t("stats.potential")}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Disclaimer */}
            <p className="text-xs text-muted-foreground mt-4 text-center">
              {t("disclaimer")}
            </p>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
