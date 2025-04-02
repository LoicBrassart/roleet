export interface ServerToClientEvents {
  listen_message: (message: Message) => void;
}

export interface ClientToServerEvents {
  send_message: (message: Omit<Message, "id" | "createdAt">) => void;
}

// TODO: get from codegen ?
export type Message = {
  channel: string;
  content: string;
  createdAt: string;
  id: string;
  userId: string;
};
