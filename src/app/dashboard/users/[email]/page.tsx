import { DEVICES, USERS } from "@/lib/placeholder-data";
import { DeviceCard } from "@/components/app/device-card";
import { AddDeviceDialog } from "@/components/app/add-device-dialog";
import { notFound } from "next/navigation";

export default function UserDevicesPage({ params }: { params: { email: string } }) {
    const email = decodeURIComponent(params.email);
    const user = USERS.find(u => u.email === email);
    const userDevices = DEVICES.filter(device => device.userEmail === email);

    if (!user) {
        notFound();
    }

    return (
        <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
            <div>
            <h1 className="text-2xl font-bold tracking-tight">Devices for {user.name}</h1>
            <p className="text-muted-foreground">
                A summary of all linked AirAware devices for {user.email}.
            </p>
            </div>
            <AddDeviceDialog />
        </div>

        {userDevices.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {userDevices.map((device) => (
                <DeviceCard key={device.id} device={device} />
                ))}
            </div>
        ) : (
            <div className="flex flex-col items-center justify-center rounded-lg border border-dashed shadow-sm h-[400px]">
                <div className="flex flex-col items-center text-center">
                    <h3 className="text-2xl font-bold tracking-tight">
                        No devices found
                    </h3>
                    <p className="text-sm text-muted-foreground">
                        This user hasn't paired any devices yet.
                    </p>
                    <div className="mt-6">
                        <AddDeviceDialog />
                    </div>
                </div>
            </div>
        )}
        </div>
    );
}
