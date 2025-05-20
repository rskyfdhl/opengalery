// app/components/layout-switcher.tsx
"use client";

import { usePathname } from "next/navigation";
import { NavigationMenuApp } from "@/components/NavHeader";
import { NavUser } from "@/components/nav-user";
import { EnvVarWarning } from "@/components/env-var-warning";
import HeaderAuth from "@/components/header-auth";

export default function LayoutSwitcher() {
  const pathname = usePathname();
  const isDashboard = pathname.startsWith("/dashboard");

  if (isDashboard) {
    return (
      <aside className="fixed top-0 left-0 h-full w-64 bg-sidebar p-4">
        <NavUser
          user={{
            name: "Nama User",
            email: "email@contoh.com",
          }}
        />
      </aside>
    );
  }

  return (
    <nav className="w-full flex bg-logo-feefd9 z-50 fixed">
      <NavigationMenuApp />
      <div className="flex items-center gap-4">
        <div className="hidden md:block">
          {/* Ganti dengan kondisi sebenarnya */}
          {true ? <HeaderAuth /> : <EnvVarWarning />}
        </div>
      </div>
    </nav>
  );
}
