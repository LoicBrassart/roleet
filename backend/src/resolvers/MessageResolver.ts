import { Arg, Field, InputType, Mutation, Query, Resolver } from "type-graphql";
import { Message } from "../entities/Message";
import { handleDatabaseError } from "../lib/helpers/handleDatabaseError";

@InputType()
class NewMessageInput implements Partial<Message> {
  @Field()
  content: string;

  @Field()
  campaignId: string;

  @Field()
  ownerId: string;
}
@Resolver(Message)
class MessageResolver {
  @Query(() => [Message])
  getMessagesByCampaign(@Arg("id") id: string) {
    return Message.find({
      relations: ["owner", "campaign"],
      where: { campaign: { id } },
      order: { createdAt: "ASC" },
    });
  }

  @Mutation(() => Message)
  async createMessage(@Arg("data") msgData: NewMessageInput) {
    return Message.create({
      ...msgData,
      createdAt: new Date(),
      owner: { id: msgData.ownerId },
      campaign: { id: msgData.campaignId },
    })
      .save()
      .catch(handleDatabaseError("Failed to create message"));
  }
}

export default MessageResolver;
