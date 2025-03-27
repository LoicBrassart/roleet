import { Query, Resolver } from "type-graphql";
import { Message } from "../entities/Message";

@Resolver(Message)
class MessageResolver {
  @Query(() => [Message])
  async getAllMessages() {
    return await Message.find({
      relations: ["owner"],
    });
  }
}

export default MessageResolver;
