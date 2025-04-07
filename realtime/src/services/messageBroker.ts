import type { Message, WithoutID } from "@/types";
import { ioServer } from "..";
import RabbitMQ from "../lib/RabbitMQ";

const rabbitMQ = RabbitMQ.getInstance("amqp://rabbit-dev");

export default async function sendToPersist(message: WithoutID<Message>) {
  await rabbitMQ.sendMessage(message, "newMessage");
}

export function subscribeToMessageBroker() {
  rabbitMQ.consume("newMessageCallback", async (msg) => {
    ioServer.to(msg.campaign.id).emit("listen_message", msg);
  });
}
