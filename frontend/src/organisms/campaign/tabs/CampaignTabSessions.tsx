import { List } from "@/molecules/List";
import SessionCard from "@/organisms/session/SessionCard";
import type { Entities } from "@/types/entities";

type Props = {
  campaign: Pick<Entities.Campaign, "sessions">;
};
export function CampaignTabSessions({ campaign }: Props) {
  return (
    <List
      data={campaign.sessions}
      title="Sessions"
      render={(session) => <SessionCard session={session} />}
    />
  );
}
