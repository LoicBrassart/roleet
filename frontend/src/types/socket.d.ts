declare global {
  interface ServerToClientEvents {
    listen_message: (message: Message) => void;
  }

  interface ClientToServerEvents {
    send_message: (message: Omit<Message, "id" | "createdAt">) => void;
    join_room: (room: string) => void;
  }

  // TODO: get from codegen instead ?
  type Message = {
    channel: string;
    content: string;
    createdAt: string;
    id: string;
    userId: string;
  };
}

export type {};
