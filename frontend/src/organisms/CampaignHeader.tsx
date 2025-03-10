import { Text } from "../atoms/Text";
// TODO type props
export default function CampaignHeader({ campaign }) {
  return (
    <header className="flex justify-between items-center p-4 border-b">
      <Text variant="title">{campaign.title}</Text>
      <Text variant="subtitle">Meneur : {campaign.storyteller.name}</Text>
    </header>
  );
}
