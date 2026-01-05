import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ComponentPreview } from "@/components/component-preview";
import { PropsTable } from "@/components/props-table";

const tableProps = [
  {
    name: "className",
    type: "string",
    default: "-",
    description: "Additional CSS classes.",
  },
];

const devices = [
  { id: "INV001", name: "Solar Inverter #1", status: "Online", power: "4.2 kW", today: "18.5 kWh" },
  { id: "INV002", name: "Solar Inverter #2", status: "Online", power: "3.8 kW", today: "16.2 kWh" },
  { id: "BAT001", name: "Battery Storage", status: "Charging", power: "2.1 kW", today: "12.4 kWh" },
  { id: "EVC001", name: "EV Charger", status: "Idle", power: "0 kW", today: "8.0 kWh" },
  { id: "MTR001", name: "Smart Meter", status: "Online", power: "-", today: "-" },
];

const energyData = [
  { date: "2024-01-15", production: "24.5 kWh", consumption: "18.2 kWh", export: "6.3 kWh" },
  { date: "2024-01-14", production: "22.1 kWh", consumption: "19.8 kWh", export: "2.3 kWh" },
  { date: "2024-01-13", production: "28.3 kWh", consumption: "16.5 kWh", export: "11.8 kWh" },
  { date: "2024-01-12", production: "18.9 kWh", consumption: "21.2 kWh", export: "-2.3 kWh" },
  { date: "2024-01-11", production: "26.7 kWh", consumption: "17.4 kWh", export: "9.3 kWh" },
];

export default function TablePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">Table</h1>
        <p className="text-lg text-muted-foreground mt-2">
          A responsive table component for displaying tabular data.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
          Installation
        </h2>
        <div className="rounded-lg bg-sourceful-gray-950 p-4 font-mono text-sm text-white overflow-x-auto">
          <pre>
            <code>{`import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@sourceful-energy/ui"`}</code>
          </pre>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
          Usage
        </h2>
        <ComponentPreview
          code={`<Table>
  <TableCaption>A list of your connected devices.</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead>Device</TableHead>
      <TableHead>Status</TableHead>
      <TableHead className="text-right">Power</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>Solar Inverter</TableCell>
      <TableCell>Online</TableCell>
      <TableCell className="text-right">4.2 kW</TableCell>
    </TableRow>
  </TableBody>
</Table>`}
        >
          <Table>
            <TableCaption>A list of your connected devices.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Device</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Power</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Solar Inverter</TableCell>
                <TableCell>Online</TableCell>
                <TableCell className="text-right">4.2 kW</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </ComponentPreview>
      </div>

      <div className="space-y-4">
        <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
          Examples
        </h2>

        <h3 className="text-lg font-medium">Device List</h3>
        <ComponentPreview
          code={`<Table>
  <TableCaption>Connected energy devices</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead className="w-[100px]">ID</TableHead>
      <TableHead>Device</TableHead>
      <TableHead>Status</TableHead>
      <TableHead className="text-right">Power</TableHead>
      <TableHead className="text-right">Today</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {devices.map((device) => (
      <TableRow key={device.id}>
        <TableCell className="font-mono">{device.id}</TableCell>
        <TableCell className="font-medium">{device.name}</TableCell>
        <TableCell>
          <Badge variant={device.status === "Online" ? "success" : "secondary"}>
            {device.status}
          </Badge>
        </TableCell>
        <TableCell className="text-right">{device.power}</TableCell>
        <TableCell className="text-right">{device.today}</TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>`}
        >
          <Table>
            <TableCaption>Connected energy devices</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">ID</TableHead>
                <TableHead>Device</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Power</TableHead>
                <TableHead className="text-right">Today</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {devices.map((device) => (
                <TableRow key={device.id}>
                  <TableCell className="font-mono">{device.id}</TableCell>
                  <TableCell className="font-medium">{device.name}</TableCell>
                  <TableCell>
                    <Badge variant={device.status === "Online" ? "success" : "secondary"}>
                      {device.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">{device.power}</TableCell>
                  <TableCell className="text-right">{device.today}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ComponentPreview>

        <h3 className="text-lg font-medium">With Footer</h3>
        <ComponentPreview
          code={`<Table>
  <TableCaption>Daily energy summary</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead>Date</TableHead>
      <TableHead className="text-right">Production</TableHead>
      <TableHead className="text-right">Consumption</TableHead>
      <TableHead className="text-right">Net Export</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {energyData.map((row) => (
      <TableRow key={row.date}>
        <TableCell>{row.date}</TableCell>
        <TableCell className="text-right">{row.production}</TableCell>
        <TableCell className="text-right">{row.consumption}</TableCell>
        <TableCell className="text-right">{row.export}</TableCell>
      </TableRow>
    ))}
  </TableBody>
  <TableFooter>
    <TableRow>
      <TableCell>Total (5 days)</TableCell>
      <TableCell className="text-right">120.5 kWh</TableCell>
      <TableCell className="text-right">93.1 kWh</TableCell>
      <TableCell className="text-right">27.4 kWh</TableCell>
    </TableRow>
  </TableFooter>
</Table>`}
        >
          <Table>
            <TableCaption>Daily energy summary</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Production</TableHead>
                <TableHead className="text-right">Consumption</TableHead>
                <TableHead className="text-right">Net Export</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {energyData.map((row) => (
                <TableRow key={row.date}>
                  <TableCell>{row.date}</TableCell>
                  <TableCell className="text-right">{row.production}</TableCell>
                  <TableCell className="text-right">{row.consumption}</TableCell>
                  <TableCell className="text-right">{row.export}</TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell>Total (5 days)</TableCell>
                <TableCell className="text-right">120.5 kWh</TableCell>
                <TableCell className="text-right">93.1 kWh</TableCell>
                <TableCell className="text-right">27.4 kWh</TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </ComponentPreview>

        <h3 className="text-lg font-medium">Simple Table</h3>
        <ComponentPreview
          code={`<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Metric</TableHead>
      <TableHead className="text-right">Value</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>Current Power</TableCell>
      <TableCell className="text-right font-medium">4.2 kW</TableCell>
    </TableRow>
    <TableRow>
      <TableCell>Today's Production</TableCell>
      <TableCell className="text-right font-medium">18.5 kWh</TableCell>
    </TableRow>
    <TableRow>
      <TableCell>Monthly Total</TableCell>
      <TableCell className="text-right font-medium">542 kWh</TableCell>
    </TableRow>
    <TableRow>
      <TableCell>Lifetime</TableCell>
      <TableCell className="text-right font-medium">12.4 MWh</TableCell>
    </TableRow>
  </TableBody>
</Table>`}
        >
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Metric</TableHead>
                <TableHead className="text-right">Value</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Current Power</TableCell>
                <TableCell className="text-right font-medium">4.2 kW</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Today&apos;s Production</TableCell>
                <TableCell className="text-right font-medium">18.5 kWh</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Monthly Total</TableCell>
                <TableCell className="text-right font-medium">542 kWh</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Lifetime</TableCell>
                <TableCell className="text-right font-medium">12.4 MWh</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </ComponentPreview>
      </div>

      <div className="space-y-4">
        <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
          Props
        </h2>
        <PropsTable props={tableProps} />
      </div>

      <div className="space-y-4">
        <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
          Accessibility
        </h2>
        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
          <li>Uses native HTML table elements for semantics</li>
          <li>TableCaption provides accessible description</li>
          <li>TableHead cells use proper th elements</li>
          <li>Supports keyboard navigation</li>
          <li>Scrollable container for responsive design</li>
        </ul>
      </div>
    </div>
  );
}
