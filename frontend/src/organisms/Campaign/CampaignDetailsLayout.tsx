import { useUserStore } from "@/lib/zustand/userStore";
import CampaignDetailsView from "@/organisms/Campaign/CampaignDetailsView";
import CampaignForm from "@/organisms/Campaign/CampaignForm";
import CampaignHeader from "@/organisms/Campaign/CampaignHeader";
import type { Q } from "@/types/queries";

type Props = {
  campaign: Q.Campaign;
};
export default function CampaignDetailsLayout({ campaign }: Props) {
  const currentUser = useUserStore((state) => state.user);
  if (!currentUser) throw new Error("User not found");
  const isStoryteller = campaign.storyteller.name === currentUser.name;

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
