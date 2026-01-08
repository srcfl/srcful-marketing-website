import type { Metadata } from "next";
import { Link } from "@/src/i18n/routing";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { MarketingNav } from "@/components/marketing-nav";
import { MarketingFooter } from "@/components/marketing-footer";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  AlertTriangle,
  Cpu,
  Wifi,
  Smartphone,
  Zap,
  HelpCircle,
  ExternalLink,
  Info,
  Battery,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Setup Guide: Zap with Inverter",
  description: "Step-by-step guide to connect your Zap to a solar inverter via Modbus TCP/IP.",
};

const supportedInverters = [
  { name: "Solis", models: "All hybrid and string inverters" },
  { name: "Sungrow", models: "SH and SG series" },
  { name: "Deye", models: "Sun-series hybrid inverters" },
];

const steps = [
  {
    number: 1,
    title: "Locate Inverter Network Settings",
    icon: Cpu,
    description:
      "Gather your inverter's network settings: IP address, Unit ID, and Port Number. These can typically be found on the inverter's display or through your installer.",
    tips: [
      "IP Address: Usually starts with 192.168.x.x",
      "Unit ID: Often 1 or 247 (check your inverter's documentation)",
      "Port: Typically 502 for Modbus TCP",
    ],
    info: {
      title: "Modbus TCP Required",
      message:
        "If Modbus TCP is not enabled on your inverter, ask your installer to enable it or check our configuration guides. Some inverters require direct RS485 wired connections instead.",
    },
  },
  {
    number: 2,
    title: "Power the Zap Device",
    icon: Battery,
    description: "The Zap needs power to operate. You have two options:",
    options: [
      {
        title: "Option A: P1 Meter Port",
        description: "Connect to your electricity meter's P1 (RJ12) port for power and meter data",
      },
      {
        title: "Option B: USB-C Power",
        description: "Use any USB-C power source: phone charger, computer, or inverter's USB port",
      },
    ],
    tips: [
      "The Zap must remain within range of your Wi-Fi router",
      "If using USB-C, ensure the power source is always on",
      "P1 connection provides both power AND meter data",
    ],
  },
  {
    number: 3,
    title: "Check LED Indicators",
    icon: CheckCircle,
    description:
      "After powering on, verify these lights activate on your Zap device:",
    leds: [
      { color: "green", label: "Power LED", status: "Solid on" },
      { color: "blue", label: "Status LED", status: "Lit (setup mode)" },
    ],
    tips: [
      "If no lights appear, check the power connection",
      "The blue LED indicates the device is ready for setup",
      "Troubleshooting guide available in our Help Centre",
    ],
  },
  {
    number: 4,
    title: "Download the Sourceful App",
    icon: Smartphone,
    description:
      "Install the Sourceful Energy app from the App Store or Google Play Store. Create an account and register your Zap device following on-screen prompts.",
    tips: [
      "Bluetooth must be enabled on your phone",
      "Keep your phone close to the Zap during setup",
      "You'll connect the Zap to your Wi-Fi network through the app",
    ],
    appLinks: true,
  },
  {
    number: 5,
    title: "Connect Your Inverter",
    icon: Wifi,
    description:
      "In the app, select 'Add an Energy Device' and enter the network settings from Step 1. The app will connect to your inverter via Modbus TCP.",
    tips: [
      "Make sure the Zap and inverter are on the same network",
      "Enter the IP address, port, and unit ID exactly as found in Step 1",
      "The system supports up to three DERs (at least one must be an energy meter)",
    ],
    info: {
      title: "Multiple Devices",
      message:
        "You can connect multiple energy devices (solar, battery, meter) to a single Zap. Add them one at a time through the app.",
    },
  },
  {
    number: 6,
    title: "Verify Successful Connection",
    icon: CheckCircle,
    description:
      "When fully operational, your Zap and app should show the following:",
    leds: [
      { color: "green", label: "Power LED", status: "Solid on" },
      { color: "green", label: "Data LED", status: "Blinks every ~10 seconds" },
      { color: "blue", label: "Status LED", status: "Off (normal operation)" },
    ],
    tips: [
      "The app should display real-time solar production data",
      "Bluetooth automatically disconnects after setup",
      "The Zap now communicates via Wi-Fi",
    ],
  },
];

