import { Outlet } from "react-router-dom";
import "./globals.css";
import {
  SidebarProvider,
  SidebarTrigger,
} from "./lib/shadcn/generated/ui/sidebar";
import { AppSidebar } from "./organisms/AppSidebar";

export default function Layout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-8/12 m-auto dark">
        <SidebarTrigger />
        <Outlet />
      </main>
    </SidebarProvider>
  );
}
