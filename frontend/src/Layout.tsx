import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import "./globals.css";
import AppSidebar from "./layout/AppSidebar";
import {
  SidebarProvider,
  SidebarTrigger,
} from "./lib/shadcn/generated/ui/sidebar";

export default function Layout() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  // biome-ignore lint/correctness/useExhaustiveDependencies: Need to depend on the pathname, to allow for clicking on current page in the navbar
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
