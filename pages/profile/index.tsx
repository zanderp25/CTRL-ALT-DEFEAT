import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export default function Profile() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-100 dark:bg-gray-900">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Profile</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-4">
          {/* Profile Avatar */}
          <Avatar className="w-24 h-24">
            <AvatarImage src="/images/profile.jpg" alt="User Profile" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>

          {/* User Information */}
          <div className="text-center">
            <h2 className="text-xl font-semibold">Dr. John Doe</h2>
            <p className="text-gray-500 dark:text-gray-400">Gastroenterologist</p>
          </div>

          {/* Profile Settings Button */}
          <Link href="/profile/settings" passHref>
            <Button className="w-full">Edit Profile</Button>
          </Link>
          
          {/* Additional Doctor Information */}
          <div className="mt-6 space-y-2 text-left w-full px-4">
            <p className="text-sm text-gray-600 dark:text-gray-300">
              <strong>Doctor ID:</strong> 123456
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              <strong>Email:</strong> johndoe@example.com
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              <strong>Phone:</strong> +1 (123) 456-7890
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              <strong>Location:</strong> Naples, Florida
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              <strong>Residency</strong> Gastroenterology
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              <strong>Years Completed:</strong> 2015 - 2018
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}