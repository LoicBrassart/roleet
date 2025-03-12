import { Arg, Field, InputType, Mutation, Resolver } from "type-graphql";
import { Flashcard } from "../entities/FlashCard";
import { Scenario } from "../entities/Scenario";

@InputType()
class NewFlashcardInput implements Partial<Flashcard> {
  @Field()
  type: "DndNpcCard" | "ItemCard";

  @Field()
  species: string;

  @Field()
  size: string;

  @Field()
  alignment: string;

  @Field()
  armorClass: number;

  @Field()
  health: string;

  @Field()
  speed: string;

  @Field()
  strength: number;

  @Field()
  dexterity: number;

  @Field()
  constitution: number;

  @Field()
  intelligence: number;

  @Field()
  wisdom: number;

  @Field()
  charisma: number;

  @Field()
  skills: string;

  @Field()
  senses: string;

  @Field()
  languages: string;

  @Field()
  dangerLevel: number;

  @Field()
  behaviour: string;

  @Field()
  actions: string;

  @Field()
  scenarioId: number;
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
