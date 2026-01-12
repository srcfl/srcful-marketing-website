import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/src/i18n/routing";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MarketingNav } from "@/components/marketing-nav";
import { MarketingFooter } from "@/components/marketing-footer";
import { ArrowRight, Plug, Zap, Battery, Car, Sun, Gauge, Thermometer } from "lucide-react";

export const metadata: Metadata = {
  title: "Integrations",
  description: "Sourceful integrates with leading solar inverters, EV chargers, batteries, and smart meters. See all compatible devices.",
};

// Brand data with categories (descriptions come from translations)
// Logo files are in /images/partner-logos/dark-mode/ and /images/partner-logos/light-mode/
const brands = {
  inverters: [
    { name: "SolarEdge", slug: "solaredge", status: "supported" as const, logo: "solaredge" },
    { name: "Sungrow", slug: "sungrow", status: "supported" as const, logo: "sungrow" },
    { name: "Solis", slug: "solis", status: "supported" as const, logo: "solis" },
    { name: "Deye", slug: "deye", status: "supported" as const, logo: "deye" },
    { name: "Huawei", slug: "huawei", status: "coming" as const, logo: "huawei" },
    { name: "Fronius", slug: "fronius", status: "coming" as const, logo: "fronius" },
    { name: "SMA", slug: "sma", status: "coming" as const, logo: "sma" },
    { name: "Ferroamp", slug: "ferroamp", status: "coming" as const, logo: "ferroamp" },
    { name: "SolaX", slug: "solax", status: "coming" as const, logo: "solax" },
    { name: "Solinteg", slug: "solinteg", status: "coming" as const, logo: null },
  ],
  chargers: [
    { name: "Ambibox", slug: "ambibox", status: "supported" as const, logo: "ambibox" },
    { name: "Ferroamp", slug: "ferroamp-charger", status: "testing" as const, logo: "ferroamp" },
    { name: "Easee", slug: "easee", status: "testing" as const, logo: "easee" },
    { name: "Zaptec", slug: "zaptec", status: "testing" as const, logo: "zaptec" },
    { name: "ChargeAmps", slug: "chargeamps", status: "testing" as const, logo: "chargeamps" },
  ],
  batteries: [
    { name: "Pixii", slug: "pixii", logo: "pixii" },
  ],
  hvac: [
    { name: "NIBE", slug: "nibe", status: "coming" as const, logo: null },
  ],
  utilities: [
    { name: "Kalmar Energi", slug: "kalmar-energi", logo: "kalmar-energi" },
    { name: "NRGi", slug: "nrgi", logo: "nrgi" },
  ],
  installers: [
    { name: "Elkedjan", slug: "elkedjan", logo: "elkedjan" },
  ],
};

const categoryIcons = {
  inverters: Sun,
  chargers: Car,
  batteries: Battery,
  hvac: Thermometer,
  utilities: Gauge,
  installers: Plug,
};

