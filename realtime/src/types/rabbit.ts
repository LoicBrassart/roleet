import type { MessageFromBackend, MessageToBackend } from "./message";

export declare namespace Rabbit {
  type SendMessage = {
    // QueueName: Données envoyées
    newMessage: MessageToBackend;
  };

  type Consume = {
    // QueueName: Données reçues
    newMessageCallback: MessageFromBackend; //from entity
  };
}
