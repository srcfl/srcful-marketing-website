"use client";

import { useEffect, useState } from "react";
import Script from "next/script";

const COOKIE_CONSENT_KEY = "sourceful-cookie-consent";
const CONSENT_VERSION = "1";

interface ConsentData {
  accepted: boolean;
  timestamp: string;
  version: string;
}

function checkConsent(): boolean {
  if (typeof window === "undefined") return false;

  try {
    const storedConsent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (storedConsent) {
      const consent: ConsentData = JSON.parse(storedConsent);
      return consent.accepted && consent.version === CONSENT_VERSION;
    }
  } catch {
    // Invalid data
  }
  return false;
}

export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  const [hasConsent, setHasConsent] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setHasConsent(checkConsent());

    // Listen for consent changes (from cookie banner or other tabs)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === COOKIE_CONSENT_KEY) {
        setHasConsent(checkConsent());
      }
    };

    // Listen for custom consent event (same tab)
    const handleConsentChange = () => {
      setHasConsent(checkConsent());
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("cookieConsentChanged", handleConsentChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("cookieConsentChanged", handleConsentChange);
    };
  }, []);

  // Don't render scripts during SSR or before consent
  if (!mounted || !hasConsent) {
    return <>{children}</>;
  }

  return (
    <>
      {children}

      {/* Google Analytics 4 + Google Ads (gtag.js) */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-BKLJLE20S1"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-BKLJLE20S1');
          gtag('config', 'AW-17553632236');
        `}
      </Script>

      {/* Reddit Pixel */}
      <Script id="reddit-pixel" strategy="afterInteractive">
        {`
          !function(w,d){if(!w.rdt){var p=w.rdt=function(){p.sendEvent?p.sendEvent.apply(p,arguments):p.callQueue.push(arguments)};p.callQueue=[];var t=d.createElement("script");t.src="https://www.redditstatic.com/ads/pixel.js",t.async=!0;var s=d.getElementsByTagName("script")[0];s.parentNode.insertBefore(t,s)}}(window,document);
          rdt('init','a2_gcboa8y9jl8g');
          rdt('track', 'PageVisit');
        `}
      </Script>

      {/* TikTok Pixel */}
      <Script id="tiktok-pixel" strategy="afterInteractive">
        {`
          !function (w, d, t) {
            w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie","holdConsent","revokeConsent","grantConsent"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(
            var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var r="https://analytics.tiktok.com/i18n/pixel/events.js",o=n&&n.partner;ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=r,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};n=document.createElement("script")
            ;n.type="text/javascript",n.async=!0,n.src=r+"?sdkid="+e+"&lib="+t;e=document.getElementsByTagName("script")[0];e.parentNode.insertBefore(n,e)};
            ttq.load('D3H4LTRC77U89SJ4PC8G');
            ttq.page();
          }(window, document, 'ttq');
        `}
      </Script>

      {/* Microsoft Clarity */}
      <Script id="microsoft-clarity" strategy="afterInteractive">
        {`
          (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "tz49u5xr9w");
        `}
      </Script>
    </>
  );
}
