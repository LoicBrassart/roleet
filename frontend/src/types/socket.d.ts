import type { Entities } from "./entities";

declare global {
  interface ServerToClientEvents {
    listen_message: (message: Entities.Message) => void;
  }

  interface ClientToServerEvents {
    send_message: (
      message: Prettify<Omit<Entities.MessageShort, "id" | "createdAt">>,
    ) => void;
    join_room: (room: string) => void;
  }

  // TODO: get from codegen instead ?
  // type Message = {
  //   content: string;
  //   createdAt: string;
  //   id: string;
  //   userId: string;
  // };
}
