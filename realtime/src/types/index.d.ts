export interface ServerToClientEvents {
  listen_message: (message: Omit<Message, "id" | "createdAt">) => void;
}

export interface ClientToServerEvents {
  send_message: (message: Omit<Message, "id" | "createdAt">) => void;
  join_room: (room: string) => void;
}

// TODO: get from codegen ?
export type Message = {
  content: string;
  createdAt: string;
  id: string;
  owner: {
    id: string;
    name: string;
  };
};

export type MessageInput = {
  content: string;
  userId: string;
  campaignId: string;
};

export type WithoutID<T> = Omit<T, "id">;
