import type { Q } from "@/types/queries";
import PlayerList from "../User/PlayerList";
import Chat from "./Chat";
import { Text } from "@/atoms/Text";

type Props = {
  campaign: Q.Campaign;
};
export default function CampaignDetailsView({ campaign }: Props) {
  if (!campaign) return <p>Nothing to display here !</p>;

  return (
    <div className="space-y-4">
      <PlayerList players={campaign.players} />
      <ul className="list-disc pl-5">
        {campaign.scenarios.map((scenario) => (
          <li key={scenario.id}>
            <Text>{scenario.title}</Text>
          </li>
        ))}
      </ul>

      <Chat title="Chat" data={campaign.messages} room={campaign.id} />
    </div>
  );
}
