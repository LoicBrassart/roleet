import type { Message } from "../entities/Message";

export declare namespace Rabbit {
  type SendMessage = {
    // QueueName: Données envoyées
    newMessage: Message;
  };

  type Consume = {
    // QueueName: Données reçues
    newMessageCallback: Message;
  };
}
