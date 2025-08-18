import type {
  GetCampaignAndNotesQuery,
  GetCampaignQuery,
  GetNotesQuery,
  GetScenarioQuery,
} from "@/lib/graphql/generated/graphql-types";

declare namespace Entities {
  type Scenario = GetScenarioQuery["getScenario"];
  type Flashcard = Scenario["flashcards"][number];
  type Plan = Scenario["plans"][number];
  type PoI = Plan["pointsOfInterest"][number];

  type Campaign = NonNullable<GetCampaignQuery["getCampaign"]>;
  type Message = GetCampaignAndNotesQuery["getMessagesByCampaign"][number];
  type Session = Campaign["sessions"][number];
  type Notes = GetNotesQuery["getNotes"];

  //TODO: Ce serait bien mais je vois pas comment l'avoir - Si porbleme de typage:
  // - fix côté backend
  // - maj comportement store Zustand ?
  // type User = LoginMutation["login"];
}
export type { Entities };
