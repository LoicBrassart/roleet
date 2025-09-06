type MessageToBackend = {
  content: string;
  createdAt: string;
  owner: {
    id: string;
    name: string;
  };
  campaign: {
    id: string;
  };
};

type Message = {
  campaign: {
    id: string;
  };
  content: string;
  owner: {
    id: string;
    name: string;
  };
};

export declare namespace Rabbit {
  type SendMessage = {
    // QueueName: Données envoyées
    newMessage: MessageToBackend;
  };

  type Consume = {
    // QueueName: Données reçues
    newMessageCallback: Message; //from entity
  };
}
