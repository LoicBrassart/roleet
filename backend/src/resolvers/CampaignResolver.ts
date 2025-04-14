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
    @Ctx() ctx: CustomContext
  ) {
    try {
      if (!ctx.user) throw new Error("User not authenticated");

      const campaign = Campaign.create(campaignData as DeepPartial<Campaign>);
      campaign.storyteller = ctx.user;
      campaign.owner = ctx.user;
      const players = await User.findBy({ id: In(campaignData.players) });
      campaign.players = players;
      const scenarios = await Scenario.findBy({
        id: In(campaignData.scenarios),
      });
      campaign.scenarios = scenarios;

      await campaign.save();

      return campaign;
    } catch (err) {
      throw new Error(`Failed to create campaign: ${err}`);
    }
  }
}

export default CampaignResolver;
