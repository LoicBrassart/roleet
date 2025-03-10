import FlashcardResolver from "../FlashcardResolver";
import { Flashcard, DnDnpcCard } from "../../entities/FlashCard";
import { Scenario } from "../../entities/Scenario";

jest.mock("../../entities/FlashCard");
jest.mock("../../entities/Scenario");

describe("FlashcardResolver", () => {
  let resolver: FlashcardResolver;

  beforeEach(() => {
    resolver = new FlashcardResolver();
    jest.clearAllMocks();
  });

  describe("createFlashcard", () => {
    it("should create and return a flashcard", async () => {
      const input = {
        type: "DnDnpcCard",
        species: "Human",
        size: "Medium",
        alignment: "Neutral",
        armorClass: 15,
        health: "50",
        speed: "30",
        strength: 14,
        dexterity: 12,
        constitution: 14,
        intelligence: 10,
        wisdom: 8,
        charisma: 12,
        skills: "Athletics",
        senses: "Darkvision",
        languages: "Common, Elvish",
        dangerLevel: 2,
        behaviour: "Aggressive",
        actions: "Attack, Defend",
        scenarioId: 1,
      };

      const mockScenario = { id: 1, title: "The Dark Forest" } as Scenario;
      const mockFlashcard = {
        id: 1,
        type: "DnDnpcCard",
        ...input,
        scenario: mockScenario,
        hasId: () => true,
        recover: jest.fn(),
        reload: jest.fn(),
        remove: jest.fn(),
        softRemove: jest.fn(),
        save: jest.fn(),
      } as DnDnpcCard;

      (Scenario.findOneByOrFail as jest.Mock).mockResolvedValue(mockScenario);
      (DnDnpcCard.create as jest.Mock).mockReturnValue(mockFlashcard);

      const result = await resolver.createFlashcard(input);

      expect(Scenario.findOneByOrFail).toHaveBeenCalledWith({
        id: input.scenarioId,
      });
      expect(DnDnpcCard.create).toHaveBeenCalledWith({
        ...input,
        scenario: mockScenario,
      });
      expect(mockFlashcard.save).toHaveBeenCalled();
      expect(result).toEqual(mockFlashcard);
    });

    it("should create and return a standard flashcard", async () => {
      const input = {
        type: "Flashcard",
        species: "Dragon",
        size: "Huge",
        alignment: "Chaotic Evil",
        armorClass: 18,
        health: "200",
        speed: "40",
        strength: 20,
        dexterity: 16,
        constitution: 18,
        intelligence: 10,
        wisdom: 12,
        charisma: 8,
        skills: "Fly",
        senses: "Darkvision",
        languages: "Draconic",
        dangerLevel: 5,
        behaviour: "Fierce",
        actions: "Breathe Fire",
        scenarioId: 2,
      };

      const mockScenario = { id: 2, title: "The Volcano" } as Scenario;
      const mockFlashcard = {
        id: 2,
        type: "Flashcard",
        ...input,
        scenario: mockScenario,
        hasId: () => true,
        recover: jest.fn(),
        reload: jest.fn(),
        remove: jest.fn(),
        softRemove: jest.fn(),
        save: jest.fn(),
      } as Flashcard;

      (Scenario.findOneByOrFail as jest.Mock).mockResolvedValue(mockScenario);
      (Flashcard.create as jest.Mock).mockReturnValue(mockFlashcard);

      const result = await resolver.createFlashcard(input);

      expect(Scenario.findOneByOrFail).toHaveBeenCalledWith({
        id: input.scenarioId,
      });
      expect(Flashcard.create).toHaveBeenCalledWith({
        ...input,
        scenario: mockScenario,
      });
      expect(mockFlashcard.save).toHaveBeenCalled();
      expect(result).toEqual(mockFlashcard);
    });

    it("should throw an error if scenario not found", async () => {
      const input = {
        type: "Flashcard",
        species: "Dragon",
        size: "Huge",
        alignment: "Chaotic Evil",
        armorClass: 18,
        health: "200",
        speed: "40",
        strength: 20,
        dexterity: 16,
        constitution: 18,
        intelligence: 10,
        wisdom: 12,
        charisma: 8,
        skills: "Fly",
        senses: "Darkvision",
        languages: "Draconic",
        dangerLevel: 5,
        behaviour: "Fierce",
        actions: "Breathe Fire",
        scenarioId: 999, // Invalid scenarioId
      };

      (Scenario.findOneByOrFail as jest.Mock).mockRejectedValue(
        new Error("Scenario not found")
      );

      await expect(resolver.createFlashcard(input)).rejects.toThrow(
        "Failed to create Flashcard"
      );
    });
  });

  describe("deleteFlashcard", () => {
    it("should delete a flashcard and return true", async () => {
      const flashcardId = 1;
      const mockResult = { affected: 1 };
      (Flashcard.delete as jest.Mock).mockResolvedValue(mockResult);

      const result = await resolver.deleteFlashcard(flashcardId);

      expect(Flashcard.delete).toHaveBeenCalledWith(flashcardId);
      expect(result).toBe(true);
    });

    it("should return false if flashcard not found", async () => {
      const flashcardId = 999;
      const mockResult = { affected: 0 };
      (Flashcard.delete as jest.Mock).mockResolvedValue(mockResult);

      const result = await resolver.deleteFlashcard(flashcardId);

      expect(Flashcard.delete).toHaveBeenCalledWith(flashcardId);
      expect(result).toBe(false);
    });
  });
});
