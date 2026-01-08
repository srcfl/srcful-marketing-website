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
  Plug,
  Wifi,
  Smartphone,
  Zap,
  HelpCircle,
  ExternalLink,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Setup Guide: Zap with P1 Meter",
  description: "Step-by-step guide to connect your Zap to an electricity meter with P1 port.",
};

const steps = [
  {
    number: 1,
    title: "Enable P1 Port on Your Meter",
    icon: Plug,
    description:
      "Contact your grid operator (e.g., Ellevio, Vattenfall, E.ON) to enable the P1 (RJ12) data port. This can often be done via their website or by calling their support team for remote activation.",
    tips: [
      "Most grid operators can enable P1 remotely within 24-48 hours",
      "The service is usually free of charge",
      "You may need your meter ID (found on the meter itself)",
    ],
    warning: {
      title: "Safety Warning",
      message:
        "Do not tamper with your electricity meter. Only connect devices to the designated P1 port. Read the Safety Information before setup.",
    },
  },
  {
    number: 2,
    title: "Connect Zap to Energy Meter",
    icon: Zap,
    description:
      "Once your grid operator confirms P1 data is enabled, connect the Zap device to your electricity meter using the included RJ12 cable. The P1 port is typically located on the front or bottom of your meter.",
    tips: [
      "The Zap powers itself from the P1 port—no separate power needed",
      "Make sure the cable clicks securely into place",
      "Position the Zap within range of your Wi-Fi router",
    ],
  },
  {
    number: 3,
    title: "Check LED Indicators",
    icon: CheckCircle,
    description:
      "After connection, verify these lights activate on your Zap device:",
    leds: [
      { color: "green", label: "Power LED", status: "Solid on" },
      { color: "blue", label: "Status LED", status: "Lit (setup mode)" },
    ],
    tips: [
      "If no lights appear, check the cable connection",
      "The blue LED indicates the device is ready for setup",
    ],
  },
  {
    number: 4,
    title: "Verify Data Transfer",
    icon: Wifi,
    description:
      "The green data LED should start blinking when receiving meter data. This indicates your meter is sending consumption data to the Zap.",
    tips: [
      "This step might take a few minutes",
      "The LED blinks each time data is received (typically every 10 seconds)",
      "If it doesn't blink, your P1 port may not be enabled yet",
    ],
  },
  {
    number: 5,
    title: "Download and Configure App",
    icon: Smartphone,
    description:
      "Download the Sourceful Energy app from the App Store or Google Play. Create your account and register your Zap following the on-screen instructions.",
    tips: [
      "Make sure Bluetooth is enabled on your phone",
      "Keep your phone close to the Zap during setup",
      "You'll need to connect the Zap to your Wi-Fi network",
    ],
    appLinks: true,
  },
  {
    number: 6,
    title: "Completion Verification",
    icon: CheckCircle,
    description:
      "When fully operational, your Zap and app should show the following:",
    leds: [
      { color: "green", label: "Power LED", status: "Solid on" },
      { color: "green", label: "Data LED", status: "Blinks every ~10 seconds" },
      { color: "blue", label: "Status LED", status: "Off (normal operation)" },
    ],
    tips: [
      "The app should display real-time energy consumption",
      "Bluetooth automatically disconnects after setup",
      "The Zap now communicates via Wi-Fi",
    ],
  },
];

export default function ZapSetupPage() {
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
              <Plug className="h-3 w-3 mr-1" />
              P1 Meter Setup
            </Badge>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
              Connect Zap to Your{" "}
              <span className="text-primary">Electricity Meter</span>
            </h1>

            <p className="text-lg text-muted-foreground max-w-2xl">
              Follow this 6-step guide to connect your Zap gateway to an electricity
              meter with a P1 (RJ12) port. Setup typically takes 10-15 minutes.
            </p>
          </div>
        </section>

        {/* Steps */}
        <section className="max-w-4xl mx-auto py-12 px-4 md:px-8">
          <div className="space-y-8">
            {steps.map((step, index) => (
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

                  {step.warning && (
                    <Alert variant="destructive" className="mb-4">
                      <AlertTriangle className="h-4 w-4" />
                      <AlertTitle>{step.warning.title}</AlertTitle>
                      <AlertDescription>{step.warning.message}</AlertDescription>
                    </Alert>
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
                  troubleshooting guides or join our community for support.
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
              Once connected, explore the Sourceful app to monitor your energy usage,
              set up alerts, and start optimizing your consumption.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild>
                <Link href="/platform">
                  Explore the Platform
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/get-started/zap-for-inverters">
                  Connect an Inverter
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <MarketingFooter />
    </div>
  );
}
