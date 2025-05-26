import { GraphQLJSON } from "graphql-scalars";
import { Arg, Field, ID, InputType, Mutation, Resolver } from "type-graphql";
import { Flashcard } from "../entities/FlashCard";
import { handleDatabaseError } from "../lib/helpers/handleDatabaseError";

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
    return Flashcard.create({
      ...flashcardData,
      scenario: { id: flashcardData.scenarioId },
    })
      .save()
      .catch(handleDatabaseError("Failed to create Flashcard"));
  }

  @Mutation(() => Boolean)
  async deleteFlashcard(@Arg("id") id: string) {
    return Flashcard.delete(id)
      .then((result) => result.affected === 1)
      .catch(handleDatabaseError("Failed to delete Flashcard"));
  }
}

export default FlashcardResolver;
