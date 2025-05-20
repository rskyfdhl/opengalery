import "./globals.css";
import { Geist } from "next/font/google";
import { ThemeProvider } from "next-themes";

import { NavigationMenuApp } from "@/components/NavHeader";

const geistSans = Geist({
  display: "swap",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={geistSans.className} suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class">
          <NavigationMenuApp />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
