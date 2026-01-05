import { ComponentNav } from "@/components/component-nav";
import { Separator } from "@/components/ui/separator";
import { ComponentPreview } from "@/components/component-preview";
import { PropsTable } from "@/components/props-table";

const separatorProps = [
  {
    name: "orientation",
    type: '"horizontal" | "vertical"',
    default: '"horizontal"',
    description: "The orientation of the separator.",
  },
  {
    name: "decorative",
    type: "boolean",
    default: "true",
    description: "Whether the separator is purely decorative. When true, removes it from the accessibility tree.",
  },
  {
    name: "className",
    type: "string",
    default: "-",
    description: "Additional CSS classes.",
  },
];

export default function SeparatorPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">Separator</h1>
        <p className="text-lg text-muted-foreground mt-2">
          Visually or semantically separates content.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
          Installation
        </h2>
        <div className="rounded-lg bg-sourceful-gray-100 dark:bg-sourceful-gray-800 border border-sourceful-gray-200 dark:border-transparent p-4 font-mono text-sm text-sourceful-gray-900 dark:text-white overflow-x-auto">
          <pre>
            <code>{`import { Separator } from "@sourceful-energy/ui"`}</code>
          </pre>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
          Usage
        </h2>
        <ComponentPreview
          code={`<div>
  <div className="space-y-1">
    <h4 className="text-sm font-medium leading-none">Solar Dashboard</h4>
    <p className="text-sm text-muted-foreground">
      Monitor your energy production.
    </p>
  </div>
  <Separator className="my-4" />
  <div className="flex h-5 items-center space-x-4 text-sm">
    <div>Overview</div>
    <Separator orientation="vertical" />
    <div>Analytics</div>
    <Separator orientation="vertical" />
    <div>Settings</div>
  </div>
</div>`}
        >
          <div className="w-full max-w-sm">
            <div className="space-y-1">
              <h4 className="text-sm font-medium leading-none">Solar Dashboard</h4>
              <p className="text-sm text-muted-foreground">
                Monitor your energy production.
              </p>
            </div>
            <Separator className="my-4" />
            <div className="flex h-5 items-center space-x-4 text-sm">
              <div>Overview</div>
              <Separator orientation="vertical" />
              <div>Analytics</div>
              <Separator orientation="vertical" />
              <div>Settings</div>
            </div>
          </div>
        </ComponentPreview>
      </div>

      <div className="space-y-4">
        <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
          Examples
        </h2>

        <h3 className="text-lg font-medium">Horizontal</h3>
        <ComponentPreview
          code={`<div className="space-y-4">
  <div>
    <h4 className="font-medium">Energy Production</h4>
    <p className="text-sm text-muted-foreground">Today: 24.5 kWh</p>
  </div>
  <Separator />
  <div>
    <h4 className="font-medium">Energy Consumption</h4>
    <p className="text-sm text-muted-foreground">Today: 18.2 kWh</p>
  </div>
  <Separator />
  <div>
    <h4 className="font-medium">Net Export</h4>
    <p className="text-sm text-muted-foreground">Today: 6.3 kWh</p>
  </div>
</div>`}
        >
          <div className="space-y-4 w-full max-w-sm">
            <div>
              <h4 className="font-medium">Energy Production</h4>
              <p className="text-sm text-muted-foreground">Today: 24.5 kWh</p>
            </div>
            <Separator />
            <div>
              <h4 className="font-medium">Energy Consumption</h4>
              <p className="text-sm text-muted-foreground">Today: 18.2 kWh</p>
            </div>
            <Separator />
            <div>
              <h4 className="font-medium">Net Export</h4>
              <p className="text-sm text-muted-foreground">Today: 6.3 kWh</p>
            </div>
          </div>
        </ComponentPreview>

        <h3 className="text-lg font-medium">Vertical</h3>
        <ComponentPreview
          code={`<div className="flex h-5 items-center space-x-4 text-sm">
  <div>Devices</div>
  <Separator orientation="vertical" />
  <div>Analytics</div>
  <Separator orientation="vertical" />
  <div>Reports</div>
  <Separator orientation="vertical" />
  <div>Settings</div>
</div>`}
        >
          <div className="flex h-5 items-center space-x-4 text-sm">
            <div>Devices</div>
            <Separator orientation="vertical" />
            <div>Analytics</div>
            <Separator orientation="vertical" />
            <div>Reports</div>
            <Separator orientation="vertical" />
            <div>Settings</div>
          </div>
        </ComponentPreview>

        <h3 className="text-lg font-medium">In Card</h3>
        <ComponentPreview
          code={`<div className="rounded-lg border p-4 space-y-4">
  <div className="flex justify-between items-center">
    <span className="font-medium">Solar Inverter #1</span>
    <span className="text-sm text-muted-foreground">Online</span>
  </div>
  <Separator />
  <div className="grid grid-cols-2 gap-4 text-sm">
    <div>
      <div className="text-muted-foreground">Power</div>
      <div className="font-medium">4.2 kW</div>
    </div>
    <div>
      <div className="text-muted-foreground">Today</div>
      <div className="font-medium">18.5 kWh</div>
    </div>
  </div>
</div>`}
        >
          <div className="rounded-lg border p-4 space-y-4 w-full max-w-sm">
            <div className="flex justify-between items-center">
              <span className="font-medium">Solar Inverter #1</span>
              <span className="text-sm text-muted-foreground">Online</span>
            </div>
            <Separator />
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <div className="text-muted-foreground">Power</div>
                <div className="font-medium">4.2 kW</div>
              </div>
              <div>
                <div className="text-muted-foreground">Today</div>
                <div className="font-medium">18.5 kWh</div>
              </div>
            </div>
          </div>
        </ComponentPreview>

        <h3 className="text-lg font-medium">With Label</h3>
        <ComponentPreview
          code={`<div className="relative">
  <div className="absolute inset-0 flex items-center">
    <Separator className="w-full" />
  </div>
  <div className="relative flex justify-center text-xs uppercase">
    <span className="bg-background px-2 text-muted-foreground">
      Or continue with
    </span>
  </div>
</div>`}
        >
          <div className="relative w-full max-w-sm">
            <div className="absolute inset-0 flex items-center">
              <Separator className="w-full" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>
        </ComponentPreview>
      </div>

      <div className="space-y-4">
        <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
          Props
        </h2>
        <PropsTable props={separatorProps} />
      </div>

      <div className="space-y-4">
        <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
          Accessibility
        </h2>
        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
          <li>Built on Radix UI Separator</li>
          <li>Uses proper ARIA role="separator"</li>
          <li>Set decorative=false for semantic separators</li>
          <li>Decorative separators are hidden from screen readers</li>
        </ul>
      </div>

      <ComponentNav currentHref="/components/separator" />
    </div>
  );
}
