import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Link } from "@/src/i18n/routing";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MarketingNav } from "@/components/marketing-nav";
import { MarketingFooter } from "@/components/marketing-footer";
import { BrandLogo } from "@/components/brand-logo";
import {
  ArrowRight,
  CheckCircle,
  Zap,
  ExternalLink,
  BarChart3,
  Shield,
  Clock,
  Plug,
} from "lucide-react";

// Brand database - only technical/non-translatable data
const brandData: Record<string, {
  name: string;
  category: "inverter" | "charger" | "battery" | "utility" | "installer";
  protocols: string[];
}> = {
  solaredge: {
    name: "SolarEdge",
    category: "inverter",
    protocols: ["SolarEdge API", "Modbus TCP", "SunSpec"],
  },
  huawei: {
    name: "Huawei",
    category: "inverter",
    protocols: ["FusionSolar API", "Modbus TCP", "MQTT"],
  },
  fronius: {
    name: "Fronius",
    category: "inverter",
    protocols: ["Fronius Solar API", "Modbus TCP", "SunSpec"],
  },
  sma: {
    name: "SMA",
    category: "inverter",
    protocols: ["SMA Speedwire", "Modbus TCP", "SunSpec"],
  },
  sungrow: {
    name: "Sungrow",
    category: "inverter",
    protocols: ["Sungrow API", "Modbus TCP"],
  },
  solax: {
    name: "SolaX",
    category: "inverter",
    protocols: ["SolaX Cloud API", "Modbus TCP"],
  },
  solis: {
    name: "Solis",
    category: "inverter",
    protocols: ["Solis API", "Modbus TCP"],
  },
  deye: {
    name: "Deye",
    category: "inverter",
    protocols: ["Modbus TCP", "Local API"],
  },
  ferroamp: {
    name: "Ferroamp",
    category: "inverter",
    protocols: ["Ferroamp API", "Modbus TCP"],
  },
  easee: {
    name: "Easee",
    category: "charger",
    protocols: ["Easee Cloud API", "OCPP 1.6"],
  },
  zaptec: {
    name: "Zaptec",
    category: "charger",
    protocols: ["Zaptec API", "OCPP 1.6/2.0"],
  },
  chargeamps: {
    name: "ChargeAmps",
    category: "charger",
    protocols: ["ChargeAmps API", "OCPP"],
  },
  pixii: {
    name: "Pixii",
    category: "battery",
    protocols: ["Pixii API", "Modbus TCP"],
  },
  ambibox: {
    name: "Ambibox",
    category: "battery",
    protocols: ["Ambibox API", "Modbus"],
  },
};

// Generate static params for all brands and locales
export function generateStaticParams() {
  const locales = ["en", "sv"];
  const brands = Object.keys(brandData);

  return locales.flatMap((locale) =>
    brands.map((brand) => ({
      locale,
      brand,
    }))
  );
}

// Generate metadata for each brand page
export async function generateMetadata({ params }: { params: Promise<{ brand: string }> }): Promise<Metadata> {
  const { brand: brandSlug } = await params;
  const brand = brandData[brandSlug];
  if (!brand) {
    return {
      title: "Integration Not Found",
    };
  }
  return {
    title: `${brand.name} Integration`,
    description: `Integrate your ${brand.name} ${brand.category} with Sourceful for intelligent energy management, optimization, and grid services.`,
  };
}

