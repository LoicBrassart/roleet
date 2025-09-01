import type { Message } from "../entities/Message";

//TODO: get from codegen ?
export type MessageFromRealtime = {
  channel: string;
  content: string;
  createdAt: string;
  owner: {
    id: string;
    name: string;
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
