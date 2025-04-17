import { useGetMyCampaignsQuery } from "@/lib/graphql/generated/graphql-types";
import { handleError } from "@/lib/helpers/handleError";
import { useConnectedUser } from "@/lib/zustand/userStore";
import CampaignList from "@/organisms/Campaign/CampaignList";

export default function CampaignListPage() {
  const currentUser = useConnectedUser();
  const { loading, error, data } = useGetMyCampaignsQuery();

  if (error) return handleError(error);
  if (loading)
    return <p>Enhance your calm, we're still fetching this data...</p>;
  if (!data) return <p>We found nothing to display.</p>;

  return (
    <>
      <CampaignList
        title="Mes Campagnes (Joueur)"
        data={data.getMyCampaigns.filter(
          (campaign) =>
            currentUser &&
            campaign.players.some((player) => player.name === currentUser.name),
        )}
      />
      <CampaignList
        title="Mes Campagnes (Meneur)"
        data={data.getMyCampaigns.filter(
          (campaign) =>
            currentUser && campaign.storyteller.name === currentUser.name,
        )}
      />
    </>
  );
}
