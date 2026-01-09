"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/src/i18n/routing";
import * as XLSX from "xlsx";
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
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowRight,
  Sun,
  Battery,
  TrendingDown,
  AlertTriangle,
  Loader2,
  Upload,
  FileSpreadsheet,
  CheckCircle,
  X,
  Calendar,
  Info,
  PartyPopper,
  HelpCircle,
  Mail,
  Lock,
  Download,
} from "lucide-react";
import { Input } from "@/components/ui/input";

// API data availability - update this as more data becomes available
const API_DATA_START = new Date(2024, 11, 31); // December 31, 2024

// Column detection keywords from srcfl/negative-price-calc
const DATE_KEYWORDS = ["datum", "date", "time", "tid", "timestamp", "datetime", "starttidpunkt"];
const PROD_KEYWORDS = ["kwh", "wh", "energi", "energy", "värde", "value", "produktion", "production", "export", "power", "effekt"];

// Normalize string to number (handles Swedish format)
function normalizeNumber(str: string): number {
  if (!str || typeof str !== "string") return parseFloat(str) || 0;
  let cleaned = str.replace(/[\u00A0\u202F\s]/g, "");
  cleaned = cleaned.replace(",", ".");
  cleaned = cleaned.replace(/[^\d.+-]/g, "");
  return parseFloat(cleaned) || 0;
}

// Parse Excel serial date to JS Date
function excelDateToJS(serial: number): Date {
  const excelEpoch = new Date(1899, 11, 30);
  const msPerDay = 24 * 60 * 60 * 1000;
  return new Date(excelEpoch.getTime() + serial * msPerDay);
}

// Parse various date formats
function parseDate(value: unknown): Date | null {
  if (!value) return null;
  if (value instanceof Date) return value;
  if (typeof value === "number") {
    if (value > 25569 && value < 50000) {
      return excelDateToJS(value);
    }
    return null;
  }
  const str = String(value).trim();
  if (!str) return null;
  const date = new Date(str);
  if (!isNaN(date.getTime())) return date;
  const match = str.match(/^(\d{4}-\d{2}-\d{2})\s+(\d{2}:\d{2})(?::\d{2})?$/);
  if (match) {
    return new Date(`${match[1]}T${match[2]}`);
  }
  return null;
}

// Find column index by keywords
function findColumn(headers: string[], keywords: string[]): number {
  const lowerHeaders = headers.map(h => h.toLowerCase().trim());
  return lowerHeaders.findIndex(h => keywords.some(kw => h.includes(kw)));
}

