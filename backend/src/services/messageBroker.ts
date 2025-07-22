import { Campaign } from "../entities/Campaign";
import { Message } from "../entities/Message";
import RabbitMQ from "../lib/RabbitMQ";

const rabbitMQ = RabbitMQ.getInstance(`amqp://${process.env.REALTIME_HOST}`);

export default function subscribeToMessageBroker() {
  rabbitMQ.consume("newMessage", async (msg) => {
    const campaign = await Campaign.findOneByOrFail({ id: msg.channel });
    const newMessage = Message.create();
    newMessage.content = msg.content;
    newMessage.channel = "tests"; // TODO: use separate rooms for every purpose
    newMessage.createdAt = msg.createdAt;
    newMessage.owner = msg.owner;
    newMessage.campaign = campaign;
    await newMessage.save();

    await rabbitMQ.sendMessage(newMessage, "newMessageCallback");
  });
}
