import { buttonVariants } from "@/lib/shadcn/generated/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/lib/shadcn/generated/ui/dialog";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarTrigger,
} from "@/lib/shadcn/generated/ui/sidebar";
import { Link } from "react-router-dom";
import CampaignForm from "../../organisms/Campaign/CampaignForm";
import ScenarioForm from "../../organisms/Scenario/ScenarioForm";

export default function AppSidebar() {
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
          <Link to="/scenarios">Scenarios</Link>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Pages personnalisées</SidebarGroupLabel>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/campaigns">Mes Campagnes</Link>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Créer de nouveaux éléments</SidebarGroupLabel>
          <div className="space-y-2 [&>*]:w-full">
            <Dialog>
              <DialogTrigger className={buttonVariants()}>
                Créer une campagne
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>D'humeur créatrice ?</DialogTitle>
                  <DialogDescription>
                    Vous pouvez ici renseigner les premières infos pour votre
                    nouvelle campagne
                  </DialogDescription>
                </DialogHeader>
                <CampaignForm />
              </DialogContent>
            </Dialog>
            <Dialog>
              <DialogTrigger className={buttonVariants()}>
                Créer un scénario
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>D'humeur créatrice ?</DialogTitle>
                  <DialogDescription>
                    Vous pouvez ici renseigner les premières infos pour votre
                    nouveau scenario
                  </DialogDescription>
                </DialogHeader>
                <ScenarioForm />
              </DialogContent>
            </Dialog>
          </div>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
