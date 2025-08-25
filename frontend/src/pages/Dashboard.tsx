import { Link } from "react-router";
import { useGetMyCampaignsQuery } from "@/lib/graphql/generated/graphql-types";
import { useCurrentUser } from "@/lib/zustand/userStore";
import { List } from "@/molecules/List";
import CampaignCard from "@/organisms/campaign/CampaignCard";

export default function Dashboard() {
  const user = useCurrentUser();
  const { data, loading, error } = useGetMyCampaignsQuery();

  if (!user) return <p>Error: missing user !</p>;
  if (error) return <p>Error: fetch failed !</p>;
  if (loading) return <p>Loading: please wait...</p>;
  if (!data) return <p>Error: missing data !</p>;

  return (
    <List
      title="Mes Campagnes"
      data={data.getMyCampaigns}
      render={(campaign) => (
        <Link to={`/campaigns/${campaign.id}`}>
          <CampaignCard
            title={campaign.title}
            storyteller={campaign.storyteller.name}
            players={campaign.players.map((player) => player.name)}
            bannerUrl={campaign.bannerUrl}
          />
        </Link>
      )}
    />
  );
}
