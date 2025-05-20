import { User } from "@supabase/supabase-js";
import { NavUser } from "@/components/nav-user";

export function SidebarLayout({
  user,
  children,
}: {
  user: User;
  children: React.ReactNode;
}) {
  const displayUser = {
    name: user.user_metadata?.full_name || "Guest",
    email: user.email || "no-email",
  };

  return (
    <div className="flex">
      <aside className="w-64 h-screen fixed left-0 top-0 bg-sidebar p-4">
        <NavUser user={displayUser} />
      </aside>
      <main className="ml-64 w-full">{children}</main>
    </div>
  );
}
