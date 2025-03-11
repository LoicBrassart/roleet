import { DnDnpcCard } from "../FlashCard";
import { Scenario } from "../Scenario";

describe("DnDnpcCard entity", () => {
  it("should create a valid DnDnpcCard instance with required fields from Flashcard and DnDnpcCard", () => {
    const scenario = new Scenario();
    const npc = new DnDnpcCard();

    npc.title = "Goblin King";
    npc.type = "npc";
    npc.scenario = scenario;

    npc.species = "Goblin";
    npc.size = "Small";
    npc.alignment = "Chaotic Evil";
    npc.armorClass = 15;
    npc.health = "45 (6d6 + 18)";
    npc.speed = "30 ft.";
    npc.strength = 8;
    npc.dexterity = 14;
    npc.constitution = 12;
    npc.intelligence = 10;
    npc.wisdom = 8;
    npc.charisma = 10;
    npc.skills = "Stealth +6, Perception +2";
    npc.senses = "Darkvision 60 ft.";
    npc.languages = "Goblin";
    npc.dangerLevel = 3;
    npc.behaviour = "Aggressive and cunning.";
    npc.actions =
      "Multiattack. The goblin king makes two attacks with his scimitar.";

    expect(npc.title).toBe("Goblin King");
    expect(npc.type).toBe("npc");
    expect(npc.scenario).toBe(scenario);

    expect(npc.species).toBe("Goblin");
    expect(npc.size).toBe("Small");
    expect(npc.alignment).toBe("Chaotic Evil");
    expect(npc.armorClass).toBe(15);
    expect(npc.health).toBe("45 (6d6 + 18)");
    expect(npc.speed).toBe("30 ft.");
    expect(npc.strength).toBe(8);
    expect(npc.dexterity).toBe(14);
    expect(npc.constitution).toBe(12);
    expect(npc.intelligence).toBe(10);
    expect(npc.wisdom).toBe(8);
    expect(npc.charisma).toBe(10);
    expect(npc.skills).toBe("Stealth +6, Perception +2");
    expect(npc.senses).toBe("Darkvision 60 ft.");
    expect(npc.languages).toBe("Goblin");
    expect(npc.dangerLevel).toBe(3);
    expect(npc.behaviour).toBe("Aggressive and cunning.");
    expect(npc.actions).toBe(
      "Multiattack. The goblin king makes two attacks with his scimitar."
    );
  });

  it("should handle empty optional fields gracefully if added", () => {
    const npc = new DnDnpcCard();
    npc.title = "Mysterious Figure";
    npc.type = "npc";

    expect(npc.title).toBe("Mysterious Figure");
    expect(npc.type).toBe("npc");
    expect(npc.scenario).toBeUndefined();
    expect(npc.description).toBeUndefined();
  });
});
