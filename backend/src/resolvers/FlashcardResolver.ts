import { GraphQLJSON } from "graphql-scalars";
import { Arg, Field, ID, InputType, Mutation, Resolver } from "type-graphql";
import { Flashcard } from "../entities/FlashCard";
import { Scenario } from "../entities/Scenario";

@InputType()
class NewFlashcardInput implements Partial<Flashcard> {
  @Field()
  title: string;

  @Field()
  description: string;

  @Field()
  type: string;

  @Field(() => ID)
  scenarioId: string;

  @Field(() => GraphQLJSON, { nullable: true })
  data: Record<string, unknown>;
}

@Resolver(Flashcard)
class FlashcardResolver {
  @Mutation(() => Flashcard)
  async createFlashcard(@Arg("data") flashcardData: NewFlashcardInput) {
    try {
      const scenario = await Scenario.findOneByOrFail({
        id: flashcardData.scenarioId,
      });
      const flashcard = await Flashcard.create({
        ...flashcardData,
        scenario,
      }).save();
      return flashcard;
    } catch (err) {
      throw new Error("Failed to create Flashcard");
    }
  }

  @Mutation(() => Boolean)
  async deleteFlashcard(@Arg("id") id: string) {
    try {
      const result = await Flashcard.delete(id);
      if (result.affected === 0) {
        throw new Error(`${id} not found`);
      }
      return true;
    } catch (err) {
      throw new Error(`Failed to delete Flashcard: ${err.message}`);
    }
  }
}

export default FlashcardResolver;
