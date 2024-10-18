import { Arg, Field, InputType, Mutation, Query, Resolver } from "type-graphql";
import type { DeepPartial } from "typeorm";
import { Scenario } from "../entities/Scenario";

@InputType()
class NewScenarioInput {
  @Field()
  title: string;

  @Field()
  teaser: string;

  @Field()
  fullStory: string;

  @Field({ nullable: true })
  bannerUrl?: string;

  @Field()
  credits: string;
}

@Resolver(Scenario)
class ScenarioResolver {
  @Query(() => [Scenario])
  async getAllScenarios() {
    return await Scenario.find({ relations: ["plans"] });
  }

  @Query(() => Scenario)
  async getScenario(@Arg("id") id: number) {
    return await Scenario.findOne({
      where: { id },
      relations: {
        plans: {
          pointsOfInterest: true,
        },
      },
    });
  }

  @Mutation(() => Scenario)
  async createScenario(@Arg("data") scenarioData: NewScenarioInput) {
    try {
      const scenario = Scenario.create(scenarioData as DeepPartial<Scenario>);
      await scenario.save();

      return scenario;
    } catch (err) {
      console.error(err);
      throw new Error("Failed to create scenario");
    }
  }

  @Mutation(() => Boolean)
  async deleteScenario(@Arg("id") id: number) {
    try {
      const result = await Scenario.delete(id);
      return result.affected === 1;
    } catch (err) {
      console.error(err);
      return false;
    }
  }
}

export default ScenarioResolver;
