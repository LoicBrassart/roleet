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
import type { DeepPartial } from "typeorm";
import { Campaign } from "../entities/Campaign";
import type { Scenario } from "../entities/Scenario";
import type { User } from "../entities/User";
import {
  DatabaseError,
  handleDatabaseError,
} from "../lib/helpers/handleDatabaseError";
import type { AuthContext } from "../types/ApolloContext";

@InputType()
class NewCampaignInput implements Partial<Campaign> {
  @Field()
  title: string;

  @Field()
  bannerUrl: string;

  @Field(() => [ID])
  players!: User[];

  @Field(() => [ID])
  scenarios!: Scenario[];
}

@Resolver(Campaign)
class CampaignResolver {
  @Authorized()
  @Query(() => [Campaign])
  async getMyCampaigns(@Ctx() ctx: AuthContext) {
    return Campaign.find({
      where: [{ owner: { id: ctx.user.id } }, { players: { id: ctx.user.id } }],
      relations: ["scenarios", "players", "storyteller"],
    });
  }

  @Authorized()
  @Query(() => Campaign, { nullable: true })
  async getCampaign(@Arg("id") id: string, @Ctx() ctx: AuthContext) {
    const userId = ctx.user.id;

    const campaign = await Campaign.findOne({
      where: { id },
      relations: ["scenarios", "players", "storyteller", "owner", "messages"],
    });

    if (!campaign) throw new DatabaseError("Campaign not found");

    if (
      campaign.storyteller.id === userId ||
      campaign.owner.id === userId ||
      campaign.players.some((player) => player.id === userId)
    ) {
      return campaign;
    }
    throw new Error("You don't have the right to view this Campaign");
  }

  @Authorized()
  @Mutation(() => Campaign)
  async createCampaign(
    @Arg("data") campaignData: NewCampaignInput,
    @Ctx() ctx: AuthContext,
  ) {
    const campaign: DeepPartial<Campaign> = {
      title: campaignData.title,
      bannerUrl: campaignData.bannerUrl,
      players: campaignData.players.map((p) => ({ id: p.id })),
      scenarios: campaignData.scenarios.map((s) => ({ id: s.id })),
      owner: ctx.user,
      storyteller: ctx.user,
    };
    return Campaign.create(campaign)
      .save()
      .catch(
        handleDatabaseError("Failed to create campaign. Are you logged in?"),
      );
  }
}

export default CampaignResolver;
