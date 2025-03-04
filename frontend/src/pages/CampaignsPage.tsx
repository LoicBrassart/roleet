import CampaignList from "@/organisms/CampaignList";
import {
  type Campaign,
  useGetMyCampaignsQuery,
} from "../lib/graphql/generated/graphql-types";
import { useUserStore } from "@/lib/zustand/userStore";

export default function CampaignsPage() {
  const currentUser = useUserStore((state) => state.user);

  const { loading, error, data } = useGetMyCampaignsQuery();

  if (error) return <p>Oops, something went awry...</p>;
  if (loading)
    return <p>Enhance your calm, we're still fetching this data...</p>;
  if (!data) return <p>We found nothing to display.</p>;

  return (
    <>
      <CampaignList
        title="Mes Campagnes (Joueur)"
        data={
          data.getMyCampaigns.filter(
            (campaign) =>
              currentUser &&
              campaign.players.some(
                (player) => player.name === currentUser.name
              )
          ) as Campaign[]
        }
      />
      <CampaignList
        title="Mes Campagnes (Meneur)"
        data={
          data.getMyCampaigns.filter(
            (campaign) =>
              currentUser && campaign.storyteller.name === currentUser.name
          ) as Campaign[]
        }
      />
    </>
  );
}
