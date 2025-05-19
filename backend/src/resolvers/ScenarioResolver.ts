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
import type { AuthContext } from "../types/ApolloContext";

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
  async getMyScenarios(@Ctx() ctx: AuthContext) {
    return await Scenario.find({
      where: { readers: { id: ctx.user.id } },
      relations: ["plans", "flashcards"],
    });
  }

  @Authorized()
  @Query(() => Scenario)
  async getScenario(@Arg("id") id: string, @Ctx() ctx: AuthContext) {
    const scenario = await Scenario.findOne({
      where: { id, readers: { id: ctx.user.id } },
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
    return scenario;
  }

  @Authorized()
  @Mutation(() => Scenario)
  async createScenario(
    @Arg("data") scenarioData: NewScenarioInput,
    @Ctx() ctx: AuthContext,
  ) {
    try {
      // TODO: Refactor using "insert" ?
      const scenario = await Scenario.create({
        ...scenarioData,
        owner: ctx.user,
      } as DeepPartial<Scenario>).save();

      return scenario;
    } catch (err) {
      throw new Error("Failed to create scenario");
    }
  }

  @Authorized()
  @Mutation(() => Scenario)
  async updateScenario(
    @Arg("id") id: string,
    @Arg("data") data: ScenarioInput,
    @Ctx() context: AuthContext,
  ) {
    // TODO: Refactor using .update({where}) to spare a query ?
    let scenario = await Scenario.findOneByOrFail({
      id,
      owner: { id: context.user.id },
    });
    scenario = await Object.assign(scenario, { ...data }).save();
    return scenario;
  }

  @Authorized()
  @Mutation(() => Boolean)
  async deleteScenario(@Arg("id") id: string, @Ctx() context: AuthContext) {
    const result = await Scenario.delete({
      id,
      owner: { id: context.user.id },
    });
    if (result.affected === 0) {
      throw new Error(`Scenario #${id} not found`);
    }
    return true;
  }

  @Authorized()
  @Mutation(() => Boolean)
  async unsealScenario(@Arg("id") id: string, @Ctx() ctx: AuthContext) {
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
  }
}

export default ScenarioResolver;
