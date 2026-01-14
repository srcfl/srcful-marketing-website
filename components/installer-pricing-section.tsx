"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/src/i18n/routing";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, ExternalLink } from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animations";

export function InstallerPricingSection() {
  const t = useTranslations("useCases.installers.installerPricing");

  const tiers = [
    {
      key: "singleUnit",
      highlighted: false,
      storeLink: "https://store.sourceful.energy/products/sourceful-energy-zap",
    },
    {
      key: "installerPack",
      highlighted: true,
      contactLink: "/contact",
    },
    {
      key: "networkPartner",
      highlighted: false,
      contactLink: "/contact",
    },
  ];

  return (
    <section className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <FadeIn className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            {t("title")}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("description")}
          </p>
        </FadeIn>

        <StaggerContainer className="grid gap-6 md:grid-cols-3 max-w-5xl mx-auto" staggerDelay={0.1}>
          {tiers.map((tier) => {
            const features = t.raw(`${tier.key}.features`) as string[];
            const isPopular = t.has(`${tier.key}.popular`) && t.raw(`${tier.key}.popular`) === true;

            return (
              <StaggerItem key={tier.key}>
                <Card
                  className={`flex flex-col h-full ${
                    tier.highlighted
                      ? "border-indigo-500 shadow-lg ring-1 ring-indigo-500 md:-translate-y-4 md:scale-105"
                      : ""
                  }`}
                >
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <CardTitle className="text-xl">
                        {t(`${tier.key}.title`)}
                      </CardTitle>
                      {isPopular && (
                        <Badge variant="default" className="text-xs bg-indigo-500">
                          Popular
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-bold">
                        {t(`${tier.key}.price`)}
                      </span>
                      {t.has(`${tier.key}.period`) && (
                        <span className="text-muted-foreground text-sm">
                          /{t(`${tier.key}.period`)}
                        </span>
                      )}
                    </div>
                    <CardDescription className="mt-2">
                      {t(`${tier.key}.description`)}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <ul className="space-y-3">
                      {features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <Check className="h-5 w-5 text-indigo-500 shrink-0 mt-0.5" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    {tier.storeLink ? (
                      <Button
                        className="w-full"
                        variant={tier.highlighted ? "default" : "outline"}
                        asChild
                      >
                        <a href={tier.storeLink} target="_blank" rel="noopener noreferrer">
                          {t(`${tier.key}.cta`)}
                          <ExternalLink className="ml-2 h-4 w-4" />
                        </a>
                      </Button>
                    ) : (
                      <Button
                        className={`w-full ${tier.highlighted ? "bg-indigo-500 hover:bg-indigo-600" : ""}`}
                        variant={tier.highlighted ? "default" : "outline"}
                        asChild
                      >
                        <Link href={tier.contactLink || "/contact"}>
                          {t(`${tier.key}.cta`)}
                        </Link>
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
