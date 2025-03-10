import { DnDnpcCard } from "../FlashCard";
import { mockScenario } from "./mocks";

describe.only("DndNpcCard entity", () => {
  it("should instanciate with minimal inputs", () => {
    const dndNpcCard = new DnDnpcCard();

    // Mandatory, no default value -> should block .save()
    expect(dndNpcCard.title).toBeUndefined();
    expect(dndNpcCard.type).toBeUndefined();
    expect(dndNpcCard.species).toBeUndefined();
    expect(dndNpcCard.size).toBeUndefined();
    expect(dndNpcCard.alignment).toBeUndefined();
    expect(dndNpcCard.armorClass).toBeUndefined();
    expect(dndNpcCard.health).toBeUndefined();
    expect(dndNpcCard.speed).toBeUndefined();
    expect(dndNpcCard.strength).toBeUndefined();
    expect(dndNpcCard.dexterity).toBeUndefined();
    expect(dndNpcCard.constitution).toBeUndefined();
    expect(dndNpcCard.intelligence).toBeUndefined();
    expect(dndNpcCard.wisdom).toBeUndefined();
    expect(dndNpcCard.charisma).toBeUndefined();
    expect(dndNpcCard.skills).toBeUndefined();
    expect(dndNpcCard.senses).toBeUndefined();
    expect(dndNpcCard.languages).toBeUndefined();
    expect(dndNpcCard.dangerLevel).toBeUndefined();
    expect(dndNpcCard.behaviour).toBeUndefined();
    expect(dndNpcCard.actions).toBeUndefined();
    expect(dndNpcCard.scenario).toBeUndefined();

    // Optional
    expect(dndNpcCard.description).toBeUndefined();
  });

  it("should instanciate with full inputs", () => {
    const dndNpcCard = new DnDnpcCard();
    dndNpcCard.title = "";
    dndNpcCard.type = "";
    dndNpcCard.species = "";
    dndNpcCard.size = "";
    dndNpcCard.alignment = "";
    dndNpcCard.armorClass = 0;
    dndNpcCard.health = "";
    dndNpcCard.speed = "";
    dndNpcCard.strength = 0;
    dndNpcCard.dexterity = 0;
    dndNpcCard.constitution = 0;
    dndNpcCard.intelligence = 0;
    dndNpcCard.wisdom = 0;
    dndNpcCard.charisma = 0;
    dndNpcCard.skills = "";
    dndNpcCard.senses = "";
    dndNpcCard.languages = "";
    dndNpcCard.dangerLevel = 0;
    dndNpcCard.behaviour = "";
    dndNpcCard.actions = "";
    dndNpcCard.scenario = mockScenario;
    dndNpcCard.description = "";

    expect(dndNpcCard.title).toBe("");
    expect(dndNpcCard.type).toBe("");
    expect(dndNpcCard.species).toBe("");
    expect(dndNpcCard.size).toBe("");
    expect(dndNpcCard.alignment).toBe("");
    expect(dndNpcCard.armorClass).toBe(0);
    expect(dndNpcCard.health).toBe("");
    expect(dndNpcCard.speed).toBe("");
    expect(dndNpcCard.strength).toBe(0);
    expect(dndNpcCard.dexterity).toBe(0);
    expect(dndNpcCard.constitution).toBe(0);
    expect(dndNpcCard.intelligence).toBe(0);
    expect(dndNpcCard.wisdom).toBe(0);
    expect(dndNpcCard.charisma).toBe(0);
    expect(dndNpcCard.skills).toBe("");
    expect(dndNpcCard.senses).toBe("");
    expect(dndNpcCard.languages).toBe("");
    expect(dndNpcCard.dangerLevel).toBe(0);
    expect(dndNpcCard.behaviour).toBe("");
    expect(dndNpcCard.actions).toBe("");
    expect(dndNpcCard.scenario).toBe(mockScenario);
    expect(dndNpcCard.description).toBe("");
  });

  it("should handle relations well", () => {
    const dndNpcCard = new DnDnpcCard();
    dndNpcCard.scenario = mockScenario;

    expect(dndNpcCard.scenario.title).toBe(mockScenario.title);
  });
});
