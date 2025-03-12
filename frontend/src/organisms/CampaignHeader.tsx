import { Text } from "@/atoms/Text";
import type { Q } from "@/types/queries";

type Props = {
  campaign: Q.MyCampaign;
};
export default function CampaignHeader({ campaign }: Props) {
  return (
    <header className="flex justify-between items-center p-4 border-b">
      <Text variant="title">{campaign.title}</Text>
      <Text variant="subtitle">Meneur : {campaign.storyteller.name}</Text>
    </header>
  );
}
