export type MessageFromRealtime = {
  content: string;
  createdAt: string;
  ownerId: string;
  campaignId: string;
};

export type MessageToRealtime = {
  id: string;
  content: string;
  campaign: {
    id: string;
  };
  owner: {
    id: string;
  };
};

export declare namespace Rabbit {
  type SendMessage = {
    // QueueName: Données envoyées
    newMessageCallback: MessageToRealtime;
  };

  type Consume = {
    // QueueName: Données reçues
    newMessage: MessageFromRealtime;
  };
}
