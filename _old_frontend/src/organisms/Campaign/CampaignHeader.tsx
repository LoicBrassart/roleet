import { Text } from "@/atoms/Text";
import type { Entities } from "@/types/entities";

type Props = {
  campaign: Entities.Campaign;
};
export default function CampaignHeader({ campaign }: Props) {
  return (
    <header className="flex items-center justify-between border-b p-4">
      <Text variant="title">{campaign.title}</Text>
      <Text variant="subtitle">Meneur : {campaign.storyteller.name}</Text>
    </header>
  );
}
