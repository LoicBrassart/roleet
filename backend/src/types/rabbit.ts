import type { Message } from "../entities/Message";

export declare namespace Rabbit {
  type SendMessage = {
    // QueueName: Données envoyées
    newMessageCallback: Message;
  };

  type Consume = {
    // QueueName: Données reçues
    newMessage: Message;
  };
}
