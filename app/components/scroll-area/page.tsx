import { ComponentNav } from "@/components/component-nav";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { ComponentPreview } from "@/components/component-preview";
import { PropsTable } from "@/components/props-table";

const scrollAreaProps = [
  {
    name: "type",
    type: '"auto" | "always" | "scroll" | "hover"',
    default: '"hover"',
    description: "Describes the nature of scrollbar visibility.",
  },
  {
    name: "scrollHideDelay",
    type: "number",
    default: "600",
    description: "Delay in ms before hiding scrollbars (for type 'scroll' or 'hover').",
  },
  {
    name: "className",
    type: "string",
    default: "-",
    description: "Additional CSS classes.",
  },
];

const devices = [
  { name: "Solar Inverter #1", status: "Online", power: "4.2 kW" },
  { name: "Solar Inverter #2", status: "Online", power: "3.8 kW" },
  { name: "Battery Storage", status: "Charging", power: "2.1 kW" },
  { name: "EV Charger", status: "Idle", power: "0 kW" },
  { name: "Smart Meter", status: "Online", power: "-" },
  { name: "Heat Pump", status: "Running", power: "1.5 kW" },
  { name: "Solar Inverter #3", status: "Offline", power: "0 kW" },
  { name: "Wind Turbine", status: "Online", power: "0.8 kW" },
];

const tags = [
  "Solar", "Battery", "EV", "Grid", "Inverter", "Monitor",
  "Schedule", "Export", "Import", "Peak", "Off-Peak", "Smart",
];

export default function ScrollAreaPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">Scroll Area</h1>
        <p className="text-lg text-muted-foreground mt-2">
          Augments native scroll functionality for custom, cross-browser styling.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
          Installation
        </h2>
        <div className="rounded-lg bg-sourceful-gray-100 dark:bg-sourceful-gray-800 border border-sourceful-gray-200 dark:border-transparent p-4 font-mono text-sm text-sourceful-gray-900 dark:text-white overflow-x-auto">
          <pre>
            <code>{`import { ScrollArea, ScrollBar } from "@sourceful-energy/ui"`}</code>
          </pre>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
          Usage
        </h2>
        <ComponentPreview
          code={`<ScrollArea className="h-72 w-48 rounded-md border">
  <div className="p-4">
    <h4 className="mb-4 text-sm font-medium leading-none">Tags</h4>
    {tags.map((tag) => (
      <div key={tag} className="text-sm">{tag}</div>
    ))}
  </div>
</ScrollArea>`}
        >
          <ScrollArea className="h-72 w-48 rounded-md border">
            <div className="p-4">
              <h4 className="mb-4 text-sm font-medium leading-none">Tags</h4>
              {tags.map((tag) => (
                <div key={tag} className="text-sm py-1">
                  {tag}
                </div>
              ))}
            </div>
          </ScrollArea>
        </ComponentPreview>
      </div>

      <div className="space-y-4">
        <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
          Examples
        </h2>

        <h3 className="text-lg font-medium">Device List</h3>
        <ComponentPreview
          code={`<ScrollArea className="h-72 w-full max-w-sm rounded-md border">
  <div className="p-4">
    <h4 className="mb-4 text-sm font-medium">Connected Devices</h4>
    {devices.map((device, i) => (
      <div key={device.name}>
        <div className="flex justify-between py-2">
          <div>
            <div className="text-sm font-medium">{device.name}</div>
            <div className="text-xs text-muted-foreground">{device.status}</div>
          </div>
          <div className="text-sm text-right">{device.power}</div>
        </div>
        {i < devices.length - 1 && <Separator />}
      </div>
    ))}
  </div>
</ScrollArea>`}
        >
          <ScrollArea className="h-72 w-full max-w-sm rounded-md border">
            <div className="p-4">
              <h4 className="mb-4 text-sm font-medium">Connected Devices</h4>
              {devices.map((device, i) => (
                <div key={device.name}>
                  <div className="flex justify-between py-2">
                    <div>
                      <div className="text-sm font-medium">{device.name}</div>
                      <div className="text-xs text-muted-foreground">{device.status}</div>
                    </div>
                    <div className="text-sm text-right">{device.power}</div>
                  </div>
                  {i < devices.length - 1 && <Separator />}
                </div>
              ))}
            </div>
          </ScrollArea>
        </ComponentPreview>

        <h3 className="text-lg font-medium">Horizontal Scroll</h3>
        <ComponentPreview
          code={`<ScrollArea className="w-full max-w-sm whitespace-nowrap rounded-md border">
  <div className="flex w-max space-x-4 p-4">
    {tags.map((tag) => (
      <div
        key={tag}
        className="shrink-0 rounded-md border px-3 py-1.5 text-sm"
      >
        {tag}
      </div>
    ))}
  </div>
  <ScrollBar orientation="horizontal" />
</ScrollArea>`}
        >
          <ScrollArea className="w-full max-w-sm whitespace-nowrap rounded-md border">
            <div className="flex w-max space-x-4 p-4">
              {tags.map((tag) => (
                <div
                  key={tag}
                  className="shrink-0 rounded-md border px-3 py-1.5 text-sm"
                >
                  {tag}
                </div>
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </ComponentPreview>

        <h3 className="text-lg font-medium">Fixed Height Container</h3>
        <ComponentPreview
          code={`<ScrollArea className="h-[200px] rounded-md border p-4">
  <div className="space-y-4">
    <p>
      Monitor your energy production and consumption in real-time.
      Our dashboard provides comprehensive insights into your
      renewable energy system's performance.
    </p>
    <p>
      Track solar generation, battery storage levels, and grid
      import/export data all in one place. Set up alerts for
      unusual patterns or when you reach energy goals.
    </p>
    <p>
      The system automatically optimizes energy flow between your
      solar panels, battery, and the grid to maximize savings
      and minimize your carbon footprint.
    </p>
    <p>
      Access historical data and trends to understand your
      energy patterns over time. Export reports for analysis
      or share with your energy provider.
    </p>
  </div>
</ScrollArea>`}
        >
          <ScrollArea className="h-[200px] w-full max-w-md rounded-md border p-4">
            <div className="space-y-4">
              <p>
                Monitor your energy production and consumption in real-time.
                Our dashboard provides comprehensive insights into your
                renewable energy system&apos;s performance.
              </p>
              <p>
                Track solar generation, battery storage levels, and grid
                import/export data all in one place. Set up alerts for
                unusual patterns or when you reach energy goals.
              </p>
              <p>
                The system automatically optimizes energy flow between your
                solar panels, battery, and the grid to maximize savings
                and minimize your carbon footprint.
              </p>
              <p>
                Access historical data and trends to understand your
                energy patterns over time. Export reports for analysis
                or share with your energy provider.
              </p>
            </div>
          </ScrollArea>
        </ComponentPreview>
      </div>

      <div className="space-y-4">
        <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
          Props
        </h2>
        <PropsTable props={scrollAreaProps} />
      </div>

      <div className="space-y-4">
        <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
          Accessibility
        </h2>
        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
          <li>Built on Radix UI ScrollArea for consistent behavior</li>
          <li>Keyboard scrolling works natively</li>
          <li>Custom scrollbars maintain accessibility</li>
          <li>Works with screen readers</li>
        </ul>
      </div>

      <ComponentNav currentHref="/components/scroll-area" />
    </div>
  );
}
