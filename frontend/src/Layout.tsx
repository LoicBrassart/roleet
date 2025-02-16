import { Outlet } from "react-router-dom";
import "./globals.css";
import {
  SidebarProvider,
  SidebarTrigger,
} from "./lib/shadcn/generated/ui/sidebar";
import AppSidebar from "./organisms/AppSidebar";

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
