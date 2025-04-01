declare global {
  interface ServerToClientEvents {
    listen_message: (message: Message) => void;
  }

  interface ClientToServerEvents {
    send_message: (message: Omit<Message, "id" | "createdAt">) => void;
  }

  type Message = {
    channel: string;
    content: string;
    createdAt: string;
    id: string;
    userId: string;
  };
}

export type {};
