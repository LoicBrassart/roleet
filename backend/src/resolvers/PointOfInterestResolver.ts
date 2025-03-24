import { Arg, Field, InputType, Mutation, Resolver } from "type-graphql";
import { Plan } from "../entities/Plan";
import { PointOfInterest } from "../entities/PointOfInterest";

@InputType()
class NewPointOfInterestInput implements Partial<PointOfInterest> {
  @Field()
  code: string;

  @Field()
  title: string;

  @Field()
  description: string;

  @Field()
  planId: string;
}

@Resolver(PointOfInterest)
class PointOfInterestResolver {
  @Mutation(() => PointOfInterest)
  async createPointOfInterest(@Arg("data") poiData: NewPointOfInterestInput) {
    try {
      const plan = await Plan.findOneByOrFail({ id: poiData.planId });
      const poi = await PointOfInterest.create({
        ...poiData,
        plan,
      }).save();
      return poi;
    } catch (err) {
      throw new Error("Failed to create point of interest");
    }
  }

  @Mutation(() => Boolean)
  async deletePointOfInterest(@Arg("id") id: string) {
    try {
      const result = await PointOfInterest.delete(id);
      if (result.affected === 0) {
        throw new Error(`${id} not found`);
      }
      return true;
    } catch (err) {
      throw new Error(`Failed to delete PoI: ${err.message}`);
    }
  }
}

export default PointOfInterestResolver;
