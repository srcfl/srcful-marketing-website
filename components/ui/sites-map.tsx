"use client";

import { useState, useMemo, useCallback, useRef, useEffect } from "react";
import { Map, Marker } from "react-map-gl/mapbox";
import { cn } from "@/lib/utils";
import { Plus, Minus, Compass } from "lucide-react";
import "mapbox-gl/dist/mapbox-gl.css";

export interface Site {
  id: string;
  name: string;
  status: "live" | "offline" | "error" | "commissioning";
  coordinates: { lat: number; lng: number };
  currentProduction?: number; // in W
  address?: string;
}

interface SitesMapProps {
  sites: Site[];
  onSiteSelect?: (siteId: string) => void;
  hoveredSiteId?: string | null;
  mapboxToken: string;
  className?: string;
}

export function SitesMap({
  sites,
  onSiteSelect,
  hoveredSiteId,
  mapboxToken,
  className
}: SitesMapProps) {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof document !== 'undefined') {
      return document.documentElement.classList.contains("dark");
    }
    return false;
  });
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const mapRef = useRef<any>(null);
  const hasHoveredRef = useRef(false);

  // Detect theme changes
  useEffect(() => {
    const checkTheme = () => {
      const newIsDarkMode = document.documentElement.classList.contains("dark");
      if (newIsDarkMode !== isDarkMode) {
        setIsDarkMode(newIsDarkMode);
        if (mapRef.current) {
          const map = mapRef.current.getMap();
          if (map) {
            map.setStyle(
              newIsDarkMode ? "mapbox://styles/mapbox/dark-v11" : "mapbox://styles/mapbox/light-v11",
              { diff: false }
            );
          }
        }
      }
    };

    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, [isDarkMode]);

  // Fit map bounds to show all sites
  useEffect(() => {
    if (!isMapLoaded || !mapRef.current || sites.length === 0) return;

    const map = mapRef.current.getMap();
    if (!map) return;

    if (sites.length === 1) {
      const site = sites[0];
      map.flyTo({
        center: [site.coordinates.lng, site.coordinates.lat],
        zoom: 14,
        duration: 1000,
      });
    } else {
      const lats = sites.map(s => s.coordinates.lat);
      const lngs = sites.map(s => s.coordinates.lng);

      const bounds = [
        [Math.min(...lngs), Math.min(...lats)],
        [Math.max(...lngs), Math.max(...lats)],
      ];

      map.fitBounds(bounds as any, {
        padding: { top: 80, bottom: 80, left: 80, right: 80 },
        duration: 1000,
        maxZoom: 14,
      });
    }
  }, [isMapLoaded, sites]);

  // Animate to hovered site
  useEffect(() => {
    if (!isMapLoaded || !mapRef.current) return;

    if (!hoveredSiteId) {
      hasHoveredRef.current = false;
      return;
    }

    const map = mapRef.current.getMap();
    if (!map) return;

    const hoveredSite = sites.find(s => s.id === hoveredSiteId);
    if (!hoveredSite) return;

    if (!hasHoveredRef.current) {
      hasHoveredRef.current = true;
      map.flyTo({
        center: [hoveredSite.coordinates.lng, hoveredSite.coordinates.lat],
        zoom: 15,
        duration: 1200,
        essential: true,
      });
    } else {
      map.jumpTo({
        center: [hoveredSite.coordinates.lng, hoveredSite.coordinates.lat],
      });
    }
  }, [hoveredSiteId, isMapLoaded, sites]);

  // Calculate map bounds
  const { center, zoom } = useMemo(() => {
    if (sites.length === 0) {
      return { center: { lat: 59.3293, lng: 18.0686 }, zoom: 10 };
    }

    const lats = sites.map(s => s.coordinates.lat);
    const lngs = sites.map(s => s.coordinates.lng);

    const avgLat = lats.reduce((a, b) => a + b, 0) / lats.length;
    const avgLng = lngs.reduce((a, b) => a + b, 0) / lngs.length;

    const latSpread = Math.max(...lats) - Math.min(...lats);
    const lngSpread = Math.max(...lngs) - Math.min(...lngs);
    const maxSpread = Math.max(latSpread, lngSpread);

    let zoom = 12;
    if (maxSpread < 0.01) zoom = 14;
    else if (maxSpread < 0.05) zoom = 13;
    else if (maxSpread < 0.1) zoom = 12;
    else if (maxSpread < 0.5) zoom = 10;
    else if (maxSpread < 2) zoom = 8;
    else zoom = 6;

    return { center: { lat: avgLat, lng: avgLng }, zoom };
  }, [sites]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "live":
        return "#10b981";
      case "offline":
        return "#ef4444";
      case "error":
        return "#dc2626";
      case "commissioning":
        return "#f59e0b";
      default:
        return "#6b7280";
    }
  };

  const handleSiteClick = useCallback((siteId: string) => {
    onSiteSelect?.(siteId);
  }, [onSiteSelect]);

  const handleZoomIn = useCallback(() => {
    if (mapRef.current) {
      const map = mapRef.current.getMap();
      map?.zoomIn({ duration: 300 });
    }
  }, []);

  const handleZoomOut = useCallback(() => {
    if (mapRef.current) {
      const map = mapRef.current.getMap();
      map?.zoomOut({ duration: 300 });
    }
  }, []);

  const handleResetNorth = useCallback(() => {
    if (mapRef.current) {
      const map = mapRef.current.getMap();
      map?.resetNorth({ duration: 300 });
    }
  }, []);

  return (
    <div className={cn("relative w-full h-full overflow-hidden bg-sourceful-gray-100 dark:bg-[#0a0a0a] rounded-lg", className)}>
      {/* Loading state */}
      {!isMapLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-sourceful-gray-100 dark:bg-[#0a0a0a]">
          <div className="text-sm text-sourceful-gray-500 dark:text-sourceful-gray-400">Loading map...</div>
        </div>
      )}

      {/* Map View */}
      <div className="absolute inset-0">
        <Map
          ref={mapRef}
          mapboxAccessToken={mapboxToken}
          initialViewState={{
            latitude: center.lat,
            longitude: center.lng,
            zoom,
          }}
          style={{ width: "100%", height: "100%" }}
          mapStyle={isDarkMode ? "mapbox://styles/mapbox/dark-v11" : "mapbox://styles/mapbox/light-v11"}
          attributionControl={false}
          maxZoom={22}
          minZoom={1}
          onLoad={() => setIsMapLoaded(true)}
          fadeDuration={0}
        >
          {sites.map((site) => {
            const color = getStatusColor(site.status);

            return (
              <Marker
                key={site.id}
                latitude={site.coordinates.lat}
                longitude={site.coordinates.lng}
                anchor="center"
              >
                <div className="relative group">
                  {/* Pulsing ring - only for offline/error sites */}
                  {(site.status === 'offline' || site.status === 'error') && (
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                      <div
                        className="w-8 h-8 aspect-square rounded-full animate-ping"
                        style={{
                          backgroundColor: color,
                          opacity: 0.6,
                        }}
                      />
                    </div>
                  )}

                  {/* Dot */}
                  <button
                    onClick={() => handleSiteClick(site.id)}
                    className="relative h-5 w-5 aspect-square rounded-full border-2 border-white dark:border-[#141414] shadow-lg transition-transform hover:scale-125 cursor-pointer z-10"
                    style={{ backgroundColor: color }}
                  />

                  {/* Label - always visible */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full mb-3 pointer-events-none">
                    <div className="relative">
                      {/* Arrow pointing down */}
                      <div
                        className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-white dark:border-t-[#1a1a1a]"
                        style={{
                          filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.1))",
                        }}
                      />

                      {/* Label box */}
                      <div className="bg-white dark:bg-[#1a1a1a] px-2.5 py-1.5 rounded-md shadow-lg border border-sourceful-gray-200 dark:border-[#2a2a2a] whitespace-nowrap">
                        <div className="text-xs font-medium text-sourceful-gray-900 dark:text-white">
                          {site.name}
                        </div>
                        <div className="text-xs text-sourceful-gray-500 dark:text-sourceful-gray-400 flex items-center gap-1">
                          <span className="inline-block h-1.5 w-1.5 rounded-full" style={{ backgroundColor: color }} />
                          {site.currentProduction !== undefined
                            ? `${(site.currentProduction / 1000).toFixed(1)} kW`
                            : site.status}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Marker>
            );
          })}
        </Map>

        {/* Custom Controls */}
        <div className="absolute bottom-[10px] left-[10px] z-10">
          <div className="flex flex-col bg-white dark:bg-[#141414] border border-sourceful-gray-200 dark:border-[#262626] rounded-lg shadow-sm overflow-hidden">
            <button
              onClick={handleZoomIn}
              className="p-2 hover:bg-sourceful-gray-100 dark:hover:bg-[#262626] transition-colors"
              title="Zoom in"
            >
              <Plus className="h-4 w-4" />
            </button>
            <button
              onClick={handleZoomOut}
              className="p-2 hover:bg-sourceful-gray-100 dark:hover:bg-[#262626] transition-colors border-t border-sourceful-gray-200 dark:border-[#262626]"
              title="Zoom out"
            >
              <Minus className="h-4 w-4" />
            </button>
            <button
              onClick={handleResetNorth}
              className="p-2 hover:bg-sourceful-gray-100 dark:hover:bg-[#262626] transition-colors border-t border-sourceful-gray-200 dark:border-[#262626]"
              title="Reset north"
            >
              <Compass className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Legend */}
        <div className="absolute bottom-[10px] right-[16px] bg-white/95 dark:bg-[#1a1a1a]/95 backdrop-blur-sm rounded-lg shadow-lg border border-sourceful-gray-200 dark:border-[#2a2a2a] p-3">
          <div className="text-xs font-medium text-sourceful-gray-900 dark:text-white mb-2">
            Sites ({sites.length})
          </div>
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-sourceful-green-500" />
              <span className="text-xs text-sourceful-gray-600 dark:text-sourceful-gray-400">Online</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-red-500" />
              <span className="text-xs text-sourceful-gray-600 dark:text-sourceful-gray-400">Offline</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-sourceful-yellow-500" />
              <span className="text-xs text-sourceful-gray-600 dark:text-sourceful-gray-400">Setup</span>
            </div>
          </div>
          <div className="mt-2 pt-2 border-t border-sourceful-gray-200 dark:border-[#2a2a2a] text-xs text-sourceful-gray-500 dark:text-sourceful-gray-400">
            Click a site to select
          </div>
        </div>
      </div>
    </div>
  );
}
