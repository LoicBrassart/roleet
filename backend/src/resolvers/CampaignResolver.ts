import { Arg, Authorized, Ctx, Query, Resolver } from "type-graphql";
import { Campaign } from "../entities/Campaign";
import type AuthContext from "../types/AuthContext";

@Resolver(Campaign)
class CampaignResolver {
  @Authorized()
  @Query(() => [Campaign])
  async getMyCampaigns(@Ctx() ctx: AuthContext) {
    console.log(ctx.user);
    return await Campaign.find({
      relations: ["scenarios", "players", "storyteller"],
      // TODO: Filter on storyteller or players === ctx.user
    });
  }

  @Authorized()
  @Query(() => Campaign)
  async getCampaign(@Arg("id") id: number, @Ctx() ctx: AuthContext) {
    console.log(ctx.user);
    return await Campaign.findOne({
      where: { id },
      relations: ["scenarios", "players", "storyteller"],
      // TODO: Filter on storyteller or players === ctx.user
    });
  }
}

export default CampaignResolver;
