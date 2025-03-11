import { Scenario } from "../../Scenario";
import { DnDnpcCard } from "../../FlashCard";

describe("Relations: Scenario & Flashcards", () => {
  it("should add flashcards to a scenario", () => {
    const scenario = new Scenario();
    scenario.title = "Monster Hunt";
    scenario.teaser = "Hunt dangerous beasts";
    scenario.fullStory = "Details of the hunt";
    scenario.credits = "Monster Master";

    const npcCard = new DnDnpcCard();
    npcCard.title = "Goblin Chief";
    npcCard.type = "DnDnpcCard";
    npcCard.species = "Goblin";
    npcCard.size = "Small";
    npcCard.alignment = "Chaotic Evil";
    npcCard.armorClass = 15;
    npcCard.health = "30 HP";
    npcCard.speed = "30 ft";
    npcCard.strength = 10;
    npcCard.dexterity = 14;
    npcCard.constitution = 12;
    npcCard.intelligence = 8;
    npcCard.wisdom = 8;
    npcCard.charisma = 10;
    npcCard.skills = "Stealth +5";
    npcCard.senses = "Darkvision 60 ft";
    npcCard.languages = "Goblin";
    npcCard.dangerLevel = 1;
    npcCard.behaviour = "Aggressive";
    npcCard.actions = "Multiattack";
    npcCard.scenario = scenario;

    scenario.flashcards = [npcCard];

    expect(scenario.flashcards).toContain(npcCard);
    expect(npcCard.scenario).toBe(scenario);
  });
});
