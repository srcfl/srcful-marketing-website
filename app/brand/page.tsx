import { SiteHeader } from "@/components/site-header";

const colors = [
  { name: "Green 50", value: "#f0fdf4", variable: "--sourceful-green-50" },
  { name: "Green 100", value: "#dcfce7", variable: "--sourceful-green-100" },
  { name: "Green 200", value: "#bbf7d0", variable: "--sourceful-green-200" },
  { name: "Green 300", value: "#86efac", variable: "--sourceful-green-300" },
  { name: "Green 400", value: "#4ade80", variable: "--sourceful-green-400" },
  { name: "Green 500", value: "#22c55e", variable: "--sourceful-green-500", primary: true },
  { name: "Green 600", value: "#16a34a", variable: "--sourceful-green-600" },
  { name: "Green 700", value: "#15803d", variable: "--sourceful-green-700" },
  { name: "Green 800", value: "#166534", variable: "--sourceful-green-800" },
  { name: "Green 900", value: "#14532d", variable: "--sourceful-green-900" },
];

const yellowColors = [
  { name: "Yellow 50", value: "#fefce8", variable: "--sourceful-yellow-50" },
  { name: "Yellow 100", value: "#fef9c3", variable: "--sourceful-yellow-100" },
  { name: "Yellow 200", value: "#fef08a", variable: "--sourceful-yellow-200" },
  { name: "Yellow 300", value: "#fde047", variable: "--sourceful-yellow-300" },
  { name: "Yellow 400", value: "#facc15", variable: "--sourceful-yellow-400", primary: true },
  { name: "Yellow 500", value: "#eab308", variable: "--sourceful-yellow-500" },
  { name: "Yellow 600", value: "#ca8a04", variable: "--sourceful-yellow-600" },
  { name: "Yellow 700", value: "#a16207", variable: "--sourceful-yellow-700" },
];

const grayColors = [
  { name: "Gray 50", value: "#f9fafb", variable: "--sourceful-gray-50" },
  { name: "Gray 100", value: "#f3f4f6", variable: "--sourceful-gray-100" },
  { name: "Gray 200", value: "#e5e7eb", variable: "--sourceful-gray-200" },
  { name: "Gray 300", value: "#d1d5db", variable: "--sourceful-gray-300" },
  { name: "Gray 400", value: "#9ca3af", variable: "--sourceful-gray-400" },
  { name: "Gray 500", value: "#6b7280", variable: "--sourceful-gray-500" },
  { name: "Gray 600", value: "#4b5563", variable: "--sourceful-gray-600" },
  { name: "Gray 700", value: "#374151", variable: "--sourceful-gray-700" },
  { name: "Gray 800", value: "#1f2937", variable: "--sourceful-gray-800" },
  { name: "Gray 900", value: "#111827", variable: "--sourceful-gray-900" },
  { name: "Gray 950", value: "#030712", variable: "--sourceful-gray-950" },
];

function ColorSwatch({ name, value, variable, primary }: { name: string; value: string; variable: string; primary?: boolean }) {
  return (
    <div className="space-y-1.5">
      <div
        className="h-16 w-full rounded-lg border"
        style={{ backgroundColor: value }}
      />
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">{name}</span>
        {primary && (
          <span className="text-xs bg-sourceful-green-500/10 text-sourceful-green-500 px-1.5 py-0.5 rounded">
            Primary
          </span>
        )}
      </div>
      <div className="text-xs text-muted-foreground font-mono">{value}</div>
      <div className="text-xs text-muted-foreground font-mono">{variable}</div>
    </div>
  );
}

