
"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { User } from "@/lib/types";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Mail } from "lucide-react";

type UserCardProps = {
  user: User;
};

export function UserCard({ user }: UserCardProps) {

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start gap-4">
            <Avatar className="h-12 w-12">
                <AvatarImage src={`https://picsum.photos/seed/${user.id}/100`} alt={user.name} data-ai-hint="person face" />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
                <CardTitle>{user.name}</CardTitle>
                <CardDescription className="flex items-center gap-2 pt-1">
                    <Mail className="h-3 w-3" />
                    {user.email}
                </CardDescription>
            </div>
        </div>
      </CardHeader>
      <CardFooter>
        <Button asChild className="w-full" variant="outline">
          <Link href={`/dashboard/users/${encodeURIComponent(user.email)}`}>View Devices</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
