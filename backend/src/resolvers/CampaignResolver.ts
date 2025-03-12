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
import type { Scenario } from "../entities/Scenario";
import { User } from "../entities/User";
import type AuthContext from "../types/AuthContext";

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
    return await Campaign.find({
      relations: ["scenarios", "players", "storyteller"],
      where: [
        {
          storyteller: { id: ctx.user?.id },
        },
        {
          players: { id: ctx.user?.id },
        },
      ],
    });
  }

  @Authorized()
  @Query(() => Campaign, { nullable: true })
  async getCampaign(@Arg("id") id: number, @Ctx() ctx: AuthContext) {
    const campaign = await Campaign.findOne({
      where: { id },
      relations: ["scenarios", "players", "storyteller"],
    });

    if (!campaign) return null;

    const userId = Number(ctx.user?.id);
    if (
      campaign.storyteller.id !== userId &&
      !campaign.players.some((player) => player.id === userId)
    ) {
      return null;
    }

    return campaign;
  }

  @Mutation(() => Campaign)
  async createCampaign(
    @Arg("data") campaignData: NewCampaignInput,
    @Ctx() ctx: AuthContext,
  ) {
    try {
      if (!ctx.user) throw new Error();
      const campaign = Campaign.create(campaignData as DeepPartial<Campaign>);
      campaign.storyteller = ctx.user;
      const players = await User.findBy({ id: In(campaignData.players) });
      campaign.players = players;

      await campaign.save();

      return campaign;
    } catch (err) {
      console.error(err);
      throw new Error("Failed to create campaign");
    }
  }
}

export default CampaignResolver;
