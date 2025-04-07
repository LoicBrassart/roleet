import type { Q } from "@/types/queries";
import PlayerList from "../molecules/PlayerList";
import ScenarioList from "../molecules/ScenarioList";
import Chat from "./Chat";

type Props = {
  campaign: Q.Campaign;
};
export default function CampaignDetailsView({ campaign }: Props) {
  if (!campaign) return <p>Nothing to display here !</p>;

  return (
    <div className="space-y-4">
      <PlayerList players={campaign.players} />
      <ScenarioList scenarios={campaign.scenarios} />
      <Chat title="Chat" data={campaign.messages} room={campaign.id} />
    </div>
  );
}
