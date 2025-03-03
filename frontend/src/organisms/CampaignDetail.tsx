import type { Campaign } from "@/lib/graphql/generated/graphql-types";
import { useUserStore } from "@/lib/zustand/userStore";

type Props = {
  data: Campaign;
};
export default function CampaignDetail({ data }: Props) {
  const currentUser = useUserStore((state) => state.user);

  const formatter = new Intl.ListFormat("fr", {
    style: "long",
    type: "conjunction",
  });

  return (
    <>
      <h1>{data.title}</h1>
      <ul>
        <li>Meneur: {data.storyteller.name}</li>
        <li>
          Joueurs: {formatter.format(data.players.map((player) => player.name))}
        </li>
        {currentUser?.name === data.storyteller.name && (
          <li>
            Scenarios:
            {formatter.format(data.scenarios.map((scenario) => scenario.title))}
          </li>
        )}
      </ul>
    </>
  );
}
