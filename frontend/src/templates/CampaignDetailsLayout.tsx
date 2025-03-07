import { useUserStore } from "@/lib/zustand/userStore";
import CampaignDetailsView from "../organisms/CampaignDetailsView";
import CampaignForm from "../organisms/CampaignForm";
import CampaignHeader from "../organisms/CampaignHeader";

export default function CampaignDetailsLayout({ campaign }) {
  const currentUser = useUserStore((state) => state.user);

  const isStoryteller = campaign.storyteller.name === currentUser?.name; // TODO: Récupérer le rôle réel

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
