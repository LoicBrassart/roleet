import { createUnionType } from "type-graphql";
import { DnDnpcCard, Flashcard } from "../entities/FlashCard";

export const FlashcardUnion = createUnionType({
  name: "FlashcardUnion",
  types: () => [Flashcard, DnDnpcCard] as const,
  resolveType: (value) => {
    if ("species" in value) {
      return DnDnpcCard;
    }
    return Flashcard;
  },
});
