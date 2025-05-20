"use client";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Link from "next/link";

export default function HamburgerMenu() {
  return (
    <Sheet>
      <SheetTrigger className="md:hidden p-2">
        <Menu className="w-6 h-6" />
      </SheetTrigger>
      <SheetContent side="left" className="w-[250px] bg-feefd9">
        <nav className="flex flex-col space-y-4 mt-6">
          <Link href="/" className="text-lg text-c6a274 hover:underline">
            Beranda
          </Link>
          <Link href="/produk" className="text-lg text-c6a274 hover:underline">
            Produk
          </Link>
          <Link href="/tentang" className="text-lg text-c6a274 hover:underline">
            Tentang
          </Link>
          <Link href="/kontak" className="text-lg text-c6a274 hover:underline">
            Kontak
          </Link>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
