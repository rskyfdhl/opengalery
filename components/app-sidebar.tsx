"use client";
import { User } from "@supabase/supabase-js";
import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { TeamSwitcher } from "@/components/team-switcher";
import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
import { IconMapProvider } from "@/app/contexts/icon-map-context";
import { useTemplateCategories } from "@/hooks/products-map";

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  // The user prop is required and should be of type User from Supabase
  user: User;
}

// AppSidebar component definition
// It now accepts the 'user' prop
export function AppSidebar({ user, ...props }: AppSidebarProps) {
  const { templatesNav, loading } = useTemplateCategories();
  const displayUser = {
    name: user.user_metadata?.full_name || "Guest",
    email: user.email || "no-email",
  };
  const data = {
    teams: [
      { name: "Endah Apriyani", logo: "User", plan: "Admin" },
      { name: "Muhammad Risky F", logo: "Code", plan: "Developer" },
    ],
    navMain: [
      {
        title: "Dashboard",
        url: "#",
        icon: "LayoutDashboard",
        isActive: true,
        items: [
          { title: "Ecommerce", url: "#" },
          { title: "Analytics", url: "#" },
          { title: "Income", url: "#" },
        ],
      },
      {
        title: "Database",
        url: "#",
        icon: "Database",
        items: [
          { title: "Users", url: "#" },
          { title: "Products", url: "/dashboard/products" },
          { title: "Details Product", url: "/dashboard/details-product" },
        ],
      },
      {
        title: "Templates",
        url: "#",
        icon: "LayoutTemplate",
        items: loading
          ? [{ title: "Loading...", url: "#" }]
          : templatesNav.flatMap((cat) => [
              { title: cat.title, url: "#", items: cat.items },
            ]),
      },
      {
        title: "Settings",
        url: "#",
        icon: "Settings2",
        items: [
          { title: "General", url: "#" },
          { title: "Team", url: "#" },
          { title: "Billing", url: "#" },
          { title: "Limits", url: "#" },
        ],
      },
    ],
    projects: [
      {
        name: "Design Engineering",
        url: "#",
        icon: "Frame",
      },
      {
        name: "Sales & Marketing",
        url: "#",
        icon: "PieChart",
      },
      {
        name: "Travel",
        url: "#",
        icon: "Map",
      },
    ],
  };
  const products = {};
  return (
    <IconMapProvider>
      <Sidebar collapsible="icon" {...props}>
        <SidebarHeader>
          <TeamSwitcher teams={data.teams} />
        </SidebarHeader>
        <SidebarContent>
          <NavMain items={data.navMain} />
          <NavProjects projects={data.projects} />
        </SidebarContent>
        <SidebarFooter>
          <NavUser user={displayUser} />
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
    </IconMapProvider>
  );
}
