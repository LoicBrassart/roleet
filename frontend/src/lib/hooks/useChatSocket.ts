import { useEffect, useState } from "react";
import { useSocket } from "./useSocket";

export function useChatSocket(initialMessages: Message[]) {
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

    socket.on("listen_message", (payload) => {
      setMessages((oldMessages) => [...oldMessages, payload]);
    });
  }, [socket]);

  return {
    messages,
    sendMessage,
    isConnected,
  };
}
