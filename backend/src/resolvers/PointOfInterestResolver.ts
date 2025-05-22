import {
  Arg,
  Authorized,
  Ctx,
  Field,
  InputType,
  Mutation,
  Resolver,
} from "type-graphql";
import { PointOfInterest } from "../entities/PointOfInterest";
import { handleDatabaseError } from "../lib/helpers/handleDatabaseError";
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
  createPointOfInterest(
    @Arg("data") poiData: NewPointOfInterestInput,
    @Ctx() context: AuthContext,
  ) {
    return PointOfInterest.create({
      ...poiData,
      owner: { id: context.user.id },
      plan: { id: poiData.planId },
    })
      .save()
      .catch(handleDatabaseError("Failed to create point of interest"));
  }

  @Authorized()
  @Mutation(() => Boolean)
  deletePointOfInterest(@Arg("id") id: string, @Ctx() context: AuthContext) {
    return PointOfInterest.delete({ id, owner: { id: context.user.id } })
      .then((result) => result.affected === 1)
      .catch(handleDatabaseError("Failed to delete point of interest"));
  }

  @Mutation(() => PointOfInterest)
  updatePointOfInterest(
    @Arg("id") id: string,
    @Arg("data") data: PointOfInterestInput,
    @Ctx() context: AuthContext,
  ) {
    const { planId, ...poi } = data;
    return PointOfInterest.update(
      { id, owner: { id: context.user.id } },
      { ...poi, plan: { id: planId } },
    )
      .then(() => PointOfInterest.findOneByOrFail({ id }))
      .catch(handleDatabaseError("Failed to update point of interest", true));
  }
}

export default PointOfInterestResolver;
