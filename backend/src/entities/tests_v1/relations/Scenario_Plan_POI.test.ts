import { Scenario } from "../../Scenario";
import { Plan } from "../../Plan";
import { PointOfInterest } from "../../PointOfInterest";

describe("Relations: Scenario, Plan & PointOfInterest", () => {
  it("should link plans to a scenario", () => {
    const scenario = new Scenario();
    scenario.title = "Castle Siege";
    scenario.teaser = "A siege is coming";
    scenario.fullStory = "Epic siege story...";
    scenario.credits = "Storyteller";

    const plan = new Plan();
    plan.title = "Castle Map";
    plan.pictureUrl = "http://example.com/castle.png";
    plan.scenario = scenario;

    scenario.plans = [plan];

    expect(plan.scenario).toBe(scenario);
    expect(scenario.plans).toContain(plan);
  });

  it("should link points of interest to a plan", () => {
    const plan = new Plan();
    plan.title = "Dungeon Map";
    plan.pictureUrl = "http://example.com/dungeon.png";

    const poi1 = new PointOfInterest();
    poi1.title = "Treasure Room";
    poi1.plan = plan;

    const poi2 = new PointOfInterest();
    poi2.title = "Boss Room";
    poi2.plan = plan;

    plan.pointsOfInterest = [poi1, poi2];

    expect(plan.pointsOfInterest).toContain(poi1);
    expect(plan.pointsOfInterest).toContain(poi2);
    expect(plan.pointsOfInterest).toHaveLength(2);
    expect(poi1.plan).toBe(plan);
  });
});
