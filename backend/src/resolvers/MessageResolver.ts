import { Arg, Field, InputType, Mutation, Query, Resolver } from "type-graphql";
import { Message } from "../entities/Message";
import { User } from "../entities/User";

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
  async getAllMessages() {
    return await Message.find({
      relations: ["owner"],
    });
  }

  @Mutation(() => Message)
  async createMessage(@Arg("data") msgData: NewMessageInput) {
    try {
      const owner = await User.findOneByOrFail({ id: msgData.ownerId });
      const message = await Message.create({
        ...msgData,
        createdAt: new Date(),
        owner,
      }).save();
      return message;
    } catch (err) {
      throw new Error("Failed to create message");
    }
  }
}

export default MessageResolver;
