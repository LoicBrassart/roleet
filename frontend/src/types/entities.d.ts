import type {
  GetCampaignQuery,
  GetScenarioQuery,
} from "@/lib/graphql/generated/graphql-types";

declare namespace Entities {
  type Scenario = GetScenarioQuery["getScenario"];
  type Flashcard = Scenario["flashcards"][number];
  type Plan = Scenario["plans"][number];
  type PoI = Plan["pointsOfInterest"][number];

  type Campaign = NonNullable<GetCampaignQuery["getCampaign"]>;
  type Message = Campaign["messages"][number];

  //TODO: Ce serait bien mais je vois pas comment l'avoir
  // type User = LoginMutation["login"];
}
export type { Entities };
