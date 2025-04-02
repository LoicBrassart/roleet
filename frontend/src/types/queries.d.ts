import type {
  GetAllScenariosQuery,
  GetCampaignQuery,
  GetMyCampaignsQuery,
  GetScenarioQuery,
} from "@/lib/graphql/generated/graphql-types";

declare namespace Q {
  type Scenario = GetScenarioQuery["getScenario"];
  type ScenarioPlan = Scenario["plans"][number];
  type ScenarioFlashcard = Scenario["flashcards"][number];
  type AllScenarios = GetAllScenariosQuery["getAllScenarios"];
  type Campaign = Defined<GetCampaignQuery["getCampaign"]>;
  type CampaignMessage = Campaign["messages"][number];

  type MyCampaign = Defined<GetMyCampaignsQuery["getMyCampaigns"]>[number];
}
export type { Q };
