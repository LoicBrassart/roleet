import { Campaign } from "../entities/Campaign";
import { Message } from "../entities/Message";
import { User } from "../entities/User";
import RabbitMQ from "../lib/RabbitMQ";

const rabbitMQ = RabbitMQ.getInstance(`amqp://${process.env.REALTIME_HOST}`);

export default function subscribeToMessageBroker() {
  rabbitMQ.consume("newMessage", async (msg) => {
    const campaign = await Campaign.findOneByOrFail({ id: msg.channel });
    const owner = await User.findOneByOrFail({ id: msg.owner.id });
    const newMessage = Message.create();
    newMessage.content = msg.content;
    // newMessage.channel = "tests"; // TODO: use separate rooms for every purpose
    newMessage.createdAt = new Date(msg.createdAt);
    newMessage.owner = owner;
    newMessage.campaign = campaign;
    await newMessage.save();

    await rabbitMQ.sendMessage(newMessage, "newMessageCallback");
  });
}
