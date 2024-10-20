import { Arg, Field, InputType, Mutation, Resolver } from "type-graphql";
import { Flashcard, MonsterCard, NPCCard } from "../entities/FlashCard";
import { Scenario } from "../entities/Scenario";

@InputType()
class NewFlashcardInput implements Partial<Flashcard> {
  @Field({ nullable: true })
  title: string;

  @Field({ nullable: true })
  description?: string;

  @Field()
  scenarioId: number;

  @Field()
  type: string;

  @Field()
  species: string;

  @Field()
  dangerLevel: number;
}

@Resolver(Flashcard)
class FlashcardResolver {
  @Mutation(() => Flashcard)
  async createFlashcard(@Arg("data") flashcardData: NewFlashcardInput) {
    try {
      const scenario = await Scenario.findOneByOrFail({
        id: flashcardData.scenarioId,
      });
      let flashcard: Flashcard;
      switch (flashcardData.type) {
        case "MonsterCard":
          flashcard = await MonsterCard.create({
            ...flashcardData,
            scenario,
          }).save();

          break;
        case "NPCCard":
          flashcard = await NPCCard.create({
            ...flashcardData,
            scenario,
          }).save();

          break;
        default:
          flashcard = await Flashcard.create({
            ...flashcardData,
            scenario,
          }).save();
      }
      return flashcard;
    } catch (err) {
      console.error(err);
      throw new Error("Failed to create Flashcard");
    }
  }

  @Mutation(() => Boolean)
  async deleteFlashcard(@Arg("id") id: number) {
    try {
      const result = await Flashcard.delete(id);
      return result.affected === 1;
    } catch (err) {
      console.error(err);
      return false;
    }
  }
}

export default FlashcardResolver;