// Parse production file (CSV or XLSX)
function parseProductionFile(
  data: ArrayBuffer | string,
  fileType: "csv" | "xlsx"
): { timestamp: Date; production: number }[] {
  let rows: unknown[][] = [];
  let headers: string[] = [];

  if (fileType === "xlsx") {
    const workbook = XLSX.read(data, { type: "array" });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const jsonData = XLSX.utils.sheet_to_json<unknown[]>(sheet, { header: 1 });
    if (jsonData.length < 2) return [];
    headers = (jsonData[0] as string[]).map(h => String(h || ""));
    rows = jsonData.slice(1) as unknown[][];
  } else {
    const content = typeof data === "string" ? data : new TextDecoder().decode(data);
    const lines = content.trim().split("\n");
    if (lines.length < 2) return [];
    const firstLine = lines[0];
    const delimiter = firstLine.includes(";") ? ";" : firstLine.includes("\t") ? "\t" : ",";
    headers = lines[0].split(delimiter).map(h => h.trim().replace(/"/g, ""));
    rows = lines.slice(1)
      .filter(line => line.trim())
      .map(line => line.split(delimiter).map(c => c.trim().replace(/"/g, "")));
  }

  let dateColIdx = findColumn(headers, DATE_KEYWORDS);
  let prodColIdx = findColumn(headers, PROD_KEYWORDS);
  if (dateColIdx === -1) dateColIdx = 0;
  if (prodColIdx === -1) prodColIdx = 1;

  const results: { timestamp: Date; production: number }[] = [];
  for (const row of rows) {
    if (!row || row.length <= Math.max(dateColIdx, prodColIdx)) continue;
    const dateVal = row[dateColIdx];
    const prodVal = row[prodColIdx];
    const timestamp = parseDate(dateVal);
    if (!timestamp) continue;
    const production = typeof prodVal === "number"
      ? prodVal
      : normalizeNumber(String(prodVal || "0"));
    if (production >= 0) {
      results.push({ timestamp, production });
    }
  }
  return results;
}

// Format date as YYYY-MM-DD
function formatDate(date: Date): string {
  return date.toISOString().split("T")[0];
}

// Format date for display
function formatDateDisplay(date: Date): string {
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

// Currency conversion rates from EUR (approximate)
const currencyRates: Record<string, number> = {
  EUR: 1,
  SEK: 11.5,
  NOK: 11.8,
  DKK: 7.45,
};

// Fetch prices for a date range with progress updates
async function fetchPricesForRange(
  zone: string,
  from: Date,
  to: Date,
  currency: string,
  onProgress: (progress: number, status: string) => void
): Promise<{ timestamp: string; price: number; actualFrom: Date; actualTo: Date }> {
  const allPrices: { timestamp: string; price: number }[] = [];
  const currentDate = new Date(from);
  const totalDays = Math.ceil((to.getTime() - from.getTime()) / (1000 * 60 * 60 * 24));
  let processedDays = 0;
  let actualFrom: Date | null = null;
  let actualTo: Date | null = null;

  const conversionRate = currencyRates[currency] || 1;

  while (currentDate <= to) {
    const daysRemaining = Math.ceil((to.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;
    const daysToFetch = Math.min(10, daysRemaining);

    onProgress(
      Math.min(95, (processedDays / totalDays) * 100),
      `Fetching ${formatDateDisplay(currentDate)}...`
    );

    try {
      const url = `/api/electricity-price?zone=${zone}&date=${formatDate(currentDate)}&days=${daysToFetch}`;
      const response = await fetch(url);

      if (response.ok) {
        const data = await response.json();
        if (data.prices && Array.isArray(data.prices) && data.prices.length > 0) {
          const mappedPrices = data.prices.map((p: { datetime: string; price: number }) => ({
            timestamp: p.datetime,
            price: (p.price * conversionRate) / 1000,
          }));
          allPrices.push(...mappedPrices);

          // Track actual date range
          const firstDate = new Date(data.prices[0].datetime);
          const lastDate = new Date(data.prices[data.prices.length - 1].datetime);
          if (!actualFrom || firstDate < actualFrom) actualFrom = firstDate;
          if (!actualTo || lastDate > actualTo) actualTo = lastDate;
        }
      }
    } catch (error) {
      console.error(`Error fetching prices for ${formatDate(currentDate)}:`, error);
    }

    currentDate.setDate(currentDate.getDate() + daysToFetch);
    processedDays += daysToFetch;
  }

  onProgress(100, "analysisComplete");

  return {
    timestamp: "",
    price: 0,
    ...{ prices: allPrices },
    actualFrom: actualFrom || from,
    actualTo: actualTo || to,
  } as unknown as { timestamp: string; price: number; actualFrom: Date; actualTo: Date } & { prices: { timestamp: string; price: number }[] };
}

// Estimate hourly solar production (bell curve centered at noon)
function estimateHourlySolarProduction(hour: number, dailyProduction: number): number {
  const productionCurve: Record<number, number> = {
    0: 0, 1: 0, 2: 0, 3: 0, 4: 0,
    5: 0.02, 6: 0.05, 7: 0.08, 8: 0.12, 9: 0.14,
    10: 0.15, 11: 0.16, 12: 0.16, 13: 0.15, 14: 0.14,
    15: 0.12, 16: 0.08, 17: 0.05, 18: 0.02,
    19: 0, 20: 0, 21: 0, 22: 0, 23: 0,
  };
  return dailyProduction * (productionCurve[hour] || 0);
}

interface NegativePriceResults {
  totalHours: number;
  negativePriceHours: number;
  negativePercentage: number;
  totalProduction: number;
  productionDuringNegative: number;
  lostRevenue: number;
  potentialSavings: number;
  avgNegativePrice: number;
  worstNegativePrice: number;
  potentialExposure: number; // What could be lost if negative prices hit during peak production
  monthlyBreakdown: { month: string; negativeHours: number; lostRevenue: number }[];
  analyzedFrom: Date;
  analyzedTo: Date;
  analyzedDays: number;
}

export default function NegativePricesCalculatorPage() {
  const t = useTranslations("tools");
  const tCommon = useTranslations("common");

  // Mode state
  const [mode, setMode] = useState<"estimate" | "upload">("estimate");

  // Form state
  const [country, setCountry] = useState<CountryKey>("sweden");
  const [zone, setZone] = useState<ZoneCode>("SE3");
  const [solarSize, setSolarSize] = useState(10);
  const [hasBattery, setHasBattery] = useState(false);
  const [batterySize, setBatterySize] = useState(10);

  // File upload state
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [parsedData, setParsedData] = useState<{ timestamp: Date; production: number }[] | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [parseError, setParseError] = useState<string | null>(null);
  const [uploadDateWarning, setUploadDateWarning] = useState<string | null>(null);

  // Results state
  const [isCalculating, setIsCalculating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [progressStatus, setProgressStatus] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState<NegativePriceResults | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Email gate state
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [isSubmittingEmail, setIsSubmittingEmail] = useState(false);
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [emailError, setEmailError] = useState<string | null>(null);

  const currencyInfo = getCurrencyInfo(country);
  const countryData = countries[country];

  // Check uploaded file dates against API availability
  useEffect(() => {
    if (parsedData && parsedData.length > 0) {
      const timestamps = parsedData.map(d => d.timestamp.getTime());
      const dataFrom = new Date(Math.min(...timestamps));
      const dataTo = new Date(Math.max(...timestamps));

      if (dataTo < API_DATA_START) {
        setUploadDateWarning(
          `Your data is from ${formatDateDisplay(dataFrom)} to ${formatDateDisplay(dataTo)}, but price data is only available from ${formatDateDisplay(API_DATA_START)}. The analysis may show limited results.`
        );
      } else if (dataFrom < API_DATA_START) {
        setUploadDateWarning(
          `Price data is only available from ${formatDateDisplay(API_DATA_START)}. Data before this date will be excluded from analysis.`
        );
      } else {
        setUploadDateWarning(null);
      }
    } else {
      setUploadDateWarning(null);
    }
  }, [parsedData]);

  // Handle file drop
  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    setParseError(null);
    const file = e.dataTransfer.files[0];
    if (file) processFile(file);
  }, []);

  // Handle file select
  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setParseError(null);
    const file = e.target.files?.[0];
    if (file) processFile(file);
  }, []);

  // Process uploaded file
  const processFile = useCallback((file: File) => {
    const ext = file.name.toLowerCase().substring(file.name.lastIndexOf("."));
    const validTypes = [".csv", ".txt", ".xlsx", ".xls"];
    if (!validTypes.includes(ext)) {
      setParseError(t("negativePrices.invalidFileType"));
      return;
    }
    if (file.size > 16 * 1024 * 1024) {
      setParseError(t("negativePrices.fileTooLarge"));
      return;
    }

    setUploadedFile(file);
    setParseError(null);

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const result = e.target?.result;
        const isExcel = ext === ".xlsx" || ext === ".xls";
        const data = parseProductionFile(result as ArrayBuffer | string, isExcel ? "xlsx" : "csv");

        if (data.length === 0) {
          setParseError(t("negativePrices.parseErrorGeneric"));
          setParsedData(null);
          return;
        }

        data.sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
        setParsedData(data);
      } catch (err) {
        console.error("Parse error:", err);
        setParseError(t("negativePrices.parseErrorFormat"));
        setParsedData(null);
      }
    };

    if (ext === ".xlsx" || ext === ".xls") {
      reader.readAsArrayBuffer(file);
    } else {
      reader.readAsText(file);
    }
  }, []);

  // Clear uploaded file
  const clearFile = useCallback(() => {
    setUploadedFile(null);
    setParsedData(null);
    setParseError(null);
    setUploadDateWarning(null);
  }, []);

  // Calculate annual production estimate
  const annualProduction = solarSize * countryData.solarYield;
  const dailyProduction = annualProduction / 365;

  const handleCalculate = async () => {
    setIsCalculating(true);
    setProgress(0);
    setProgressStatus(t("negativePrices.preparingAnalysis"));
    setError(null);
    setShowResults(false);

    try {
      let from: Date;
      let to: Date;
      let productionByHour = new Map<string, number>();

      if (mode === "upload" && parsedData && parsedData.length > 0) {
        const timestamps = parsedData.map(d => d.timestamp.getTime());
        from = new Date(Math.min(...timestamps));
        to = new Date(Math.max(...timestamps));

        // Clamp to API availability (start date and end date)
        const today = new Date();
        if (from < API_DATA_START) from = new Date(API_DATA_START);
        if (to > today) to = today;

        // Detect if data is daily (all hours are 0) or hourly
        const isDailyData = parsedData.every(d => d.timestamp.getHours() === 0);

        // Solar production curve for spreading daily data across hours
        const solarCurve: Record<number, number> = {
          0: 0, 1: 0, 2: 0, 3: 0, 4: 0,
          5: 0.02, 6: 0.05, 7: 0.08, 8: 0.12, 9: 0.14,
          10: 0.15, 11: 0.16, 12: 0.16, 13: 0.15, 14: 0.14,
          15: 0.12, 16: 0.08, 17: 0.05, 18: 0.02,
          19: 0, 20: 0, 21: 0, 22: 0, 23: 0,
        };

        // Build production lookup
        for (const d of parsedData) {
          if (d.timestamp >= API_DATA_START) {
            if (isDailyData) {
              // Spread daily production across daylight hours using solar curve
              for (let hour = 0; hour < 24; hour++) {
                const hourlyProd = d.production * (solarCurve[hour] || 0);
                if (hourlyProd > 0) {
                  const hourKey = `${d.timestamp.getFullYear()}-${String(d.timestamp.getMonth() + 1).padStart(2, "0")}-${String(d.timestamp.getDate()).padStart(2, "0")}-${String(hour).padStart(2, "0")}`;
                  productionByHour.set(hourKey, hourlyProd);
                }
              }
            } else {
              // Hourly data - use as-is
              const hourKey = `${d.timestamp.getFullYear()}-${String(d.timestamp.getMonth() + 1).padStart(2, "0")}-${String(d.timestamp.getDate()).padStart(2, "0")}-${String(d.timestamp.getHours()).padStart(2, "0")}`;
              productionByHour.set(hourKey, (productionByHour.get(hourKey) || 0) + d.production);
            }
          }
        }
      } else {
        // Use available data range for estimation
        from = new Date(API_DATA_START);
        to = new Date();
      }

      const result = await fetchPricesForRange(
        zone,
        from,
        to,
        currencyInfo.currency,
        (prog, status) => {
          setProgress(prog);
          setProgressStatus(status);
        }
      );

      const prices = (result as unknown as { prices: { timestamp: string; price: number }[] }).prices;
      const actualFrom = result.actualFrom;
      const actualTo = result.actualTo;

      if (!prices || prices.length === 0) {
        setError(t("negativePrices.noPriceData"));
        setIsCalculating(false);
        return;
      }

      // Analyze negative prices
      const negativePrices = prices.filter((p) => p.price < 0);
      const totalHours = prices.length;
      const negativePriceHours = negativePrices.length;

      let productionDuringNegative = 0;
      let lostRevenue = 0;
      let totalProductionCalc = 0;
      const monthlyData: Record<string, { negativeHours: number; lostRevenue: number }> = {};

      const useUploadedProduction = mode === "upload" && parsedData;

      for (const pricePoint of prices) {
        const date = new Date(pricePoint.timestamp);
        const hour = date.getHours();
        const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
        const hourKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}-${String(date.getHours()).padStart(2, "0")}`;

        let hourlyProduction: number;
        if (useUploadedProduction) {
          hourlyProduction = productionByHour.get(hourKey) || 0;
        } else {
          hourlyProduction = estimateHourlySolarProduction(hour, dailyProduction);
        }

        totalProductionCalc += hourlyProduction;

        if (!monthlyData[monthKey]) {
          monthlyData[monthKey] = { negativeHours: 0, lostRevenue: 0 };
        }

        if (pricePoint.price < 0) {
          const exported = hasBattery ? hourlyProduction * 0.3 : hourlyProduction;
          const loss = exported * Math.abs(pricePoint.price);
          productionDuringNegative += exported;
          lostRevenue += loss;
          monthlyData[monthKey].negativeHours++;
          monthlyData[monthKey].lostRevenue += loss;
        }
      }

      const potentialSavings = lostRevenue * 0.9;
      const avgNegativePrice = negativePrices.length > 0
        ? negativePrices.reduce((sum, p) => sum + p.price, 0) / negativePrices.length
        : 0;
      const worstNegativePrice = negativePrices.length > 0
        ? Math.min(...negativePrices.map((p) => p.price))
        : 0;

      const monthlyBreakdown = Object.entries(monthlyData)
        .map(([month, data]) => ({
          month,
          negativeHours: data.negativeHours,
          lostRevenue: Math.round(data.lostRevenue),
        }))
        .sort((a, b) => a.month.localeCompare(b.month));

      const analyzedDays = Math.ceil((actualTo.getTime() - actualFrom.getTime()) / (1000 * 60 * 60 * 24));

      // Potential exposure: worst case if negative prices hit during peak production
      const potentialExposure = Math.round(productionDuringNegative * Math.abs(worstNegativePrice));

      const calculatedResults: NegativePriceResults = {
        totalHours,
        negativePriceHours,
        negativePercentage: (negativePriceHours / totalHours) * 100,
        totalProduction: Math.round(mode === "upload" ? totalProductionCalc : (annualProduction * analyzedDays / 365)),
        productionDuringNegative: Math.round(productionDuringNegative),
        lostRevenue: Math.round(lostRevenue),
        potentialSavings: Math.round(potentialSavings),
        avgNegativePrice: Math.round(avgNegativePrice * 1000) / 1000,
        worstNegativePrice: Math.round(worstNegativePrice * 1000) / 1000,
        potentialExposure,
        monthlyBreakdown,
        analyzedFrom: actualFrom,
        analyzedTo: actualTo,
        analyzedDays,
      };

      setResults(calculatedResults);
      setShowResults(true);
    } catch (err) {
      console.error("Calculation error:", err);
      setError("An error occurred while fetching price data. Please try again.");
    } finally {
      setIsCalculating(false);
    }
  };

  const hasNegativePrices = Boolean(results && results.negativePriceHours > 0);

  // Handle email submission for report download (via Formspark)
  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !results) return;

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address");
      return;
    }

    setIsSubmittingEmail(true);
    setEmailError(null);

    try {
      // Submit to Formspark
      const formsparkId = process.env.NEXT_PUBLIC_FORMSPARK_NEGATIVE_PRICE_ID;
      if (!formsparkId) {
        console.warn("Formspark ID not configured");
        setEmailSubmitted(true);
        return;
      }

      const response = await fetch(`https://submit-form.com/${formsparkId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({
          email,
          name: name || "",
          _source: "negative-price-calculator",
          zone,
          country,
          mode,
          solarSize: mode === "estimate" ? solarSize : null,
          hasBattery,
          batterySize: hasBattery ? batterySize : null,
          negativePriceHours: results.negativePriceHours,
          lostRevenue: results.lostRevenue,
          potentialSavings: results.potentialSavings,
          analyzedDays: results.analyzedDays,
          currency: currencyInfo.symbol,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit");
      }

      setEmailSubmitted(true);
    } catch (err) {
      console.error("Email submission error:", err);
      // Still mark as submitted to not block the user
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
            title={t("negativePrices.title")}
            description={t("negativePrices.description")}
            badge={t("negativePrices.badge")}
          >
            <div className="space-y-8">
              {/* Location */}
              <div className="space-y-4">
                <h3 className="font-semibold flex items-center gap-2">
                  <TrendingDown className="h-4 w-4 text-primary" />
                  {t("negativePrices.location")}
                </h3>
                <CountryZoneSelector
                  country={country}
                  zone={zone}
                  onCountryChange={setCountry}
                  onZoneChange={setZone}
                  countryLabel={t("negativePrices.country")}
                  zoneLabel={t("negativePrices.priceZone")}
                />
              </div>

              {/* Mode Tabs */}
              <Tabs value={mode} onValueChange={(v) => setMode(v as "estimate" | "upload")}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="estimate">
                    <Sun className="h-4 w-4 mr-2" />
                    {t("negativePrices.estimateMode")}
                  </TabsTrigger>
                  <TabsTrigger value="upload">
                    <Upload className="h-4 w-4 mr-2" />
                    {t("negativePrices.uploadMode")}
                  </TabsTrigger>
                </TabsList>

                {/* Estimate Mode */}
                <TabsContent value="estimate" className="space-y-6 mt-6">
                  <div className="space-y-4">
                    <h3 className="font-semibold flex items-center gap-2">
                      <Sun className="h-4 w-4 text-yellow-500" />
                      {t("negativePrices.solarSystem")}
                    </h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label>{t("negativePrices.solarSize")}</Label>
                        <span className="text-sm font-medium">{solarSize} kWp</span>
                      </div>
                      <Slider
                        value={[solarSize]}
                        onValueChange={(v) => setSolarSize(v[0])}
                        min={3}
                        max={50}
                        step={1}
                      />
                      <p className="text-xs text-muted-foreground">
                        {t("negativePrices.estimatedProduction")}: {annualProduction.toLocaleString()} kWh/year
                      </p>
                    </div>
                  </div>

                  {/* Data availability info */}
                  <Card className="bg-muted/50">
                    <CardContent className="p-4 flex items-start gap-3">
                      <Calendar className="h-4 w-4 text-muted-foreground mt-0.5" />
                      <div className="text-sm">
                        <p className="text-muted-foreground">
                          {t("negativePrices.dataAvailability", { from: formatDateDisplay(API_DATA_START) })}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Upload Mode */}
                <TabsContent value="upload" className="space-y-6 mt-6">
                  {/* File Upload Area */}
                  <div
                    className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                      isDragging
                        ? "border-primary bg-primary/5"
                        : parsedData
                        ? "border-green-500 bg-green-50 dark:bg-green-950/20"
                        : "border-muted-foreground/25 hover:border-primary/50"
                    }`}
                    onDragOver={(e) => {
                      e.preventDefault();
                      setIsDragging(true);
                    }}
                    onDragLeave={() => setIsDragging(false)}
                    onDrop={handleDrop}
                  >
                    {parsedData ? (
                      <div className="space-y-2">
                        <CheckCircle className="h-8 w-8 text-green-500 mx-auto" />
                        <p className="font-medium">{uploadedFile?.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {parsedData.length.toLocaleString()} {t("negativePrices.dataPoints")}
                        </p>
                        <Button variant="ghost" size="sm" onClick={clearFile} className="mt-2">
                          <X className="h-4 w-4 mr-1" />
                          {t("negativePrices.removeFile")}
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <FileSpreadsheet className="h-10 w-10 text-muted-foreground mx-auto" />
                        <div>
                          <p className="font-medium">{t("negativePrices.dropFile")}</p>
                          <p className="text-sm text-muted-foreground">
                            {t("negativePrices.fileFormats")}
                          </p>
                        </div>
                        <label className="inline-block">
                          <input
                            type="file"
                            accept=".csv,.txt,.xlsx,.xls"
                            onChange={handleFileSelect}
                            className="hidden"
                          />
                          <Button variant="outline" asChild>
                            <span className="cursor-pointer">
                              <Upload className="h-4 w-4 mr-2" />
                              {t("negativePrices.browseFiles")}
                            </span>
                          </Button>
                        </label>
                      </div>
                    )}
                  </div>

                  {/* Parse Error */}
                  {parseError && (
                    <Card className="border-destructive">
                      <CardContent className="p-4 flex items-center gap-2 text-destructive">
                        <AlertTriangle className="h-4 w-4" />
                        {parseError}
                      </CardContent>
                    </Card>
                  )}

                  {/* Upload Date Warning */}
                  {uploadDateWarning && (
                    <Card className="border-amber-500 bg-amber-50 dark:bg-amber-950/20">
                      <CardContent className="p-4 flex items-start gap-2 text-amber-700 dark:text-amber-300">
                        <Info className="h-4 w-4 mt-0.5 flex-shrink-0" />
                        <p className="text-sm">{uploadDateWarning}</p>
                      </CardContent>
                    </Card>
                  )}

                  {/* File Format Help */}
                  <Card className="bg-muted/50">
                    <CardContent className="p-4 space-y-3">
                      <div className="flex items-center gap-2 text-sm font-medium">
                        <HelpCircle className="h-4 w-4 text-muted-foreground" />
                        {t("negativePrices.fileHelp.title")}
                      </div>
                      <div className="text-sm text-muted-foreground space-y-2">
                        <p>{t("negativePrices.fileHelp.description")}</p>
                        <div className="space-y-1">
                          <p className="font-medium text-foreground">{t("negativePrices.fileHelp.whereToGet")}</p>
                          <ul className="list-disc pl-4 space-y-0.5">
                            <li>Huawei FusionSolar: {t("negativePrices.fileHelp.huaweiPath")}</li>
                            <li>SolarEdge: {t("negativePrices.fileHelp.solarEdgePath")}</li>
                            <li>Enphase: {t("negativePrices.fileHelp.enphasePath")}</li>
                            <li>Growatt: {t("negativePrices.fileHelp.growattPath")}</li>
                          </ul>
                        </div>
                        <a
                          href="/test-data/sample-solar-production.csv"
                          download="sample-solar-production.csv"
                          className="inline-flex items-center gap-1.5 text-primary hover:underline font-medium"
                        >
                          <Download className="h-3.5 w-3.5" />
                          {t("negativePrices.fileHelp.downloadSample")}
                        </a>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>

              {/* Battery (shared between modes) */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold flex items-center gap-2">
                    <Battery className="h-4 w-4 text-green-500" />
                    {t("negativePrices.battery")}
                  </h3>
                  <Switch checked={hasBattery} onCheckedChange={setHasBattery} />
                </div>
                {hasBattery && (
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label>{t("negativePrices.batteryCapacity")}</Label>
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

              {/* Calculate Button */}
              <Button
                className="w-full"
                size="lg"
                onClick={handleCalculate}
                disabled={isCalculating || (mode === "upload" && !parsedData)}
              >
                {isCalculating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {t("negativePrices.analyzing")}
                  </>
                ) : (
                  <>
                    {t("negativePrices.calculate")}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>

              {/* Progress Bar */}
              {isCalculating && (
                <div className="space-y-2">
                  <Progress value={progress} />
                  <p className="text-xs text-muted-foreground text-center">
                    {progressStatus}
                  </p>
                </div>
              )}

              {/* Error */}
              {error && (
                <Card className="border-destructive">
                  <CardContent className="p-4 flex items-center gap-2 text-destructive">
                    <AlertTriangle className="h-4 w-4" />
                    {error}
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Results - Email gate first, then full results */}
            {showResults && results && (
              <CalculatorResults title={emailSubmitted ? t("negativePrices.results.title") : t("negativePrices.emailGate.title")}>
                {!emailSubmitted ? (
                  /* Email Gate - Show before revealing results */
                  <div className="space-y-6">
                    {/* Teaser - show they have results waiting */}
                    <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
                      <CardContent className="p-6 text-center">
                        <div className="p-3 rounded-full bg-primary/10 w-fit mx-auto mb-4">
                          <Lock className="h-6 w-6 text-primary" />
                        </div>
                        <h3 className="font-semibold text-lg mb-2">{t("negativePrices.emailGate.ready")}</h3>
                        <p className="text-muted-foreground mb-4">
                          {t("negativePrices.emailGate.teaser", { hours: results.negativePriceHours, zone })}{" "}
                          <a
                            href="https://store.sourceful.energy/products/sourceful-energy-zap"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline font-medium"
                          >
                            {t("negativePrices.emailGate.teaserZap")}
                          </a>{" "}
                          {t("negativePrices.emailGate.teaserEnd")}
                        </p>

                        <form onSubmit={handleEmailSubmit} className="space-y-4 max-w-sm mx-auto">
                          <div>
                            <Label htmlFor="gate-email" className="sr-only">Email</Label>
                            <div className="relative">
                              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                              <Input
                                id="gate-email"
                                type="email"
                                placeholder={t("negativePrices.emailGate.emailPlaceholder")}
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
                              placeholder={t("negativePrices.emailGate.namePlaceholder")}
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
                                {t("negativePrices.emailGate.submitting")}
                              </>
                            ) : (
                              <>
                                {t("negativePrices.emailGate.getReport")}
                                <ArrowRight className="ml-2 h-4 w-4" />
                              </>
                            )}
                          </Button>
                          <p className="text-xs text-muted-foreground">
                            {t("negativePrices.emailGate.privacy")}
                          </p>
                        </form>
                      </CardContent>
                    </Card>
                  </div>
                ) : (
                  /* Full Results - Show after email submitted */
                  <>
                    {/* Analyzed Period Context */}
                    <Card className="mb-6 bg-muted/50">
                      <CardContent className="p-4 flex items-center gap-3">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground">
                          {t("negativePrices.results.analyzedPeriod", { days: results.analyzedDays, from: formatDateDisplay(results.analyzedFrom), to: formatDateDisplay(results.analyzedTo) })}
                        </p>
                      </CardContent>
                    </Card>

                    {/* Results Cards */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                      <ResultCard
                        label={t("negativePrices.results.lostRevenue")}
                        value={hasNegativePrices ? `-${results.lostRevenue.toLocaleString()} ${currencyInfo.symbol}` : `0 ${currencyInfo.symbol}`}
                        subtext={t("negativePrices.results.paidToExport")}
                        highlight={hasNegativePrices}
                      />
                      <ResultCard
                        label={t("negativePrices.results.potentialSavings")}
                        value={`${results.potentialSavings.toLocaleString()} ${currencyInfo.symbol}`}
                        subtext={t("negativePrices.results.withSourceful")}
                      />
                      <ResultCard
                        label={t("negativePrices.results.negativeHours")}
                        value={`${results.negativePriceHours} h`}
                        subtext={`${results.negativePercentage.toFixed(1)}% ${t("negativePrices.results.ofYear")}`}
                      />
                      <ResultCard
                        label={t("negativePrices.results.worstPrice")}
                        value={hasNegativePrices ? `${results.worstNegativePrice} ${currencyInfo.symbol}/kWh` : "N/A"}
                        subtext={t("negativePrices.results.lowestPrice")}
                      />
                    </div>

                    {/* Insight Card */}
                    {hasNegativePrices && results.lostRevenue > 0 ? (
                      <Card className="mb-8 bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800">
                        <CardContent className="p-4">
                          <div className="flex items-start gap-3">
                            <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                            <div>
                              <p className="font-medium text-amber-900 dark:text-amber-100">
                                {t("negativePrices.results.insight")}
                              </p>
                              <p className="text-sm text-amber-700 dark:text-amber-300 mt-1">
                                {t("negativePrices.results.insightDescription", { zone, hours: results.negativePriceHours, amount: results.lostRevenue.toLocaleString(), currency: currencyInfo.symbol })}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ) : hasNegativePrices ? (
                      <Card className="mb-8 bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800">
                        <CardContent className="p-4">
                          <div className="flex items-start gap-3">
                            <Info className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                            <div>
                              <p className="font-medium text-blue-900 dark:text-blue-100">
                                {t("negativePrices.results.insightNegativeNoLoss")}
                              </p>
                              <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
                                {t("negativePrices.results.insightNegativeNoLossDesc", { zone, hours: results.negativePriceHours, price: results.worstNegativePrice, currency: currencyInfo.symbol })}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ) : (
                      <Card className="mb-8 bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-800">
                        <CardContent className="p-4">
                          <div className="flex items-start gap-3">
                            <PartyPopper className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                            <div>
                              <p className="font-medium text-green-900 dark:text-green-100">
                                {t("negativePrices.results.insightNoNegative")}
                              </p>
                              <p className="text-sm text-green-700 dark:text-green-300 mt-1">
                                {t("negativePrices.results.insightNoNegativeDesc", { zone, from: formatDateDisplay(results.analyzedFrom), to: formatDateDisplay(results.analyzedTo) })}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )}

                    {/* Monthly Breakdown */}
                    {results.monthlyBreakdown.length > 0 && (
                      <div className="space-y-4 mb-8">
                        <h3 className="font-semibold">{t("negativePrices.results.monthlyBreakdown")}</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                          {results.monthlyBreakdown.slice(-12).map((month) => (
                            <div
                              key={month.month}
                              className="p-3 bg-muted rounded-lg text-center"
                            >
                              <div className="text-xs text-muted-foreground">{month.month}</div>
                              <div className="font-medium">{month.negativeHours}h</div>
                              {month.lostRevenue > 0 && (
                                <div className="text-xs text-destructive">
                                  -{month.lostRevenue} {currencyInfo.symbol}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* CTA */}
                    <div className="p-6 bg-primary/10 rounded-lg text-center">
                      <h3 className="font-semibold mb-2">
                        {hasNegativePrices ? t("negativePrices.results.readyToSave") : t("negativePrices.results.readyPrepared")}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        {hasNegativePrices
                          ? t("negativePrices.results.readyDescription")
                          : t("negativePrices.results.readyPreparedDescription")
                        }
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
                      {t("negativePrices.results.disclaimer")}
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
