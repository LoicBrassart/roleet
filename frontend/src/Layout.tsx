import { Outlet } from "react-router-dom";
import "./globals.css";
import AppSidebar from "./layout/AppSidebar";
import {
  SidebarProvider,
  SidebarTrigger,
} from "./lib/shadcn/generated/ui/sidebar";

export default function Layout() {
  return (
    <SidebarProvider>
      <div className="absolute">
        <AppSidebar />
      </div>
      <main className="w-8/12 dark m-auto mt-0">
        <SidebarTrigger />
        <Outlet />
      </main>
    </SidebarProvider>
  );
}
