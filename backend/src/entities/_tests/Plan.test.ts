import { Plan } from "../Plan";
import { mockPoi, mockScenario } from "./mocks";

describe("Plan entity", () => {
  it("should instantiate with minimal inputs", () => {
    const plan = new Plan();
    plan.pictureUrl = "https://example.com/plan.jpg";
    plan.scenario = mockScenario;

    expect(plan.pictureUrl).toBe("https://example.com/plan.jpg");
    expect(plan.scenario).toBe(mockScenario);
    expect(plan.title).toBeUndefined();
    expect(plan.description).toBeUndefined();
    expect(plan.pointsOfInterest).toBeUndefined();
  });

  it("should instantiate with full inputs", () => {
    const plan = new Plan();
    plan.title = "Village Map";
    plan.description = "Map of the village square and surroundings.";
    plan.pictureUrl = "https://example.com/plan.jpg";
    plan.scenario = mockScenario;
    plan.pointsOfInterest = [mockPoi];

    expect(plan.title).toBe("Village Map");
    expect(plan.description).toBe(
      "Map of the village square and surroundings.",
    );
    expect(plan.pictureUrl).toBe("https://example.com/plan.jpg");
    expect(plan.scenario).toBe(mockScenario);
    expect(plan.pointsOfInterest).toHaveLength(1);
    expect(plan.pointsOfInterest[0]).toBe(mockPoi);
  });

  it("should handle relations correctly", () => {
    const plan = new Plan();
    plan.scenario = mockScenario;
    plan.pointsOfInterest = [mockPoi];

    expect(plan.scenario.title).toBe(mockScenario.title);
    expect(plan.pointsOfInterest[0].title).toBe(mockPoi.title);
  });
});
