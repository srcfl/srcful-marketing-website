"use client";

import { SitesMap, type Site } from "@/components/ui/sites-map";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Zap } from "lucide-react";

// Generate 420 sites around Kalmar, Sweden
const generateKalmarSites = (): Site[] => {
  const kalmarCenter = { lat: 56.6634, lng: 16.3568 };
  const sites: Site[] = [];

  // Seed for consistent random generation
  const seededRandom = (seed: number) => {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
  };

  for (let i = 0; i < 420; i++) {
    // Spread sites within ~15km radius of Kalmar
    const angle = seededRandom(i * 3) * Math.PI * 2;
    const distance = seededRandom(i * 7) * 0.15; // ~15km in degrees
    const lat = kalmarCenter.lat + Math.cos(angle) * distance;
    const lng = kalmarCenter.lng + Math.sin(angle) * distance * 1.8; // Adjust for latitude

    // 92% live, 5% offline, 3% commissioning
    const statusRand = seededRandom(i * 11);
    const status: Site["status"] = statusRand < 0.92 ? "live" : statusRand < 0.97 ? "offline" : "commissioning";

    // Random production 2-8 kW for live sites
    const production = status === "live" ? Math.floor(2000 + seededRandom(i * 13) * 6000) : 0;

    sites.push({
      id: String(i + 1),
      name: `Site ${i + 1}`,
      status,
      coordinates: { lat, lng },
      currentProduction: production,
      address: `Kalmar area`,
    });
  }

  return sites;
};

const demoSites: Site[] = generateKalmarSites();

export function SitesOverviewExample() {
  const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || "";

  const totalProduction = demoSites.reduce((sum, site) => sum + (site.currentProduction || 0), 0);
  const onlineSites = demoSites.filter(s => s.status === "live").length;
  const offlineSites = demoSites.filter(s => s.status === "offline").length;
  const commissioningSites = demoSites.filter(s => s.status === "commissioning").length;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-4 min-h-[500px] lg:h-[700px]">
      {/* Map */}
      <div className="relative rounded-lg overflow-hidden border bg-card min-h-[300px] lg:min-h-0">
        {mapboxToken ? (
          <SitesMap
            sites={demoSites}
            mapboxToken={mapboxToken}
            className="h-full min-h-[300px]"
          />
        ) : (
          <div className="h-full min-h-[300px] flex items-center justify-center bg-muted/50">
            <div className="text-center p-8">
              <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">Map requires Mapbox token</p>
            </div>
          </div>
        )}
      </div>

      {/* Side Panel - VPP Stats */}
      <div className="flex flex-col gap-4 overflow-auto">
        {/* Summary Cards */}
        <div className="grid grid-cols-2 gap-3">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1">
                <Zap className="h-4 w-4" />
                Total Capacity
              </div>
              <div className="text-2xl font-bold">{(totalProduction / 1000).toFixed(0)} kW</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1">
                <MapPin className="h-4 w-4" />
                Total Sites
              </div>
              <div className="text-2xl font-bold">{demoSites.length}</div>
            </CardContent>
          </Card>
        </div>

        {/* VPP Status Card */}
        <Card className="flex-1">
          <CardHeader>
            <CardTitle className="text-lg">VPP Status</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Status breakdown */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-2.5 w-2.5 rounded-full bg-green-500" />
                  <span className="text-sm">Online</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">{onlineSites}</span>
                  <span className="text-xs text-muted-foreground">({((onlineSites / demoSites.length) * 100).toFixed(1)}%)</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-2.5 w-2.5 rounded-full bg-red-500" />
                  <span className="text-sm">Offline</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">{offlineSites}</span>
                  <span className="text-xs text-muted-foreground">({((offlineSites / demoSites.length) * 100).toFixed(1)}%)</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-2.5 w-2.5 rounded-full bg-yellow-500" />
                  <span className="text-sm">Commissioning</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">{commissioningSites}</span>
                  <span className="text-xs text-muted-foreground">({((commissioningSites / demoSites.length) * 100).toFixed(1)}%)</span>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t" />

            {/* VPP Metrics */}
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-muted-foreground">Avg. Site Output</span>
                  <span className="text-sm font-medium">{(totalProduction / onlineSites / 1000).toFixed(1)} kW</span>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-muted-foreground">Grid Response Time</span>
                  <span className="text-sm font-medium">&lt; 200ms</span>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-muted-foreground">Coordination Mode</span>
                  <Badge variant="default" className="text-xs">Active</Badge>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t" />

            {/* Location */}
            <div className="text-sm text-muted-foreground">
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="h-4 w-4" />
                <span className="font-medium text-foreground">Kalmar Region</span>
              </div>
              <p className="text-xs">Virtual Power Plant coordinating distributed energy resources across the Kalmar area.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
