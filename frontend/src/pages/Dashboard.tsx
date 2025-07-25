import { useGetMyCampaignsQuery } from "@/lib/graphql/generated/graphql-types";
import { useCurrentUser } from "@/lib/zustand/userStore";
import CampaignCard from "@/organisms/campaign/CampaignCard";

export default function Dashboard() {
  const user = useCurrentUser();
  const { data, loading, error } = useGetMyCampaignsQuery();

  if (!user) return <p>Error: missing user !</p>;
  if (error) return <p>Error: fetch failed !</p>;
  if (loading) return <p>Loading: please wait...</p>;
  if (!data) return <p>Error: missing data !</p>;

  return (
    <>
      <h1 className="font-title text-white">Mes Campagnes</h1>
      <ul>
        {data.getMyCampaigns.map((campaign) => (
          <li key={campaign.id}>
            <CampaignCard {...campaign} />
          </li>
        ))}
      </ul>
    </>
  );
}