export default function BrandPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1 container py-8">
        <div className="space-y-12 max-w-5xl">
          {/* Header */}
          <div>
            <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">
              Brand Guidelines
            </h1>
            <p className="text-lg text-muted-foreground mt-2">
              Visual identity, colors, typography, and voice guidelines for Sourceful Energy.
            </p>
          </div>

          {/* Logo */}
          <section className="space-y-4">
            <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
              Logo
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-lg border p-8 flex items-center justify-center bg-white">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full bg-sourceful-green-500" />
                  <span className="text-2xl font-bold text-sourceful-gray-900">Sourceful</span>
                </div>
              </div>
              <div className="rounded-lg border p-8 flex items-center justify-center bg-sourceful-gray-950">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full bg-sourceful-green-500" />
                  <span className="text-2xl font-bold text-white">Sourceful</span>
                </div>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              The Sourceful logo consists of the green circle mark and the wordmark.
              Maintain clear space around the logo equal to the height of the circle.
            </p>
          </section>

          {/* Colors - Primary */}
          <section className="space-y-4">
            <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
              Primary Colors
            </h2>
            <p className="text-muted-foreground">
              Green is our primary brand color, representing energy, growth, and sustainability.
              Green 500 is the primary shade used for interactive elements.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
              {colors.map((color) => (
                <ColorSwatch key={color.name} {...color} />
              ))}
            </div>
          </section>

          {/* Colors - Accent */}
          <section className="space-y-4">
            <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
              Accent Colors
            </h2>
            <p className="text-muted-foreground">
              Yellow is our accent color, used sparingly for highlights, warnings, and energy-related visualizations.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {yellowColors.map((color) => (
                <ColorSwatch key={color.name} {...color} />
              ))}
            </div>
          </section>

          {/* Colors - Neutral */}
          <section className="space-y-4">
            <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
              Neutral Colors
            </h2>
            <p className="text-muted-foreground">
              Gray scale for text, backgrounds, and borders. Use Gray 900 for primary text,
              Gray 600 for secondary text, and lighter shades for backgrounds.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-6 gap-4">
              {grayColors.map((color) => (
                <ColorSwatch key={color.name} {...color} />
              ))}
            </div>
          </section>

          {/* Typography */}
          <section className="space-y-4">
            <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
              Typography
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-2">Inter (Sans-serif)</h3>
                <p className="text-muted-foreground mb-4">
                  Used for all UI text, headings, and body copy.
                </p>
                <div className="space-y-2 rounded-lg border p-6">
                  <p className="text-4xl font-bold">The quick brown fox</p>
                  <p className="text-2xl font-semibold">The quick brown fox jumps</p>
                  <p className="text-lg">The quick brown fox jumps over the lazy dog</p>
                  <p className="text-base text-muted-foreground">The quick brown fox jumps over the lazy dog</p>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">JetBrains Mono (Monospace)</h3>
                <p className="text-muted-foreground mb-4">
                  Used for code, technical values, and data displays.
                </p>
                <div className="rounded-lg border p-6">
                  <p className="font-mono text-lg">const energy = await grid.optimize();</p>
                  <p className="font-mono text-base text-muted-foreground">192.168.1.1 • 2.4 kWh • 98.5%</p>
                </div>
              </div>
            </div>
          </section>

          {/* Voice & Tone */}
          <section className="space-y-4">
            <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
              Voice & Tone
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-lg border p-6 space-y-2">
                <h3 className="font-semibold text-sourceful-green-500">We are</h3>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• Clear and direct</li>
                  <li>• Technically precise</li>
                  <li>• Confident but not arrogant</li>
                  <li>• Helpful and supportive</li>
                  <li>• Forward-thinking</li>
                </ul>
              </div>
              <div className="rounded-lg border p-6 space-y-2">
                <h3 className="font-semibold text-destructive">We are not</h3>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• Jargon-heavy</li>
                  <li>• Condescending</li>
                  <li>• Overly casual</li>
                  <li>• Vague or ambiguous</li>
                  <li>• Sensationalist</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Mission */}
          <section className="space-y-4">
            <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
              Mission Statement
            </h2>
            <blockquote className="border-l-4 border-sourceful-green-500 pl-6 py-2 text-xl italic">
              &ldquo;Building local energy coordination infrastructure — the physical rails
              that make distributed energy work.&rdquo;
            </blockquote>
            <p className="text-muted-foreground">
              We believe in physics before code, simple over clever, and local over cloud.
              Our technology enables sub-200ms edge control because grid frequency must
              balance every second — and cloud APIs simply cannot meet this requirement.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
