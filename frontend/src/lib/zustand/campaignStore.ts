import { create } from "zustand";
import type { Campaign } from "../graphql/generated/graphql-types";

type CampaignState = {
  campaign: Campaign | null;
  setCampaign: (campaign: Campaign) => void;
};

export const useCampaignStore = create<CampaignState>((set) => ({
  campaign: null,
  setCampaign: (campaign: Campaign) => set(() => ({ campaign: campaign })),
}));
