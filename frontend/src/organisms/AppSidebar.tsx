import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/lib/shadcn/generated/ui/sidebar";
import { Link } from "react-router-dom";

export default function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>Roleet!</SidebarHeader>
      <SidebarContent>
        <SidebarGroup />
        <Link to="/auth">Profil</Link>
        <SidebarGroup />
        <SidebarGroup />
        <Link to="/">Home</Link>
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
