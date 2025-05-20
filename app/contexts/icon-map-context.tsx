// contexts/icon-map-context.tsx
"use client";

import React, { createContext, useContext } from "react";
import {
  User,
  Code,
  LayoutDashboard,
  Database,
  LayoutTemplate,
  Settings2,
  Frame,
  PieChart,
  Map,
  LucideIcon,
  Folder,
  Home,
  Settings,
  FileText,
  Circle,
  Shield,
  Activity,
} from "lucide-react";

// Buat type aman untuk key icon
type IconMap = Record<string, LucideIcon>;

const iconMap: IconMap = {
  User,
  Code,
  LayoutDashboard,
  Database,
  LayoutTemplate,
  Settings2,
  Frame,
  PieChart,
  Map,
  folder: Folder,
  home: Home,
  settings: Settings,
  file: FileText,
  circle: Circle,
  shield: Shield,
  activity: Activity,
};

const IconMapContext = createContext<IconMap>(iconMap);

export const IconMapProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <IconMapContext.Provider value={iconMap}>
      {children}
    </IconMapContext.Provider>
  );
};

export const useIconMap = () => useContext(IconMapContext);
