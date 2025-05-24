import { Outlet, useLocation } from "react-router-dom";
import "./globals.css";
import { useEffect, useState } from "react";
import AppSidebar from "./layout/AppSidebar";
import {
  SidebarProvider,
  SidebarTrigger,
} from "./lib/shadcn/generated/ui/sidebar";

export default function Layout() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  // biome-ignore lint/correctness/useExhaustiveDependencies: Deps are fine
  useEffect(() => {
    setOpen(false);

    return () => {
      setOpen(false);
    };
  }, [location.pathname]);

  return (
    <SidebarProvider defaultOpen={false} open={open} onOpenChange={setOpen}>
      <div className="absolute">
        <AppSidebar />
      </div>
      <main className="dark m-auto mt-0 w-8/12">
        <SidebarTrigger />
        <Outlet />
      </main>
    </SidebarProvider>
  );
}
