"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import * as React from "react";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import HamburgerMenu from "./HamburgerMenu";

const components: { title: string; href: string }[] = [
  {
    title: "Photostrip",
    href: "#",
  },
  {
    title: "Undangan",
    href: "#",
  },
  {
    title: "Template",
    href: "#",
  },
];

export function NavigationMenuApp() {
  const pathname = usePathname();

  // Sembunyikan navbar jika berada di /admin atau /dashboard
  const isDashboard =
    pathname.startsWith("/dashboard/*") || pathname.startsWith("/dashboard");
  if (isDashboard) return null;

  return (
    <div className="w-full flex justify-center border-b bg-feefd9 fixed z-50 -foreground/10 h-20">
      <div className="w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm">
        <div className="flex gap-5 items-center font-semibold">
          <Image src="./logo.svg" alt="Logo" height={45} width={45} />
          <Link href={"/"} className="nunito text-c6a274 text-xl">
            Open Galery{" "}
          </Link>
        </div>
        <div className="hidden md:flex space-x-6">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link href={"/"} className="px-4 text-c6a274 text-lg">
                  Home
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-c6a274 text-lg">
                  Produk
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[80px] gap-3 p-4 md:w-[500px] md:grid-cols-1 lg:w-[200px]">
                    {components.map((component) => (
                      <ListItem
                        key={component.title}
                        title={component.title}
                        href={component.href}
                      ></ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="#" className="text-c6a274 px-4 text-lg">
                  Tentang
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="#" className="text-c6a274 px-4 text-lg">
                  Kontak
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <HamburgerMenu />
      </div>
    </div>
  );
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
  );
});
ListItem.displayName = "ListItem";
