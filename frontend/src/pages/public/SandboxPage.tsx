import { useGetCampaignQuery } from "@/lib/graphql/generated/graphql-types";
import CampaignForm from "@/organisms/Campaign/CampaignForm";

export default function SandboxPage() {
  const { data } = useGetCampaignQuery({
    variables: { id: "c9a99b9c-3645-4340-b0a0-96f0c2818fae" },
  });

  return (
    <>
      <h1>Bienvenue au Labo !</h1>
      {data?.getCampaign && <CampaignForm campaign={data?.getCampaign} />}
    </>
  );
}
