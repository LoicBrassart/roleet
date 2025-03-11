import PlanResolver from "../PlanResolver";
import { Plan } from "../../entities/Plan";
import { Scenario } from "../../entities/Scenario";

jest.mock("../../entities/Plan");
jest.mock("../../entities/Scenario");

describe("PlanResolver", () => {
  let resolver: PlanResolver;

  beforeEach(() => {
    resolver = new PlanResolver();
    jest.clearAllMocks();
  });

  describe("createPlan", () => {
    it("should create and return a plan", async () => {
      const input = {
        title: "Adventure Plan",
        description: "A strategic plan for the adventure.",
        pictureUrl: "https://example.com/plan.jpg",
        scenarioId: 1,
      };

      const mockScenario = { id: 1, title: "The Dark Forest" } as Scenario;
      const mockPlan = {
        id: 1,
        ...input,
        scenario: mockScenario,
        save: jest.fn().mockResolvedValue(true),
      } as Plan;

      (Scenario.findOneByOrFail as jest.Mock).mockResolvedValue(mockScenario);
      (Plan.create as jest.Mock).mockReturnValue(mockPlan);

      const result = await resolver.createPlan(input);

      expect(Scenario.findOneByOrFail).toHaveBeenCalledWith({
        id: input.scenarioId,
      });
      expect(Plan.create).toHaveBeenCalledWith({
        ...input,
        scenario: mockScenario,
      });
      expect(mockPlan.save).toHaveBeenCalled();
      expect(result).toEqual(mockPlan);
    });

    it("should throw an error if scenario not found", async () => {
      const input = {
        title: "Adventure Plan",
        description: "A strategic plan for the adventure.",
        pictureUrl: "https://example.com/plan.jpg",
        scenarioId: 999, // Invalid scenarioId
      };

      (Scenario.findOneByOrFail as jest.Mock).mockRejectedValue(
        new Error("Scenario not found")
      );

      await expect(resolver.createPlan(input)).rejects.toThrow(
        "Failed to create Plan"
      );
    });
  });

  describe("deletePlan", () => {
    it("should delete a plan and return true", async () => {
      const planId = 1;
      const mockResult = { affected: 1 };
      (Plan.delete as jest.Mock).mockResolvedValue(mockResult);

      const result = await resolver.deletePlan(planId);

      expect(Plan.delete).toHaveBeenCalledWith(planId);
      expect(result).toBe(true);
    });

    it("should return false if plan not found", async () => {
      const planId = 999;
      const mockResult = { affected: 0 };
      (Plan.delete as jest.Mock).mockResolvedValue(mockResult);

      const result = await resolver.deletePlan(planId);

      expect(Plan.delete).toHaveBeenCalledWith(planId);
      expect(result).toBe(false);
    });
  });
});
