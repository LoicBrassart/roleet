import { Plan } from "../../entities/Plan";
import { PointOfInterest } from "../../entities/PointOfInterest";
import PointOfInterestResolver from "../PointOfInterestResolver";

// Mock de la base de données (ici Plan et PointOfInterest)
jest.mock("../../entities/Plan");
jest.mock("../../entities/PointOfInterest");

describe("PointOfInterestResolver (Unit Test)", () => {
  let resolver: PointOfInterestResolver;
  const mockPlanRepo = {
    findOneByOrFail: jest.fn(),
  };
  const mockPOIRepo = {
    create: jest.fn(),
    save: jest.fn(),
    delete: jest.fn().mockResolvedValue({ affected: 1 }),
  };

  beforeAll(() => {
    jest.clearAllMocks();

    resolver = new PointOfInterestResolver();

    // Remplacement des repositories avec les mocks
    (Plan.findOneByOrFail as jest.Mock) = mockPlanRepo.findOneByOrFail;
    (PointOfInterest.create as jest.Mock) = mockPOIRepo.create;
    (PointOfInterest.save as jest.Mock) = mockPOIRepo.save;
    (PointOfInterest.delete as jest.Mock) = mockPOIRepo.delete;
  });

  describe("createPointOfInterest", () => {
    const poiData = {
      code: "POI001",
      title: "Ancient Door",
      description: "A mysterious ancient door",
      planId: 1,
    };
    // Création d'un mock pour Plan
    const planMock = { id: 1, name: "Test Plan" }; // Valeur du plan mocké

    // Mock pour PointOfInterest.create
    const poiMock = {
      ...poiData,
      plan: planMock,
    };
    const poiMockSave = {
      id: 1,
      ...poiMock,
      save: mockPOIRepo.create.mockReturnValue(poiMock),
    };

    it("should create a PointOfInterest with valid data", async () => {
      mockPlanRepo.findOneByOrFail.mockReturnValue(planMock);
      mockPOIRepo.create.mockReturnValue(poiMockSave);
      mockPOIRepo.save.mockReturnValue(poiMockSave);

      const result = await resolver.createPointOfInterest(poiData);

      expect(Plan.findOneByOrFail).toHaveBeenCalledWith({ id: poiMock.planId });
      expect(Plan.findOneByOrFail).toHaveBeenCalledTimes(1);
      expect(mockPOIRepo.create).toHaveBeenCalledWith(poiMock);
      expect(result).toEqual(poiMockSave);

      expect(result).toHaveProperty("id");
      expect(result.code).toBe("POI001");
      expect(result.title).toBe("Ancient Door");
      expect(result.plan.id).toBe(1);
    });

    it("should throw an error when creating a PointOfInterest fails", async () => {
      mockPlanRepo.findOneByOrFail.mockRejectedValue(new Error());

      expect(resolver.createPointOfInterest(poiData)).rejects.toThrow(
        "Failed to create point of interest",
      );
    });

    it("should throw an error when the planId is invalid", async () => {
      mockPlanRepo.findOneByOrFail.mockRejectedValue(
        new Error("Plan not found"),
      );
      mockPOIRepo.create.mockReturnValue(poiMockSave);
      mockPOIRepo.save.mockReturnValue(poiMockSave);

      expect(mockPlanRepo.findOneByOrFail).rejects.toThrow("Plan not found");
      expect(resolver.createPointOfInterest(poiData)).rejects.toThrow(
        "Failed to create point of interest",
      );
    });
  });

  describe("deletePointOfInterest", () => {
    it("should delete a PointOfInterest successfully", async () => {
      mockPOIRepo.delete.mockResolvedValueOnce({ affected: 1 });

      const result = await resolver.deletePointOfInterest(1);
      expect(mockPOIRepo.delete).toHaveBeenCalledWith(1);
      expect(result).toBe(true);
    });

    it("should return false when trying to delete a non-existing PointOfInterest", async () => {
      mockPOIRepo.delete.mockResolvedValueOnce({ affected: 0 });

      const result = await resolver.deletePointOfInterest(9999);
      expect(mockPOIRepo.delete).toHaveBeenCalledWith(1);
      expect(result).toBe(false); 
    });
  });
});
