import type { Campaign } from "@/lib/graphql/generated/graphql-types";
import PlayerList from "../molecules/PlayerList";
import ScenarioList from "../molecules/ScenarioList";
// TODO type props
type Props = {
  campaign: Pick<Campaign, "players" | "scenarios">;
};
export default function CampaignDetailsView({ campaign }: Props) {
  return (
    <div className="space-y-4">
      <PlayerList players={campaign.players} />
      <ScenarioList scenarios={campaign.scenarios} />
    </div>
  );
}