export default function ZapForInvertersPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <MarketingNav />

      <main className="flex-1 pt-16">
        {/* Hero */}
        <section className="relative overflow-hidden border-b">
          <div className="absolute inset-0 bg-dot-pattern" />
          <div className="relative max-w-4xl mx-auto py-16 md:py-24 px-4 md:px-8">
            <Link
              href="/get-started"
              className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to Device Selection
            </Link>

            <Badge variant="secondary" className="mb-4">
              <Cpu className="h-3 w-3 mr-1" />
              Inverter Setup
            </Badge>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
              Connect Zap to Your{" "}
              <span className="text-primary">Solar Inverter</span>
            </h1>

            <p className="text-lg text-muted-foreground max-w-2xl">
              Follow this 6-step guide to connect your Zap gateway to a solar inverter
              via Modbus TCP/IP. Setup typically takes 15-20 minutes.
            </p>

            {/* Supported Inverters */}
            <div className="mt-8 p-4 bg-muted/50 rounded-lg">
              <h3 className="font-medium mb-3">Supported Inverters:</h3>
              <div className="flex flex-wrap gap-4">
                {supportedInverters.map((inv) => (
                  <div key={inv.name} className="flex items-center gap-2">
                    <Badge variant="outline">{inv.name}</Badge>
                    <span className="text-sm text-muted-foreground">{inv.models}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Steps */}
        <section className="max-w-4xl mx-auto py-12 px-4 md:px-8">
          <div className="space-y-8">
            {steps.map((step) => (
              <Card key={step.number} className="overflow-hidden">
                <CardHeader className="bg-muted/30">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary text-primary-foreground font-bold text-lg">
                      {step.number}
                    </div>
                    <div>
                      <CardTitle className="text-xl">{step.title}</CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <p className="text-muted-foreground mb-4">{step.description}</p>

                  {step.info && (
                    <Alert className="mb-4">
                      <Info className="h-4 w-4" />
                      <AlertTitle>{step.info.title}</AlertTitle>
                      <AlertDescription>{step.info.message}</AlertDescription>
                    </Alert>
                  )}

                  {step.options && (
                    <div className="grid gap-3 mb-4">
                      {step.options.map((option, i) => (
                        <div key={i} className="bg-muted/50 rounded-lg p-4">
                          <h4 className="font-medium mb-1">{option.title}</h4>
                          <p className="text-sm text-muted-foreground">{option.description}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {step.leds && (
                    <div className="bg-muted/50 rounded-lg p-4 mb-4">
                      <h4 className="font-medium mb-3">LED Status:</h4>
                      <div className="space-y-2">
                        {step.leds.map((led, i) => (
                          <div key={i} className="flex items-center gap-3">
                            <div
                              className={`h-3 w-3 rounded-full ${
                                led.color === "green"
                                  ? "bg-green-500"
                                  : led.color === "blue"
                                  ? "bg-blue-500"
                                  : "bg-gray-500"
                              }`}
                            />
                            <span className="font-medium">{led.label}:</span>
                            <span className="text-muted-foreground">{led.status}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {step.tips && (
                    <div className="space-y-2">
                      {step.tips.map((tip, i) => (
                        <div key={i} className="flex items-start gap-2 text-sm">
                          <CheckCircle className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                          <span className="text-muted-foreground">{tip}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {step.appLinks && (
                    <div className="flex gap-3 mt-4">
                      <Button variant="outline" asChild>
                        <a
                          href="https://apps.apple.com/app/sourceful-energy"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          App Store
                          <ExternalLink className="ml-2 h-3 w-3" />
                        </a>
                      </Button>
                      <Button variant="outline" asChild>
                        <a
                          href="https://play.google.com/store/apps/details?id=energy.sourceful"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Google Play
                          <ExternalLink className="ml-2 h-3 w-3" />
                        </a>
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Help Section */}
        <section className="border-t bg-muted/30">
          <div className="max-w-4xl mx-auto py-12 px-4 md:px-8">
            <div className="flex flex-col md:flex-row items-start gap-6 md:gap-12">
              <div className="flex-1">
                <h2 className="text-lg font-semibold mb-2">Need Help?</h2>
                <p className="text-muted-foreground">
                  If you encounter any issues during setup, check our Help Centre for
                  inverter-specific configuration guides or join our community for support.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button variant="outline" asChild>
                  <a
                    href="https://support.sourceful.energy/en/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <HelpCircle className="mr-2 h-4 w-4" />
                    Help Centre
                    <ExternalLink className="ml-2 h-3 w-3" />
                  </a>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/community">Join Community</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Next Steps */}
        <section className="border-t">
          <div className="max-w-4xl mx-auto py-16 px-4 md:px-8 text-center">
            <h2 className="text-2xl font-bold mb-4">What&apos;s Next?</h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Once connected, explore the Sourceful app to monitor your solar production,
              optimize self-consumption, and manage grid exports.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild>
                <Link href="/platform">
                  Explore the Platform
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/get-started/zap">Connect a P1 Meter</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <MarketingFooter />
    </div>
  );
}
