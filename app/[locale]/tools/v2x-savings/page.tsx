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
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  ArrowRight,
  Sun,
  Car,
  Zap,
  Battery,
  Loader2,
  Lock,
  Mail,
  Info,
  Check,
  ChevronsUpDown,
} from "lucide-react";
import { cn } from "@/lib/utils";

// V2X capable EV models with their battery capacities
const evModels = [
  // Audi
  { id: "audi-e-tron", name: "Audi e-tron", capacity: 95, brand: "Audi" },
  { id: "audi-e-tron-gt", name: "Audi e-tron GT", capacity: 93, brand: "Audi" },
  { id: "audi-q4-e-tron", name: "Audi Q4 e-tron", capacity: 82, brand: "Audi" },
  { id: "audi-q8-e-tron", name: "Audi Q8 e-tron", capacity: 114, brand: "Audi" },
  { id: "audi-rs-e-tron-gt", name: "Audi RS e-tron GT", capacity: 93, brand: "Audi" },
  // BMW
  { id: "bmw-i4", name: "BMW i4", capacity: 84, brand: "BMW" },
  { id: "bmw-i7", name: "BMW i7", capacity: 102, brand: "BMW" },
  { id: "bmw-ix", name: "BMW iX", capacity: 111, brand: "BMW" },
  { id: "bmw-ix1", name: "BMW iX1", capacity: 65, brand: "BMW" },
  { id: "bmw-ix3", name: "BMW iX3", capacity: 80, brand: "BMW" },
  // Cadillac
  { id: "cadillac-celestiq", name: "Cadillac Celestiq", capacity: 111, brand: "Cadillac" },
  { id: "cadillac-lyriq", name: "Cadillac Lyriq", capacity: 102, brand: "Cadillac" },
  // Chevrolet
  { id: "chevrolet-blazer-ev", name: "Chevrolet Blazer EV", capacity: 102, brand: "Chevrolet" },
  { id: "chevrolet-bolt-euv", name: "Chevrolet Bolt EUV", capacity: 65, brand: "Chevrolet" },
  { id: "chevrolet-bolt-ev", name: "Chevrolet Bolt EV", capacity: 65, brand: "Chevrolet" },
  { id: "chevrolet-equinox-ev", name: "Chevrolet Equinox EV", capacity: 85, brand: "Chevrolet" },
  // Ford
  { id: "ford-e-transit", name: "Ford E-Transit", capacity: 89, brand: "Ford" },
  { id: "ford-e-transit-custom", name: "Ford E-Transit Custom", capacity: 74, brand: "Ford" },
  { id: "ford-f150-lightning", name: "Ford F-150 Lightning", capacity: 131, brand: "Ford" },
  { id: "ford-mustang-mach-e", name: "Ford Mustang Mach-E", capacity: 91, brand: "Ford" },
  { id: "ford-explorer-ev", name: "Ford Explorer EV", capacity: 79, brand: "Ford" },
  { id: "ford-capri-ev", name: "Ford Capri EV", capacity: 79, brand: "Ford" },
  // Genesis
  { id: "genesis-electrified-g80", name: "Genesis Electrified G80", capacity: 87, brand: "Genesis" },
  { id: "genesis-electrified-gv70", name: "Genesis Electrified GV70", capacity: 77, brand: "Genesis" },
  { id: "genesis-gv60", name: "Genesis GV60", capacity: 77, brand: "Genesis" },
  // GMC
  { id: "gmc-hummer-ev-pickup", name: "GMC Hummer EV Pickup", capacity: 213, brand: "GMC" },
  { id: "gmc-hummer-ev-suv", name: "GMC Hummer EV SUV", capacity: 213, brand: "GMC" },
  // Hyundai
  { id: "hyundai-ioniq-5", name: "Hyundai IONIQ 5", capacity: 77, brand: "Hyundai" },
  { id: "hyundai-ioniq-6", name: "Hyundai IONIQ 6", capacity: 77, brand: "Hyundai" },
  { id: "hyundai-kona-electric", name: "Hyundai Kona Electric", capacity: 65, brand: "Hyundai" },
  // Jaguar
  { id: "jaguar-i-pace", name: "Jaguar I-PACE", capacity: 90, brand: "Jaguar" },
  // Kia
  { id: "kia-ev6", name: "Kia EV6", capacity: 77, brand: "Kia" },
  { id: "kia-ev9", name: "Kia EV9", capacity: 100, brand: "Kia" },
  { id: "kia-niro-ev", name: "Kia Niro EV", capacity: 65, brand: "Kia" },
  // Lucid
  { id: "lucid-air-dream", name: "Lucid Air Dream", capacity: 118, brand: "Lucid Motors" },
  { id: "lucid-air-pure", name: "Lucid Air Pure", capacity: 88, brand: "Lucid Motors" },
  { id: "lucid-air-touring", name: "Lucid Air Touring", capacity: 92, brand: "Lucid Motors" },
  // Mercedes-Benz
  { id: "mercedes-eqa", name: "Mercedes-Benz EQA", capacity: 67, brand: "Mercedes-Benz" },
  { id: "mercedes-eqb", name: "Mercedes-Benz EQB", capacity: 67, brand: "Mercedes-Benz" },
  { id: "mercedes-eqc", name: "Mercedes-Benz EQC", capacity: 80, brand: "Mercedes-Benz" },
  { id: "mercedes-eqe", name: "Mercedes-Benz EQE", capacity: 91, brand: "Mercedes-Benz" },
  { id: "mercedes-eqs", name: "Mercedes-Benz EQS", capacity: 108, brand: "Mercedes-Benz" },
  { id: "mercedes-eqs-suv", name: "Mercedes-Benz EQS SUV", capacity: 108, brand: "Mercedes-Benz" },
  // Nissan
  { id: "nissan-ariya", name: "Nissan Ariya", capacity: 87, brand: "Nissan" },
  { id: "nissan-leaf", name: "Nissan Leaf", capacity: 62, brand: "Nissan" },
  // Polestar
  { id: "polestar-2", name: "Polestar 2", capacity: 82, brand: "Polestar" },
  { id: "polestar-3", name: "Polestar 3", capacity: 111, brand: "Polestar" },
  { id: "polestar-4", name: "Polestar 4", capacity: 102, brand: "Polestar" },
  // Porsche
  { id: "porsche-macan-electric", name: "Porsche Macan Electric", capacity: 100, brand: "Porsche" },
  { id: "porsche-taycan", name: "Porsche Taycan", capacity: 93, brand: "Porsche" },
  { id: "porsche-taycan-cross-turismo", name: "Porsche Taycan Cross Turismo", capacity: 93, brand: "Porsche" },
  // Rivian
  { id: "rivian-r1s", name: "Rivian R1S", capacity: 135, brand: "Rivian" },
  { id: "rivian-r1t", name: "Rivian R1T", capacity: 135, brand: "Rivian" },
  // Škoda
  { id: "skoda-enyaq", name: "Škoda Enyaq", capacity: 82, brand: "Škoda" },
  { id: "skoda-enyaq-coupe", name: "Škoda Enyaq Coupé", capacity: 82, brand: "Škoda" },
  { id: "skoda-elroq", name: "Škoda Elroq", capacity: 77, brand: "Škoda" },
  // Tesla
  { id: "tesla-cybertruck", name: "Tesla Cybertruck", capacity: 123, brand: "Tesla" },
  { id: "tesla-model-3", name: "Tesla Model 3", capacity: 82, brand: "Tesla" },
  { id: "tesla-model-s", name: "Tesla Model S", capacity: 100, brand: "Tesla" },
  { id: "tesla-model-x", name: "Tesla Model X", capacity: 100, brand: "Tesla" },
  { id: "tesla-model-y", name: "Tesla Model Y", capacity: 82, brand: "Tesla" },
  // Volkswagen
  { id: "vw-id3", name: "Volkswagen ID.3", capacity: 82, brand: "Volkswagen" },
  { id: "vw-id4", name: "Volkswagen ID.4", capacity: 82, brand: "Volkswagen" },
  { id: "vw-id5", name: "Volkswagen ID.5", capacity: 82, brand: "Volkswagen" },
  { id: "vw-id7", name: "Volkswagen ID.7", capacity: 86, brand: "Volkswagen" },
  { id: "vw-id-buzz", name: "Volkswagen ID.Buzz", capacity: 91, brand: "Volkswagen" },
  // Volvo
  { id: "volvo-c40-recharge", name: "Volvo C40 Recharge", capacity: 82, brand: "Volvo" },
  { id: "volvo-ex30", name: "Volvo EX30", capacity: 69, brand: "Volvo" },
  { id: "volvo-ex90", name: "Volvo EX90", capacity: 111, brand: "Volvo" },
  { id: "volvo-xc40-recharge", name: "Volvo XC40 Recharge", capacity: 82, brand: "Volvo" },
  // Other / Generic
  { id: "other", name: "Other", capacity: 60, brand: "Other" },
] as const;

