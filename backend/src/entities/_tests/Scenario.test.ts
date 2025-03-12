import { Campaign } from "../Campaign";
import { Flashcard } from "../FlashCard";
import { Plan } from "../Plan";
import { Scenario } from "../Scenario";
import { User } from "../User";

describe("Scenario entity", () => {
  it("should create a valid Scenario instance with required fields", () => {
    const scenario = new Scenario();

    scenario.title = "The Lost Temple";
    scenario.teaser = "A mysterious temple lost in the jungle...";
    scenario.fullStory = "Long ago, an ancient civilization...";
    scenario.credits = "John Doe";

    expect(scenario.title).toBe("The Lost Temple");
    expect(scenario.teaser).toBe("A mysterious temple lost in the jungle...");
    expect(scenario.fullStory).toBe("Long ago, an ancient civilization...");
    expect(scenario.credits).toBe("John Doe");
    expect(scenario.bannerUrl).toBeUndefined();
    expect(scenario.plans).toBeUndefined();
    expect(scenario.flashcards).toBeUndefined();
    expect(scenario.readers).toBeUndefined();
    expect(scenario.campaigns).toBeUndefined();
  });

  it("should handle optional bannerUrl field", () => {
    const scenario = new Scenario();

    scenario.title = "The Cursed Castle";
    scenario.teaser = "A castle full of mysteries...";
    scenario.fullStory = "Once a glorious stronghold...";
    scenario.credits = "Jane Doe";
    scenario.bannerUrl = "https://example.com/banner.jpg";

    expect(scenario.bannerUrl).toBe("https://example.com/banner.jpg");
  });

  it("should handle a list of plans", () => {
    const plan1 = new Plan();
    plan1.pictureUrl = "https://example.com/plan1.jpg";

    const plan2 = new Plan();
    plan2.pictureUrl = "https://example.com/plan2.jpg";

    const scenario = new Scenario();
    scenario.title = "Exploration Adventure";
    scenario.teaser = "Exploring vast lands...";
    scenario.fullStory = "The adventurers set foot on unknown territory...";
    scenario.credits = "Explorer Team";
    scenario.plans = [plan1, plan2];

    expect(scenario.plans.length).toBe(2);
    expect(scenario.plans[0].pictureUrl).toBe("https://example.com/plan1.jpg");
    expect(scenario.plans[1].pictureUrl).toBe("https://example.com/plan2.jpg");
  });

  it("should handle a list of flashcards", () => {
    const flashcard1 = new Flashcard();
    flashcard1.title = "Ancient Rune";

    const flashcard2 = new Flashcard();
    flashcard2.title = "Mysterious Creature";

    const scenario = new Scenario();
    scenario.flashcards = [flashcard1, flashcard2];

    expect(scenario.flashcards.length).toBe(2);
    expect(scenario.flashcards[0].title).toBe("Ancient Rune");
    expect(scenario.flashcards[1].title).toBe("Mysterious Creature");
  });

  it("should handle a list of readers", () => {
    const user1 = new User();
    user1.name = "Alice";

    const user2 = new User();
    user2.name = "Bob";

    const scenario = new Scenario();
    scenario.readers = [user1, user2];

    expect(scenario.readers.length).toBe(2);
    expect(scenario.readers[0].name).toBe("Alice");
    expect(scenario.readers[1].name).toBe("Bob");
  });

  it("should handle a list of campaigns", () => {
    const campaign1 = new Campaign();
    campaign1.title = "Campaign One";

    const campaign2 = new Campaign();
    campaign2.title = "Campaign Two";

    const scenario = new Scenario();
    scenario.campaigns = [campaign1, campaign2];

    expect(scenario.campaigns.length).toBe(2);
    expect(scenario.campaigns[0].title).toBe("Campaign One");
    expect(scenario.campaigns[1].title).toBe("Campaign Two");
  });

  it("should allow empty arrays for plans, flashcards, readers, and campaigns", () => {
    const scenario = new Scenario();
    scenario.plans = [];
    scenario.flashcards = [];
    scenario.readers = [];
    scenario.campaigns = [];

    expect(scenario.plans).toEqual([]);
    expect(scenario.flashcards).toEqual([]);
    expect(scenario.readers).toEqual([]);
    expect(scenario.campaigns).toEqual([]);
  });
});