export default async function BrandPage({ params }: { params: Promise<{ brand: string }> }) {
  const { brand: brandSlug } = await params;
  const t = await getTranslations("integrations.brandPage");
  const brand = brandData[brandSlug];

  if (!brand) {
    notFound();
  }

  // Get translated brand content
  const brandContent = {
    tagline: t(`brands.${brandSlug}.tagline`),
    description: t(`brands.${brandSlug}.description`),
    features: [0, 1, 2, 3, 4].map(i => t(`brands.${brandSlug}.features.${i}`)),
    useCases: [0, 1, 2].map(i => ({
      title: t(`brands.${brandSlug}.useCases.${i}.title`),
      description: t(`brands.${brandSlug}.useCases.${i}.description`),
      savings: t(`brands.${brandSlug}.useCases.${i}.savings`),
    })),
    compatibility: t(`brands.${brandSlug}.compatibility`),
  };

  return (
    <div className="flex min-h-screen flex-col">
      <MarketingNav />

      <main className="flex-1 pt-16">
        {/* Hero */}
        <section className="relative overflow-hidden border-b">
          <div className="absolute inset-0 bg-dot-pattern" />
          <div className="relative max-w-7xl mx-auto py-24 md:py-32 px-4 md:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <Badge variant="secondary">{t(`categories.${brand.category}`)}</Badge>
                  <Badge variant="outline">{t("compatible")}</Badge>
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
                  {brand.name} +{" "}
                  <span className="text-primary">Sourceful</span>
                </h1>
                <p className="text-xl text-muted-foreground mb-8">
                  {brandContent.tagline}
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" asChild>
                    <Link href="/zap">
                      {t("getZapGateway")}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link href="/contact">
                      {t("contactSales")}
                    </Link>
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <BrandLogo brand={brandSlug} size="xl" />
              </div>
            </div>
          </div>
        </section>

        {/* Description */}
        <section className="max-w-7xl mx-auto py-16 md:py-24 px-4 md:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold tracking-tight mb-6">
                {t("whyTitle", { brand: brand.name })}
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                {brandContent.description}
              </p>
              <div className="space-y-3">
                {brandContent.features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Plug className="h-5 w-5 text-primary" />
                    <CardTitle className="text-lg">{t("supportedProtocols")}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {brand.protocols.map((protocol) => (
                      <Badge key={protocol} variant="secondary">{protocol}</Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-primary" />
                    <CardTitle className="text-lg">{t("compatibility")}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{brandContent.compatibility}</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Use Cases */}
        <section className="border-t bg-muted/30">
          <div className="max-w-7xl mx-auto py-16 md:py-24 px-4 md:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                {t("useCases.title")}
              </h2>
              <p className="text-lg text-muted-foreground">
                {t("useCases.subtitle", { brand: brand.name })}
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {brandContent.useCases.map((useCase, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="text-lg">{useCase.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="mb-4">{useCase.description}</CardDescription>
                    {useCase.savings && (
                      <div className="text-2xl font-bold text-primary">{useCase.savings}</div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="border-t">
          <div className="max-w-7xl mx-auto py-16 md:py-24 px-4 md:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                {t("howItWorks.title")}
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  1
                </div>
                <h3 className="font-semibold mb-2">{t("howItWorks.step1.title")}</h3>
                <p className="text-muted-foreground text-sm">
                  {t("howItWorks.step1.description")}
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  2
                </div>
                <h3 className="font-semibold mb-2">{t("howItWorks.step2.title", { brand: brand.name })}</h3>
                <p className="text-muted-foreground text-sm">
                  {t("howItWorks.step2.description", { brand: brand.name, category: brand.category })}
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  3
                </div>
                <h3 className="font-semibold mb-2">{t("howItWorks.step3.title")}</h3>
                <p className="text-muted-foreground text-sm">
                  {t("howItWorks.step3.description")}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="border-t bg-gradient-to-br from-primary/10 via-primary/5 to-background">
          <div className="max-w-7xl mx-auto py-16 md:py-24 px-4 md:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              {t("cta.title", { brand: brand.name })}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              {t("cta.description")}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" asChild>
                <a href="https://store.sourceful.energy/products/sourceful-energy-zap" target="_blank" rel="noopener noreferrer">
                  {t("cta.orderZap")}
                  <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/integrations">
                  {t("cta.viewAllIntegrations")}
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <MarketingFooter />
    </div>
  );
}
