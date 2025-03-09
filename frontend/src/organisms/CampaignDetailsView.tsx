import PlayerList from "../molecules/PlayerList";
import ScenarioList from "../molecules/ScenarioList";

export default function CampaignDetailsView({ campaign }) {
  return (
    <div className="space-y-4">
      <PlayerList players={campaign.players} />
      <ScenarioList scenarios={campaign.scenarios} />
    </div>
  );
}
