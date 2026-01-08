import type { Metadata } from "next";
import { Link } from "@/src/i18n/routing";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MarketingNav } from "@/components/marketing-nav";
import { MarketingFooter } from "@/components/marketing-footer";
import { ArrowRight, Zap, Plug, Cpu, HelpCircle, ExternalLink } from "lucide-react";

export const metadata: Metadata = {
  title: "Get Started with Sourceful",
  description: "Connect your energy devices to Sourceful. Choose your setup path for electricity meters or inverters.",
};

const deviceOptions = [
  {
    id: "meter",
    title: "Electricity Meter with P1 Port",
    subtitle: "RJ12 Connection",
    description: "Connect your Zap directly to your electricity meter's P1 data port for real-time consumption monitoring.",
    icon: Plug,
    href: "/get-started/zap",
    features: [
      "Real-time energy monitoring",
      "Peak demand alerts",
      "Historical consumption data",
      "Works with all P1-enabled meters",
    ],
    image: "/images/zap-meter.png",
  },
  {
    id: "inverter",
    title: "Inverter with Modbus TCP/IP",
    subtitle: "Wi-Fi Connection",
    description: "Connect your solar inverter via Modbus TCP/IP for production monitoring and smart optimization.",
    icon: Cpu,
    href: "/get-started/zap-for-inverters",
    features: [
      "Solar production monitoring",
      "Self-consumption optimization",
      "Export management",
      "Supports Solis, Sungrow, Deye",
    ],
    image: "/images/zap-inverter.png",
  },
];

export default function GetStartedPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <MarketingNav />

      <main className="flex-1 pt-16">
        {/* Hero */}
        <section className="relative overflow-hidden border-b">
          <div className="absolute inset-0 bg-dot-pattern" />
          <div className="relative max-w-7xl mx-auto py-24 md:py-32 px-4 md:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <Badge variant="secondary" className="mb-6">
                <Zap className="h-3 w-3 mr-1" />
                Setup Guide
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                Get Started with{" "}
                <span className="text-primary">Sourceful</span>
              </h1>
              <p className="text-xl text-muted-foreground">
                Select the type of device you want to connect. The Zap gateway works with
                both electricity meters and solar inverters.
              </p>
            </div>
          </div>
        </section>

        {/* Device Selection */}
        <section className="max-w-7xl mx-auto py-16 px-4 md:px-8">
          <div className="grid gap-8 md:grid-cols-2">
            {deviceOptions.map((option) => (
              <Card key={option.id} className="overflow-hidden group hover:shadow-lg transition-all">
                <Link href={option.href} className="block">
                  <div className="relative h-48 bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center">
                    <option.icon className="h-24 w-24 text-primary/20 group-hover:text-primary/30 transition-colors" />
                  </div>
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline">{option.subtitle}</Badge>
                    </div>
                    <CardTitle className="text-2xl group-hover:text-primary transition-colors">
                      {option.title}
                    </CardTitle>
                    <CardDescription className="text-base">
                      {option.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 mb-6">
                      {option.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Button className="w-full group-hover:bg-primary/90">
                      Start Setup
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Link>
              </Card>
            ))}
          </div>
        </section>

        {/* Compatibility Note */}
        <section className="border-t bg-muted/30">
          <div className="max-w-7xl mx-auto py-12 px-4 md:px-8">
            <div className="flex flex-col md:flex-row items-start gap-6 md:gap-12">
              <div className="flex-1">
                <h2 className="text-lg font-semibold mb-2">Device Compatibility</h2>
                <p className="text-muted-foreground">
                  Zap currently supports all meters with a P1 port (RJ12) and Solis, Sungrow,
                  and Deye inverters with Modbus TCP/IP. Check our compatibility guide for
                  the full list of supported devices.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button variant="outline" asChild>
                  <a href="https://support.sourceful.energy/en/" target="_blank" rel="noopener noreferrer">
                    <HelpCircle className="mr-2 h-4 w-4" />
                    Help Centre
                    <ExternalLink className="ml-2 h-3 w-3" />
                  </a>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/integrations">
                    View All Integrations
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Don't have a Zap? */}
        <section className="border-t">
          <div className="max-w-7xl mx-auto py-16 md:py-24 px-4 md:px-8 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Don&apos;t have a Zap yet?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              The Zap gateway is the hardware that connects your energy devices to Sourceful.
              It&apos;s small, affordable, and easy to install.
            </p>
            <Button size="lg" asChild>
              <Link href="/zap">
                Get the Zap
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>
      </main>

      <MarketingFooter />
    </div>
  );
}
