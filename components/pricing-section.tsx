"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/src/i18n/routing";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Plus } from "lucide-react";
import { AddToCartButton } from "@/components/shop";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animations";

export function PricingSection() {
  const t = useTranslations("pricing");

  const tiers = [
    {
      key: "zap",
      highlighted: false,
      badge: null,
    },
    {
      key: "ems",
      highlighted: true,
      badge: null,
    },
    {
      key: "enterprise",
      highlighted: false,
      badge: null,
    },
  ];

  return (
    <section className="border-t py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <FadeIn className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            {t("title")}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </FadeIn>

        <StaggerContainer className="grid gap-6 md:grid-cols-3 max-w-4xl mx-auto" staggerDelay={0.1}>
          {tiers.map((tier) => {
            const features = t.raw(`tiers.${tier.key}.features`) as string[];

            return (
              <StaggerItem key={tier.key}>
                <Card
                  className={`flex flex-col h-full ${
                    tier.highlighted
                      ? "border-primary shadow-lg ring-1 ring-primary md:-translate-y-4 md:scale-105"
                      : ""
                  }`}
                >
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <CardTitle className="text-xl">
                        {t(`tiers.${tier.key}.name`)}
                      </CardTitle>
                      {tier.badge && (
                        <Badge variant="default" className="text-xs">
                          {tier.badge}
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-bold">
                        {t(`tiers.${tier.key}.price`)}
                      </span>
                      {t.has(`tiers.${tier.key}.period`) && (
                        <span className="text-muted-foreground">
                          {t(`tiers.${tier.key}.period`)}
                        </span>
                      )}
                    </div>
                    <CardDescription className="mt-2">
                      {t(`tiers.${tier.key}.description`)}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <ul className="space-y-3">
                      {features.map((feature, index) => {
                        const Icon = tier.key === "ems" ? Plus : Check;
                        return (
                          <li key={index} className="flex items-start gap-2">
                            <Icon className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                            <span className="text-sm">{feature}</span>
                          </li>
                        );
                      })}
                    </ul>
                  </CardContent>
                  <CardFooter className="flex-col gap-3">
                    {t.has(`tiers.${tier.key}.priceNote`) && (
                      <p className="text-xs text-primary whitespace-pre-line text-center">
                        {t(`tiers.${tier.key}.priceNote`)}
                      </p>
                    )}
                    {tier.key === "zap" ? (
                      <AddToCartButton
                        handle="sourceful-energy-zap"
                        variant="outline"
                        className="w-full"
                      />
                    ) : tier.key === "ems" ? (
                      <Button
                        className="w-full"
                        variant="default"
                        disabled
                      >
                        {t("comingSoon")}
                      </Button>
                    ) : (
                      <Button
                        className="w-full"
                        variant="outline"
                        asChild
                      >
                        <Link href="/contact">
                          {t(`tiers.${tier.key}.cta`)}
                        </Link>
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

        {/* FAQ Section */}
        <div className="mt-24 max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8">
            {t("faq.title")}
          </h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold mb-2">{t("faq.zapCore.question")}</h3>
              <p className="text-muted-foreground">
                {t("faq.zapCore.answer")}
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">
                {t("faq.zapPro.question")}
              </h3>
              <p className="text-muted-foreground">
                {t("faq.zapPro.answer")}
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">
                {t("faq.multipleZaps.question")}
              </h3>
              <p className="text-muted-foreground">
                {t("faq.multipleZaps.answer")}
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">
                {t("faq.support.question")}
              </h3>
              <p className="text-muted-foreground">
                {t("faq.support.answer")}
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">
                {t("faq.refunds.question")}
              </h3>
              <p className="text-muted-foreground">
                {t("faq.refunds.answer")}
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">
                {t("faq.whatsInBox.question")}
              </h3>
              <p className="text-muted-foreground">
                {t("faq.whatsInBox.answer")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
