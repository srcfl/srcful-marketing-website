import type { Metadata } from "next";
import localFont from "next/font/local";
import { JetBrains_Mono, Lexend } from "next/font/google";
import "@sourceful-energy/ui/styles.css";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import { DesignSystemProvider } from "@/components/design-system-provider";
import { Toaster } from "@/components/ui/sonner";
import { LenisProvider } from "@/components/lenis-provider";
import { AuthProvider } from "@/components/auth-provider";
import { IntercomProvider } from "@/components/intercom-provider";
import { CookieConsent } from "@/components/cookie-consent";
import { AnalyticsProvider } from "@/components/analytics-provider";
import { CartProvider } from "@/components/shop";

const satoshi = localFont({
  src: [
    {
      path: "../public/fonts/Satoshi-Variable.woff2",
      style: "normal",
    },
    {
      path: "../public/fonts/Satoshi-VariableItalic.woff2",
      style: "italic",
    },
  ],
  variable: "--font-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

const lexend = Lexend({
  subsets: ["latin"],
  variable: "--font-dyslexic",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Sourceful Energy - Local Energy Coordination Infrastructure",
    template: "%s | Sourceful Energy",
  },
  description: "The physical rails that make distributed energy work. Local execution at 200ms for utilities, homeowners, and developers.",
  keywords: ["energy", "distributed energy", "smart grid", "V2X", "solar", "EV charging", "home battery", "energy coordination"],
  authors: [{ name: "Sourceful Energy" }],
  creator: "Sourceful Energy",
  publisher: "Sourceful Energy",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://sourceful.energy",
    siteName: "Sourceful Energy",
    title: "Sourceful Energy - Local Energy Coordination Infrastructure",
    description: "The physical rails that make distributed energy work. Local execution at 200ms for utilities, homeowners, and developers.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sourceful Energy",
    description: "The physical rails that make distributed energy work.",
    creator: "@srcful",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          satoshi.variable,
          jetbrainsMono.variable,
          lexend.variable
        )}
      >
        <AuthProvider>
          <CartProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange={false}
            >
              <DesignSystemProvider defaultTheme="elevated">
                <LenisProvider>
                  <IntercomProvider>
                    {children}
                  </IntercomProvider>
                </LenisProvider>
                <CookieConsent />
                <AnalyticsProvider>
                  <Toaster />
                </AnalyticsProvider>
              </DesignSystemProvider>
            </ThemeProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
