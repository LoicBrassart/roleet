import { ioServer } from "..";
import RabbitMQ from "../lib/RabbitMQ";
import type { Message, WithoutID } from "../types";

const rabbitMQ = RabbitMQ.getInstance(`amqp://${process.env.REALTIME_HOST}`);

export default async function sendToPersist(
  message: WithoutID<Message> & { channel: string },
) {
  await rabbitMQ.sendMessage(message, "newMessage");
}

export function subscribeToMessageBroker() {
  rabbitMQ.consume("newMessageCallback", async (msg) => {
    ioServer.to(msg.campaign.id).emit("listen_message", msg);
  });
}
