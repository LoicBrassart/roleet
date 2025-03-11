import type { Campaign } from "@/lib/graphql/generated/graphql-types";
import { Text } from "../atoms/Text";
type Props = {
  campaign: Pick<Campaign, "id" | "title" | "storyteller">;
};
export default function CampaignHeader({ campaign }: Props) {
  return (
    <header className="flex justify-between items-center p-4 border-b">
      <Text variant="title">{campaign.title}</Text>
      <Text variant="subtitle">Meneur : {campaign.storyteller.name}</Text>
    </header>
  );
}
