import type { MessageFromFrontend, MessageToFrontend } from "./message";

export interface ServerToClientEvents {
  listen_message: (message: MessageToFrontend) => void;
}

export interface ClientToServerEvents {
  send_message: (message: MessageFromFrontend) => void;
  join_room: (room: string) => void;
}

export type WithoutID<T> = Omit<T, "id">;
