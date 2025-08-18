import Chat from "@/organisms/message/Chat";
import type { Entities } from "@/types/entities";

type Props = {
  messages: Entities.Message[];
  campaign: Entities.Campaign["id"];
};
export function CampaignTabChat({ messages, campaign }: Props) {
  return <Chat title="Test" data={messages} room={campaign} />;
}
