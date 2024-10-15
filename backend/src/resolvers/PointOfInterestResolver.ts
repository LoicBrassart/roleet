import { Arg, Field, InputType, Mutation, Query, Resolver } from "type-graphql";
import { Plan } from "../entities/Plan";
import { PointOfInterest } from "../entities/PointOfInterest";

@InputType()
class NewPointOfInterestInput implements Partial<PointOfInterest> {
  @Field()
  code: string;

  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  description?: string;

  @Field()
  planId: number;
}

@Resolver(PointOfInterest)
class PointOfInterestResolver {
  @Query(() => [PointOfInterest])
  async getAllPointsOfInterest() {
    return await PointOfInterest.find({ relations: ["plan"] });
  }

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
      console.error(err);
      throw new Error("Failed to create point of interest");
    }
  }

  @Mutation(() => Boolean)
  async deletePointOfInterest(@Arg("id") id: number) {
    try {
      const result = await PointOfInterest.delete(id);
      return result.affected === 1;
    } catch (err) {
      console.error(err);
      return false;
    }
  }
}

export default PointOfInterestResolver;
