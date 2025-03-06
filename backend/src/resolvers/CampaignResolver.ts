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

@InputType()
class NewCampaignInput implements Partial<Campaign> {
  @Field()
  title: string;

  @Field()
  bannerUrl: string;

  @Field(() => [ID])
  players!: User[];

  // @Field(()=>[ID])
  // tags!: Tag[];
}

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

  @Mutation(() => Campaign)
  async createCampaign(
    @Arg("data") campaignData: NewCampaignInput,
    @Ctx() ctx: AuthContext
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
