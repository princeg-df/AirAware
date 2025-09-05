
"use client";

import * as React from "react";
import { Line, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { HISTORICAL_DATA } from "@/lib/placeholder-data";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

const chartConfig = {
  temperature: {
    label: "Temp (°C)",
    color: "hsl(var(--chart-1))",
  },
  humidity: {
    label: "Humidity (%)",
    color: "hsl(var(--chart-2))",
  },
  pm25: {
    label: "PM2.5",
    color: "hsl(var(--chart-4))",
  },
  aqi: {
    label: "AQI",
    color: "hsl(var(--chart-5))",
  },
};

export function HistoricalChart() {
  const [timeRange, setTimeRange] = React.useState("7d");
  const data = HISTORICAL_DATA[timeRange];

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between">
        <div>
          <CardTitle>Historical Data</CardTitle>
          <CardDescription>
            Telemetry data over the selected time range.
          </CardDescription>
        </div>
        <Tabs value={timeRange} onValueChange={setTimeRange} className="space-y-1">
          <TabsList>
            <TabsTrigger value="24h">24h</TabsTrigger>
            <TabsTrigger value="7d">7d</TabsTrigger>
            <TabsTrigger value="30d">30d</TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
            <LineChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="date" tick={{ fontSize: 12 }} tickMargin={10} />
              <YAxis yAxisId="left" tick={{ fontSize: 12 }} tickMargin={5} />
              <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 12 }} tickMargin={5} />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="dot" />}
              />
              <Legend />
              <Line yAxisId="left" type="monotone" dataKey="temperature" name="Temp (°C)" stroke="var(--color-temperature)" dot={false} />
              <Line yAxisId="left" type="monotone" dataKey="humidity" name="Humidity (%)" stroke="var(--color-humidity)" dot={false} />
              <Line yAxisId="right" type="monotone" dataKey="pm25" name="PM2.5" stroke="var(--color-pm25)" dot={false} />
              <Line yAxisId="right" type="monotone" dataKey="aqi" name="AQI" stroke="var(--color-aqi)" dot={false} />
            </LineChart>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
}
