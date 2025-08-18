import type { Message } from "../entities/Message";

//TODO: get from codegen ?
export type MessageFromFrontend = {
  // channel: string;
  content: string;
  createdAt: string;
  id: string;
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
    newMessage: Omit<MessageFromFrontend, "id"> & { campaign: string };
  };
}
