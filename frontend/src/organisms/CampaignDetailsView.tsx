import { useCampaignStore } from "@/lib/zustand/campaignStore";
import PlayerList from "../molecules/PlayerList";
import ScenarioList from "../molecules/ScenarioList";

export default function CampaignDetailsView() {
  const campaign = useCampaignStore((state) => state.campaign);
  if(!campaign) throw new Error("Campaign not found");

  return (
    <div className="space-y-4">
      <PlayerList players={campaign.players} />
      <ScenarioList scenarios={campaign.scenarios} />
    </div>
  );
}
