import { Flashcard } from "../FlashCard";
import { Scenario } from "../Scenario";

describe("Flashcard entity", () => {
  it("should create a valid Flashcard instance with required fields", () => {
    const scenario = new Scenario();
    const flashcard = new Flashcard();

    flashcard.title = "The Dark Cave";
    flashcard.type = "location";
    flashcard.scenario = scenario;

    expect(flashcard.title).toBe("The Dark Cave");
    expect(flashcard.type).toBe("location");
    expect(flashcard.scenario).toBe(scenario);
    expect(flashcard.description).toBeUndefined();
  });

  it("should handle optional description field", () => {
    const scenario = new Scenario();
    const flashcard = new Flashcard();

    flashcard.title = "The Hidden Temple";
    flashcard.type = "location";
    flashcard.description = "A mysterious temple lost in the jungle.";
    flashcard.scenario = scenario;

    expect(flashcard.description).toBe(
      "A mysterious temple lost in the jungle."
    );
  });
});