export default async function IntegrationsPage() {
  const t = await getTranslations("integrations");

  const categories = [
    { key: "inverters", icon: categoryIcons.inverters, count: brands.inverters.length },
    { key: "chargers", icon: categoryIcons.chargers, count: brands.chargers.length },
    { key: "batteries", icon: categoryIcons.batteries, count: brands.batteries.length },
    { key: "hvac", icon: categoryIcons.hvac, count: brands.hvac.length },
    { key: "utilities", icon: categoryIcons.utilities, count: brands.utilities.length },
    { key: "installers", icon: categoryIcons.installers, count: brands.installers.length },
  ];
  return (
    <div className="flex min-h-screen flex-col">
      <MarketingNav />

      <main className="flex-1 pt-16">
        {/* Hero */}
        <section className="relative overflow-hidden border-b">
          <div className="absolute inset-0 bg-dot-pattern" />
          <div className="relative max-w-7xl mx-auto py-24 md:py-32 px-4 md:px-8">
            <div className="max-w-3xl">
              <Badge variant="secondary" className="mb-6">
                <Plug className="h-3 w-3 mr-1" />
                {t("hero.badge")}
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                {t("hero.title")}{" "}
                <span className="text-primary">{t("hero.titleHighlight")}</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                {t("hero.description")}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild>
                  <Link href="/zap">
                    {t("hero.getTheZap")}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <a href="https://developer.sourceful.energy/hardware" target="_blank" rel="noopener noreferrer">
                    {t("hero.hardwareDocs")}
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="bg-muted/30 border-b">
          <div className="max-w-7xl mx-auto py-12 px-4 md:px-8">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
              {categories.map((category) => {
                const Icon = category.icon;
                return (
                  <div key={category.key} className="text-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-2">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="text-2xl font-bold">{category.count}</div>
                    <div className="text-sm text-muted-foreground">{t(`categories.${category.key}`)}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Solar Inverters */}
        <section className="max-w-7xl mx-auto py-16 md:py-24 px-4 md:px-8">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-yellow-500/10 rounded-lg flex items-center justify-center">
              <Sun className="h-5 w-5 text-yellow-500" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">{t("categories.inverters")}</h2>
              <p className="text-muted-foreground">{t("sections.inverters.subtitle")}</p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {brands.inverters.map((brand) => (
              <Link key={brand.slug} href={`/integrations/${brand.slug}`} className="no-underline">
                <Card className="h-full hover:border-primary/50 hover:shadow-md transition-all">
                  <div className="flex">
                    {brand.logo && (
                      <div className="w-28 shrink-0 flex items-center justify-center border-r bg-muted/30 p-4">
                        <Image
                          src={`/images/partner-logos/light-mode/${brand.logo}.svg`}
                          alt={brand.name}
                          width={120}
                          height={48}
                          className="h-14 w-auto object-contain dark:hidden"
                        />
                        <Image
                          src={`/images/partner-logos/dark-mode/${brand.logo}.svg`}
                          alt={brand.name}
                          width={120}
                          height={48}
                          className="h-14 w-auto object-contain hidden dark:block"
                        />
                      </div>
                    )}
                    <div className="flex-1">
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg">{brand.name}</CardTitle>
                          <Badge
                            variant={brand.status === "supported" ? "default" : "outline"}
                            className="text-xs shrink-0"
                          >
                            {brand.status === "supported" ? t("sections.inverters.supported") : t("sections.inverters.comingSoon")}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <CardDescription>{t(`brands.${brand.slug}`)}</CardDescription>
                      </CardContent>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* EV Chargers */}
        <section className="border-t bg-muted/30">
          <div className="max-w-7xl mx-auto py-16 md:py-24 px-4 md:px-8">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center">
                <Car className="h-5 w-5 text-blue-500" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">{t("categories.chargers")}</h2>
                <p className="text-muted-foreground">{t("sections.chargers.subtitle")}</p>
              </div>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {brands.chargers.map((brand) => (
                <Link key={brand.slug} href={`/integrations/${brand.slug}`} className="no-underline">
                  <Card className="h-full hover:border-primary/50 hover:shadow-md transition-all">
                    <div className="flex">
                      {brand.logo && (
                        <div className="w-28 shrink-0 flex items-center justify-center border-r bg-muted/30 p-4">
                          <Image
                            src={`/images/partner-logos/light-mode/${brand.logo}.svg`}
                            alt={brand.name}
                            width={120}
                            height={48}
                            className="h-14 w-auto object-contain dark:hidden"
                          />
                          <Image
                            src={`/images/partner-logos/dark-mode/${brand.logo}.svg`}
                            alt={brand.name}
                            width={120}
                            height={48}
                            className="h-14 w-auto object-contain hidden dark:block"
                          />
                        </div>
                      )}
                      <div className="flex-1">
                        <CardHeader className="pb-2">
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-lg">{brand.name}</CardTitle>
                            <Badge
                              variant={brand.status === "supported" ? "default" : "outline"}
                              className="text-xs shrink-0"
                            >
                              {brand.status === "supported" ? t("sections.chargers.supported") : t("sections.chargers.inTesting")}
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <CardDescription>{t(`brands.${brand.slug}`)}</CardDescription>
                        </CardContent>
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Batteries */}
        <section className="border-t">
          <div className="max-w-7xl mx-auto py-16 md:py-24 px-4 md:px-8">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center">
                <Battery className="h-5 w-5 text-green-500" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">{t("categories.batteries")}</h2>
                <p className="text-muted-foreground">{t("sections.batteries.subtitle")}</p>
              </div>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {brands.batteries.map((brand) => (
                <Link key={brand.slug} href={`/integrations/${brand.slug}`} className="no-underline">
                  <Card className="h-full hover:border-primary/50 hover:shadow-md transition-all">
                    <div className="flex">
                      {brand.logo && (
                        <div className="w-28 shrink-0 flex items-center justify-center border-r bg-muted/30 p-4">
                          <Image
                            src={`/images/partner-logos/light-mode/${brand.logo}.svg`}
                            alt={brand.name}
                            width={120}
                            height={48}
                            className="h-14 w-auto object-contain dark:hidden"
                          />
                          <Image
                            src={`/images/partner-logos/dark-mode/${brand.logo}.svg`}
                            alt={brand.name}
                            width={120}
                            height={48}
                            className="h-14 w-auto object-contain hidden dark:block"
                          />
                        </div>
                      )}
                      <div className="flex-1">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg">{brand.name}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <CardDescription>{t(`brands.${brand.slug}`)}</CardDescription>
                        </CardContent>
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* HVAC */}
        <section className="border-t bg-muted/30">
          <div className="max-w-7xl mx-auto py-16 md:py-24 px-4 md:px-8">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-cyan-500/10 rounded-lg flex items-center justify-center">
                <Thermometer className="h-5 w-5 text-cyan-500" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">{t("categories.hvac")}</h2>
                <p className="text-muted-foreground">{t("sections.hvac.subtitle")}</p>
              </div>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {brands.hvac.map((brand) => (
                <Card key={brand.slug} className="h-full">
                  <div className="flex">
                    {brand.logo && (
                      <div className="w-28 shrink-0 flex items-center justify-center border-r bg-muted/30 p-4">
                        <Image
                          src={`/images/partner-logos/light-mode/${brand.logo}.svg`}
                          alt={brand.name}
                          width={120}
                          height={48}
                          className="h-14 w-auto object-contain dark:hidden"
                        />
                        <Image
                          src={`/images/partner-logos/dark-mode/${brand.logo}.svg`}
                          alt={brand.name}
                          width={120}
                          height={48}
                          className="h-14 w-auto object-contain hidden dark:block"
                        />
                      </div>
                    )}
                    <div className="flex-1">
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg">{brand.name}</CardTitle>
                          <Badge variant="outline" className="text-xs shrink-0">
                            {t("sections.hvac.comingSoon")}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <CardDescription>{t(`brands.${brand.slug}`)}</CardDescription>
                      </CardContent>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Partners */}
        <section className="border-t">
          <div className="max-w-7xl mx-auto py-16 md:py-24 px-4 md:px-8">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Utilities */}
              <div>
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 bg-purple-500/10 rounded-lg flex items-center justify-center">
                    <Gauge className="h-5 w-5 text-purple-500" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">{t("categories.utilities")}</h2>
                    <p className="text-muted-foreground">{t("sections.utilities.subtitle")}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  {brands.utilities.map((brand) => (
                    <Card key={brand.slug}>
                      <div className="flex">
                        {brand.logo && (
                          <div className="w-28 shrink-0 flex items-center justify-center border-r bg-muted/30 p-4">
                            <Image
                              src={`/images/partner-logos/light-mode/${brand.logo}.svg`}
                              alt={brand.name}
                              width={120}
                              height={48}
                              className="h-14 w-auto object-contain dark:hidden"
                            />
                            <Image
                              src={`/images/partner-logos/dark-mode/${brand.logo}.svg`}
                              alt={brand.name}
                              width={120}
                              height={48}
                              className="h-14 w-auto object-contain hidden dark:block"
                            />
                          </div>
                        )}
                        <div className="flex-1">
                          <CardHeader className="pb-2">
                            <CardTitle className="text-lg">{brand.name}</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <CardDescription>{t(`brands.${brand.slug}`)}</CardDescription>
                          </CardContent>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Installers */}
              <div>
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 bg-orange-500/10 rounded-lg flex items-center justify-center">
                    <Plug className="h-5 w-5 text-orange-500" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">{t("categories.installers")}</h2>
                    <p className="text-muted-foreground">{t("sections.installers.subtitle")}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  {brands.installers.map((brand) => (
                    <Card key={brand.slug}>
                      <div className="flex">
                        {brand.logo && (
                          <div className="w-28 shrink-0 flex items-center justify-center border-r bg-muted/30 p-4">
                            <Image
                              src={`/images/partner-logos/light-mode/${brand.logo}.svg`}
                              alt={brand.name}
                              width={120}
                              height={48}
                              className="h-14 w-auto object-contain dark:hidden"
                            />
                            <Image
                              src={`/images/partner-logos/dark-mode/${brand.logo}.svg`}
                              alt={brand.name}
                              width={120}
                              height={48}
                              className="h-14 w-auto object-contain hidden dark:block"
                            />
                          </div>
                        )}
                        <div className="flex-1">
                          <CardHeader className="pb-2">
                            <CardTitle className="text-lg">{brand.name}</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <CardDescription>{t(`brands.${brand.slug}`)}</CardDescription>
                          </CardContent>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="border-t bg-gradient-to-br from-primary/10 via-primary/5 to-background">
          <div className="max-w-7xl mx-auto py-16 md:py-24 px-4 md:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              {t("cta.title")}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              {t("cta.description")}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" asChild>
                <Link href="/contact">
                  {t("cta.requestIntegration")}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="https://developer.sourceful.energy/hardware" target="_blank" rel="noopener noreferrer">
                  {t("cta.developerDocs")}
                </a>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <MarketingFooter />
    </div>
  );
}
