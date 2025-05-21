import {
  Arg,
  Authorized,
  Ctx,
  Field,
  InputType,
  Mutation,
  Resolver,
} from "type-graphql";
import { Plan } from "../entities/Plan";
import { PointOfInterest } from "../entities/PointOfInterest";
import type { AuthContext } from "../types/ApolloContext";

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
@InputType()
class PointOfInterestInput implements Partial<PointOfInterest> {
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
  @Authorized()
  @Mutation(() => PointOfInterest)
  async createPointOfInterest(
    @Arg("data") poiData: NewPointOfInterestInput,
    @Ctx() context: AuthContext,
  ) {
    const plan = await Plan.findOneByOrFail({
      id: poiData.planId,
      owner: { id: context.user.id },
    });
    const poi = await PointOfInterest.create({
      ...poiData,
      plan,
    }).save();
    if (!poi) throw new Error("Failed to create point of interest");
    return poi;
  }

  @Authorized()
  @Mutation(() => Boolean)
  async deletePointOfInterest(
    @Arg("id") id: string,
    @Ctx() context: AuthContext,
  ) {
    const result = await PointOfInterest.delete({
      id,
      owner: { id: context.user.id },
    });
    if (result.affected === 0) {
      throw new Error(`PoI #${id} not found or ownership problem`);
    }
    return true;
  }

  @Mutation(() => PointOfInterest)
  async updatePointOfInterest(
    @Arg("id") id: string,
    @Arg("data") data: PointOfInterestInput,
    @Ctx() context: AuthContext,
  ) {
    let poi = await PointOfInterest.findOneByOrFail({
      id,
      owner: { id: context.user.id },
    });
    poi = await Object.assign(poi, { ...data });
    await poi.save();

    return poi;
  }
}

export default PointOfInterestResolver;
