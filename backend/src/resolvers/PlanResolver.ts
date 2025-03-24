import { Arg, Field, InputType, Mutation, Resolver } from "type-graphql";
import { Plan } from "../entities/Plan";
import { Scenario } from "../entities/Scenario";

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

@Resolver(Plan)
class PlanResolver {
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
      throw new Error("Failed to create Plan");
    }
  }

  @Mutation(() => Boolean)
  async deletePlan(@Arg("id") id: string) {
    try {
      const result = await Plan.delete(id);
      if (result.affected === 0) {
        throw new Error(`${id} not found`);
      }
      return true;
    } catch (err) {
      return false;
    }
  }
}

export default PlanResolver;
