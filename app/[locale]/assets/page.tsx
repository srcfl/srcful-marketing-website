"use client";

import { useState } from "react";
import {
  PixelGrid,
  PixelGridShowcase,
  PixelGridColorComparison,
  PixelGridSizeComparison,
  type PixelGridColor,
  type PatternType,
} from "@/components/ui/pixel-grid";

export default function AssetsPage() {
  const [selectedColor, setSelectedColor] = useState<PixelGridColor>("blue");
  const [selectedPattern, setSelectedPattern] = useState<PatternType>("frame");

  const colors: PixelGridColor[] = ["blue", "pink", "green"];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-3xl font-bold tracking-tight mb-2">
            Design Assets
          </h1>
          <p className="text-muted-foreground">
            A collection of animated components and design elements for internal
            reference.
          </p>
        </div>

        {/* Pixel Grid Section */}
        <section className="space-y-8">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight mb-2">
              Pixel Grid
            </h2>
            <p className="text-muted-foreground mb-6">
              Animated 3x3 pixel grids with various patterns. Use as loading
              indicators, decorative elements, or visual accents.
            </p>
          </div>

          {/* Interactive Demo */}
          <div className="rounded-xl border bg-card p-6 space-y-6">
            <h3 className="text-lg font-medium">Interactive Demo</h3>

            <div className="flex flex-col md:flex-row gap-8 items-start">
              {/* Large Preview - Dark & Light */}
              <div className="flex gap-4 flex-shrink-0">
                <div className="p-8 rounded-lg bg-[#0a0a0a] pixel-grid-dark">
                  <PixelGrid pattern={selectedPattern} color={selectedColor} size="lg" />
                </div>
                <div className="p-8 rounded-lg bg-white border pixel-grid-light">
                  <PixelGrid pattern={selectedPattern} color={selectedColor} size="lg" />
                </div>
              </div>

              {/* Controls */}
              <div className="space-y-6 flex-1">
                {/* Color Selection */}
                <div className="space-y-3">
                  <label className="text-sm font-medium">Color Theme</label>
                  <div className="flex gap-2">
                    {colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                          selectedColor === color
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-muted-foreground hover:bg-muted/80"
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Pattern Selection */}
                <div className="space-y-3">
                  <label className="text-sm font-medium">Pattern</label>
                  <select
                    value={selectedPattern}
                    onChange={(e) => setSelectedPattern(e.target.value as PatternType)}
                    className="w-full rounded-md border bg-background px-3 py-2 text-sm"
                  >
                    <optgroup label="Solo">
                      <option value="solo-center">solo-center</option>
                      <option value="solo-tl">solo-tl</option>
                      <option value="solo-br">solo-br</option>
                    </optgroup>
                    <optgroup label="Lines">
                      <option value="line-h-top">line-h-top</option>
                      <option value="line-h-mid">line-h-mid</option>
                      <option value="line-h-bot">line-h-bot</option>
                      <option value="line-v-left">line-v-left</option>
                      <option value="line-v-mid">line-v-mid</option>
                      <option value="line-v-right">line-v-right</option>
                      <option value="line-diag-1">line-diag-1</option>
                      <option value="line-diag-2">line-diag-2</option>
                    </optgroup>
                    <optgroup label="Corners">
                      <option value="corners-sync">corners-sync</option>
                      <option value="corners-only">corners-only</option>
                    </optgroup>
                    <optgroup label="L-Shapes">
                      <option value="L-tl">L-tl</option>
                      <option value="L-tr">L-tr</option>
                      <option value="L-bl">L-bl</option>
                      <option value="L-br">L-br</option>
                    </optgroup>
                    <optgroup label="T-Shapes">
                      <option value="T-top">T-top</option>
                      <option value="T-bot">T-bot</option>
                      <option value="T-left">T-left</option>
                      <option value="T-right">T-right</option>
                    </optgroup>
                    <optgroup label="Duos">
                      <option value="duo-h">duo-h</option>
                      <option value="duo-v">duo-v</option>
                      <option value="duo-diag">duo-diag</option>
                    </optgroup>
                    <optgroup label="Frame">
                      <option value="frame">frame</option>
                      <option value="frame-sync">frame-sync</option>
                    </optgroup>
                    <optgroup label="Plus">
                      <option value="plus-hollow">plus-hollow</option>
                    </optgroup>
                    <optgroup label="Sparse">
                      <option value="sparse-1">sparse-1</option>
                      <option value="sparse-2">sparse-2</option>
                      <option value="sparse-3">sparse-3</option>
                    </optgroup>
                  </select>
                </div>

                {/* Code Example */}
                <div className="space-y-3">
                  <label className="text-sm font-medium">Code</label>
                  <pre className="rounded-lg bg-muted p-4 text-sm font-mono overflow-x-auto">
                    <code>{`<PixelGrid
  pattern="${selectedPattern}"
  color="${selectedColor}"
  size="md"
/>`}</code>
                  </pre>
                </div>
              </div>
            </div>
          </div>

          {/* Color Comparison - Dark vs Light */}
          <div className="rounded-xl border bg-card p-6 space-y-6">
            <h3 className="text-lg font-medium">Color Themes</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Dark Mode */}
              <div className="space-y-2">
                <span className="text-xs font-medium text-muted-foreground">Dark Mode</span>
                <div className="p-6 rounded-lg bg-[#0a0a0a] pixel-grid-dark">
                  <PixelGridColorComparison pattern="frame" size="md" />
                </div>
              </div>
              {/* Light Mode */}
              <div className="space-y-2">
                <span className="text-xs font-medium text-muted-foreground">Light Mode</span>
                <div className="p-6 rounded-lg bg-white border pixel-grid-light">
                  <PixelGridColorComparison pattern="frame" size="md" />
                </div>
              </div>
            </div>
          </div>

          {/* Size Comparison - Dark vs Light */}
          <div className="rounded-xl border bg-card p-6 space-y-6">
            <h3 className="text-lg font-medium">Sizes</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Dark Mode */}
              <div className="space-y-2">
                <span className="text-xs font-medium text-muted-foreground">Dark Mode</span>
                <div className="p-6 rounded-lg bg-[#0a0a0a] pixel-grid-dark">
                  <PixelGridSizeComparison pattern="plus-hollow" color="green" />
                </div>
              </div>
              {/* Light Mode */}
              <div className="space-y-2">
                <span className="text-xs font-medium text-muted-foreground">Light Mode</span>
                <div className="p-6 rounded-lg bg-white border pixel-grid-light">
                  <PixelGridSizeComparison pattern="plus-hollow" color="green" />
                </div>
              </div>
            </div>
          </div>

          {/* All Patterns - Dark vs Light */}
          <div className="rounded-xl border bg-card p-6 space-y-6">
            <h3 className="text-lg font-medium">All Patterns</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Dark Mode */}
              <div className="space-y-2">
                <span className="text-xs font-medium text-muted-foreground">Dark Mode</span>
                <div className="p-6 rounded-lg bg-[#0a0a0a] pixel-grid-dark">
                  <PixelGridShowcase color="blue" size="sm" showCategories />
                </div>
              </div>
              {/* Light Mode */}
              <div className="space-y-2">
                <span className="text-xs font-medium text-muted-foreground">Light Mode</span>
                <div className="p-6 rounded-lg bg-white border pixel-grid-light">
                  <PixelGridShowcase color="blue" size="sm" showCategories />
                </div>
              </div>
            </div>
          </div>

          {/* Usage Examples */}
          <div className="rounded-xl border bg-card p-6 space-y-6">
            <h3 className="text-lg font-medium">Usage Examples</h3>

            <div className="space-y-4">
              <h4 className="text-sm font-medium text-muted-foreground">
                Loading Indicator
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-4 rounded-lg bg-[#0a0a0a] pixel-grid-dark">
                  <PixelGrid pattern="frame" color="blue" size="sm" />
                  <span className="text-sm text-neutral-400">Loading...</span>
                </div>
                <div className="flex items-center gap-3 p-4 rounded-lg bg-white border pixel-grid-light">
                  <PixelGrid pattern="frame" color="blue" size="sm" />
                  <span className="text-sm text-neutral-600">Loading...</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-sm font-medium text-muted-foreground">
                Status Indicator
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-4 rounded-lg bg-[#0a0a0a] pixel-grid-dark">
                  <PixelGrid pattern="solo-center" color="green" size="sm" />
                  <span className="text-sm text-neutral-400">System Active</span>
                </div>
                <div className="flex items-center gap-3 p-4 rounded-lg bg-white border pixel-grid-light">
                  <PixelGrid pattern="solo-center" color="green" size="sm" />
                  <span className="text-sm text-neutral-600">System Active</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-sm font-medium text-muted-foreground">
                Decorative Grid
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-4 p-4 rounded-lg bg-[#0a0a0a] pixel-grid-dark">
                  <PixelGrid pattern="corners-only" color="pink" size="sm" />
                  <PixelGrid pattern="plus-hollow" color="blue" size="sm" />
                  <PixelGrid pattern="line-diag-1" color="green" size="sm" />
                </div>
                <div className="flex items-center gap-4 p-4 rounded-lg bg-white border pixel-grid-light">
                  <PixelGrid pattern="corners-only" color="pink" size="sm" />
                  <PixelGrid pattern="plus-hollow" color="blue" size="sm" />
                  <PixelGrid pattern="line-diag-1" color="green" size="sm" />
                </div>
              </div>
            </div>
          </div>

          {/* Props Documentation */}
          <div className="rounded-xl border bg-card p-6 space-y-6">
            <h3 className="text-lg font-medium">Props</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-medium">Prop</th>
                    <th className="text-left py-3 px-4 font-medium">Type</th>
                    <th className="text-left py-3 px-4 font-medium">Default</th>
                    <th className="text-left py-3 px-4 font-medium">Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-3 px-4 font-mono text-xs">pattern</td>
                    <td className="py-3 px-4 font-mono text-xs">PatternType</td>
                    <td className="py-3 px-4 text-muted-foreground">-</td>
                    <td className="py-3 px-4 text-muted-foreground">
                      The animation pattern to display
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4 font-mono text-xs">color</td>
                    <td className="py-3 px-4 font-mono text-xs">
                      &quot;blue&quot; | &quot;pink&quot; | &quot;green&quot;
                    </td>
                    <td className="py-3 px-4 font-mono text-xs">&quot;blue&quot;</td>
                    <td className="py-3 px-4 text-muted-foreground">Color theme</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4 font-mono text-xs">speed</td>
                    <td className="py-3 px-4 font-mono text-xs">
                      &quot;slow&quot; | &quot;normal&quot; | &quot;fast&quot;
                    </td>
                    <td className="py-3 px-4 font-mono text-xs">&quot;normal&quot;</td>
                    <td className="py-3 px-4 text-muted-foreground">
                      Animation speed
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4 font-mono text-xs">size</td>
                    <td className="py-3 px-4 font-mono text-xs">
                      &quot;sm&quot; | &quot;md&quot; | &quot;lg&quot;
                    </td>
                    <td className="py-3 px-4 font-mono text-xs">&quot;md&quot;</td>
                    <td className="py-3 px-4 text-muted-foreground">Grid size</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4 font-mono text-xs">paused</td>
                    <td className="py-3 px-4 font-mono text-xs">boolean</td>
                    <td className="py-3 px-4 font-mono text-xs">false</td>
                    <td className="py-3 px-4 text-muted-foreground">
                      Pause the animation
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-mono text-xs">showLabel</td>
                    <td className="py-3 px-4 font-mono text-xs">boolean</td>
                    <td className="py-3 px-4 font-mono text-xs">false</td>
                    <td className="py-3 px-4 text-muted-foreground">
                      Show pattern name below grid
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
