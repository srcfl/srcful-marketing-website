"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Plug, CheckCircle } from "lucide-react";

export function ProtocolsCard() {
  const protocols = [
    { name: "Modbus TCP", status: "active", devices: "3,240" },
    { name: "SunSpec", status: "active", devices: "2,890" },
    { name: "OCPP 1.6/2.0", status: "active", devices: "1,456" },
  ];

  return (
    <Card className="w-[420px] h-[220px] shadow-lg border-border/50">
      <CardContent className="p-5 h-full flex flex-col">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <p className="text-sm text-muted-foreground">Protocol Support</p>
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10">
              <Plug className="h-3 w-3 text-primary" />
            </div>
          </div>
          <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-green-500/10">
            <span className="text-xs font-medium text-green-600 dark:text-green-400">3 Active</span>
          </div>
        </div>

        {/* Protocol list */}
        <div className="flex-1 space-y-2">
          {protocols.map((protocol, i) => (
            <div
              key={i}
              className="flex items-center justify-between p-2 rounded-lg bg-muted/50"
            >
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-sm font-medium">{protocol.name}</span>
              </div>
              <span className="text-xs text-muted-foreground">
                {protocol.devices} devices
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
