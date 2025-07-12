import type { Entities } from "./entities";

/*
Ajouter un nouveau type de flashcards:
1/ Ajouter un *CardData (description des champs specifiques)
2/ - Ajouter un T*Card
   - Mettre à jour l'Union FlashcardTyped
*/

/* 1. Types spécifiques à chaque type de Flashcard */
export type DndNpcCardData = {
  species: string;
  size: string;
  alignment: string;
  armorClass: number;
  health: string;
  speed: string;
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
  skills: string;
  senses: string;
  languages: string;
  dangerLevel: number;
  behaviour: string;
  actions: string;
};

/* 2. Flashcard spécialisées (union discriminée) */
type FlashcardBase = Prettify<
  Omit<Entities.Flashcard, "type" | "scenario"> & {
    type: "DndNpcCard" | (string & {});
  }
>;
export type TDndNpcCard = Prettify<
  Omit<FlashcardBase, "data"> & { type: "DndNpcCard" } & {
    data: DndNpcCardData;
  }
>;

// Union de toutes les flashcards spécialisées
export type FlashcardTyped = FlashcardBase | TDndNpcCard; // | OtherFlashcard | ...
