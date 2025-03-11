import { Plan } from "../Plan";
import { PointOfInterest } from "../PointOfInterest";
import { Scenario } from "../Scenario";

describe("Plan entity", () => {
  it("should create a valid Plan instance with required fields", () => {
    const scenario = new Scenario();
    const plan = new Plan();

    plan.pictureUrl = "https://example.com/map.jpg";
    plan.scenario = scenario;

    expect(plan.pictureUrl).toBe("https://example.com/map.jpg");
    expect(plan.scenario).toBe(scenario);
    expect(plan.title).toBeUndefined();
    expect(plan.description).toBeUndefined();
    expect(plan.pointsOfInterest).toBeUndefined(); // Pas encore défini
  });

  it("should handle optional title and description fields", () => {
    const scenario = new Scenario();
    const plan = new Plan();

    plan.pictureUrl = "https://example.com/map.jpg";
    plan.title = "Dungeon Map";
    plan.description = "Map of the ancient dungeon.";
    plan.scenario = scenario;

    expect(plan.title).toBe("Dungeon Map");
    expect(plan.description).toBe("Map of the ancient dungeon.");
  });

  it("should handle a list of points of interest", () => {
    const scenario = new Scenario();
    const poi1 = new PointOfInterest();
    poi1.code = "A1";
    poi1.title = "Hidden Door";

    const poi2 = new PointOfInterest();
    poi2.code = "B2";
    poi2.title = "Treasure Chest";

    const plan = new Plan();
    plan.pictureUrl = "https://example.com/empty-map.jpg";
    plan.scenario = scenario;
    plan.pointsOfInterest = [];

    expect(plan.pointsOfInterest.length).toBe(0);
  });
});
