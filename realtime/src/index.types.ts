export interface ServerToClientEvents {
  listen_message: (message: Message) => void;
}

export interface ClientToServerEvents {
  send_message: (message: Omit<Message, "id" | "createdAt">) => void;
}

export type Message = {
  channel: string;
  content: string;
  createdAt: string;
  id: string;
  userId: string;
};
