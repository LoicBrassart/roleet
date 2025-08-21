import type { Entities } from "@/types/entities";

type Props = {
  campaign: Pick<
    Entities.Campaign,
    "title" | "storyteller" | "players" | "scenarios"
  >;
};
export function CampaignTabHome({ campaign }: Props) {
  return (
    <>
      <h1 className="font-title text-white">Informations générales</h1>
      <ul>
        <li>Titre: {campaign.title}</li>
        <li>Meneur: {campaign.storyteller.name}</li>
        <li>
          Joueurs: {campaign.players.map((player) => player.name).join(", ")}
        </li>
        <li>
          Scenarios:
          <ul>
            {campaign.scenarios.map((scenario) => (
              <li key={scenario.id}>{scenario.title}</li>
            ))}
          </ul>
        </li>
        <li>Prochaine session: Coming Soon...</li>
      </ul>
    </>
  );
}
