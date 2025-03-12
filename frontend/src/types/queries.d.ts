import type {
  GetAllScenariosQuery,
  GetMyCampaignsQuery,
  GetScenarioQuery,
} from "@/lib/graphql/generated/graphql-types";

declare namespace Q {
  type Scenario = GetScenarioQuery["getScenario"];
  type ScenarioPlan = Scenario["plans"][number];
  type ScenarioFlashcard = Scenario["flashcards"][number];

  type AllScenarios = GetAllScenariosQuery["getAllScenarios"];

  type MyCampaign = GetMyCampaignsQuery["getMyCampaigns"][number];
}

export type { Q };