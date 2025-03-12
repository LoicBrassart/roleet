import { Flashcard } from "../FlashCard";
import { mockScenario } from "./mocks";

describe("Flashcard entity", () => {
  it("should instanciate with minimal inputs", () => {
    const flashcard = new Flashcard();

    expect(flashcard.title).toBeUndefined();
    expect(flashcard.type).toBeUndefined();
    expect(flashcard.scenario).toBeUndefined();
    expect(flashcard.description).toBeUndefined();
    expect(flashcard.data).toBeUndefined();
    expect(flashcard.id).toBeUndefined();
  });

  it("should instanciate with full inputs", () => {
    const flashcard = new Flashcard();
    flashcard.title = "Mystery Puzzle";
    flashcard.type = "riddle";
    flashcard.scenario = mockScenario;
    flashcard.description = "Solve this puzzle to proceed.";
    flashcard.data = { difficulty: "hard", timeLimit: 5 };

    expect(flashcard.title).toBe("Mystery Puzzle");
    expect(flashcard.type).toBe("riddle");
    expect(flashcard.scenario).toBe(mockScenario);
    expect(flashcard.description).toBe("Solve this puzzle to proceed.");
    expect(flashcard.data).toEqual({ difficulty: "hard", timeLimit: 5 });
  });

  it("should handle relations well", () => {
    const flashcard = new Flashcard();
    flashcard.scenario = mockScenario;

    expect(flashcard.scenario.title).toBe(mockScenario.title);
  });
});
