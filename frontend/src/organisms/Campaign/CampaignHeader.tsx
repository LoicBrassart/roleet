import { Text } from "@/atoms/Text";
import type { Entities } from "@/types/entities";

type Props = {
  campaign: Entities.Campaign;
};
export default function CampaignHeader({ campaign }: Props) {
  return (
    <header className="flex justify-between items-center p-4 border-b">
      <Text variant="title">{campaign.title}</Text>
      <Text variant="subtitle">Meneur : {campaign.storyteller.name}</Text>
    </header>
  );
}
