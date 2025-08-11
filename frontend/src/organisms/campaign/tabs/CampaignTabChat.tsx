import Chat from "@/organisms/message/Chat";
import type { Entities } from "@/types/entities";

type Props = {
  campaign: Entities.Campaign;
};
export function CampaignTabChat({ campaign }: Props) {
  return <Chat title="Test" data={campaign.messages} room="tests" />;
}
