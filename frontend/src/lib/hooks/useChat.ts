import { useEffect, useState } from "react";
import { useSocket } from "./useSocket";

export function useChat(initialMessages: Message[]) {
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

    socket.on("receive_message", (payload) => {
      setMessages((oldMessages) => [...oldMessages, payload]);
    });
  }, []);

  return {
    messages,
    sendMessage,
    isConnected,
  };
}