type EVModelId = typeof evModels[number]["id"];

// Average price spreads by zone (peak vs off-peak) in local currency per kWh
// Based on historical data - conservative estimates
const priceSpreadsByZone: Record<string, number> = {
  // Sweden (SEK/kWh)
  SE1: 0.25,
  SE2: 0.30,
  SE3: 0.45,
  SE4: 0.55,
  // Norway (NOK/kWh)
  NO1: 0.50,
  NO2: 0.55,
  NO3: 0.35,
  NO4: 0.25,
  NO5: 0.50,
  // Denmark (DKK/kWh)
  DK1: 0.60,
  DK2: 0.65,
  // Finland (EUR/kWh)
  FI: 0.06,
  // Germany (EUR/kWh)
  DE: 0.08,
};

// Average consumption per 100km for EVs
const EV_CONSUMPTION_KWH_PER_100KM = 18;

// Round-trip efficiency for V2X
const V2X_EFFICIENCY = 0.85;

// CO2 savings per kWh of grid optimization (kg)
const CO2_PER_KWH_OPTIMIZED = 0.15;

export default function V2XSavingsCalculatorPage() {
  const t = useTranslations("tools");
  const tCommon = useTranslations("common");

  // Form state
  const [country, setCountry] = useState<CountryKey>("sweden");
  const [zone, setZone] = useState<ZoneCode>("SE3");
  const [evModel, setEvModel] = useState<EVModelId>("other");
  const [evSelectorOpen, setEvSelectorOpen] = useState(false);
  const [customCapacity, setCustomCapacity] = useState(60);
  const [usablePercent, setUsablePercent] = useState(30);
  const [dailyDrivingKm, setDailyDrivingKm] = useState(30);
  const [hasSolar, setHasSolar] = useState(false);
  const [solarSize, setSolarSize] = useState(10);

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

  // Get selected EV's battery capacity
  const selectedEV = evModels.find((m) => m.id === evModel);
  const batteryCapacity = evModel === "other" ? customCapacity : (selectedEV?.capacity || 60);

  // Calculate V2X savings
  const calculations = useMemo(() => {
    // Usable V2X capacity
    const usableCapacity = (batteryCapacity * usablePercent) / 100;

    // Daily driving consumption
    const dailyDrivingConsumption = (dailyDrivingKm / 100) * EV_CONSUMPTION_KWH_PER_100KM;

    // Available capacity after driving buffer
    const availableForV2X = Math.max(0, usableCapacity - dailyDrivingConsumption * 0.5);

    // Conservative V2X cycles per day (0.5 = one charge/discharge every 2 days)
    const cyclesPerDay = 0.5;

    // Price spread for the zone
    const priceSpread = priceSpreadsByZone[zone] || 0.40;

    // Annual arbitrage savings
    const annualArbitrageSavings =
      availableForV2X * cyclesPerDay * priceSpread * V2X_EFFICIENCY * 365;

    // Solar bonus (store excess solar instead of exporting at low prices)
    let solarBonus = 0;
    if (hasSolar) {
      const dailySolarProduction = (solarSize * countryData.solarYield) / 365;
      const excessSolar = dailySolarProduction * 0.4; // 40% typically exported
      const storableExcess = Math.min(excessSolar, availableForV2X * 0.5);
      const solarPriceBonus = priceSpread * 0.6; // Export price vs self-consumption
      solarBonus = storableExcess * solarPriceBonus * 365;
    }

    // Total annual savings
    const totalSavings = Math.round(annualArbitrageSavings + solarBonus);

    // CO2 avoided through grid optimization
    const co2Avoided = Math.round(availableForV2X * cyclesPerDay * 365 * CO2_PER_KWH_OPTIMIZED);

    // V2X cycles per year
    const cyclesPerYear = Math.round(cyclesPerDay * 365);

    return {
      usableCapacity: Math.round(availableForV2X * 10) / 10,
      annualArbitrageSavings: Math.round(annualArbitrageSavings),
      solarBonus: Math.round(solarBonus),
      totalSavings,
      co2Avoided,
      cyclesPerYear,
      batteryCapacity,
    };
  }, [batteryCapacity, usablePercent, dailyDrivingKm, zone, hasSolar, solarSize, countryData.solarYield]);

  const handleCalculate = () => {
    setShowResults(true);
  };

  // Handle email submission
  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError(t("v2xSavings.invalidEmail"));
      return;
    }

    setIsSubmittingEmail(true);
    setEmailError(null);

    try {
      // Same form ID as other calculators - differentiate by _source field
      await fetch("https://submit-form.com/6ZFZTUMW1", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
          },
          body: JSON.stringify({
            email,
            name: name || "",
            _source: "v2x-savings-calculator",
            zone,
            country,
            evModel,
            batteryCapacity: calculations.batteryCapacity,
            usablePercent,
            dailyDrivingKm,
            hasSolar,
            solarSize: hasSolar ? solarSize : null,
            totalSavings: calculations.totalSavings,
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
            title={t("v2xSavings.title")}
            description={t("v2xSavings.description")}
            badge={t("v2xSavings.badge")}
          >
            <div className="space-y-8">
              {/* Location */}
              <div className="space-y-4">
                <h3 className="font-semibold flex items-center gap-2">
                  <Zap className="h-4 w-4 text-primary" />
                  {t("v2xSavings.location")}
                </h3>
                <CountryZoneSelector
                  country={country}
                  zone={zone}
                  onCountryChange={setCountry}
                  onZoneChange={setZone}
                  countryLabel={t("v2xSavings.country")}
                  zoneLabel={t("v2xSavings.priceZone")}
                />
              </div>

              {/* EV Selection */}
              <div className="space-y-4">
                <h3 className="font-semibold flex items-center gap-2">
                  <Car className="h-4 w-4 text-blue-500" />
                  {t("v2xSavings.electricVehicle")}
                </h3>

                <div className="space-y-2">
                  <Label>{t("v2xSavings.evModel")}</Label>
                  <Popover open={evSelectorOpen} onOpenChange={setEvSelectorOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={evSelectorOpen}
                        className="w-full justify-between font-normal"
                      >
                        {evModel === "other"
                          ? t("v2xSavings.otherEV")
                          : evModels.find((m) => m.id === evModel)?.name ?? t("v2xSavings.selectEV")}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[--radix-popover-trigger-width] p-0" align="start">
                      <Command>
                        <CommandInput placeholder={t("v2xSavings.searchEV")} />
                        <CommandList>
                          <CommandEmpty>{t("v2xSavings.noEVFound")}</CommandEmpty>
                          {/* Group by brand */}
                          {Array.from(new Set(evModels.map((m) => m.brand))).map((brand) => (
                            <CommandGroup key={brand} heading={brand}>
                              {evModels
                                .filter((m) => m.brand === brand)
                                .map((model) => (
                                  <CommandItem
                                    key={model.id}
                                    value={`${model.brand} ${model.name}`}
                                    onSelect={() => {
                                      setEvModel(model.id);
                                      setEvSelectorOpen(false);
                                    }}
                                  >
                                    <Check
                                      className={cn(
                                        "mr-2 h-4 w-4",
                                        evModel === model.id ? "opacity-100" : "opacity-0"
                                      )}
                                    />
                                    {model.id === "other" ? t("v2xSavings.otherEV") : model.name}
                                    {model.id !== "other" && (
                                      <span className="ml-auto text-xs text-muted-foreground">
                                        {model.capacity} kWh
                                      </span>
                                    )}
                                  </CommandItem>
                                ))}
                            </CommandGroup>
                          ))}
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </div>

                {evModel === "other" && (
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label>{t("v2xSavings.batteryCapacity")}</Label>
                      <span className="text-sm font-medium">{customCapacity} kWh</span>
                    </div>
                    <Slider
                      value={[customCapacity]}
                      onValueChange={(v) => setCustomCapacity(v[0])}
                      min={30}
                      max={150}
                      step={5}
                    />
                  </div>
                )}

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label>{t("v2xSavings.usableForV2X")}</Label>
                    <span className="text-sm font-medium">{usablePercent}% ({Math.round(batteryCapacity * usablePercent / 100)} kWh)</span>
                  </div>
                  <Slider
                    value={[usablePercent]}
                    onValueChange={(v) => setUsablePercent(v[0])}
                    min={10}
                    max={50}
                    step={5}
                  />
                  <p className="text-xs text-muted-foreground">
                    {t("v2xSavings.usableNote")}
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label>{t("v2xSavings.dailyDriving")}</Label>
                    <span className="text-sm font-medium">{dailyDrivingKm} km</span>
                  </div>
                  <Slider
                    value={[dailyDrivingKm]}
                    onValueChange={(v) => setDailyDrivingKm(v[0])}
                    min={0}
                    max={150}
                    step={5}
                  />
                </div>
              </div>

              {/* Solar Option */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold flex items-center gap-2">
                    <Sun className="h-4 w-4 text-yellow-500" />
                    {t("v2xSavings.solarSystem")}
                  </h3>
                  <Switch checked={hasSolar} onCheckedChange={setHasSolar} />
                </div>
                {hasSolar && (
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label>{t("v2xSavings.solarSize")}</Label>
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

              {/* V2X Info */}
              <Card className="bg-muted/50">
                <CardContent className="p-4 flex items-start gap-3">
                  <Info className="h-4 w-4 text-muted-foreground mt-0.5" />
                  <div className="text-sm text-muted-foreground">
                    <p>{t("v2xSavings.infoNote")}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Calculate Button */}
              <Button className="w-full" size="lg" onClick={handleCalculate}>
                {t("v2xSavings.calculate")}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>

            {/* Results */}
            {showResults && (
              <CalculatorResults title={emailSubmitted ? t("v2xSavings.results.title") : t("v2xSavings.emailGate.title")}>
                {!emailSubmitted ? (
                  /* Email Gate */
                  <div className="space-y-6">
                    <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
                      <CardContent className="p-6 text-center">
                        <div className="p-3 rounded-full bg-primary/10 w-fit mx-auto mb-4">
                          <Lock className="h-6 w-6 text-primary" />
                        </div>
                        <h3 className="font-semibold text-lg mb-2">{t("v2xSavings.emailGate.ready")}</h3>
                        <p className="text-muted-foreground mb-4">
                          {t("v2xSavings.emailGate.teaser", {
                            savings: calculations.totalSavings.toLocaleString(),
                            currency: currencyInfo.symbol
                          })}
                        </p>

                        <form onSubmit={handleEmailSubmit} className="space-y-4 max-w-sm mx-auto">
                          <div>
                            <Label htmlFor="gate-email" className="sr-only">Email</Label>
                            <div className="relative">
                              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                              <Input
                                id="gate-email"
                                type="email"
                                placeholder={t("v2xSavings.emailGate.emailPlaceholder")}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="pl-10"
                                required
                              />
                            </div>
                          </div>
                          <div>
                            <Label htmlFor="gate-name" className="sr-only">Name</Label>
                            <Input
                              id="gate-name"
                              type="text"
                              placeholder={t("v2xSavings.emailGate.namePlaceholder")}
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
                                {t("v2xSavings.emailGate.submitting")}
                              </>
                            ) : (
                              <>
                                {t("v2xSavings.emailGate.getResults")}
                                <ArrowRight className="ml-2 h-4 w-4" />
                              </>
                            )}
                          </Button>
                          <p className="text-xs text-muted-foreground">
                            {t("v2xSavings.emailGate.privacy")}
                          </p>
                        </form>
                      </CardContent>
                    </Card>
                  </div>
                ) : (
                  /* Full Results */
                  <>
                    {/* Results Cards */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                      <ResultCard
                        label={t("v2xSavings.results.totalSavings")}
                        value={`${calculations.totalSavings.toLocaleString()} ${currencyInfo.symbol}`}
                        subtext={t("v2xSavings.results.perYear")}
                        highlight
                      />
                      <ResultCard
                        label={t("v2xSavings.results.arbitrageSavings")}
                        value={`${calculations.annualArbitrageSavings.toLocaleString()} ${currencyInfo.symbol}`}
                        subtext={t("v2xSavings.results.peakShaving")}
                      />
                      {hasSolar && (
                        <ResultCard
                          label={t("v2xSavings.results.solarBonus")}
                          value={`+${calculations.solarBonus.toLocaleString()} ${currencyInfo.symbol}`}
                          subtext={t("v2xSavings.results.excessStorage")}
                        />
                      )}
                      <ResultCard
                        label={t("v2xSavings.results.co2Avoided")}
                        value={`${calculations.co2Avoided} kg`}
                        subtext={t("v2xSavings.results.perYear")}
                      />
                      <ResultCard
                        label={t("v2xSavings.results.cyclesYear")}
                        value={`${calculations.cyclesPerYear}`}
                        subtext={t("v2xSavings.results.estimatedUsage")}
                      />
                    </div>

                    {/* Battery Health Note */}
                    <Card className="mb-8 bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800">
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <Battery className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="font-medium text-blue-900 dark:text-blue-100">
                              {t("v2xSavings.results.batteryHealth")}
                            </p>
                            <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
                              {t("v2xSavings.results.batteryHealthDesc", {
                                percent: usablePercent,
                                capacity: calculations.usableCapacity
                              })}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* How it works */}
                    <div className="space-y-4 mb-8">
                      <h3 className="font-semibold">{t("v2xSavings.results.howItWorks")}</h3>
                      <div className="grid md:grid-cols-3 gap-4">
                        <Card>
                          <CardContent className="p-4 text-center">
                            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-2">
                              <span className="font-bold text-blue-600 dark:text-blue-400">1</span>
                            </div>
                            <p className="text-sm font-medium">{t("v2xSavings.results.step1")}</p>
                            <p className="text-xs text-muted-foreground mt-1">{t("v2xSavings.results.step1Desc")}</p>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardContent className="p-4 text-center">
                            <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-2">
                              <span className="font-bold text-green-600 dark:text-green-400">2</span>
                            </div>
                            <p className="text-sm font-medium">{t("v2xSavings.results.step2")}</p>
                            <p className="text-xs text-muted-foreground mt-1">{t("v2xSavings.results.step2Desc")}</p>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardContent className="p-4 text-center">
                            <div className="w-10 h-10 bg-yellow-100 dark:bg-yellow-900 rounded-full flex items-center justify-center mx-auto mb-2">
                              <span className="font-bold text-yellow-600 dark:text-yellow-400">3</span>
                            </div>
                            <p className="text-sm font-medium">{t("v2xSavings.results.step3")}</p>
                            <p className="text-xs text-muted-foreground mt-1">{t("v2xSavings.results.step3Desc")}</p>
                          </CardContent>
                        </Card>
                      </div>
                    </div>

                    {/* CTA */}
                    <div className="p-6 bg-primary/10 rounded-lg text-center">
                      <h3 className="font-semibold mb-2">
                        {t("v2xSavings.results.readyToStart")}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        {t("v2xSavings.results.readyDescription")}
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
                      {t("v2xSavings.results.disclaimer")}
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
