import { useUserStore } from "@/lib/zustand/userStore";
import CampaignDetailsView from "@/organisms/CampaignDetailsView";
import CampaignForm from "@/organisms/CampaignForm";
import CampaignHeader from "@/organisms/CampaignHeader";
import type { Q } from "@/types/queries";

type Props = {
  campaign: Q.MyCampaign;
};
export default function CampaignDetailsLayout({ campaign }: Props) {
  const currentUser = useUserStore((state) => state.user);
  const isStoryteller = campaign.storyteller.name === currentUser?.name;

  return (
    <div className="space-y-6">
      <CampaignHeader campaign={campaign} />
      {isStoryteller ? (
        <CampaignForm campaign={campaign} />
      ) : (
        <CampaignDetailsView campaign={campaign} />
      )}
    </div>
  );
}
