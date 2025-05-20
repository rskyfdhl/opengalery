import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { SidebarLayout } from "@/components/SidebarLayout";
import { SidebarProvider } from "@/components/ui/sidebar";

import { AppSidebar } from "@/components/app-sidebar";
import { IconMapProvider } from "../contexts/icon-map-context";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  return (
    <SidebarProvider>
      <IconMapProvider>
        <AppSidebar user={user} />
        <SidebarLayout user={user}>{children}</SidebarLayout>
      </IconMapProvider>
    </SidebarProvider>
  );
}
