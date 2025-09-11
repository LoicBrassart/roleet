import { useState } from "react";
import { Outlet } from "react-router";
import {
  SidebarProvider,
  SidebarTrigger,
} from "@/lib/shadcn/generated/ui/sidebar";
import AppSidebar from "./AppSidebar";

export default function Layout() {
  const [open, setOpen] = useState(false);

  return (
    <SidebarProvider defaultOpen={false} open={open} onOpenChange={setOpen}>
      <div className="absolute">
        <AppSidebar />
      </div>
      <SidebarTrigger />

      <main className="mb-20 w-dvw overflow-x-hidden p-4">
        <Outlet />
      </main>
    </SidebarProvider>
  );
}
