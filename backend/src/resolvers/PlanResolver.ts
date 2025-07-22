import {
  Arg,
  Authorized,
  Field,
  InputType,
  Mutation,
  Query,
  Resolver,
} from "type-graphql";
import { Plan } from "../entities/Plan";
import { handleDatabaseError } from "../lib/helpers/handleDatabaseError";

@InputType()
class NewPlanInput implements Partial<Plan> {
  @Field()
  title: string;

  @Field()
  description: string;

  @Field()
  pictureUrl: string;

  @Field()
  scenarioId: string;
}
@InputType()
class PlanInput implements Partial<Plan> {
  @Field()
  title: string;

  @Field()
  description: string;

  @Field()
  pictureUrl: string;
}

@Resolver(Plan)
class PlanResolver {
  @Mutation(() => Plan)
  createPlan(@Arg("data") planData: NewPlanInput) {
    return Plan.create({
      ...planData,
      scenario: { id: planData.scenarioId },
    })
      .save()
      .catch(handleDatabaseError("Failed to create plan"));
  }

  @Mutation(() => Boolean)
  deletePlan(@Arg("id") id: string) {
    return Plan.delete(id)
      .then((result) => result.affected === 1)
      .catch(handleDatabaseError("Failed to delete plan"));
  }

  @Mutation(() => Plan)
  updatePlan(@Arg("id") id: string, @Arg("data") data: PlanInput) {
    return Plan.update({ id }, { ...data })
      .then(() => Plan.findOneByOrFail({ id }))
      .catch(handleDatabaseError("Failed to update plan"));
  }

  @Authorized()
  @Query(() => Plan)
  getPlan(@Arg("id") id: string) {
    return Plan.findOne({
      where: { id },
      relations: { owner: true, pointsOfInterest: true, scenario: true },
    });
  }
}

export default PlanResolver;
