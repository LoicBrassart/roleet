import {
  Arg,
  Authorized,
  Ctx,
  Field,
  InputType,
  Mutation,
  Query,
  Resolver,
} from "type-graphql";
import type { DeepPartial } from "typeorm";
import { Scenario } from "../entities/Scenario";
import { User } from "../entities/User";
import type AuthContext from "../types/AuthContext";

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
    return await Scenario.find({ relations: ["plans", "flashcards"] });
  }

  @Authorized()
  @Query(() => [Scenario])
  async getMyScenarios(@Ctx() ctx: AuthContext) {
    console.log("getMyScenarios: currentUser:", ctx.user?.id);
    return await Scenario.find({
      where: { readers: { id: ctx.user?.id } },
      relations: ["plans", "flashcards"],
    });
  }

  @Query(() => Scenario)
  async getScenario(@Arg("id") id: number) {
    return await Scenario.findOne({
      where: { id },
      relations: {
        plans: {
          pointsOfInterest: true,
        },
        flashcards: true,
      },
    });
  }

  @Authorized()
  @Mutation(() => Scenario)
  async createScenario(@Arg("data") scenarioData: NewScenarioInput) {
    try {
      const scenario = Scenario.create(scenarioData as DeepPartial<Scenario>);
      await scenario.save();

      return scenario;
    } catch (err) {
      throw new Error("Failed to create scenario");
    }
  }

  @Mutation(() => Boolean)
  async deleteScenario(@Arg("id") id: number) {
    try {
      const result = await Scenario.delete(id);
      return result.affected === 1;
    } catch (err) {
      return false;
    }
  }

  @Authorized()
  @Mutation(() => Boolean)
  async unsealScenario(@Arg("id") id: number, @Ctx() ctx: AuthContext) {
    try {
      const userId = ctx.user?.id;
      if (!userId) throw new Error("Unauthorized");

      const scenario = await Scenario.findOne({
        where: { id },
        relations: ["readers"],
      });
      if (!scenario) throw new Error("Scenario not found");

      if (scenario.readers.some((user) => user.id === userId)) {
        return true;
      }

      const user = await User.findOneByOrFail({ id: userId });
      scenario.readers.push(user);
      await scenario.save();

      return true;
    } catch (err) {
      return false;
    }
  }
}

export default ScenarioResolver;
