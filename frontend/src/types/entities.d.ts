import type {
  GetAllScenariosQuery,
  GetCampaignQuery,
  GetMyCampaignsQuery,
  GetScenarioQuery,
} from "@/lib/graphql/generated/graphql-types";

declare namespace Entities {
  type Scenario = GetScenarioQuery["getScenario"];
  type Flashcard = Scenario["flashcards"][number];
  type Plan = Scenario["plans"][number];
  type PoI = Plan["pointsOfInterest"][number];

  type Campaign = NonNullable<GetCampaignQuery["getCampaign"]>;
  type Message = Campaign["messages"][number];
}
export type { Entities };
