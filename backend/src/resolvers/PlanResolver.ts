import { Arg, Field, InputType, Mutation, Query, Resolver } from "type-graphql";
import { Plan } from "../entities/Plan";
import { Scenario } from "../entities/Scenario";

@InputType()
class NewPlanInput implements Partial<Plan> {
  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  description?: string;

  @Field()
  pictureUrl: string;

  @Field()
  scenarioId: number;
}

@Resolver(Plan)
class PlanResolver {
  @Query(() => [Plan])
  async getAllPlans() {
    return await Plan.find({ relations: ["pointsOfInterest", "scenario"] });
  }

  @Mutation(() => Plan)
  async createPlan(@Arg("data") planData: NewPlanInput) {
    try {
      const scenario = await Scenario.findOneByOrFail({
        id: planData.scenarioId,
      });
      const plan = await Plan.create({
        ...planData,
        scenario,
      }).save();
      return plan;
    } catch (err) {
      console.error(err);
      throw new Error("Failed to create Plan");
    }
  }

  @Mutation(() => Boolean)
  async deletePlan(@Arg("id") id: number) {
    try {
      const result = await Plan.delete(id);
      return result.affected === 1;
    } catch (err) {
      console.error(err);
      return false;
    }
  }
}

export default PlanResolver;
