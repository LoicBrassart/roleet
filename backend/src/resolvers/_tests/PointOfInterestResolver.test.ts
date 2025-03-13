import { Plan } from "../../entities/Plan";
import { PointOfInterest } from "../../entities/PointOfInterest";
import PointOfInterestResolver from "../PointOfInterestResolver";

// Mock de la base de données (ici Plan et PointOfInterest)
jest.mock("../../entities/Plan");
jest.mock("../../entities/PointOfInterest");

describe("PointOfInterestResolver (Unit Test)", () => {
  let resolver: PointOfInterestResolver;

  beforeEach(() => {
    resolver = new PointOfInterestResolver();
  });

  it("should create a PointOfInterest with valid data", async () => {
    // Création d'un mock pour Plan
    const planMock = { id: 1, name: "Test Plan" }; // Valeur du plan mocké
    (Plan.findOneByOrFail as jest.Mock).mockResolvedValue(planMock);

    const poiData = {
      code: "POI001",
      title: "Ancient Door",
      description: "A mysterious ancient door",
      planId: 1,
    };

    // Mock pour PointOfInterest.create
    const poiMock = {
      id: 1,
      ...poiData,
      plan: planMock,
      save: jest.fn().mockResolvedValue({ id: 1, ...poiData, plan: planMock }), // Simulation de l'enregistrement de l'objet
    };

    (PointOfInterest.create as jest.Mock).mockReturnValue(poiMock); // Simulation de la méthode create

    const result = await resolver.createPointOfInterest(poiData);

    expect(result).toHaveProperty("id");
    expect(result.code).toBe("POI001");
    expect(result.title).toBe("Ancient Door");
    expect(result.plan.id).toBe(1);
  });

  it("should throw an error when the planId is invalid", async () => {
    const poiData = {
      code: "POI002",
      title: "Mystic Gate",
      description: "A mystical gate",
      planId: 99999, // ID non valide
    };

    (Plan.findOneByOrFail as jest.Mock).mockRejectedValue(
      new Error("Plan not found"),
    ); // Simulation d'une erreur si le plan n'est pas trouvé

    await expect(resolver.createPointOfInterest(poiData)).rejects.toThrow(
      "Failed to create point of interest",
    );
  });

  it("should delete a PointOfInterest successfully", async () => {
    const poiMock = { id: 1, code: "POI003", title: "Forbidden Portal" };

    (PointOfInterest.delete as jest.Mock).mockResolvedValue({ affected: 1 }); // Simulation de la suppression réussie

    const result = await resolver.deletePointOfInterest(1);

    expect(result).toBe(true);
  });

  it("should return false when trying to delete a non-existing PointOfInterest", async () => {
    (PointOfInterest.delete as jest.Mock).mockResolvedValue({ affected: 0 }); // Simulation de l'échec de la suppression

    const result = await resolver.deletePointOfInterest(99999); // ID inexistant

    expect(result).toBe(false);
  });
});
