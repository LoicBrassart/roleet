import type { GetScenarioQuery } from "@/lib/graphql/generated/graphql-types";

export namespace Q {
  type Scenario = GetScenarioQuery["getScenario"];
  type ScenarioPlan = Scenario["plans"][number];
  type ScenarioFlashcard = Scenario["flashcards"][number];
}
