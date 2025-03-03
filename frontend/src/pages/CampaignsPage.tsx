import CampaignList from "@/organisms/CampaignList";
import {
  type Campaign,
  useGetMyCampaignsQuery,
} from "../lib/graphql/generated/graphql-types";

export default function CampaignsPage() {
  const { loading, error, data } = useGetMyCampaignsQuery();

  if (error) return <p>Oops, something went awry...</p>;
  if (loading)
    return <p>Enhance your calm, we're still fetching this data...</p>;
  if (!data) return <p>We found nothing to display.</p>;

  return (
    <>
      <CampaignList
        title="My Campaigns"
        data={data.getMyCampaigns as Campaign[]}
      />
    </>
  );
}
