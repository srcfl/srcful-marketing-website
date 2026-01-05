"use client";

import { useState } from "react";
import { EnergyFlow } from "@/components/ui/energy-flow";
import { ComponentNav } from "@/components/component-nav";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";

export default function EnergyFlowPage() {
  const [solarPower, setSolarPower] = useState(3500);
  const [batteryPower, setBatteryPower] = useState(-1200);
  const [gridImport, setGridImport] = useState(500);
  const [homeConsumption, setHomeConsumption] = useState(2800);
  const [evCharging, setEvCharging] = useState(0);
  const [batterySoC, setBatterySoC] = useState(75);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">Energy Flow</h1>
        <p className="text-lg text-muted-foreground mt-2">
          Interactive energy flow visualization using React Flow.
        </p>
      </div>

      {/* Demo */}
      <div className="space-y-4">
        <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
          Interactive Demo
        </h2>
        <EnergyFlow
          solarPower={solarPower}
          batteryPower={batteryPower}
          gridImport={gridImport}
          homeConsumption={homeConsumption}
          evCharging={evCharging}
          batterySoC={batterySoC}
        />
      </div>

      {/* Controls */}
      <div className="space-y-4">
        <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
          Adjust Values
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label>Solar Power</Label>
              <span className="text-sm text-muted-foreground">{(solarPower / 1000).toFixed(1)} kW</span>
            </div>
            <Slider
              value={[solarPower]}
              onValueChange={([v]) => setSolarPower(v)}
              min={0}
              max={10000}
              step={100}
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <Label>Battery Power</Label>
              <span className="text-sm text-muted-foreground">
                {batteryPower > 0 ? "+" : ""}{(batteryPower / 1000).toFixed(1)} kW
              </span>
            </div>
            <Slider
              value={[batteryPower]}
              onValueChange={([v]) => setBatteryPower(v)}
              min={-5000}
              max={5000}
              step={100}
            />
            <p className="text-xs text-muted-foreground">Positive = charging, Negative = discharging</p>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <Label>Grid Import</Label>
              <span className="text-sm text-muted-foreground">{(gridImport / 1000).toFixed(1)} kW</span>
            </div>
            <Slider
              value={[gridImport]}
              onValueChange={([v]) => setGridImport(v)}
              min={0}
              max={10000}
              step={100}
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <Label>Home Consumption</Label>
              <span className="text-sm text-muted-foreground">{(homeConsumption / 1000).toFixed(1)} kW</span>
            </div>
            <Slider
              value={[homeConsumption]}
              onValueChange={([v]) => setHomeConsumption(v)}
              min={0}
              max={10000}
              step={100}
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <Label>EV Charging</Label>
              <span className="text-sm text-muted-foreground">{(evCharging / 1000).toFixed(1)} kW</span>
            </div>
            <Slider
              value={[evCharging]}
              onValueChange={([v]) => setEvCharging(v)}
              min={0}
              max={11000}
              step={100}
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <Label>Battery SoC</Label>
              <span className="text-sm text-muted-foreground">{batterySoC}%</span>
            </div>
            <Slider
              value={[batterySoC]}
              onValueChange={([v]) => setBatterySoC(v)}
              min={0}
              max={100}
              step={1}
            />
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="space-y-4">
        <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
          Features
        </h2>
        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
          <li>5 node types: Solar, Battery, Grid, Home, EV Charger</li>
          <li>Animated edges showing energy flow direction</li>
          <li>Dynamic edge thickness based on power flow</li>
          <li>Color-coded sources: Green (solar), Yellow (battery), Blue (grid)</li>
          <li>Auto-calculated flow distribution</li>
          <li>Dark mode support</li>
          <li>Pan and zoom controls</li>
          <li>Draggable nodes</li>
        </ul>
      </div>

      {/* Node Types */}
      <div className="space-y-4">
        <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
          Node Types
        </h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <div className="p-4 rounded-lg border">
            <div className="flex items-center gap-2 mb-2">
              <div className="h-3 w-3 rounded-full bg-sourceful-green-500" />
              <span className="font-medium">Solar</span>
            </div>
            <p className="text-sm text-muted-foreground">Source only - outputs energy to other nodes</p>
          </div>
          <div className="p-4 rounded-lg border">
            <div className="flex items-center gap-2 mb-2">
              <div className="h-3 w-3 rounded-full bg-sourceful-yellow-500" />
              <span className="font-medium">Battery</span>
            </div>
            <p className="text-sm text-muted-foreground">Bi-directional - can charge or discharge</p>
          </div>
          <div className="p-4 rounded-lg border">
            <div className="flex items-center gap-2 mb-2">
              <div className="h-3 w-3 rounded-full bg-blue-500 dark:bg-sourceful-gray-500" />
              <span className="font-medium">Grid</span>
            </div>
            <p className="text-sm text-muted-foreground">Bi-directional - import or export power</p>
          </div>
          <div className="p-4 rounded-lg border">
            <div className="flex items-center gap-2 mb-2">
              <div className="h-3 w-3 rounded-full bg-sourceful-gray-500" />
              <span className="font-medium">Home</span>
            </div>
            <p className="text-sm text-muted-foreground">Sink - receives energy from multiple sources</p>
          </div>
          <div className="p-4 rounded-lg border">
            <div className="flex items-center gap-2 mb-2">
              <div className="h-3 w-3 rounded-full bg-purple-500" />
              <span className="font-medium">EV Charger</span>
            </div>
            <p className="text-sm text-muted-foreground">Sink - receives energy for vehicle charging</p>
          </div>
        </div>
      </div>

      {/* Usage */}
      <div className="space-y-4">
        <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
          Usage
        </h2>
        <div className="rounded-lg bg-sourceful-gray-100 dark:bg-sourceful-gray-800 border border-sourceful-gray-200 dark:border-transparent p-4 font-mono text-sm text-sourceful-gray-900 dark:text-white overflow-x-auto">
          <pre>
            <code>{`import { EnergyFlow } from "@/components/ui/energy-flow"

<EnergyFlow
  solarPower={3500}        // Watts
  batteryPower={-1200}     // Negative = discharging
  gridImport={500}         // Watts from grid
  gridExport={0}           // Watts to grid
  homeConsumption={2800}   // Watts
  evCharging={0}           // Watts
  batterySoC={75}          // Percentage
/>`}</code>
          </pre>
        </div>
      </div>

      {/* Dependencies */}
      <div className="space-y-4">
        <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
          Dependencies
        </h2>
        <div className="rounded-lg bg-sourceful-gray-100 dark:bg-sourceful-gray-800 border border-sourceful-gray-200 dark:border-transparent p-4 font-mono text-sm text-sourceful-gray-900 dark:text-white overflow-x-auto">
          <pre>
            <code>{`npm install @xyflow/react`}</code>
          </pre>
        </div>
      </div>

      <ComponentNav currentHref="/components/energy-flow" />
    </div>
  );
}
