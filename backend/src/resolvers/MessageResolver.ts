import { Arg, Field, InputType, Mutation, Query, Resolver } from "type-graphql";
import { Message } from "../entities/Message";
import { handleDatabaseError } from "../lib/helpers/handleDatabaseError";

@InputType()
class NewMessageInput implements Partial<Message> {
  @Field()
  channel: string;

  @Field()
  content: string;

  @Field()
  ownerId: string;
}
@Resolver(Message)
class MessageResolver {
  @Query(() => [Message])
  getAllMessages() {
    return Message.find({ relations: ["owner"] });
  }

  @Mutation(() => Message)
  async createMessage(@Arg("data") msgData: NewMessageInput) {
    return Message.create({
      ...msgData,
      createdAt: new Date(),
      owner: { id: msgData.ownerId },
    })
      .save()
      .catch(handleDatabaseError("Failed to create message"));
  }
}

export default MessageResolver;
