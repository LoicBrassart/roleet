import PointOfInterestResolver from "../PointOfInterestResolver";
import { Plan } from "../../entities/Plan";
import { PointOfInterest } from "../../entities/PointOfInterest";

jest.mock("../../entities/Plan");
jest.mock("../../entities/PointOfInterest");

describe("PointOfInterestResolver", () => {
  let resolver: PointOfInterestResolver;

  beforeEach(() => {
    resolver = new PointOfInterestResolver();
    jest.clearAllMocks();
  });

  describe("createPointOfInterest", () => {
    it("should create and return a point of interest", async () => {
      const input = {
        code: "poi-001",
        title: "Interesting Location",
        description: "This is a point of interest",
        planId: 1,
      };

      const planMock = { id: 1, title: "Plan 1" } as Plan;

      const poiMock = {
        code: "poi-001",
        title: "Interesting Location",
        description: "This is a point of interest",
        plan: planMock,
        save: jest.fn().mockResolvedValue(true),
      } as unknown as PointOfInterest;

      (Plan.findOneByOrFail as jest.Mock).mockResolvedValue(planMock);
      (PointOfInterest.create as jest.Mock).mockReturnValue(poiMock);
      (PointOfInterest.save as jest.Mock).mockResolvedValue(poiMock);

      const result = await resolver.createPointOfInterest(input);

      expect(Plan.findOneByOrFail).toHaveBeenCalledWith({ id: input.planId });
      expect(PointOfInterest.create).toHaveBeenCalledWith({
        ...input,
        plan: planMock,
      });
      expect(poiMock.save).toHaveBeenCalled();
      expect(result).toEqual(poiMock);
    });

    it("should throw an error if plan is not found", async () => {
      const input = {
        code: "poi-001",
        title: "Interesting Location",
        description: "This is a point of interest",
        planId: 999,
      };

      (Plan.findOneByOrFail as jest.Mock).mockRejectedValue(
        new Error("Plan not found")
      );

      await expect(resolver.createPointOfInterest(input)).rejects.toThrow(
        "Failed to create point of interest"
      );
    });
  });

  describe("deletePointOfInterest", () => {
    it("should return true if point of interest is deleted", async () => {
      const id = 1;

      (PointOfInterest.delete as jest.Mock).mockResolvedValue({ affected: 1 });

      const result = await resolver.deletePointOfInterest(id);

      expect(PointOfInterest.delete).toHaveBeenCalledWith(id);
      expect(result).toBe(true);
    });

    it("should return false if point of interest is not deleted", async () => {
      const id = 1;

      (PointOfInterest.delete as jest.Mock).mockResolvedValue({ affected: 0 });

      const result = await resolver.deletePointOfInterest(id);

      expect(PointOfInterest.delete).toHaveBeenCalledWith(id);
      expect(result).toBe(false);
    });
  });
});
