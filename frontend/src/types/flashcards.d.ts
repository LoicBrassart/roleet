import type { Flashcard as GqlFlashcard } from "@/graphql/generated";

/*
Ajouter un nouveau type de flashcards:
1/ Ajouter un *CardData (description des champs specifiques)
2/ - Ajouter un *Card
   - Mettre à jour l'Union FlashcardTyped
3/ Ajouter un is*Card (type guard)
4/ Mettre à jour le parser (nouveau case pour "*Card")
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
export type DndNpcCard = Omit<GqlFlashcard, "data" | "type"> & {
  type: "DndNpcCard";
} & DndNpcCardData;

// Union de toutes les flashcards spécialisées
export type FlashcardTyped = DndNpcCard; // | OtherFlashcard | ...

/* 3. Type Guards (pour sécuriser dynamiquement) */
export function isDndNpcCard(card: GqlFlashcard): card is DndNpcCard {
  return (
    card.type === "DndNpcCard" &&
    typeof card.data === "object" &&
    card.data !== null &&
    "species" in card.data &&
    "armorClass" in card.data
  );
}

/* 4. Helper de parsing (pour caster facilement) */
export function parseFlashcard(card: GqlFlashcard): FlashcardTyped {
  switch (card.type) {
    case "DndNpcCard":
      return card as DndNpcCard;
    default:
      throw new Error(`Unknown flashcard type: ${card.type}`);
  }
}
