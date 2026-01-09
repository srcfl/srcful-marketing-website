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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import {
  ArrowRight,
  Car,
  Sun,
  Loader2,
  Lock,
  Mail,
  Info,
  Zap,
  Clock,
  TrendingDown,
  Battery,
} from "lucide-react";

// Average electricity prices by zone (local currency per kWh)
const avgPrices: Record<string, { avg: number; peak: number; offPeak: number }> = {
  SE1: { avg: 1.2, peak: 1.8, offPeak: 0.6 },
  SE2: { avg: 1.3, peak: 1.9, offPeak: 0.7 },
  SE3: { avg: 1.5, peak: 2.2, offPeak: 0.8 },
  SE4: { avg: 1.6, peak: 2.4, offPeak: 0.9 },
  NO1: { avg: 1.4, peak: 2.0, offPeak: 0.8 },
  NO2: { avg: 1.5, peak: 2.1, offPeak: 0.9 },
  NO3: { avg: 1.2, peak: 1.7, offPeak: 0.7 },
  NO4: { avg: 1.0, peak: 1.5, offPeak: 0.5 },
  NO5: { avg: 1.4, peak: 2.0, offPeak: 0.8 },
  DK1: { avg: 2.5, peak: 3.5, offPeak: 1.5 },
  DK2: { avg: 2.6, peak: 3.6, offPeak: 1.6 },
  FI: { avg: 0.15, peak: 0.22, offPeak: 0.08 },
  DE: { avg: 0.35, peak: 0.45, offPeak: 0.25 },
};

// EV consumption presets (kWh/100km)
const evConsumptionPresets = [
  { id: "efficient", label: "Efficient (15 kWh/100km)", value: 15 },
  { id: "average", label: "Average (18 kWh/100km)", value: 18 },
  { id: "suv", label: "SUV/Large (22 kWh/100km)", value: 22 },
  { id: "performance", label: "Performance (25 kWh/100km)", value: 25 },
];

// Charger types with power (kW)
const chargerTypes = [
  { id: "3.7", power: 3.7 },
  { id: "7", power: 7 },
  { id: "11", power: 11 },
  { id: "22", power: 22 },
];

// Charging patterns
const chargingPatterns = ["random", "night", "optimized"] as const;
type ChargingPattern = typeof chargingPatterns[number];

// Charging locations
const chargingLocations = ["homeOnly", "homeWork", "publicMix"] as const;
type ChargingLocation = typeof chargingLocations[number];

// Cost factors for different locations
const locationCostFactors: Record<ChargingLocation, { homePct: number; publicPct: number; publicMultiplier: number }> = {
  homeOnly: { homePct: 1.0, publicPct: 0, publicMultiplier: 1 },
  homeWork: { homePct: 0.7, publicPct: 0.3, publicMultiplier: 1.2 }, // Work charging similar to home
  publicMix: { homePct: 0.5, publicPct: 0.5, publicMultiplier: 2.5 }, // Public charging ~2.5x more expensive
};

// Charging pattern efficiency (% of optimal)
const patternEfficiency: Record<ChargingPattern, number> = {
  random: 0.4, // Random = pay average/peak prices
  night: 0.7, // Night = mostly off-peak
  optimized: 0.95, // Smart = nearly optimal
};

