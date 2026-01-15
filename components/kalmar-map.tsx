"use client";

import { useState, useRef, useEffect } from "react";
import { Map, Marker } from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";

// Kalmar, Sweden coordinates
const KALMAR_COORDS = {
  lat: 56.6634,
  lng: 16.3566,
};

interface KalmarMapProps {
  className?: string;
}

export function KalmarMap({ className }: KalmarMapProps) {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof document !== "undefined") {
      return document.documentElement.classList.contains("dark");
    }
    return false;
  });
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const mapRef = useRef<any>(null);

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
              newIsDarkMode
                ? "mapbox://styles/mapbox/dark-v11"
                : "mapbox://styles/mapbox/light-v11",
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

  const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

  if (!mapboxToken) {
    return (
      <div className={`bg-muted rounded-xl flex items-center justify-center ${className}`}>
        <span className="text-muted-foreground text-sm">Map unavailable</span>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden rounded-xl ${className}`}>
      {/* Loading state */}
      {!isMapLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted z-10">
          <div className="text-sm text-muted-foreground">Loading map...</div>
        </div>
      )}

      <Map
        ref={mapRef}
        mapboxAccessToken={mapboxToken}
        initialViewState={{
          latitude: KALMAR_COORDS.lat,
          longitude: KALMAR_COORDS.lng,
          zoom: 11,
        }}
        style={{ width: "100%", height: "100%" }}
        mapStyle={
          isDarkMode
            ? "mapbox://styles/mapbox/dark-v11"
            : "mapbox://styles/mapbox/light-v11"
        }
        attributionControl={false}
        interactive={false}
        onLoad={() => setIsMapLoaded(true)}
        fadeDuration={0}
      >
        <Marker
          latitude={KALMAR_COORDS.lat}
          longitude={KALMAR_COORDS.lng}
          anchor="center"
        >
          <div className="relative">
            {/* Outer pulsing ring */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="w-16 h-16 rounded-full bg-primary/20 animate-ping" />
            </div>
            {/* Middle ring */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="w-10 h-10 rounded-full bg-primary/30 animate-pulse" />
            </div>
            {/* Center dot */}
            <div className="relative w-5 h-5 rounded-full bg-primary border-3 border-background shadow-lg" />
          </div>
        </Marker>
      </Map>

    </div>
  );
}
