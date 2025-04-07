export interface ServerToClientEvents {
  listen_message: (message: Omit<Message, "id" | "createdAt">) => void;
}

export interface ClientToServerEvents {
  send_message: (message: Omit<Message, "id" | "createdAt">) => void;
  join_room: (room: string) => void;
}

// TODO: get from codegen ?
export type Message = {
  channel: string;
  content: string;
  createdAt: string;
  id: string;
  userId: string;
};

export type MessageInput = {
  channel: string;
  content: string;
  userId: string;
};

export type WithoutID<T> = Omit<T, "id">;
