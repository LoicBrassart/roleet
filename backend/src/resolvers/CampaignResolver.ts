import {
  Arg,
  Authorized,
  Ctx,
  Field,
  ID,
  InputType,
  Mutation,
  Query,
  Resolver,
} from "type-graphql";
import { type DeepPartial, In } from "typeorm";
import { Campaign } from "../entities/Campaign";
import { User } from "../entities/User";
import type AuthContext from "../types/AuthContext";
import { assert } from "console";

@InputType()
class NewCampaignInput {
  @Field()
  title: string;

  @Field()
  bannerUrl: string;

  @Field(() => [ID])
  players!: number[];
}

@Resolver(Campaign)
class CampaignResolver {
  @Authorized()
  @Query(() => [Campaign])
  async getMyCampaigns(@Ctx() ctx: AuthContext) {
    assert(ctx.user);
    return await Campaign.find({
      relations: ["scenarios", "players", "storyteller"],
      // TODO: Filter on storyteller or players === ctx.user
    });
  }

  @Authorized()
  @Query(() => Campaign)
  async getCampaign(@Arg("id") id: number, @Ctx() ctx: AuthContext) {
    assert(ctx.user);
    return await Campaign.findOne({
      where: { id },
      relations: ["scenarios", "players", "storyteller"],
      // TODO: Filter on storyteller or players === ctx.user
    });
  }

  @Mutation(() => Campaign)
  async createCampaign(
    @Arg("data") campaignData: NewCampaignInput,
    @Ctx() ctx: AuthContext
  ) {
    try {
      if (!ctx.user) throw new Error("User not authenticated");

      const campaign = Campaign.create(campaignData as DeepPartial<Campaign>);
      campaign.storyteller = ctx.user;

      const players = await User.findBy({ id: In(campaignData.players) });
      if (players.length !== campaignData.players.length) {
        throw new Error("One or more players not found");
      }

      campaign.players = players;

      await campaign.save();

      return campaign;
    } catch (err) {
      throw new Error(`Failed to create campaign: ${err.message}`);
    }
  }
}

export default CampaignResolver;
