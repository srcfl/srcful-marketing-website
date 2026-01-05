"use client";

import { useState } from "react";
import { SitesMap, type Site } from "@/components/ui/sites-map";
import { ComponentNav } from "@/components/component-nav";

// Demo sites data
const demoSites: Site[] = [
  {
    id: "1",
    name: "Stockholm HQ",
    status: "live",
    coordinates: { lat: 59.3293, lng: 18.0686 },
    currentProduction: 4500,
    address: "Kungsgatan 1, Stockholm",
  },
  {
    id: "2",
    name: "Gothenburg Office",
    status: "live",
    coordinates: { lat: 57.7089, lng: 11.9746 },
    currentProduction: 3200,
    address: "Avenyn 10, Gothenburg",
  },
  {
    id: "3",
    name: "Malmö Site",
    status: "offline",
    coordinates: { lat: 55.6050, lng: 13.0038 },
    currentProduction: 0,
    address: "Stortorget 5, Malmö",
  },
  {
    id: "4",
    name: "Uppsala Campus",
    status: "commissioning",
    coordinates: { lat: 59.8586, lng: 17.6389 },
    currentProduction: 1200,
    address: "Universitetsvägen 1, Uppsala",
  },
];

export default function SitesMapPage() {
  const [selectedSiteId, setSelectedSiteId] = useState<string | null>(null);
  const [hoveredSiteId, setHoveredSiteId] = useState<string | null>(null);

  // You need a Mapbox token for this component to work
  const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || "";

  return (
    <div className="space-y-8">
      <div>
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">Sites Map</h1>
        <p className="text-lg text-muted-foreground mt-2">
          Interactive map visualization for energy sites using Mapbox GL.
        </p>
      </div>

      {/* Demo */}
      <div className="space-y-4">
        <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
          Interactive Map
        </h2>
        {mapboxToken ? (
          <div className="h-[500px] rounded-lg overflow-hidden border">
            <SitesMap
              sites={demoSites}
              mapboxToken={mapboxToken}
              onSiteSelect={setSelectedSiteId}
              hoveredSiteId={hoveredSiteId}
            />
          </div>
        ) : (
          <div className="h-[500px] rounded-lg border border-dashed flex items-center justify-center bg-muted/50">
            <div className="text-center p-8">
              <p className="text-muted-foreground mb-2">
                Mapbox token required
              </p>
              <p className="text-sm text-muted-foreground">
                Add <code className="bg-muted px-1 py-0.5 rounded">NEXT_PUBLIC_MAPBOX_TOKEN</code> to your environment
              </p>
            </div>
          </div>
        )}
        {selectedSiteId && (
          <p className="text-sm text-muted-foreground">
            Selected site: <span className="font-medium">{demoSites.find(s => s.id === selectedSiteId)?.name}</span>
          </p>
        )}
      </div>

      {/* Site List */}
      <div className="space-y-4">
        <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
          Site List (hover to highlight)
        </h2>
        <div className="grid gap-2">
          {demoSites.map((site) => (
            <div
              key={site.id}
              onMouseEnter={() => setHoveredSiteId(site.id)}
              onMouseLeave={() => setHoveredSiteId(null)}
              onClick={() => setSelectedSiteId(site.id)}
              className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-colors ${
                hoveredSiteId === site.id || selectedSiteId === site.id
                  ? "border-sourceful-green-500 bg-sourceful-green-50 dark:bg-sourceful-green-950/20"
                  : "border-sourceful-gray-200 dark:border-[#252525] hover:bg-muted/50"
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className="h-3 w-3 rounded-full"
                  style={{
                    backgroundColor:
                      site.status === "live"
                        ? "#10b981"
                        : site.status === "offline"
                        ? "#ef4444"
                        : "#f59e0b",
                  }}
                />
                <div>
                  <p className="font-medium text-sm">{site.name}</p>
                  <p className="text-xs text-muted-foreground">{site.address}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium">
                  {(site.currentProduction! / 1000).toFixed(1)} kW
                </p>
                <p className="text-xs text-muted-foreground capitalize">{site.status}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Features */}
      <div className="space-y-4">
        <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
          Features
        </h2>
        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
          <li>Dark mode support with automatic style switching</li>
          <li>Status-based marker colors (live, offline, error, commissioning)</li>
          <li>Animated pulsing for offline/error sites</li>
          <li>Auto-fit bounds to show all sites</li>
          <li>Hover animation: smooth flyTo on first hover, instant jump after</li>
          <li>Custom labels showing site name and power output</li>
          <li>Interactive legend with site count</li>
        </ul>
      </div>

      {/* Usage */}
      <div className="space-y-4">
        <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
          Usage
        </h2>
        <div className="rounded-lg bg-sourceful-gray-100 dark:bg-sourceful-gray-800 border border-sourceful-gray-200 dark:border-transparent p-4 font-mono text-sm text-sourceful-gray-900 dark:text-white overflow-x-auto">
          <pre>
            <code>{`import { SitesMap, type Site } from "@/components/ui/sites-map"

const sites: Site[] = [
  {
    id: "1",
    name: "Stockholm HQ",
    status: "live",
    coordinates: { lat: 59.3293, lng: 18.0686 },
    currentProduction: 4500,
  },
  // ...more sites
]

<SitesMap
  sites={sites}
  mapboxToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
  onSiteSelect={(siteId) => console.log("Selected:", siteId)}
  hoveredSiteId={hoveredSiteId}
/>`}</code>
          </pre>
        </div>
      </div>

      {/* Dependencies */}
      <div className="space-y-4">
        <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
          Dependencies
        </h2>
        <div className="rounded-lg bg-sourceful-gray-100 dark:bg-sourceful-gray-800 border border-sourceful-gray-200 dark:border-transparent p-4 font-mono text-sm text-sourceful-gray-900 dark:text-white overflow-x-auto">
          <pre>
            <code>{`npm install react-map-gl mapbox-gl

# Add to your .env.local
NEXT_PUBLIC_MAPBOX_TOKEN=your_mapbox_token`}</code>
          </pre>
        </div>
      </div>

      <ComponentNav currentHref="/components/sites-map" />
    </div>
  );
}
