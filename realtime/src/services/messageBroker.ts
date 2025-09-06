import { ioServer } from "..";
import RabbitMQ from "../lib/RabbitMQ";
import type { MessageToBackend } from "../types/message";

const rabbitMQ = RabbitMQ.getInstance(`amqp://${process.env.REALTIME_HOST}`);

export default async function sendToPersist(message: MessageToBackend) {
  await rabbitMQ.sendMessage(message, "newMessage");
}

export function subscribeToMessageBroker() {
  rabbitMQ.consume("newMessageCallback", async (msg) => {
    ioServer.to(msg.campaign.id).emit("listen_message", msg);
  });
}
