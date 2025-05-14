import {
  Arg,
  Authorized,
  Ctx,
  Field,
  InputType,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import type { DeepPartial } from "typeorm";
import { Scenario } from "../entities/Scenario";
import { User } from "../entities/User";
import { IsOwner } from "../middlewares/isOwner";
import type CustomContext from "../types/CustomContext";

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

@InputType()
class ScenarioInput {
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
    return await Scenario.find({
      relations: ["plans", "flashcards", "campaigns"],
    });
  }

  @Authorized()
  @Query(() => [Scenario])
  async getMyScenarios(@Ctx() ctx: CustomContext) {
    try {
      if (!ctx.user) throw new Error("You must be authenticated to use this");
      return await Scenario.find({
        where: { readers: { id: ctx.user.id } },
        relations: ["plans", "flashcards"],
      });
    } catch (err) {
      throw new Error("Failed to create scenario");
    }
  }

  @Query(() => Scenario)
  async getScenario(@Arg("id") id: string) {
    const scenario = await Scenario.findOne({
      where: { id },
      relations: {
        plans: {
          pointsOfInterest: true,
        },
        flashcards: true,
        campaigns: true,
        owner: true,
        readers: true,
      },
    });
    if (!scenario) throw new Error("Scenario not found");
    return scenario;
  }

  @Authorized()
  @Mutation(() => Scenario)
  async createScenario(@Arg("data") scenarioData: NewScenarioInput) {
    try {
      const scenario = await Scenario.create(
        scenarioData as DeepPartial<Scenario>,
      ).save();

      return scenario;
    } catch (err) {
      throw new Error("Failed to create scenario");
    }
  }

  @Authorized()
  @UseMiddleware(IsOwner(Scenario))
  @Mutation(() => Scenario)
  async updateScenario(
    @Arg("id") id: string,
    @Arg("data") data: ScenarioInput,
  ) {
    try {
      let scenario = await Scenario.findOneByOrFail({ id });
      scenario = await Object.assign(scenario, { ...data });
      await scenario.save();

      return scenario;
    } catch (err) {
      throw new Error("Failed to update scenario");
    }
  }

  @Authorized()
  @UseMiddleware(IsOwner(Scenario))
  @Mutation(() => Boolean)
  async deleteScenario(@Arg("id") id: string) {
    try {
      const result = await Scenario.delete(id);
      if (result.affected === 0) {
        throw new Error(`${id} not found`);
      }
      return true;
    } catch (err) {
      throw new Error(`Failed to delete Scenario: ${err.message}`);
    }
  }

  @Authorized()
  @Mutation(() => Boolean)
  async unsealScenario(@Arg("id") id: string, @Ctx() ctx: CustomContext) {
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
      throw new Error(`Failed to unseal Scenario: ${err.message}`);
    }
  }
}

export default ScenarioResolver;
