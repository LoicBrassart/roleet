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
import { Scenario } from "../entities/Scenario";
import { User } from "../entities/User";
import type CustomContext from "../types/CustomContext";

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

@InputType()
class UpdateCampaignInput implements Partial<Campaign> {
  @Field()
  id: string;

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
  async getMyCampaigns(@Ctx() ctx: CustomContext) {
    return await Campaign.createQueryBuilder("campaign")
      .leftJoinAndSelect("campaign.scenarios", "scenario")
      .leftJoinAndSelect("campaign.players", "player")
      .leftJoinAndSelect("campaign.storyteller", "storyteller")
      .where("campaign.storytellerId = :userId", { userId: ctx.user?.id })
      .orWhere("player.id = :userId", { userId: ctx.user?.id })
      .getMany();
  }

  @Authorized()
  @Query(() => Campaign, { nullable: true })
  async getCampaign(@Arg("id") id: string, @Ctx() ctx: CustomContext) {
    if (!ctx.user)
      throw new Error("You must be authenticated to search for Campaigns");
    const userId = ctx.user.id;

    const campaign = await Campaign.findOne({
      where: { id },
      relations: ["scenarios", "players", "storyteller", "owner", "messages"],
    });

    if (!campaign) throw new Error("Campaign not found");

    if (
      campaign.storyteller.id === userId ||
      campaign.owner.id === userId ||
      campaign.players.some((player) => player.id === userId)
    ) {
      return campaign;
    }
    throw new Error("You don't have the right to view this Campaign");
  }

  @Mutation(() => Campaign)
  async createCampaign(
    @Arg("data") campaignData: NewCampaignInput,
    @Ctx() ctx: CustomContext,
  ) {
    try {
      if (!ctx.user) throw new Error("User not authenticated");

      const campaign = {
        title: campaignData.title,
        bannerUrl: campaignData.bannerUrl,
        // players: await User.findBy({ id: In(campaignData.players) }),
        // scenarios: await Scenario.findBy({ id: In(campaignData.scenarios) }),
        players: campaignData.players.map((p) => ({ id: p.id })),
        scenarios: campaignData.scenarios.map((s) => ({ id: s.id })),
        // players: campaignData.players,
        // scenarios: campaignData.scenarios,
        owner: ctx.user,
        storyteller: ctx.user,
      };

      const newCampaign = Campaign.create(campaign as DeepPartial<Campaign>);
      // await newCampaign.save();

      return newCampaign;
    } catch (err) {
      throw new Error(`Failed to create campaign: ${err}`);
    }
  }

  @Authorized()
  @Mutation(() => Campaign)
  async updateCampaign(
    @Arg("data") campaignData: UpdateCampaignInput,
    @Ctx() ctx: CustomContext,
  ) {
    try {
      if (!ctx.user) throw new Error("User not authenticated");

      const campaign_ = await this.getCampaign(campaignData.id, ctx);
      if (ctx.user.id !== campaign_.owner.id) {
        throw new Error("Not authorized");
      }

      const campaign = await Campaign.update(
        { id: campaignData.id },
        {
          title: campaignData.title,
          bannerUrl: campaignData.bannerUrl,
          players: await User.findBy({ id: In(campaignData.players) }),
          scenarios: await Scenario.findBy({ id: In(campaignData.scenarios) }),
        },
      );

      return campaign;
    } catch (err) {
      throw new Error(`Failed to update campaign: ${err}`);
    }
  }
}

export default CampaignResolver;
