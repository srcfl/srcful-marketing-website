"use client";

import { useState, useMemo } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/src/i18n/routing";
import { MarketingNav } from "@/components/marketing-nav";
import { MarketingFooter } from "@/components/marketing-footer";
import {
  CalculatorLayout,
  CalculatorResults,
  ResultCard,
} from "@/components/calculators/calculator-layout";
import {
  CountryZoneSelector,
  countries,
  getCurrencyInfo,
  type CountryKey,
  type ZoneCode,
} from "@/components/calculators/country-zone-selector";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ArrowRight,
  Sun,
  Battery,
  Loader2,
  Lock,
  Mail,
  Info,
  Check,
  Home,
  Zap,
  Shield,
  TrendingUp,
} from "lucide-react";

// Primary goals for battery sizing
type PrimaryGoal = "self-consumption" | "backup" | "arbitrage" | "all";

// Average electricity prices by zone (local currency per kWh)
const avgRetailPrices: Record<string, number> = {
  SE1: 1.2, SE2: 1.3, SE3: 1.5, SE4: 1.6,
  NO1: 1.4, NO2: 1.5, NO3: 1.2, NO4: 1.0, NO5: 1.4,
  DK1: 2.5, DK2: 2.6,
  FI: 0.15,
  DE: 0.35,
};

// Battery cost per kWh (average for home batteries)
const BATTERY_COST_PER_KWH = 6000; // SEK equivalent

// Battery efficiency
const BATTERY_EFFICIENCY = 0.9;

// Solar self-consumption improvement with battery (percentage points)
const SELF_CONSUMPTION_BOOST = 0.25;

