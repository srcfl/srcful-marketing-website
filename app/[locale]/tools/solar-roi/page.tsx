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
  Home,
  Compass,
  TrendingUp,
  Check,
} from "lucide-react";

// Roof orientation factors (relative to south = 100%)
const orientationFactors: Record<string, number> = {
  south: 1.0,
  "south-east": 0.95,
  "south-west": 0.95,
  east: 0.85,
  west: 0.85,
  "east-west": 0.90,
  flat: 0.95,
};

// Shading impact factors
const shadingFactors: Record<string, number> = {
  none: 1.0,
  light: 0.9,
  moderate: 0.75,
  heavy: 0.5,
};

// Tilt optimization (optimal around 30-40° for Nordic)
const getTiltFactor = (tilt: number): number => {
  if (tilt >= 25 && tilt <= 45) return 1.0;
  if (tilt >= 15 && tilt < 25) return 0.95;
  if (tilt > 45 && tilt <= 55) return 0.95;
  if (tilt >= 5 && tilt < 15) return 0.88;
  if (tilt > 55 && tilt <= 65) return 0.88;
  return 0.8;
};

// Average retail electricity prices by zone (local currency per kWh)
const avgRetailPrices: Record<string, number> = {
  SE1: 1.2, SE2: 1.3, SE3: 1.5, SE4: 1.6,
  NO1: 1.4, NO2: 1.5, NO3: 1.2, NO4: 1.0, NO5: 1.4,
  DK1: 2.5, DK2: 2.6,
  FI: 0.15,
  DE: 0.35,
};

// Export price as percentage of retail
const EXPORT_PRICE_RATIO = 0.5;

// Installation cost per kWp (average)
const INSTALL_COST_PER_KWP = 15000; // SEK equivalent

// Panel efficiency (m² to kWp)
const PANEL_EFFICIENCY = 0.20; // 200W per m²

// Self-consumption rates
const SELF_CONSUMPTION_BASE = 0.35; // Without optimization
const SELF_CONSUMPTION_SOURCEFUL = 0.55; // With Sourceful
const SELF_CONSUMPTION_BATTERY = 0.80; // With Sourceful + Battery

// Battery cost per kWh
const BATTERY_COST_PER_KWH = 6000;

// Typical battery size for solar
const TYPICAL_BATTERY_SIZE = 10; // kWh

