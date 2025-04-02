import RabbitMQ from "../lib/RabbitMQ";

const rabbitMQ = RabbitMQ.getInstance("amqp://rabbit-dev");

export default async function sendToPersist(message: any) {
  await rabbitMQ.sendMessage(message, "persistence");
}
