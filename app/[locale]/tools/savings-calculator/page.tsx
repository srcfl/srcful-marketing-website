"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/src/i18n/routing";
import { MarketingNav } from "@/components/marketing-nav";
import { MarketingFooter } from "@/components/marketing-footer";
import { CalculatorLayout, CalculatorResults, ResultCard } from "@/components/calculators/calculator-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { ArrowRight, Sun, Battery, Car, Zap, Lock } from "lucide-react";

// Average electricity prices by region (öre/kWh) - sample data
const regionPrices: Record<string, { avg: number; peak: number; offPeak: number }> = {
  SE1: { avg: 45, peak: 75, offPeak: 25 },
  SE2: { avg: 55, peak: 90, offPeak: 30 },
  SE3: { avg: 85, peak: 150, offPeak: 40 },
  SE4: { avg: 95, peak: 180, offPeak: 45 },
};

export default function SavingsCalculatorPage() {
  const t = useTranslations("tools");
  const tCommon = useTranslations("common");

  // Swedish regions for electricity pricing
  const regions = [
    { value: "SE1", label: t("regions.SE1") },
    { value: "SE2", label: t("regions.SE2") },
    { value: "SE3", label: t("regions.SE3") },
    { value: "SE4", label: t("regions.SE4") },
  ];

  // Form state
  const [region, setRegion] = useState("SE3");
  const [annualConsumption, setAnnualConsumption] = useState(15000); // kWh
  const [solarSize, setSolarSize] = useState(10); // kWp
  const [hasBattery, setHasBattery] = useState(false);
  const [batterySize, setBatterySize] = useState(10); // kWh
  const [hasEV, setHasEV] = useState(false);
  const [evKmPerYear, setEvKmPerYear] = useState(15000);

  // Results state
  const [showResults, setShowResults] = useState(false);
  const [showEmailGate, setShowEmailGate] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Calculate results
  const calculateSavings = () => {
    const prices = regionPrices[region];
    const avgPriceKr = prices.avg / 100; // Convert öre to kr

    // Solar production estimate (kWh/year per kWp in Sweden)
    const solarProductionPerKwp = 900; // Average for Sweden
    const solarProduction = solarSize * solarProductionPerKwp;

    // Self-consumption rate (without battery vs with battery)
    const selfConsumptionRate = hasBattery ? 0.7 : 0.4;
    const selfConsumedSolar = Math.min(solarProduction * selfConsumptionRate, annualConsumption);

    // Grid export (sold back)
    const exportedSolar = solarProduction - selfConsumedSolar;
    const exportPrice = avgPriceKr * 0.5; // Typically get about 50% of retail price

    // Savings from self-consumed solar
    const selfConsumptionSavings = selfConsumedSolar * avgPriceKr;

    // Revenue from exported solar
    const exportRevenue = exportedSolar * exportPrice;

    // Battery arbitrage savings (buy low, use during peak)
    let batterySavings = 0;
    if (hasBattery) {
      const dailyCycles = 1; // One full cycle per day
      const annualCycles = dailyCycles * 365;
      const priceSpreadKr = (prices.peak - prices.offPeak) / 100;
      batterySavings = batterySize * annualCycles * priceSpreadKr * 0.9; // 90% efficiency
    }

    // EV smart charging savings
    let evSavings = 0;
    if (hasEV) {
      const evConsumptionPer100km = 18; // kWh per 100km
      const evAnnualConsumption = (evKmPerYear / 100) * evConsumptionPer100km;
      const priceSpreadKr = (prices.avg - prices.offPeak) / 100;
      evSavings = evAnnualConsumption * priceSpreadKr * 0.8; // 80% of charging is smart
    }

    // Total annual savings
    const totalSavings = selfConsumptionSavings + exportRevenue + batterySavings + evSavings;

    // CO2 reduction (kg) - Swedish grid is mostly clean, so we use a moderate factor
    const co2PerKwh = 0.05; // kg CO2 per kWh (Swedish grid is very clean)
    const co2Saved = selfConsumedSolar * co2PerKwh;

    // Payback period (rough estimate)
    const solarCost = solarSize * 15000; // ~15,000 SEK per kWp installed
    const batteryCost = hasBattery ? batterySize * 8000 : 0; // ~8,000 SEK per kWh
    const zapCost = 390; // €39 = ~390 SEK
    const totalCost = solarCost + batteryCost + zapCost;
    const paybackYears = totalCost / totalSavings;

    return {
      solarProduction: Math.round(solarProduction),
      selfConsumedSolar: Math.round(selfConsumedSolar),
      exportedSolar: Math.round(exportedSolar),
      selfConsumptionSavings: Math.round(selfConsumptionSavings),
      exportRevenue: Math.round(exportRevenue),
      batterySavings: Math.round(batterySavings),
      evSavings: Math.round(evSavings),
      totalSavings: Math.round(totalSavings),
      co2Saved: Math.round(co2Saved),
      paybackYears: Math.round(paybackYears * 10) / 10,
      totalCost: Math.round(totalCost),
    };
  };

  const results = calculateSavings();

  const handleCalculate = () => {
    setShowResults(true);
    setShowEmailGate(true);
  };

  const handleSubmitEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch("https://submit-form.com/6ZFZTUMW1", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          _subject: "Savings Calculator Lead",
          email,
          name,
          region,
          annualConsumption,
          solarSize,
          hasBattery,
          batterySize: hasBattery ? batterySize : 0,
          hasEV,
          evKmPerYear: hasEV ? evKmPerYear : 0,
          estimatedSavings: results.totalSavings,
          source: "savings-calculator",
        }),
      });

      if (response.ok) {
        setSubmitted(true);
        setShowEmailGate(false);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <MarketingNav />

      <main className="flex-1 pt-16">
        <section className="py-16 md:py-24 px-4 md:px-8">
          <CalculatorLayout
            title={t("calculator.title")}
            description={t("calculator.description")}
            badge={t("calculator.badge")}
          >
            <div className="space-y-8">
              {/* Location */}
              <div className="space-y-4">
                <h3 className="font-semibold flex items-center gap-2">
                  <Zap className="h-4 w-4 text-primary" />
                  {t("calculator.location")}
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="region">{t("calculator.region")}</Label>
                    <Select value={region} onValueChange={setRegion}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {regions.map((r) => (
                          <SelectItem key={r.value} value={r.value}>
                            {r.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-muted-foreground">
                      {t("calculator.avgPrice")}: {regionPrices[region].avg} öre/kWh
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="consumption">{t("calculator.consumption")}</Label>
                    <Input
                      id="consumption"
                      type="number"
                      value={annualConsumption}
                      onChange={(e) => setAnnualConsumption(Number(e.target.value))}
                      min={1000}
                      max={100000}
                    />
                    <p className="text-xs text-muted-foreground">
                      {t("calculator.consumptionNote")}
                    </p>
                  </div>
                </div>
              </div>

              {/* Solar */}
              <div className="space-y-4">
                <h3 className="font-semibold flex items-center gap-2">
                  <Sun className="h-4 w-4 text-yellow-500" />
                  {t("calculator.solar")}
                </h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label>{t("calculator.solarSize")}</Label>
                      <span className="text-sm font-medium">{solarSize} kWp</span>
                    </div>
                    <Slider
                      value={[solarSize]}
                      onValueChange={(v) => setSolarSize(v[0])}
                      min={3}
                      max={30}
                      step={1}
                    />
                    <p className="text-xs text-muted-foreground">
                      {t("calculator.solarProduction")}: {(solarSize * 900).toLocaleString()} kWh/year
                    </p>
                  </div>
                </div>
              </div>

              {/* Battery */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold flex items-center gap-2">
                    <Battery className="h-4 w-4 text-green-500" />
                    {t("calculator.battery")}
                  </h3>
                  <Switch checked={hasBattery} onCheckedChange={setHasBattery} />
                </div>
                {hasBattery && (
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label>{t("calculator.batteryCapacity")}</Label>
                      <span className="text-sm font-medium">{batterySize} kWh</span>
                    </div>
                    <Slider
                      value={[batterySize]}
                      onValueChange={(v) => setBatterySize(v[0])}
                      min={5}
                      max={30}
                      step={1}
                    />
                  </div>
                )}
              </div>

              {/* EV */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold flex items-center gap-2">
                    <Car className="h-4 w-4 text-blue-500" />
                    {t("calculator.ev")}
                  </h3>
                  <Switch checked={hasEV} onCheckedChange={setHasEV} />
                </div>
                {hasEV && (
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label>{t("calculator.evDistance")}</Label>
                      <span className="text-sm font-medium">{evKmPerYear.toLocaleString()} km</span>
                    </div>
                    <Slider
                      value={[evKmPerYear]}
                      onValueChange={(v) => setEvKmPerYear(v[0])}
                      min={5000}
                      max={50000}
                      step={1000}
                    />
                  </div>
                )}
              </div>

              {/* Calculate Button */}
              <Button className="w-full" size="lg" onClick={handleCalculate}>
                {t("calculator.calculate")}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>

            {/* Results */}
            {showResults && (
              <CalculatorResults title={t("calculator.results.title")}>
                {/* Email Gate */}
                {showEmailGate && !submitted && (
                  <Card className="mb-8 border-primary">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-2 mb-4">
                        <Lock className="h-5 w-5 text-primary" />
                        <h3 className="font-semibold">{t("calculator.results.unlock")}</h3>
                      </div>
                      <p className="text-sm text-muted-foreground mb-4">
                        {t("calculator.results.unlockDescription")}
                      </p>
                      <form onSubmit={handleSubmitEmail} className="space-y-4">
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="name">{t("calculator.results.name")}</Label>
                            <Input
                              id="name"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              placeholder={tCommon("contactForm.namePlaceholder")}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="email">{t("calculator.results.email")} *</Label>
                            <Input
                              id="email"
                              type="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              placeholder={tCommon("contactForm.emailPlaceholder")}
                              required
                            />
                          </div>
                        </div>
                        <Button type="submit" disabled={submitting} className="w-full">
                          {submitting ? t("submitting") : t("calculator.results.getResults")}
                        </Button>
                        <p className="text-xs text-muted-foreground text-center">
                          {t("calculator.results.privacy")}
                        </p>
                      </form>
                    </CardContent>
                  </Card>
                )}

                {/* Show preview of results (blurred if not submitted) */}
                <div className={showEmailGate && !submitted ? "blur-sm pointer-events-none select-none" : ""}>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    <ResultCard
                      label={t("calculator.results.totalSavings")}
                      value={`${results.totalSavings.toLocaleString()} kr`}
                      subtext={t("calculator.results.perYear")}
                      highlight
                    />
                    <ResultCard
                      label={t("calculator.results.solarProduction")}
                      value={`${results.solarProduction.toLocaleString()} kWh`}
                      subtext={t("calculator.results.perYear")}
                    />
                    <ResultCard
                      label={t("calculator.results.co2Reduction")}
                      value={`${results.co2Saved} kg`}
                      subtext={t("calculator.results.perYear")}
                    />
                    <ResultCard
                      label={t("calculator.results.paybackPeriod")}
                      value={`${results.paybackYears} years`}
                      subtext={`${t("calculator.results.totalInvestment")}: ${results.totalCost.toLocaleString()} kr`}
                    />
                  </div>

                  {/* Savings Breakdown */}
                  <div className="space-y-4">
                    <h3 className="font-semibold">{t("calculator.results.breakdown")}</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                        <div className="flex items-center gap-2">
                          <Sun className="h-4 w-4 text-yellow-500" />
                          <span>{t("calculator.results.selfConsumed")}</span>
                        </div>
                        <span className="font-medium">{results.selfConsumptionSavings.toLocaleString()} kr</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                        <div className="flex items-center gap-2">
                          <Zap className="h-4 w-4 text-primary" />
                          <span>{t("calculator.results.gridExport")}</span>
                        </div>
                        <span className="font-medium">{results.exportRevenue.toLocaleString()} kr</span>
                      </div>
                      {hasBattery && (
                        <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                          <div className="flex items-center gap-2">
                            <Battery className="h-4 w-4 text-green-500" />
                            <span>{t("calculator.results.batteryArbitrage")}</span>
                          </div>
                          <span className="font-medium">{results.batterySavings.toLocaleString()} kr</span>
                        </div>
                      )}
                      {hasEV && (
                        <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                          <div className="flex items-center gap-2">
                            <Car className="h-4 w-4 text-blue-500" />
                            <span>{t("calculator.results.smartCharging")}</span>
                          </div>
                          <span className="font-medium">{results.evSavings.toLocaleString()} kr</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="mt-8 p-6 bg-primary/10 rounded-lg text-center">
                    <h3 className="font-semibold mb-2">{t("calculator.results.readyToSave")}</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      {t("calculator.results.readyDescription")}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                      <Button asChild>
                        <a href="https://store.sourceful.energy/products/sourceful-energy-zap" target="_blank" rel="noopener noreferrer">
                          {tCommon("buttons.getTheZap")} - {tCommon("currency.symbol")}39
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </a>
                      </Button>
                      <Button variant="outline" asChild>
                        <Link href="/contact">
                          {tCommon("buttons.contactSales")}
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Disclaimer */}
                <p className="text-xs text-muted-foreground text-center mt-6">
                  {t("calculator.results.disclaimer")}
                </p>
              </CalculatorResults>
            )}
          </CalculatorLayout>
        </section>

        {/* Related Tools */}
        <section className="border-t bg-muted/30">
          <div className="max-w-7xl mx-auto py-12 px-4 md:px-8">
            <h2 className="text-xl font-semibold mb-6 text-center">{t("moreTools")}</h2>
            <div className="grid md:grid-cols-3 gap-4 max-w-3xl mx-auto">
              <Link href="/tools/battery-sizing">
                <Card className="hover:border-primary/50 transition-colors cursor-pointer h-full">
                  <CardContent className="p-4 text-center">
                    <Battery className="h-6 w-6 mx-auto mb-2 text-primary" />
                    <h3 className="font-medium">{t("batterySizing.title")}</h3>
                  </CardContent>
                </Card>
              </Link>
              <Link href="/tools/v2x-savings">
                <Card className="hover:border-primary/50 transition-colors cursor-pointer h-full">
                  <CardContent className="p-4 text-center">
                    <Car className="h-6 w-6 mx-auto mb-2 text-primary" />
                    <h3 className="font-medium">{t("v2xSavings.title")}</h3>
                  </CardContent>
                </Card>
              </Link>
              <Link href="/tools/solar-roi">
                <Card className="hover:border-primary/50 transition-colors cursor-pointer h-full">
                  <CardContent className="p-4 text-center">
                    <Sun className="h-6 w-6 mx-auto mb-2 text-primary" />
                    <h3 className="font-medium">{t("solarRoi.title")}</h3>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <MarketingFooter />
    </div>
  );
}
