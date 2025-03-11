import ScenarioResolver from "../ScenarioResolver";
import { Scenario } from "../../entities/Scenario";
import { User } from "../../entities/User";

jest.mock("../../entities/Scenario");
jest.mock("../../entities/User");

describe("ScenarioResolver", () => {
  let resolver: ScenarioResolver;

  beforeEach(() => {
    resolver = new ScenarioResolver();
    jest.clearAllMocks();
  });

  describe("getAllScenarios", () => {
    it("should return all scenarios", async () => {
      const scenarioMock = {
        title: "Scenario 1",
        teaser: "Teaser",
        fullStory: "Full Story",
      };
      (Scenario.find as jest.Mock).mockResolvedValue([scenarioMock]);

      const result = await resolver.getAllScenarios();

      expect(Scenario.find).toHaveBeenCalledWith({
        relations: ["plans", "flashcards"],
      });
      expect(result).toEqual([scenarioMock]);
    });
  });

  describe("getMyScenarios", () => {
    it("should return scenarios for the current user", async () => {
      const ctx = { user: { id: 1 } } as any; // Mocked context
      const scenarioMock = {
        title: "User Scenario",
        teaser: "Teaser",
        fullStory: "Full Story",
      };
      (Scenario.find as jest.Mock).mockResolvedValue([scenarioMock]);

      const result = await resolver.getMyScenarios(ctx);

      expect(Scenario.find).toHaveBeenCalledWith({
        where: { readers: { id: ctx.user?.id } },
        relations: ["plans", "flashcards"],
      });
      expect(result).toEqual([scenarioMock]);
    });
  });

  describe("getScenario", () => {
    it("should return a single scenario by id", async () => {
      const scenarioMock = {
        id: 1,
        title: "Scenario 1",
        teaser: "Teaser",
        fullStory: "Full Story",
      };
      (Scenario.findOne as jest.Mock).mockResolvedValue(scenarioMock);

      const result = await resolver.getScenario(1);

      expect(Scenario.findOne).toHaveBeenCalledWith({
        where: { id: 1 },
        relations: { plans: { pointsOfInterest: true }, flashcards: true },
      });
      expect(result).toEqual(scenarioMock);
    });
  });

  describe("createScenario", () => {
    it("should create and return a new scenario", async () => {
      const input = {
        title: "New Scenario",
        teaser: "Teaser for the new scenario",
        fullStory: "Full story of the new scenario",
        credits: "Creator Name",
      };

      const scenarioMock = {
        ...input,
        save: jest.fn().mockResolvedValue(true),
      } as any;
      (Scenario.create as jest.Mock).mockReturnValue(scenarioMock);

      const result = await resolver.createScenario(input);

      expect(Scenario.create).toHaveBeenCalledWith(input);
      expect(scenarioMock.save).toHaveBeenCalled();
      expect(result).toEqual(scenarioMock);
    });

    it("should throw an error if the scenario creation fails", async () => {
      const input = {
        title: "New Scenario",
        teaser: "Teaser for the new scenario",
        fullStory: "Full story of the new scenario",
        credits: "Creator Name",
      };

      (Scenario.create as jest.Mock).mockImplementation(() => {
        throw new Error("Failed to create scenario");
      });

      await expect(resolver.createScenario(input)).rejects.toThrow(
        "Failed to create scenario"
      );
    });
  });

  describe("deleteScenario", () => {
    it("should return true if the scenario is deleted", async () => {
      const id = 1;
      (Scenario.delete as jest.Mock).mockResolvedValue({ affected: 1 });

      const result = await resolver.deleteScenario(id);

      expect(Scenario.delete).toHaveBeenCalledWith(id);
      expect(result).toBe(true);
    });

    it("should return false if no scenario is deleted", async () => {
      const id = 1;
      (Scenario.delete as jest.Mock).mockResolvedValue({ affected: 0 });

      const result = await resolver.deleteScenario(id);

      expect(Scenario.delete).toHaveBeenCalledWith(id);
      expect(result).toBe(false);
    });
  });

  describe("unsealScenario", () => {
    it("should unseal the scenario for the current user", async () => {
      const ctx = { user: { id: 1 } } as any;
      const scenarioMock = { id: 1, readers: [] } as Scenario;
      const userMock = { id: 1 };

      (Scenario.findOne as jest.Mock).mockResolvedValue(scenarioMock);
      (User.findOneByOrFail as jest.Mock).mockResolvedValue(userMock);
      (Scenario.save as jest.Mock).mockResolvedValue(true);

      const result = await resolver.unsealScenario(1, ctx);

      expect(Scenario.findOne).toHaveBeenCalledWith({
        where: { id: 1 },
        relations: ["readers"],
      });
      expect(User.findOneByOrFail).toHaveBeenCalledWith({ id: ctx.user?.id });
      expect(Scenario.save).toHaveBeenCalled();
      expect(scenarioMock.save).toHaveBeenCalled();

      expect(result).toBe(true);
    });

    it("should return false if the scenario is already unsealed for the user", async () => {
      const ctx = { user: { id: 1 } } as any;
      const scenarioMock = { id: 1, readers: [{ id: 1 }] };

      (Scenario.findOne as jest.Mock).mockResolvedValue(scenarioMock);

      const result = await resolver.unsealScenario(1, ctx);

      expect(result).toBe(true);
    });

    it("should throw an error if the user is unauthorized", async () => {
      const ctx = { user: null } as any;
      await expect(resolver.unsealScenario(1, ctx)).rejects.toThrow(
        "Unauthorized"
      );
    });

    it("should throw an error if the scenario is not found", async () => {
      const ctx = { user: { id: 1 } } as any;
      (Scenario.findOne as jest.Mock).mockResolvedValue(null);

      await expect(resolver.unsealScenario(1, ctx)).rejects.toThrow(
        "Scenario not found"
      );
    });
  });
});
