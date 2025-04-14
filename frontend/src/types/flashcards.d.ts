import type { Flashcard as GqlFlashcard } from "@/lib/graphql/generated/graphql-types";
import type { Q } from "./queries";

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
type FlashcardBase = Omit<GqlFlashcard, "data" | "type" | "scenario"> & {
  type: string;
};
export type TDndNpcCard = FlashcardBase & { type: "DndNpcCard" } & {
  data: DndNpcCardData;
};

// Union de toutes les flashcards spécialisées
export type FlashcardTyped = FlashcardBase | TDndNpcCard; // | OtherFlashcard | ...
