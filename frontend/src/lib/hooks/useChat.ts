import { useEffect, useState } from "react";
import type { Entities } from "@/types/entities";
import { useSocket } from "./useSocket";

export function useChat(room: string, initialMessages: Entities.Message[]) {
  const { socket, isConnected } = useSocket<
    ServerToClientEvents,
    ClientToServerEvents
  >();
  const [messages, setMessages] = useState(initialMessages);

  const sendMessage = (
    message: Omit<Entities.Message, "id" | "createdAt"> & { channel: string },
  ) => {
    if (!socket) return;
    socket.emit("send_message", { ...message, campaign: room });
  };

  useEffect(() => {
    if (!socket) return;

    socket.emit("join_room", room);

    socket.on("listen_message", (payload) => {
      setMessages((oldMessages) => [...oldMessages, payload]);
    });
  }, [socket, room]);

  return {
    messages,
    sendMessage,
    isConnected,
  };
}
