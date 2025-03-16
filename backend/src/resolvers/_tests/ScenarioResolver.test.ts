import ScenarioResolver from "../ScenarioResolver";
import { Scenario } from "../../entities/Scenario";

jest.mock("../../entities/Scenario");

describe("ScenarioResolver (Unit Tests)", () => {
  let resolver: ScenarioResolver;
  const mockDataScenario = {
    id: 1,
    title: "Le loup qui avait un nouvel ami",
    teaser:
      "Scenario dans lequel les PJ se retrouvent mêlés au meurtre d'un pharmacien dans des circonstances étranges",
    fullStory: "Lorem ipsum dolor sit amet, non consequitur blablabla...",
    bannerUrl: "https://example.com/banner.jpg",
    credits: "Made in Missy !",
  };

  beforeEach(() => {
    jest.clearAllMocks();
    resolver = new ScenarioResolver();
  });

  describe("createScenario", () => {
    it("should create a Plan with valid data", async () => {
      // Mocks & Preparations

      const scenarioInstance = {
        ...mockDataScenario,
        save: jest.fn().mockResolvedValue(mockDataScenario),
      };
      (Scenario.create as jest.Mock).mockReturnValue(scenarioInstance);

      // Fonction à lancer
      const inputData = {
        ...mockDataScenario,
        id: undefined,
      };
      const result = await resolver.createScenario(inputData);

      // Tests
      expect(Scenario.create).toHaveBeenCalledWith({
        ...inputData,
      });
      expect(scenarioInstance.save).toHaveBeenCalled();

      console.log(result);
      expect(result).toEqual(mockDataScenario);
      expect(result).toHaveProperty("id");
      expect(result.title).toBe(mockDataScenario.title);
      expect(result.teaser).toBe(mockDataScenario.teaser);
      expect(result.fullStory).toBe(mockDataScenario.fullStory);
      expect(result.bannerUrl).toBe(mockDataScenario.bannerUrl);
      expect(result.credits).toBe(mockDataScenario.credits);
      // expect(result.plans).toHaveLength(0);
      // expect(result.flashcards).toHaveLength(0);
      // expect(result.readers).toHaveLength(0);
      // expect(result.campaigns).toHaveLength(0);
    });
  });
});
