import { Card } from "@/molecules/Card";
import type { Entities } from "@/types/entities";

interface CampaignCardProps {
  title: Entities.Campaign["title"];
  storyteller: Entities.Campaign["storyteller"]["name"];
  players: Entities.Campaign["players"][number]["name"][];
  bannerUrl: Entities.Campaign["bannerUrl"];
}

export default function CampaignCard({
  title,
  storyteller,
  players,
  bannerUrl,
}: CampaignCardProps) {
  return (
    <Card
      title={title}
      bgImage={`/files/${bannerUrl}`}
      contentClassName="space-y-8"
      height="32"
    >
      <div>Storyteller: {storyteller}</div>
      <div>Players: {players.join(", ")}</div>
      <ul>
        <li>sessions.last.date</li>
        <li>tags</li>
        <li>sessions.next</li>
      </ul>
    </Card>
  );
}
