import type { Message } from "../entities/Message";

export type MessageFromRealtime = {
  content: string;
  createdAt: string;
  owner: {
    id: string;
    name: string; // ?
  };
  campaign: {
    id: string;
  };
};

export declare namespace Rabbit {
  type SendMessage = {
    // QueueName: Données envoyées
    newMessageCallback: Message;
  };

  type Consume = {
    // QueueName: Données reçues
    newMessage: MessageFromRealtime;
  };
}
