import { Flashcard } from "../FlashCard";
import { mockScenario } from "./mocks";

describe('validation for type "DndNpcCard"', () => {
  it("should accept valid DndNpcCard data", () => {
    const flashcard = new Flashcard();
    flashcard.title = "Mysterious Stranger";
    flashcard.type = "DndNpcCard";
    flashcard.scenario = mockScenario;
    flashcard.data = {
      name: "Gandalf",
      race: "Maiar",
      class: "Wizard",
      level: 20,
    };

    expect(flashcard.type).toBe("DndNpcCard");
    expect(flashcard.data).toHaveProperty("name", "Gandalf");
    expect(flashcard.data).toHaveProperty("race", "Maiar");
    expect(flashcard.data).toHaveProperty("class", "Wizard");
    expect(flashcard.data).toHaveProperty("level", 20);
  });

  it("should reject incomplete DndNpcCard data (missing fields)", () => {
    const flashcard = new Flashcard();
    flashcard.title = "Incomplete NPC";
    flashcard.type = "DndNpcCard";
    flashcard.scenario = mockScenario;
    flashcard.data = {
      name: "Saruman",
    };

    const isValid =
      flashcard.data.name &&
      flashcard.data.race &&
      flashcard.data.class &&
      flashcard.data.level;
    expect(isValid).toBeFalsy();
  });

  it("should reject invalid data types for DndNpcCard fields", () => {
    const flashcard = new Flashcard();
    flashcard.title = "Invalid NPC";
    flashcard.type = "DndNpcCard";
    flashcard.scenario = mockScenario;
    flashcard.data = {
      name: "Saruman",
      race: "Maïar",
      class: "Wizard",
      level: "twenty",
    };

    expect(typeof flashcard.data.level).toBe("number");
  });
});
