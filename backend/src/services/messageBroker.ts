// import { Message } from "../entities/Message";
import RabbitMQ from "../lib/RabbitMQ";
const rabbitMQ = RabbitMQ.getInstance("amqp://rabbit-dev");

export default function subscribeToMessageBroker() {
  rabbitMQ.consume("persistence", async (msg) => {
    console.log("Mesage bien reçu: ", msg);
    //TODO: Fix reeived data and record Message properly
    // const newMessage = Message.create();
    // newMessage.content = msg.content;
    // newMessage.createdAt = msg.createdAt;
    // newMessage.owner = msg.userId;
    // await newMessage.save();
    // console.log("Message persisté:", newMessage);
  });
}
