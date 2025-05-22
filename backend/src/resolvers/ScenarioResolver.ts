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
import { Scenario } from "../entities/Scenario";
import { User } from "../entities/User";
import {
  DatabaseError,
  handleDatabaseError,
} from "../lib/helpers/handleDatabaseError";
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
  getAllScenarios() {
    return Scenario.find({
      relations: ["plans", "flashcards", "campaigns"],
    });
  }

  @Authorized()
  @Query(() => [Scenario])
  getMyScenarios(@Ctx() ctx: AuthContext) {
    return Scenario.find({
      where: { readers: { id: ctx.user.id } },
      relations: ["plans", "flashcards"],
    });
  }

  @Authorized()
  @Query(() => Scenario)
  getScenario(@Arg("id") id: string, @Ctx() context: AuthContext) {
    return Scenario.findOne({
      where: { id, readers: { id: context.user.id } },
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
  }

  @Authorized()
  @Mutation(() => Scenario)
  createScenario(
    @Arg("data") scenarioData: NewScenarioInput,
    @Ctx() context: AuthContext,
  ) {
    return Scenario.create({
      ...scenarioData,
      owner: { id: context.user.id },
    })
      .save()
      .catch(handleDatabaseError("Failed to create scenario"));
  }

  @Authorized()
  @Mutation(() => Scenario)
  updateScenario(
    @Arg("id") id: string,
    @Arg("data") data: ScenarioInput,
    @Ctx() context: AuthContext,
  ) {
    return Scenario.update({ id, owner: { id: context.user.id } }, { ...data })
      .then(() => Scenario.findOneByOrFail({ id }))
      .catch(handleDatabaseError("Failed to update scenario"));
  }

  @Authorized()
  @Mutation(() => Boolean)
  deleteScenario(@Arg("id") id: string, @Ctx() context: AuthContext) {
    return Scenario.delete({ id, owner: { id: context.user.id } })
      .then((result) => result.affected === 1)
      .catch(handleDatabaseError("Failed to delete scenario"));
  }

  @Authorized()
  @Mutation(() => Boolean)
  unsealScenario(@Arg("id") id: string, @Ctx() context: AuthContext) {
    return Scenario.findOne({
      where: { id },
      relations: ["readers"],
    })
      .then(async (scenario) => {
        if (!scenario) throw new DatabaseError("Scenario not found");

        if (scenario.readers.some((user) => user.id === context.user.id)) {
          return true;
        }

        await User.findOneByOrFail({ id: context.user.id }).then((user) => {
          scenario.readers.push(user);
          return scenario.save();
        });

        return true;
      })
      .catch(handleDatabaseError("Failed to unseal scenario"));
  }
}

export default ScenarioResolver;
