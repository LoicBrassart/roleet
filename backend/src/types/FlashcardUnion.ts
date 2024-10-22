import { DnDnpcCard, Flashcard } from "../entities/FlashCard";
import { createUnionType } from "type-graphql";

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
