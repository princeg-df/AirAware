"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Droplets, Gauge, Haze, Thermometer } from "lucide-react";
import type { TelemetryData } from "@/lib/types";
import { CO2Icon } from "@/components/icons";

type RealTimeMetricsProps = {
  initialData: TelemetryData;
};

const metricConfig = [
  { key: "temperature", label: "Temperature", icon: Thermometer, unit: "°C" },
  { key: "humidity", label: "Humidity", icon: Droplets, unit: "%" },
  { key: "pm25", label: "PM2.5", icon: Haze, unit: "µg/m³" },
  { key: "co2", label: "CO₂", icon: CO2Icon, unit: "ppm" },
  { key: "aqi", label: "AQI", icon: Gauge, unit: "" },
];

export function RealTimeMetrics({ initialData }: RealTimeMetricsProps) {
  const [telemetry, setTelemetry] = useState(initialData);

  useEffect(() => {
    const interval = setInterval(() => {
      setTelemetry((prev) => ({
        temperature: prev.temperature + (Math.random() - 0.5) * 0.2,
        humidity: prev.humidity + (Math.random() - 0.5) * 1,
        pm25: Math.max(0, prev.pm25 + (Math.random() - 0.5) * 2),
        co2: Math.max(400, prev.co2 + (Math.random() - 0.5) * 10),
        aqi: Math.max(0, prev.aqi + (Math.random() - 0.5) * 3),
      }));
    }, 10000); // Update every 10 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
      {metricConfig.map((metric) => {
        const value = telemetry[metric.key as keyof TelemetryData];
        return (
          <Card key={metric.key}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {metric.label}
              </CardTitle>
              <metric.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {value.toFixed(metric.key === 'temperature' ? 1 : 0)}
                <span className="text-sm font-normal text-muted-foreground ml-1">{metric.unit}</span>
              </div>
              <p className="text-xs text-muted-foreground">Live update</p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
