import { useEffect, useState } from "react";
import { type Socket, io } from "socket.io-client";

const SOCKET_URL = import.meta.env.VITE_WS_URL;

export const useSocket = <C extends object, S extends object>() => {
  const [socket, setSocket] = useState<Socket<C, S> | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const newSocket = io(SOCKET_URL, {
      path: "/socket.io/",
      transports: ["websocket"],
    });
    setSocket(newSocket);
  }, []);

  useEffect(() => {
    if (!socket) return;

    socket.on("connect", () => {
      setIsConnected(true);
    });
    socket.on("disconnect", () => {
      setIsConnected(false);
    });

    return () => {
      socket.disconnect();
    };
  }, [socket]);

  return { socket, isConnected };
};
