"use client";

import { useTranslations } from "next-intl";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Country and zone configuration (codes and non-translatable data)
export const countries = {
  sweden: {
    code: "SE",
    zones: ["SE1", "SE2", "SE3", "SE4"],
    currency: "SEK",
    currencySymbol: "kr",
    solarYield: 900,
  },
  norway: {
    code: "NO",
    zones: ["NO1", "NO2", "NO3", "NO4", "NO5"],
    currency: "NOK",
    currencySymbol: "kr",
    solarYield: 800,
  },
  denmark: {
    code: "DK",
    zones: ["DK1", "DK2"],
    currency: "DKK",
    currencySymbol: "kr",
    solarYield: 950,
  },
  finland: {
    code: "FI",
    zones: ["FI"],
    currency: "EUR",
    currencySymbol: "€",
    solarYield: 850,
  },
  germany: {
    code: "DE",
    zones: ["DE"],
    currency: "EUR",
    currencySymbol: "€",
    solarYield: 1000,
  },
} as const;

export type CountryKey = keyof typeof countries;
export type ZoneCode = string;

interface CountryZoneSelectorProps {
  country: CountryKey;
  zone: ZoneCode;
  onCountryChange: (country: CountryKey) => void;
  onZoneChange: (zone: ZoneCode) => void;
  countryLabel?: string;
  zoneLabel?: string;
}

export function CountryZoneSelector({
  country,
  zone,
  onCountryChange,
  onZoneChange,
  countryLabel = "Country",
  zoneLabel = "Price Zone",
}: CountryZoneSelectorProps) {
  const t = useTranslations("common.countries");
  const tZones = useTranslations("common.zones");

  const countryData = countries[country];
  const zones = countryData.zones;

  const handleCountryChange = (newCountry: CountryKey) => {
    onCountryChange(newCountry);
    // Auto-select first zone of new country
    const newZones = countries[newCountry].zones;
    if (newZones.length > 0) {
      onZoneChange(newZones[0]);
    }
  };

  return (
    <div className="grid md:grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label>{countryLabel}</Label>
        <Select value={country} onValueChange={(v) => handleCountryChange(v as CountryKey)}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {(Object.keys(countries) as CountryKey[]).map((key) => (
              <SelectItem key={key} value={key}>
                {t(key)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label>{zoneLabel}</Label>
        <Select value={zone} onValueChange={onZoneChange}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {zones.map((zoneCode) => (
              <SelectItem key={zoneCode} value={zoneCode}>
                {zoneCode} - {tZones(zoneCode)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}

// Helper to get country from zone code
export function getCountryFromZone(zoneCode: string): CountryKey | null {
  for (const [countryKey, countryData] of Object.entries(countries)) {
    if (countryData.zones.includes(zoneCode as never)) {
      return countryKey as CountryKey;
    }
  }
  return null;
}

// Helper to get currency info for a country
export function getCurrencyInfo(country: CountryKey) {
  return {
    currency: countries[country].currency,
    symbol: countries[country].currencySymbol,
  };
}
