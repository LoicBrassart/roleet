import { Card } from "@/molecules/Card";
import type { Entities } from "@/types/entities";

export default function CampaignCard({
  title,
  storyteller,
  players,
  bannerUrl,
}: Pick<Entities.Campaign, "title" | "storyteller" | "players" | "bannerUrl">) {
  return (
    <Card
      title={title}
      className="bg-black/50 text-white bg-blend-soft-light"
      style={{ backgroundImage: `url(/files/${bannerUrl})` }}
    >
      Storyteller: {storyteller.name}
      Players: {players.map((player) => player.name).join(", ")}
      <ul>
        <li>sessions.last.date</li>
        <li>tags</li>
        <li>sessions.next</li>
      </ul>
    </Card>
  );
}
