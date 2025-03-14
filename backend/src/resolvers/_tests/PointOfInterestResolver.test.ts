import { Plan } from "../../entities/Plan";
import { PointOfInterest } from "../../entities/PointOfInterest";
import PointOfInterestResolver from "../PointOfInterestResolver";

jest.mock("../../entities/Plan");
jest.mock("../../entities/PointOfInterest");

describe("PointOfInterestResolver (Unit Tests)", () => {
  let resolver: PointOfInterestResolver;
  const mockDataPlan = {
    id: 1,
    name: "Test Plan",
  };
  const mockDataPointOfInterest = {
    id: 1,
    code: "POI001",
    title: "Ancient Door",
    description: "A mysterious ancient door",
    plan: mockDataPlan,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    resolver = new PointOfInterestResolver();
  });

  describe("createPointOfInterest", () => {
    it("should create a PointOfInterest with valid data", async () => {
      // Mocks & Preparations
      (Plan.findOneByOrFail as jest.Mock).mockResolvedValue(mockDataPlan);

      const poiInstance = {
        ...mockDataPointOfInterest,
        save: jest.fn().mockResolvedValue(mockDataPointOfInterest),
      };
      (PointOfInterest.create as jest.Mock).mockReturnValue(poiInstance);

      // Fonction à lancer
      const inputData = {
        ...mockDataPointOfInterest,
        id: undefined,
        plan: undefined,
        planId: 1,
      };
      const result = await resolver.createPointOfInterest(inputData);

      // Tests
      expect(Plan.findOneByOrFail).toHaveBeenCalledWith({
        id: inputData.planId,
      });
      expect(PointOfInterest.create).toHaveBeenCalledWith({
        ...inputData,
        plan: mockDataPlan,
      });
      expect(poiInstance.save).toHaveBeenCalled();

      expect(result).toEqual(mockDataPointOfInterest);
      expect(result).toHaveProperty("id");
      expect(result.code).toBe(mockDataPointOfInterest.code);
      expect(result.title).toBe(mockDataPointOfInterest.title);
      expect(result.plan.id).toBe(mockDataPointOfInterest.id);
    });

    it("should throw an error when Plan is not found", async () => {
      // Mocks & Preparations
      (Plan.findOneByOrFail as jest.Mock).mockRejectedValue(
        new Error("Plan not found"),
      );

      // Fonction à lancer
      const inputData = {
        ...mockDataPointOfInterest,
        id: undefined,
        plan: undefined,
        planId: 999,
      };
      await expect(resolver.createPointOfInterest(inputData)).rejects.toThrow(
        "Failed to create point of interest",
      );

      // Tests
      expect(Plan.findOneByOrFail).toHaveBeenCalledWith({
        id: inputData.planId,
      });
      expect(PointOfInterest.create).not.toHaveBeenCalled();
    });
  });

  describe("deletePointOfInterest", () => {
    it("should delete a PointOfInterest successfully", async () => {
      // Mocks & Preparations
      (PointOfInterest.delete as jest.Mock).mockResolvedValue({ affected: 1 });

      // Fonction à lancer
      const result = await resolver.deletePointOfInterest(1);

      // Tests
      expect(result).toBe(true);
    });

    it("should return false when trying to delete a non-existing PointOfInterest", async () => {
      // Mocks & Preparations
      (PointOfInterest.delete as jest.Mock).mockResolvedValue({ affected: 0 });

      // Fonction à lancer
      const result = await resolver.deletePointOfInterest(99999);

      // Tests
      expect(result).toBe(false);
    });
  });
});