export default function EVChargingCalculatorPage() {
  const t = useTranslations("tools");
  const tCommon = useTranslations("common");

  // Form state
  const [country, setCountry] = useState<CountryKey>("sweden");
  const [zone, setZone] = useState<ZoneCode>("SE3");
  const [annualDriving, setAnnualDriving] = useState(15000);
  const [evConsumption, setEvConsumption] = useState(18);
  const [chargingLocation, setChargingLocation] = useState<ChargingLocation>("homeOnly");
  const [hasSolar, setHasSolar] = useState(false);
  const [solarSize, setSolarSize] = useState(10);
  const [chargerPower, setChargerPower] = useState("11");
  const [currentPattern, setCurrentPattern] = useState<ChargingPattern>("random");

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

  // Calculate EV charging costs and savings
  const calculations = useMemo(() => {
    const prices = avgPrices[zone] || avgPrices.SE3;
    const locationFactor = locationCostFactors[chargingLocation];

    // Annual charging need (kWh)
    const annualChargingKwh = Math.round((annualDriving / 100) * evConsumption);

    // Home vs public split
    const homeChargingKwh = annualChargingKwh * locationFactor.homePct;
    const publicChargingKwh = annualChargingKwh * locationFactor.publicPct;

    // Calculate current cost based on pattern
    const patternEff = patternEfficiency[currentPattern];

    // Current home charging cost (weighted by pattern efficiency)
    const currentHomePrice = prices.offPeak + (prices.peak - prices.offPeak) * (1 - patternEff);
    const currentHomeCost = homeChargingKwh * currentHomePrice;

    // Public charging cost (fixed high rate)
    const publicCost = publicChargingKwh * prices.avg * locationFactor.publicMultiplier;

    const currentTotalCost = Math.round(currentHomeCost + publicCost);

    // Smart charging cost (optimized to lowest prices)
    const smartHomePrice = prices.offPeak + (prices.peak - prices.offPeak) * 0.1; // 90% optimal
    const smartHomeCost = homeChargingKwh * smartHomePrice;
    const smartTotalCost = Math.round(smartHomeCost + publicCost); // Can't optimize public

    // Base savings from smart charging
    const baseSavings = Math.max(0, currentTotalCost - smartTotalCost);

    // Solar bonus: charging from excess solar (essentially free)
    let solarBonus = 0;
    let solarChargingKwh = 0;
    if (hasSolar) {
      // Estimate daily excess solar that could go to EV
      const annualSolarProduction = solarSize * countryData.solarYield;
      const dailyExcess = (annualSolarProduction * 0.4) / 365; // 40% excess during day

      // How much of daily driving can be covered by midday charging?
      const dailyChargingNeed = annualChargingKwh / 365;
      const chargerKw = parseFloat(chargerPower);
      const maxMiddayCharge = chargerKw * 4; // ~4 hours of midday charging window

      solarChargingKwh = Math.min(dailyExcess, dailyChargingNeed * 0.3, maxMiddayCharge) * 365;
      solarBonus = Math.round(solarChargingKwh * prices.avg); // Avoided cost
    }

    const totalSavings = baseSavings + solarBonus;

    // CO2 avoided (smart charging uses more off-peak = more renewables)
    const co2PerKwh = 0.1; // kg CO2/kWh for smart vs dumb charging difference
    const co2Avoided = Math.round(annualChargingKwh * co2PerKwh);

    // Time to charge (for context)
    const chargerKw = parseFloat(chargerPower);
    const avgChargeTime = Math.round((annualChargingKwh / 365) / chargerKw * 10) / 10; // hours/day

    // Savings percentage
    const savingsPercent = currentTotalCost > 0 ? Math.round((totalSavings / currentTotalCost) * 100) : 0;

    return {
      annualChargingKwh,
      currentTotalCost,
      smartTotalCost,
      baseSavings,
      solarBonus,
      solarChargingKwh: Math.round(solarChargingKwh),
      totalSavings,
      savingsPercent,
      co2Avoided,
      avgChargeTime,
      prices,
    };
  }, [annualDriving, evConsumption, chargingLocation, hasSolar, solarSize, chargerPower, currentPattern, zone, countryData.solarYield]);

  const handleCalculate = () => {
    setShowResults(true);
  };

  // Handle email submission
  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError(t("evCharging.invalidEmail"));
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
          _source: "ev-charging-calculator",
          zone,
          country,
          annualDriving,
          evConsumption,
          chargingLocation,
          hasSolar,
          solarSize: hasSolar ? solarSize : 0,
          chargerPower,
          currentPattern,
          annualChargingKwh: calculations.annualChargingKwh,
          currentCost: calculations.currentTotalCost,
          smartCost: calculations.smartTotalCost,
          totalSavings: calculations.totalSavings,
          solarBonus: calculations.solarBonus,
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

  return (
    <div className="flex min-h-screen flex-col">
      <MarketingNav />

      <main className="flex-1 pt-16">
        <section className="py-16 md:py-24 px-4 md:px-8">
          <CalculatorLayout
            title={t("evCharging.title")}
            description={t("evCharging.description")}
            badge={t("evCharging.badge")}
          >
            <div className="space-y-8">
              {/* Location */}
              <div className="space-y-4">
                <h3 className="font-semibold flex items-center gap-2">
                  <Zap className="h-4 w-4 text-primary" />
                  {t("evCharging.location")}
                </h3>
                <CountryZoneSelector
                  country={country}
                  zone={zone}
                  onCountryChange={setCountry}
                  onZoneChange={setZone}
                  countryLabel={t("evCharging.country")}
                  zoneLabel={t("evCharging.priceZone")}
                />
              </div>

              {/* Driving & EV */}
              <div className="space-y-4">
                <h3 className="font-semibold flex items-center gap-2">
                  <Car className="h-4 w-4 text-blue-500" />
                  {t("evCharging.drivingHabits")}
                </h3>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label>{t("evCharging.annualDriving")}</Label>
                    <span className="text-sm font-medium">{annualDriving.toLocaleString()} km</span>
                  </div>
                  <Slider
                    value={[annualDriving]}
                    onValueChange={(v) => setAnnualDriving(v[0])}
                    min={5000}
                    max={50000}
                    step={1000}
                  />
                  <p className="text-xs text-muted-foreground">
                    {t("evCharging.annualDrivingNote")}
                  </p>
                </div>

                <div className="space-y-2">
                  <Label>{t("evCharging.evConsumption")}</Label>
                  <Select value={evConsumption.toString()} onValueChange={(v) => setEvConsumption(parseInt(v))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {evConsumptionPresets.map((preset) => (
                        <SelectItem key={preset.id} value={preset.value.toString()}>
                          {t(`evCharging.consumptionPresets.${preset.id}`)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Charging Setup */}
              <div className="space-y-4">
                <h3 className="font-semibold flex items-center gap-2">
                  <Battery className="h-4 w-4 text-green-500" />
                  {t("evCharging.chargingSetup")}
                </h3>

                <div className="space-y-2">
                  <Label>{t("evCharging.chargingLocation")}</Label>
                  <Select value={chargingLocation} onValueChange={(v) => setChargingLocation(v as ChargingLocation)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {chargingLocations.map((loc) => (
                        <SelectItem key={loc} value={loc}>
                          {t(`evCharging.locations.${loc}`)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>{t("evCharging.chargerType")}</Label>
                  <Select value={chargerPower} onValueChange={setChargerPower}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {chargerTypes.map((charger) => (
                        <SelectItem key={charger.id} value={charger.id}>
                          {charger.power} kW
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>{t("evCharging.currentPattern")}</Label>
                  <Select value={currentPattern} onValueChange={(v) => setCurrentPattern(v as ChargingPattern)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {chargingPatterns.map((pattern) => (
                        <SelectItem key={pattern} value={pattern}>
                          {t(`evCharging.patterns.${pattern}`)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">
                    {t("evCharging.patternNote")}
                  </p>
                </div>
              </div>

              {/* Solar Option */}
              <div className="space-y-4">
                <h3 className="font-semibold flex items-center gap-2">
                  <Sun className="h-4 w-4 text-yellow-500" />
                  {t("evCharging.solarIntegration")}
                </h3>

                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div>
                    <p className="font-medium">{t("evCharging.hasSolar")}</p>
                    <p className="text-xs text-muted-foreground">{t("evCharging.solarNote")}</p>
                  </div>
                  <Switch checked={hasSolar} onCheckedChange={setHasSolar} />
                </div>

                {hasSolar && (
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label>{t("evCharging.solarSize")}</Label>
                      <span className="text-sm font-medium">{solarSize} kWp</span>
                    </div>
                    <Slider
                      value={[solarSize]}
                      onValueChange={(v) => setSolarSize(v[0])}
                      min={3}
                      max={30}
                      step={1}
                    />
                  </div>
                )}
              </div>

              {/* Info Note */}
              <Card className="bg-muted/50">
                <CardContent className="p-4 flex items-start gap-3">
                  <Info className="h-4 w-4 text-muted-foreground mt-0.5" />
                  <div className="text-sm text-muted-foreground">
                    <p>{t("evCharging.infoNote")}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Calculate Button */}
              <Button className="w-full" size="lg" onClick={handleCalculate}>
                {t("evCharging.calculate")}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>

            {/* Results */}
            {showResults && (
              <CalculatorResults title={emailSubmitted ? t("evCharging.results.title") : t("evCharging.emailGate.title")}>
                {!emailSubmitted ? (
                  /* Email Gate */
                  <div className="space-y-6">
                    <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
                      <CardContent className="p-6 text-center">
                        <div className="p-3 rounded-full bg-primary/10 w-fit mx-auto mb-4">
                          <Lock className="h-6 w-6 text-primary" />
                        </div>
                        <h3 className="font-semibold text-lg mb-2">{t("evCharging.emailGate.ready")}</h3>
                        <p className="text-muted-foreground mb-4">
                          {t("evCharging.emailGate.teaser", {
                            savings: calculations.totalSavings.toLocaleString(),
                            currency: currencyInfo.symbol,
                          })}
                        </p>

                        <form onSubmit={handleEmailSubmit} className="space-y-4 max-w-sm mx-auto">
                          <div>
                            <Label htmlFor="gate-email" className="sr-only">{t("evCharging.emailGate.email")}</Label>
                            <div className="relative">
                              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                              <Input
                                id="gate-email"
                                type="email"
                                placeholder={t("evCharging.emailGate.emailPlaceholder")}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="pl-10"
                                required
                              />
                            </div>
                          </div>
                          <div>
                            <Label htmlFor="gate-name" className="sr-only">{t("evCharging.emailGate.name")}</Label>
                            <Input
                              id="gate-name"
                              type="text"
                              placeholder={t("evCharging.emailGate.namePlaceholder")}
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
                                {t("evCharging.emailGate.submitting")}
                              </>
                            ) : (
                              <>
                                {t("evCharging.emailGate.getResults")}
                                <ArrowRight className="ml-2 h-4 w-4" />
                              </>
                            )}
                          </Button>
                          <p className="text-xs text-muted-foreground">
                            {t("evCharging.emailGate.privacy")}
                          </p>
                        </form>
                      </CardContent>
                    </Card>
                  </div>
                ) : (
                  /* Full Results */
                  <>
                    {/* Summary Cards */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                      <ResultCard
                        label={t("evCharging.results.annualCharging")}
                        value={`${calculations.annualChargingKwh.toLocaleString()} kWh`}
                        subtext={t("evCharging.results.energyNeeded")}
                      />
                      <ResultCard
                        label={t("evCharging.results.currentCost")}
                        value={`${calculations.currentTotalCost.toLocaleString()} ${currencyInfo.symbol}`}
                        subtext={t("evCharging.results.yourPattern")}
                      />
                      <ResultCard
                        label={t("evCharging.results.smartCost")}
                        value={`${calculations.smartTotalCost.toLocaleString()} ${currencyInfo.symbol}`}
                        subtext={t("evCharging.results.withSourceful")}
                      />
                      <ResultCard
                        label={t("evCharging.results.totalSavings")}
                        value={`${calculations.totalSavings.toLocaleString()} ${currencyInfo.symbol}`}
                        subtext={`${calculations.savingsPercent}% ${t("evCharging.results.less")}`}
                        highlight
                      />
                    </div>

                    {/* Savings Breakdown */}
                    <Card className="mb-8">
                      <CardContent className="p-6">
                        <h3 className="font-semibold mb-4">{t("evCharging.results.breakdown")}</h3>
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4 text-blue-500" />
                              <span>{t("evCharging.results.smartChargingSavings")}</span>
                            </div>
                            <span className="font-medium text-green-600">
                              +{calculations.baseSavings.toLocaleString()} {currencyInfo.symbol}
                            </span>
                          </div>
                          {hasSolar && calculations.solarBonus > 0 && (
                            <div className="flex justify-between items-center">
                              <div className="flex items-center gap-2">
                                <Sun className="h-4 w-4 text-yellow-500" />
                                <span>{t("evCharging.results.solarBonus")}</span>
                              </div>
                              <span className="font-medium text-green-600">
                                +{calculations.solarBonus.toLocaleString()} {currencyInfo.symbol}
                              </span>
                            </div>
                          )}
                          <div className="border-t pt-3 flex justify-between items-center font-semibold">
                            <span>{t("evCharging.results.totalAnnual")}</span>
                            <span className="text-green-600">
                              {calculations.totalSavings.toLocaleString()} {currencyInfo.symbol}
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* How Smart Charging Works */}
                    <Card className="mb-8 bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800">
                      <CardContent className="p-4">
                        <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-3">
                          {t("evCharging.results.howItWorks")}
                        </h4>
                        <div className="grid md:grid-cols-3 gap-4 text-sm">
                          <div className="flex items-start gap-2">
                            <div className="w-6 h-6 rounded-full bg-blue-200 dark:bg-blue-800 flex items-center justify-center text-xs font-bold text-blue-800 dark:text-blue-200">1</div>
                            <div>
                              <p className="font-medium text-blue-900 dark:text-blue-100">{t("evCharging.results.step1")}</p>
                              <p className="text-blue-700 dark:text-blue-300">{t("evCharging.results.step1Desc")}</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-2">
                            <div className="w-6 h-6 rounded-full bg-blue-200 dark:bg-blue-800 flex items-center justify-center text-xs font-bold text-blue-800 dark:text-blue-200">2</div>
                            <div>
                              <p className="font-medium text-blue-900 dark:text-blue-100">{t("evCharging.results.step2")}</p>
                              <p className="text-blue-700 dark:text-blue-300">{t("evCharging.results.step2Desc")}</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-2">
                            <div className="w-6 h-6 rounded-full bg-blue-200 dark:bg-blue-800 flex items-center justify-center text-xs font-bold text-blue-800 dark:text-blue-200">3</div>
                            <div>
                              <p className="font-medium text-blue-900 dark:text-blue-100">{t("evCharging.results.step3")}</p>
                              <p className="text-blue-700 dark:text-blue-300">{t("evCharging.results.step3Desc")}</p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Environmental Impact */}
                    <Card className="mb-8 bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-800">
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <TrendingDown className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="font-medium text-green-900 dark:text-green-100">
                              {t("evCharging.results.environmental")}
                            </p>
                            <p className="text-sm text-green-700 dark:text-green-300 mt-1">
                              {t("evCharging.results.environmentalDesc", {
                                co2: calculations.co2Avoided,
                              })}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Solar upsell if not selected */}
                    {!hasSolar && (
                      <Card className="mb-8 bg-yellow-50 dark:bg-yellow-950/30 border-yellow-200 dark:border-yellow-800">
                        <CardContent className="p-4">
                          <div className="flex items-start gap-3">
                            <Sun className="h-5 w-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
                            <div>
                              <p className="font-medium text-yellow-900 dark:text-yellow-100">
                                {t("evCharging.results.solarTip")}
                              </p>
                              <p className="text-sm text-yellow-700 dark:text-yellow-300 mt-1">
                                {t("evCharging.results.solarTipDesc")}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )}

                    {/* CTA */}
                    <div className="p-6 bg-primary/10 rounded-lg text-center">
                      <h3 className="font-semibold mb-2">
                        {t("evCharging.results.readyToStart")}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        {t("evCharging.results.readyDescription")}
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
                      {t("evCharging.results.disclaimer")}
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
