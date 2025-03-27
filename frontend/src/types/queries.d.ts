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
  type Campaign = GetCampaignQuery["getCampaign"];
}
export type { Q };