export default function SolarROICalculatorPage() {
  const t = useTranslations("tools");
  const tCommon = useTranslations("common");

  // Form state
  const [country, setCountry] = useState<CountryKey>("sweden");
  const [zone, setZone] = useState<ZoneCode>("SE3");
  const [roofArea, setRoofArea] = useState(50);
  const [orientation, setOrientation] = useState("south");
  const [tilt, setTilt] = useState(30);
  const [shading, setShading] = useState("none");
  const [annualConsumption, setAnnualConsumption] = useState(15000);
  const [currentBill, setCurrentBill] = useState(25000);
  const [customQuote, setCustomQuote] = useState<number | null>(null);
  const [addBattery, setAddBattery] = useState(false);
  const [addSourceful, setAddSourceful] = useState(true);

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

  // Calculate solar ROI
  const calculations = useMemo(() => {
    // Calculate installable capacity
    const rawCapacity = roofArea * PANEL_EFFICIENCY;
    const orientationFactor = orientationFactors[orientation] || 1.0;
    const shadingFactor = shadingFactors[shading] || 1.0;
    const tiltFactor = getTiltFactor(tilt);

    // Effective system size
    const systemSize = Math.round(rawCapacity * 10) / 10;

    // Annual production with all factors
    const baseProduction = systemSize * countryData.solarYield;
    const annualProduction = Math.round(baseProduction * orientationFactor * shadingFactor * tiltFactor);

    // Get prices
    const retailPrice = avgRetailPrices[zone] || 1.5;
    const exportPrice = retailPrice * EXPORT_PRICE_RATIO;

    // Calculate for each scenario
    const scenarios = [
      { id: "base", selfConsumption: SELF_CONSUMPTION_BASE },
      { id: "sourceful", selfConsumption: SELF_CONSUMPTION_SOURCEFUL },
      { id: "battery", selfConsumption: SELF_CONSUMPTION_BATTERY },
    ].map((scenario) => {
      const selfConsumedKwh = Math.min(annualProduction * scenario.selfConsumption, annualConsumption);
      const exportedKwh = annualProduction - selfConsumedKwh;

      const selfConsumptionSavings = selfConsumedKwh * retailPrice;
      const exportRevenue = exportedKwh * exportPrice;
      const annualSavings = Math.round(selfConsumptionSavings + exportRevenue);

      // Installation cost
      let installCost = customQuote || (systemSize * INSTALL_COST_PER_KWP);
      if (scenario.id === "battery") {
        installCost += TYPICAL_BATTERY_SIZE * BATTERY_COST_PER_KWH;
      }

      // Payback
      const paybackYears = annualSavings > 0 ? installCost / annualSavings : 99;

      // 25-year NPV (simplified, no discount rate)
      const totalSavings25yr = annualSavings * 25;

      return {
        id: scenario.id,
        selfConsumptionRate: Math.round(scenario.selfConsumption * 100),
        selfConsumedKwh: Math.round(selfConsumedKwh),
        exportedKwh: Math.round(exportedKwh),
        annualSavings,
        installCost: Math.round(installCost),
        paybackYears: Math.round(paybackYears * 10) / 10,
        totalSavings25yr: Math.round(totalSavings25yr),
      };
    });

    // Determine which scenario the user selected
    let selectedScenario = scenarios[0]; // base
    if (addSourceful && addBattery) {
      selectedScenario = scenarios[2]; // battery
    } else if (addSourceful) {
      selectedScenario = scenarios[1]; // sourceful
    }

    // CO2 savings (avg 0.2 kg CO2/kWh for Nordic grid)
    const co2Savings = Math.round(annualProduction * 0.2);

    return {
      systemSize,
      annualProduction,
      scenarios,
      selectedScenario,
      co2Savings,
      retailPrice,
      installCostPerKwp: INSTALL_COST_PER_KWP,
    };
  }, [roofArea, orientation, tilt, shading, annualConsumption, zone, countryData.solarYield, customQuote, addBattery, addSourceful]);

  const handleCalculate = () => {
    setShowResults(true);
  };

  // Handle email submission
  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError(t("solarRoi.invalidEmail"));
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
          _source: "solar-roi-calculator",
          zone,
          country,
          roofArea,
          orientation,
          tilt,
          shading,
          annualConsumption,
          currentBill,
          customQuote,
          addBattery,
          addSourceful,
          systemSize: calculations.systemSize,
          annualProduction: calculations.annualProduction,
          annualSavings: calculations.selectedScenario.annualSavings,
          paybackYears: calculations.selectedScenario.paybackYears,
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
            title={t("solarRoi.title")}
            description={t("solarRoi.description")}
            badge={t("solarRoi.badge")}
          >
            <div className="space-y-8">
              {/* Location */}
              <div className="space-y-4">
                <h3 className="font-semibold flex items-center gap-2">
                  <Home className="h-4 w-4 text-primary" />
                  {t("solarRoi.location")}
                </h3>
                <CountryZoneSelector
                  country={country}
                  zone={zone}
                  onCountryChange={setCountry}
                  onZoneChange={setZone}
                  countryLabel={t("solarRoi.country")}
                  zoneLabel={t("solarRoi.priceZone")}
                />
              </div>

              {/* Roof Configuration */}
              <div className="space-y-4">
                <h3 className="font-semibold flex items-center gap-2">
                  <Compass className="h-4 w-4 text-orange-500" />
                  {t("solarRoi.roofConfig")}
                </h3>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label>{t("solarRoi.roofArea")}</Label>
                    <span className="text-sm font-medium">{roofArea} m²</span>
                  </div>
                  <Slider
                    value={[roofArea]}
                    onValueChange={(v) => setRoofArea(v[0])}
                    min={20}
                    max={200}
                    step={5}
                  />
                  <p className="text-xs text-muted-foreground">
                    {t("solarRoi.roofAreaNote", { capacity: Math.round(roofArea * PANEL_EFFICIENCY * 10) / 10 })}
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>{t("solarRoi.orientation")}</Label>
                    <Select value={orientation} onValueChange={setOrientation}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="south">{t("solarRoi.orientations.south")}</SelectItem>
                        <SelectItem value="south-east">{t("solarRoi.orientations.southEast")}</SelectItem>
                        <SelectItem value="south-west">{t("solarRoi.orientations.southWest")}</SelectItem>
                        <SelectItem value="east">{t("solarRoi.orientations.east")}</SelectItem>
                        <SelectItem value="west">{t("solarRoi.orientations.west")}</SelectItem>
                        <SelectItem value="east-west">{t("solarRoi.orientations.eastWest")}</SelectItem>
                        <SelectItem value="flat">{t("solarRoi.orientations.flat")}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>{t("solarRoi.shading")}</Label>
                    <Select value={shading} onValueChange={setShading}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">{t("solarRoi.shadingLevels.none")}</SelectItem>
                        <SelectItem value="light">{t("solarRoi.shadingLevels.light")}</SelectItem>
                        <SelectItem value="moderate">{t("solarRoi.shadingLevels.moderate")}</SelectItem>
                        <SelectItem value="heavy">{t("solarRoi.shadingLevels.heavy")}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label>{t("solarRoi.tilt")}</Label>
                    <span className="text-sm font-medium">{tilt}°</span>
                  </div>
                  <Slider
                    value={[tilt]}
                    onValueChange={(v) => setTilt(v[0])}
                    min={0}
                    max={60}
                    step={5}
                  />
                  <p className="text-xs text-muted-foreground">
                    {t("solarRoi.tiltNote")}
                  </p>
                </div>
              </div>

              {/* Consumption */}
              <div className="space-y-4">
                <h3 className="font-semibold flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-blue-500" />
                  {t("solarRoi.consumption")}
                </h3>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label>{t("solarRoi.annualConsumption")}</Label>
                    <span className="text-sm font-medium">{annualConsumption.toLocaleString()} kWh</span>
                  </div>
                  <Slider
                    value={[annualConsumption]}
                    onValueChange={(v) => setAnnualConsumption(v[0])}
                    min={5000}
                    max={50000}
                    step={1000}
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label>{t("solarRoi.currentBill")}</Label>
                    <span className="text-sm font-medium">{currentBill.toLocaleString()} {currencyInfo.symbol}</span>
                  </div>
                  <Slider
                    value={[currentBill]}
                    onValueChange={(v) => setCurrentBill(v[0])}
                    min={10000}
                    max={100000}
                    step={1000}
                  />
                </div>
              </div>

              {/* Options */}
              <div className="space-y-4">
                <h3 className="font-semibold flex items-center gap-2">
                  <Sun className="h-4 w-4 text-yellow-500" />
                  {t("solarRoi.options")}
                </h3>

                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div>
                      <p className="font-medium">{t("solarRoi.addSourceful")}</p>
                      <p className="text-xs text-muted-foreground">{t("solarRoi.sourcefulNote")}</p>
                    </div>
                    <Switch checked={addSourceful} onCheckedChange={setAddSourceful} />
                  </div>

                  <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div>
                      <p className="font-medium">{t("solarRoi.addBattery")}</p>
                      <p className="text-xs text-muted-foreground">{t("solarRoi.batteryNote")}</p>
                    </div>
                    <Switch checked={addBattery} onCheckedChange={setAddBattery} />
                  </div>
                </div>

                {/* Optional custom quote */}
                <div className="space-y-2">
                  <Label>{t("solarRoi.customQuote")}</Label>
                  <Input
                    type="number"
                    placeholder={t("solarRoi.customQuotePlaceholder", {
                      estimate: Math.round(calculations.systemSize * INSTALL_COST_PER_KWP).toLocaleString()
                    })}
                    value={customQuote || ""}
                    onChange={(e) => setCustomQuote(e.target.value ? Number(e.target.value) : null)}
                  />
                  <p className="text-xs text-muted-foreground">
                    {t("solarRoi.customQuoteNote")}
                  </p>
                </div>
              </div>

              {/* Info Note */}
              <Card className="bg-muted/50">
                <CardContent className="p-4 flex items-start gap-3">
                  <Info className="h-4 w-4 text-muted-foreground mt-0.5" />
                  <div className="text-sm text-muted-foreground">
                    <p>{t("solarRoi.infoNote")}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Calculate Button */}
              <Button className="w-full" size="lg" onClick={handleCalculate}>
                {t("solarRoi.calculate")}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>

            {/* Results */}
            {showResults && (
              <CalculatorResults title={emailSubmitted ? t("solarRoi.results.title") : t("solarRoi.emailGate.title")}>
                {!emailSubmitted ? (
                  /* Email Gate */
                  <div className="space-y-6">
                    <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
                      <CardContent className="p-6 text-center">
                        <div className="p-3 rounded-full bg-primary/10 w-fit mx-auto mb-4">
                          <Lock className="h-6 w-6 text-primary" />
                        </div>
                        <h3 className="font-semibold text-lg mb-2">{t("solarRoi.emailGate.ready")}</h3>
                        <p className="text-muted-foreground mb-4">
                          {t("solarRoi.emailGate.teaser", {
                            size: calculations.systemSize,
                            payback: calculations.selectedScenario.paybackYears,
                          })}
                        </p>

                        <form onSubmit={handleEmailSubmit} className="space-y-4 max-w-sm mx-auto">
                          <div>
                            <Label htmlFor="gate-email" className="sr-only">{t("solarRoi.emailGate.email")}</Label>
                            <div className="relative">
                              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                              <Input
                                id="gate-email"
                                type="email"
                                placeholder={t("solarRoi.emailGate.emailPlaceholder")}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="pl-10"
                                required
                              />
                            </div>
                          </div>
                          <div>
                            <Label htmlFor="gate-name" className="sr-only">{t("solarRoi.emailGate.name")}</Label>
                            <Input
                              id="gate-name"
                              type="text"
                              placeholder={t("solarRoi.emailGate.namePlaceholder")}
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
                                {t("solarRoi.emailGate.submitting")}
                              </>
                            ) : (
                              <>
                                {t("solarRoi.emailGate.getResults")}
                                <ArrowRight className="ml-2 h-4 w-4" />
                              </>
                            )}
                          </Button>
                          <p className="text-xs text-muted-foreground">
                            {t("solarRoi.emailGate.privacy")}
                          </p>
                        </form>
                      </CardContent>
                    </Card>
                  </div>
                ) : (
                  /* Full Results */
                  <>
                    {/* System Summary */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                      <ResultCard
                        label={t("solarRoi.results.systemSize")}
                        value={`${calculations.systemSize} kWp`}
                        subtext={t("solarRoi.results.installable")}
                      />
                      <ResultCard
                        label={t("solarRoi.results.annualProduction")}
                        value={`${calculations.annualProduction.toLocaleString()} kWh`}
                        subtext={t("solarRoi.results.expected")}
                      />
                      <ResultCard
                        label={t("solarRoi.results.annualSavings")}
                        value={`${calculations.selectedScenario.annualSavings.toLocaleString()} ${currencyInfo.symbol}`}
                        subtext={t("solarRoi.results.firstYear")}
                        highlight
                      />
                      <ResultCard
                        label={t("solarRoi.results.payback")}
                        value={`${calculations.selectedScenario.paybackYears}`}
                        subtext={t("solarRoi.results.years")}
                      />
                    </div>

                    {/* Comparison Table */}
                    <div className="mb-8">
                      <h3 className="font-semibold mb-4">{t("solarRoi.results.comparison")}</h3>
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b">
                              <th className="text-left py-2 pr-4">{t("solarRoi.results.scenario")}</th>
                              <th className="text-right py-2 px-2">{t("solarRoi.results.selfConsumption")}</th>
                              <th className="text-right py-2 px-2">{t("solarRoi.results.savings")}</th>
                              <th className="text-right py-2 px-2">{t("solarRoi.results.cost")}</th>
                              <th className="text-right py-2 pl-2">{t("solarRoi.results.paybackYears")}</th>
                            </tr>
                          </thead>
                          <tbody>
                            {calculations.scenarios.map((scenario) => {
                              const isSelected = scenario.id === calculations.selectedScenario.id;
                              return (
                                <tr
                                  key={scenario.id}
                                  className={`border-b ${isSelected ? "bg-primary/10 font-medium" : ""}`}
                                >
                                  <td className="py-3 pr-4">
                                    <div className="flex items-center gap-2">
                                      {isSelected && <Check className="h-4 w-4 text-primary" />}
                                      {t(`solarRoi.results.scenarios.${scenario.id}`)}
                                    </div>
                                  </td>
                                  <td className="text-right py-3 px-2">{scenario.selfConsumptionRate}%</td>
                                  <td className="text-right py-3 px-2">
                                    {scenario.annualSavings.toLocaleString()} {currencyInfo.symbol}
                                  </td>
                                  <td className="text-right py-3 px-2">
                                    {scenario.installCost.toLocaleString()} {currencyInfo.symbol}
                                  </td>
                                  <td className="text-right py-3 pl-2">
                                    {scenario.paybackYears < 50 ? `${scenario.paybackYears} ${t("solarRoi.results.yrs")}` : "-"}
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* 25-Year Summary */}
                    <Card className="mb-8 bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-800">
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <TrendingUp className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="font-medium text-green-900 dark:text-green-100">
                              {t("solarRoi.results.longTerm")}
                            </p>
                            <p className="text-sm text-green-700 dark:text-green-300 mt-1">
                              {t("solarRoi.results.longTermDesc", {
                                savings: calculations.selectedScenario.totalSavings25yr.toLocaleString(),
                                currency: currencyInfo.symbol,
                                co2: calculations.co2Savings,
                              })}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Sourceful benefit highlight */}
                    {!addSourceful && (
                      <Card className="mb-8 bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800">
                        <CardContent className="p-4">
                          <div className="flex items-start gap-3">
                            <Info className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                            <div>
                              <p className="font-medium text-blue-900 dark:text-blue-100">
                                {t("solarRoi.results.sourcefulTip")}
                              </p>
                              <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
                                {t("solarRoi.results.sourcefulTipDesc", {
                                  extra: (calculations.scenarios[1].annualSavings - calculations.scenarios[0].annualSavings).toLocaleString(),
                                  currency: currencyInfo.symbol,
                                })}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )}

                    {/* CTA */}
                    <div className="p-6 bg-primary/10 rounded-lg text-center">
                      <h3 className="font-semibold mb-2">
                        {t("solarRoi.results.readyToStart")}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        {t("solarRoi.results.readyDescription")}
                      </p>
                      <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <Button asChild>
                          <a
                            href="https://store.sourceful.energy/products/sourceful-energy-zap"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {tCommon("buttons.getTheZap")} - €69
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
                      {t("solarRoi.results.disclaimer")}
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
