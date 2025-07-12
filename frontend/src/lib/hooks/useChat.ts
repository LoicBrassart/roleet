import type { Entities } from "@/types/entities";
import { useEffect, useState } from "react";
import { useSocket } from "./useSocket";

export function useChat(room: string, initialMessages: Entities.Message[]) {
  const { socket, isConnected } = useSocket<
    ServerToClientEvents,
    ClientToServerEvents
  >();
  const [messages, setMessages] = useState(initialMessages);

  const sendMessage = (message: Omit<Message, "id" | "createdAt">) => {
    if (!socket) return;
    socket.emit("send_message", message);
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
