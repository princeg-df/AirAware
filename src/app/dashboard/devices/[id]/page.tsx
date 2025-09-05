import { DEVICES } from "@/lib/placeholder-data";
import { RealTimeMetrics } from "@/components/app/real-time-metrics";
import { HistoricalChart } from "@/components/app/historical-chart";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { notFound } from 'next/navigation';

export default function DeviceDetailPage({ params }: { params: { id: string } }) {
  const device = DEVICES.find((d) => d.id === params.id);

  if (!device) {
    return notFound();
  }

  return (
    <div className="flex flex-col gap-8">
      <div>
        <Button asChild variant="outline" size="sm" className="mb-4">
          <Link href={`/dashboard/users/${encodeURIComponent(device.userEmail)}`}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to User Devices
          </Link>
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">{device.name}</h1>
        <p className="text-muted-foreground">
          Showing live telemetry and historical data.
        </p>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Real-Time Telemetry</h2>
        <RealTimeMetrics initialData={device.telemetry} />
      </div>

      <div>
        <HistoricalChart />
      </div>
    </div>
  );
}