export default function BatterySizingCalculatorPage() {
  const t = useTranslations("tools");
  const tCommon = useTranslations("common");

  // Form state
  const [country, setCountry] = useState<CountryKey>("sweden");
  const [zone, setZone] = useState<ZoneCode>("SE3");
  const [annualConsumption, setAnnualConsumption] = useState(15000);
  const [hasSolar, setHasSolar] = useState(true);
  const [solarSize, setSolarSize] = useState(10);
  const [primaryGoal, setPrimaryGoal] = useState<PrimaryGoal>("self-consumption");
  const [backupHours, setBackupHours] = useState(8);
  const [averageLoad, setAverageLoad] = useState(3);

  // Results state
  const [showResults, setShowResults] = useState(false);

  // Email gate state
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [isSubmittingEmail, setIsSubmittingEmail] = useState(false);
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [emailError, setEmailError] = useState<string | null>(null);

  const currencyInfo = getCurrencyInfo(country);
  const countryData = countries[country];

  // Calculate battery sizing recommendations
  const calculations = useMemo(() => {
    const dailyConsumption = annualConsumption / 365;
    const retailPrice = avgRetailPrices[zone] || 1.5;

    // Solar production calculations
    const annualSolarProduction = hasSolar ? solarSize * countryData.solarYield : 0;
    const dailySolarProduction = annualSolarProduction / 365;

    // Excess solar available for storage (typically 40-60% of production)
    const excessSolarRatio = 0.5;
    const dailyExcessSolar = dailySolarProduction * excessSolarRatio;

    // Calculate recommended size for each goal
    let selfConsumptionSize = 0;
    let backupSize = 0;
    let arbitrageSize = 0;

    // Self-consumption: store excess solar
    if (hasSolar) {
      selfConsumptionSize = Math.ceil(dailyExcessSolar * 1.2); // 20% buffer
    }

    // Backup power: hours × load with efficiency buffer
    if (primaryGoal === "backup" || primaryGoal === "all") {
      backupSize = Math.ceil((backupHours * averageLoad) / BATTERY_EFFICIENCY);
    }

    // Arbitrage: optimal around 10-15 kWh for most homes
    // Based on typical price spread and diminishing returns
    const priceSpread = retailPrice * 0.3; // ~30% price variation
    arbitrageSize = Math.min(15, Math.ceil(dailyConsumption * 0.3));

    // Determine recommended size based on goal
    let recommendedSize: number;
    switch (primaryGoal) {
      case "self-consumption":
        recommendedSize = Math.max(selfConsumptionSize, 5);
        break;
      case "backup":
        recommendedSize = Math.max(backupSize, 5);
        break;
      case "arbitrage":
        recommendedSize = arbitrageSize;
        break;
      case "all":
        recommendedSize = Math.max(selfConsumptionSize, backupSize, arbitrageSize);
        break;
      default:
        recommendedSize = 10;
    }

    // Round to nearest 0.5 kWh
    recommendedSize = Math.round(recommendedSize * 2) / 2;

    // Min/max practical sizes
    const minViable = Math.max(5, Math.round(recommendedSize * 0.6));
    const maxPractical = Math.min(30, Math.round(recommendedSize * 1.5));

    // Calculate annual savings at recommended size
    let annualSavings = 0;

    // Self-consumption savings (avoid export at low prices, use at high prices)
    if (hasSolar) {
      const storableEnergy = Math.min(dailyExcessSolar, recommendedSize) * 365;
      const priceDiff = retailPrice * 0.5; // Export vs self-consumption difference
      annualSavings += storableEnergy * priceDiff * BATTERY_EFFICIENCY;
    }

    // Arbitrage savings
    const dailyArbitrage = Math.min(recommendedSize * 0.8, dailyConsumption * 0.2);
    const arbitragePriceSpread = retailPrice * 0.25;
    annualSavings += dailyArbitrage * arbitragePriceSpread * 365 * BATTERY_EFFICIENCY;

    // Round savings
    annualSavings = Math.round(annualSavings);

    // Payback period
    const batteryCost = recommendedSize * BATTERY_COST_PER_KWH;
    const paybackYears = annualSavings > 0 ? batteryCost / annualSavings : 99;

    // Calculate savings at different sizes for comparison
    const sizeComparison = [5, 10, 15, 20, 25].map((size) => {
      let savings = 0;
      if (hasSolar) {
        const storable = Math.min(dailyExcessSolar, size) * 365;
        savings += storable * (retailPrice * 0.5) * BATTERY_EFFICIENCY;
      }
      const arb = Math.min(size * 0.8, dailyConsumption * 0.2);
      savings += arb * (retailPrice * 0.25) * 365 * BATTERY_EFFICIENCY;
      return {
        size,
        savings: Math.round(savings),
        payback: savings > 0 ? Math.round((size * BATTERY_COST_PER_KWH) / savings * 10) / 10 : 99,
      };
    });

    return {
      recommendedSize,
      minViable,
      maxPractical,
      annualSavings,
      paybackYears: Math.round(paybackYears * 10) / 10,
      batteryCost,
      dailyExcessSolar: Math.round(dailyExcessSolar * 10) / 10,
      sizeComparison,
      selfConsumptionSize,
      backupSize,
      arbitrageSize,
    };
  }, [annualConsumption, hasSolar, solarSize, primaryGoal, backupHours, averageLoad, zone, countryData.solarYield]);

  const handleCalculate = () => {
    setShowResults(true);
  };

  // Handle email submission
  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError(t("batterySizing.invalidEmail"));
      return;
    }

    setIsSubmittingEmail(true);
    setEmailError(null);

    try {
      await fetch("https://submit-form.com/6ZFZTUMW1", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          email,
          name: name || "",
          _source: "battery-sizing-calculator",
          zone,
          country,
          annualConsumption,
          hasSolar,
          solarSize: hasSolar ? solarSize : null,
          primaryGoal,
          backupHours: primaryGoal === "backup" || primaryGoal === "all" ? backupHours : null,
          averageLoad: primaryGoal === "backup" || primaryGoal === "all" ? averageLoad : null,
          recommendedSize: calculations.recommendedSize,
          annualSavings: calculations.annualSavings,
          paybackYears: calculations.paybackYears,
          currency: currencyInfo.symbol,
        }),
      });
      setEmailSubmitted(true);
    } catch (err) {
      console.error("Email submission error:", err);
      setEmailSubmitted(true);
    } finally {
      setIsSubmittingEmail(false);
    }
  };

  const goalOptions = [
    { id: "self-consumption", icon: Sun, label: t("batterySizing.goals.selfConsumption") },
    { id: "backup", icon: Shield, label: t("batterySizing.goals.backup") },
    { id: "arbitrage", icon: TrendingUp, label: t("batterySizing.goals.arbitrage") },
    { id: "all", icon: Zap, label: t("batterySizing.goals.all") },
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <MarketingNav />

      <main className="flex-1 pt-16">
        <section className="py-16 md:py-24 px-4 md:px-8">
          <CalculatorLayout
            title={t("batterySizing.title")}
            description={t("batterySizing.description")}
            badge={t("batterySizing.badge")}
          >
            <div className="space-y-8">
              {/* Location */}
              <div className="space-y-4">
                <h3 className="font-semibold flex items-center gap-2">
                  <Home className="h-4 w-4 text-primary" />
                  {t("batterySizing.location")}
                </h3>
                <CountryZoneSelector
                  country={country}
                  zone={zone}
                  onCountryChange={setCountry}
                  onZoneChange={setZone}
                  countryLabel={t("batterySizing.country")}
                  zoneLabel={t("batterySizing.priceZone")}
                />
              </div>

              {/* Consumption */}
              <div className="space-y-4">
                <h3 className="font-semibold flex items-center gap-2">
                  <Zap className="h-4 w-4 text-yellow-500" />
                  {t("batterySizing.consumption")}
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label>{t("batterySizing.annualConsumption")}</Label>
                    <span className="text-sm font-medium">{annualConsumption.toLocaleString()} kWh</span>
                  </div>
                  <Slider
                    value={[annualConsumption]}
                    onValueChange={(v) => setAnnualConsumption(v[0])}
                    min={5000}
                    max={50000}
                    step={1000}
                  />
                  <p className="text-xs text-muted-foreground">
                    {t("batterySizing.consumptionNote")}
                  </p>
                </div>
              </div>

              {/* Solar */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold flex items-center gap-2">
                    <Sun className="h-4 w-4 text-yellow-500" />
                    {t("batterySizing.solarSystem")}
                  </h3>
                  <Switch checked={hasSolar} onCheckedChange={setHasSolar} />
                </div>
                {hasSolar && (
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label>{t("batterySizing.solarSize")}</Label>
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
                      {t("batterySizing.estimatedProduction", {
                        production: Math.round(solarSize * countryData.solarYield).toLocaleString()
                      })}
                    </p>
                  </div>
                )}
              </div>

              {/* Primary Goal */}
              <div className="space-y-4">
                <h3 className="font-semibold flex items-center gap-2">
                  <Battery className="h-4 w-4 text-green-500" />
                  {t("batterySizing.primaryGoal")}
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {goalOptions.map((goal) => {
                    const Icon = goal.icon;
                    const isSelected = primaryGoal === goal.id;
                    return (
                      <button
                        key={goal.id}
                        type="button"
                        onClick={() => setPrimaryGoal(goal.id as PrimaryGoal)}
                        className={`p-4 rounded-lg border-2 text-left transition-all ${
                          isSelected
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/50"
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <Icon className={`h-4 w-4 ${isSelected ? "text-primary" : "text-muted-foreground"}`} />
                          <span className={`text-sm font-medium ${isSelected ? "text-primary" : ""}`}>
                            {goal.label}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Backup Options */}
              {(primaryGoal === "backup" || primaryGoal === "all") && (
                <div className="space-y-4 p-4 bg-muted/50 rounded-lg">
                  <h4 className="font-medium flex items-center gap-2">
                    <Shield className="h-4 w-4 text-blue-500" />
                    {t("batterySizing.backupSettings")}
                  </h4>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label>{t("batterySizing.backupHours")}</Label>
                        <span className="text-sm font-medium">{backupHours} {t("batterySizing.hours")}</span>
                      </div>
                      <Slider
                        value={[backupHours]}
                        onValueChange={(v) => setBackupHours(v[0])}
                        min={2}
                        max={24}
                        step={1}
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label>{t("batterySizing.averageLoad")}</Label>
                        <span className="text-sm font-medium">{averageLoad} kW</span>
                      </div>
                      <Slider
                        value={[averageLoad]}
                        onValueChange={(v) => setAverageLoad(v[0])}
                        min={1}
                        max={10}
                        step={0.5}
                      />
                      <p className="text-xs text-muted-foreground">
                        {t("batterySizing.loadNote")}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Info Note */}
              <Card className="bg-muted/50">
                <CardContent className="p-4 flex items-start gap-3">
                  <Info className="h-4 w-4 text-muted-foreground mt-0.5" />
                  <div className="text-sm text-muted-foreground">
                    <p>{t("batterySizing.infoNote")}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Calculate Button */}
              <Button className="w-full" size="lg" onClick={handleCalculate}>
                {t("batterySizing.calculate")}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>

            {/* Results */}
            {showResults && (
              <CalculatorResults title={emailSubmitted ? t("batterySizing.results.title") : t("batterySizing.emailGate.title")}>
                {!emailSubmitted ? (
                  /* Email Gate */
                  <div className="space-y-6">
                    <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
                      <CardContent className="p-6 text-center">
                        <div className="p-3 rounded-full bg-primary/10 w-fit mx-auto mb-4">
                          <Lock className="h-6 w-6 text-primary" />
                        </div>
                        <h3 className="font-semibold text-lg mb-2">{t("batterySizing.emailGate.ready")}</h3>
                        <p className="text-muted-foreground mb-4">
                          {t("batterySizing.emailGate.teaser", {
                            size: calculations.recommendedSize,
                          })}
                        </p>

                        <form onSubmit={handleEmailSubmit} className="space-y-4 max-w-sm mx-auto">
                          <div>
                            <Label htmlFor="gate-email" className="sr-only">{t("batterySizing.emailGate.email")}</Label>
                            <div className="relative">
                              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                              <Input
                                id="gate-email"
                                type="email"
                                placeholder={t("batterySizing.emailGate.emailPlaceholder")}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="pl-10"
                                required
                              />
                            </div>
                          </div>
                          <div>
                            <Label htmlFor="gate-name" className="sr-only">{t("batterySizing.emailGate.name")}</Label>
                            <Input
                              id="gate-name"
                              type="text"
                              placeholder={t("batterySizing.emailGate.namePlaceholder")}
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                            />
                          </div>
                          {emailError && (
                            <p className="text-sm text-destructive">{emailError}</p>
                          )}
                          <Button type="submit" className="w-full" size="lg" disabled={isSubmittingEmail || !email}>
                            {isSubmittingEmail ? (
                              <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                {t("batterySizing.emailGate.submitting")}
                              </>
                            ) : (
                              <>
                                {t("batterySizing.emailGate.getResults")}
                                <ArrowRight className="ml-2 h-4 w-4" />
                              </>
                            )}
                          </Button>
                          <p className="text-xs text-muted-foreground">
                            {t("batterySizing.emailGate.privacy")}
                          </p>
                        </form>
                      </CardContent>
                    </Card>
                  </div>
                ) : (
                  /* Full Results */
                  <>
                    {/* Main Recommendation */}
                    <div className="text-center mb-8 p-6 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/30 dark:to-green-900/20 rounded-xl border border-green-200 dark:border-green-800">
                      <p className="text-sm text-green-700 dark:text-green-300 mb-2">
                        {t("batterySizing.results.recommended")}
                      </p>
                      <div className="text-5xl font-bold text-green-600 dark:text-green-400 mb-2">
                        {calculations.recommendedSize} <span className="text-2xl">kWh</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {t("batterySizing.results.range", {
                          min: calculations.minViable,
                          max: calculations.maxPractical,
                        })}
                      </p>
                    </div>

                    {/* Results Cards */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                      <ResultCard
                        label={t("batterySizing.results.annualSavings")}
                        value={`${calculations.annualSavings.toLocaleString()} ${currencyInfo.symbol}`}
                        subtext={t("batterySizing.results.perYear")}
                        highlight
                      />
                      <ResultCard
                        label={t("batterySizing.results.payback")}
                        value={`${calculations.paybackYears}`}
                        subtext={t("batterySizing.results.years")}
                      />
                      <ResultCard
                        label={t("batterySizing.results.estimatedCost")}
                        value={`${calculations.batteryCost.toLocaleString()} ${currencyInfo.symbol}`}
                        subtext={t("batterySizing.results.installed")}
                      />
                      {hasSolar && (
                        <ResultCard
                          label={t("batterySizing.results.dailyExcess")}
                          value={`${calculations.dailyExcessSolar} kWh`}
                          subtext={t("batterySizing.results.storeable")}
                        />
                      )}
                    </div>

                    {/* Size Comparison */}
                    <div className="mb-8">
                      <h3 className="font-semibold mb-4">{t("batterySizing.results.sizeComparison")}</h3>
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b">
                              <th className="text-left py-2 pr-4">{t("batterySizing.results.batterySize")}</th>
                              <th className="text-right py-2 px-4">{t("batterySizing.results.annualSavingsShort")}</th>
                              <th className="text-right py-2 pl-4">{t("batterySizing.results.paybackYears")}</th>
                            </tr>
                          </thead>
                          <tbody>
                            {calculations.sizeComparison.map((row) => (
                              <tr
                                key={row.size}
                                className={`border-b ${
                                  row.size === calculations.recommendedSize
                                    ? "bg-primary/10 font-medium"
                                    : ""
                                }`}
                              >
                                <td className="py-2 pr-4">
                                  {row.size} kWh
                                  {row.size === calculations.recommendedSize && (
                                    <span className="ml-2 text-xs text-primary">
                                      {t("batterySizing.results.recommendedBadge")}
                                    </span>
                                  )}
                                </td>
                                <td className="text-right py-2 px-4">
                                  {row.savings.toLocaleString()} {currencyInfo.symbol}
                                </td>
                                <td className="text-right py-2 pl-4">
                                  {row.payback < 50 ? `${row.payback} ${t("batterySizing.results.yrs")}` : "-"}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* Goal-specific insights */}
                    <Card className="mb-8 bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800">
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <Info className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="font-medium text-blue-900 dark:text-blue-100">
                              {t(`batterySizing.results.insight.${primaryGoal}.title`)}
                            </p>
                            <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
                              {t(`batterySizing.results.insight.${primaryGoal}.description`)}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* CTA */}
                    <div className="p-6 bg-primary/10 rounded-lg text-center">
                      <h3 className="font-semibold mb-2">
                        {t("batterySizing.results.readyToStart")}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        {t("batterySizing.results.readyDescription")}
                      </p>
                      <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <Button asChild>
                          <a
                            href="https://store.sourceful.energy/products/sourceful-energy-zap"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {tCommon("buttons.getTheZap")} - €39
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </a>
                        </Button>
                        <Button variant="outline" asChild>
                          <Link href="/contact">{tCommon("buttons.contactSales")}</Link>
                        </Button>
                      </div>
                    </div>

                    {/* Disclaimer */}
                    <p className="text-xs text-muted-foreground text-center mt-6">
                      {t("batterySizing.results.disclaimer")}
                    </p>
                  </>
                )}
              </CalculatorResults>
            )}
          </CalculatorLayout>
        </section>
      </main>

      <MarketingFooter />
    </div>
  );
}
