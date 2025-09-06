import { Link, useNavigate } from "react-router";
import { useLogoutMutation } from "@/lib/graphql/generated/graphql-types";
import { Button } from "@/lib/shadcn/generated/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarTrigger,
} from "@/lib/shadcn/generated/ui/sidebar";
import { useCurrentUser, useLogout } from "@/lib/zustand/userStore";

export default function AppSidebar() {
  const [logout] = useLogoutMutation();
  const logoutFromStore = useLogout();
  const navigate = useNavigate();
  const user = useCurrentUser();

  const hLogout = () => {
    logout();
    logoutFromStore();
    navigate("/");
  };

  return (
    <Sidebar>
      <SidebarHeader className="flex flex-row justify-between">
        Roleet! <SidebarTrigger />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Pages publiques</SidebarGroupLabel>
          <Link to="/">Home</Link>
          <Link to="/auth">Authentification</Link>
        </SidebarGroup>
        {user && (
          <SidebarGroup>
            <SidebarGroupLabel>Pages personnalisées</SidebarGroupLabel>
            <Link to="/dashboard">Mes campagnes</Link>
            <Button onClick={hLogout}>Logout</Button>
          </SidebarGroup>
        )}
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
