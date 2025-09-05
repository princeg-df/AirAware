
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { USERS, DEVICES } from "@/lib/placeholder-data";
import React from "react";

export function AppBreadcrumb() {
  const pathname = usePathname();
  const pathSegments = pathname.split("/").filter(Boolean);

  if (pathSegments.length < 2) {
    return null; // Don't show on base dashboard
  }

  const breadcrumbs = pathSegments.map((segment, index) => {
    const href = "/" + pathSegments.slice(0, index + 1).join("/");
    const isLast = index === pathSegments.length - 1;
    let label = segment.charAt(0).toUpperCase() + segment.slice(1);

    // Custom labels
    if (segment === "dashboard") {
      label = "Dashboard";
    } else if (segment === "users" && pathSegments[index+1]) {
        const email = decodeURIComponent(pathSegments[index+1]);
        const user = USERS.find(u => u.email === email);
        if (user) label = user.name;
    } else if (segment === "devices" && pathSegments[index+1]){
        const deviceId = pathSegments[index+1];
        const device = DEVICES.find(d => d.id === deviceId);
        if (device) label = device.name;
    } else if (index === 1 && pathSegments[0] === 'dashboard' && pathSegments[1] === 'users') {
        label = 'Users';
    }


    // Hide intermediate crumbs that are just IDs
     if (
        (segment === "users" && index === 1 && pathSegments.length > 2) ||
        (segment === "devices" && index === 3 && pathSegments.length > 4)
     ) {
        return null;
     }

    // Decode URI component for display
    const decodedSegment = decodeURIComponent(segment);
    if (decodedSegment.includes('@')) {
        const user = USERS.find(u => u.email === decodedSegment);
        label = user?.name || decodedSegment;
    } else {
        const device = DEVICES.find(d => d.id === decodedSegment);
        if (device && index > 1) { // to avoid 'devices' itself being renamed
            label = device.name;
        }
    }


    return (
      <React.Fragment key={href}>
        <BreadcrumbItem>
          {isLast ? (
            <BreadcrumbPage>{label}</BreadcrumbPage>
          ) : (
            <BreadcrumbLink asChild>
              <Link href={href}>{label}</Link>
            </BreadcrumbLink>
          )}
        </BreadcrumbItem>
        {!isLast && <BreadcrumbSeparator />}
      </React.Fragment>
    );
  }).filter(Boolean);

  return (
    <Breadcrumb className="hidden md:flex">
      <BreadcrumbList>
        {breadcrumbs}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
