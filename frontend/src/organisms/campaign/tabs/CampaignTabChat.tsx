import { List } from "@/molecules/List";
import MessageCard from "@/organisms/message/MessageCard";
import type { Entities } from "@/types/entities";

type Props = {
  campaign: Entities.Campaign;
};
export function CampaignTabChat({ campaign }: Props) {
  return (
    <List
      title="Tous les messages"
      data={campaign.messages}
      render={(message) => (
        <MessageCard content={message.content} createdAt={message.createdAt} />
      )}
    />
  );
}
