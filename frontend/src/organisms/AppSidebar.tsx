import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
} from "@/lib/shadcn/generated/ui/sidebar";
import { Link } from "react-router-dom";

export default function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>Roleet!</SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Pages publiques</SidebarGroupLabel>
          <Link to="/">Home</Link>
          <Link to="/auth">Authentification</Link>
          <Link to="/scenarios">Scenarios</Link>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Pages personnalisées</SidebarGroupLabel>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/campaigns">Mes Campagnes</Link>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
