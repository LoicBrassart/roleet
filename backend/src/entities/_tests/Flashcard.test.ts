import { Flashcard } from "../FlashCard";
import { mockScenario } from "./mocks";

describe.only("Flashcard entity", () => {
  it("should instanciate with minimal inputs", () => {
    const flashcard = new Flashcard();

    // Mandatory, no default value -> should block .save()
    expect(flashcard.title).toBeUndefined();
    expect(flashcard.type).toBeUndefined();
    expect(flashcard.scenario).toBeUndefined();

    // Optional
    expect(flashcard.description).toBeUndefined();
  });

  it("should instanciate with full inputs", () => {
    const flashcard = new Flashcard();
    flashcard.title = "Epic Card";
    flashcard.type = "PoC";
    flashcard.scenario = mockScenario;
    flashcard.description = "Lorem ipsum dolor sit amet";

    expect(flashcard.title).toBe("Epic Card");
    expect(flashcard.type).toBe("PoC");
    expect(flashcard.scenario).toBe(mockScenario);
    expect(flashcard.description).toBe("Lorem ipsum dolor sit amet");
  });

  it("should handle relations well", () => {
    const flashcard = new Flashcard();
    flashcard.scenario = mockScenario;

    expect(flashcard.scenario.title).toBe(mockScenario.title);
  });
});
