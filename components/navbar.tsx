"use client"

import * as React from "react"
import Link from "next/link"

import { cn } from "@/lib/utils"
// import { Icons } from "@/components/icons"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

const profileOptions: { title: string; href: string; description: string }[] = [
  {
    title: "Settings",
    href: "/profile/settings",
    description: "Manage your account settings and preferences.",
  },
  {
    title: "Patients",
    href: "/patients",
    description: "View and manage your patients.",
  },
  {
    title: "Logout",
    href: "/logout",
    description: "Sign out of your account.",
  },
]

export function NavBar() {
  return (
    <div className="bg-opacity-30 backdrop-blur-md p-4 w-full sticky top-0 flex-1 z-10 flex justify-start items-center space-x-4">
      <Link href="/" passHref className="flex items-center space-x-2 text-xl">
        <img
          src="/logo.png"
          alt="ArthroTrack Logo"
          className="w-8 h-8 rounded-full"
          loading="lazy"
        />
        <span>ArthroTrack</span>
      </Link>
      <NavBarItems />
    </div>
  )
}

export function NavBarItems() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link href="/" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Home
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Profile</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <a
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    href="/profile"
                  >
                    <div className="mb-2 mt-4 text-lg font-medium">
                      John Doe
                    </div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      john.doe@example.com
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              {profileOptions.map((option) => (
                <ListItem
                  key={option.title}
                  title={option.title}
                  href={option.href}
                >
                  {option.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/search" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Search
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"