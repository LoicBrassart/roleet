import { Plan } from "../../entities/Plan";
import { Scenario } from "../../entities/Scenario";
import PlanResolver from "../PlanResolver";

jest.mock("../../entities/Scenario");
jest.mock("../../entities/Plan");

describe("PlanResolver (Unit Tests)", () => {
  let resolver: PlanResolver;
  const mockDataScenario = {
    id: 1,
    title: "Test Scenario",
  };
  const mockDataPlan = {
    id: 1,
    title: "First Floor",
    description:
      "A mysterious ancient door leads you to this dust-covered mansion floor",
    pictureUrl: "https://example.com/banner.jpg",
    scenario: mockDataScenario,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    resolver = new PlanResolver();
  });

  describe("createPlan", () => {
    it("should create a Plan with valid data", async () => {
      // Mocks & Preparations
      (Scenario.findOneByOrFail as jest.Mock).mockResolvedValue(
        mockDataScenario
      );

      const planInstance = {
        ...mockDataPlan,
        save: jest.fn().mockResolvedValue(mockDataPlan),
      };
      (Plan.create as jest.Mock).mockReturnValue(planInstance);

      // Fonction à lancer
      const inputData = {
        ...mockDataPlan,
        id: undefined,
        scenario: undefined,
        scenarioId: 1,
      };
      const result = await resolver.createPlan(inputData);

      // Tests
      expect(Scenario.findOneByOrFail).toHaveBeenCalledWith({
        id: inputData.scenarioId,
      });
      expect(Plan.create).toHaveBeenCalledWith({
        ...inputData,
        scenario: mockDataScenario,
      });
      expect(planInstance.save).toHaveBeenCalled();

      expect(result).toEqual(mockDataPlan);
      expect(result).toHaveProperty("id");
      expect(result.title).toBe(mockDataPlan.title);
      expect(result.description).toBe(mockDataPlan.description);
      expect(result.pictureUrl).toBe(mockDataPlan.pictureUrl);
      expect(result.scenario.id).toBe(mockDataPlan.id);
    });

    it("should throw an error when Scenario is not found", async () => {
      // Mocks & Preparations
      (Scenario.findOneByOrFail as jest.Mock).mockRejectedValue(
        new Error("Scenario not found")
      );

      // Fonction à lancer
      const inputData = {
        ...mockDataPlan,
        id: undefined,
        scenario: undefined,
        scenarioId: 999,
      };
      await expect(resolver.createPlan(inputData)).rejects.toThrow(
        "Failed to create Plan"
      );

      // Tests
      expect(Scenario.findOneByOrFail).toHaveBeenCalledWith({
        id: inputData.scenarioId,
      });
      expect(Plan.create).not.toHaveBeenCalled();
    });
  });

  describe("deletePlan", () => {
    it("should delete a Plan successfully", async () => {
      // Mocks & Preparations
      (Plan.delete as jest.Mock).mockResolvedValue({ affected: 1 });

      // Fonction à lancer
      const result = await resolver.deletePlan(1);

      // Tests
      expect(result).toBe(true);
    });

    it("should return false when trying to delete a non-existing Plan", async () => {
      // Mocks & Preparations
      (Plan.delete as jest.Mock).mockResolvedValue({ affected: 0 });

      // Fonction à lancer
      const result = await resolver.deletePlan(99999);

      // Tests
      expect(result).toBe(false);
    });
  });
});
