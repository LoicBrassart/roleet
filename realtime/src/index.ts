import { createServer } from "node:http";
import cors from "cors";
import express from "express";
import { Server } from "socket.io";
import sendToPersist, {
  subscribeToMessageBroker,
} from "./services/messageBroker";
import type {
  ClientToServerEvents,
  Message,
  ServerToClientEvents,
  WithoutID,
} from "./types";

const port = 4000;
const app = express();
app.use(cors());
const server = createServer(app);
export const ioServer = new Server<ClientToServerEvents, ServerToClientEvents>(
  server,
  {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
    path: "/socket.io/",
    transports: ["websocket"],
  },
);
subscribeToMessageBroker();

ioServer.on("connection", (socket) => {
  // TODO: Check authentication (as in backend, via JWT ?)

  socket.on("join_room", async (room) => {
    socket.join(room);
  });

  socket.on("send_message", async (payload) => {
    const message = {
      content: payload.content,
      userId: payload.userId,
      createdAt: new Date().toISOString().replace("Z", "").replace("T", " "), // TODO: Think about the type to use for dates
      channel: payload.channel,
    } satisfies WithoutID<Message>;
    sendToPersist(message);
  });

  socket.on("disconnect", () => {
    console.info("user disconnected");
  });
});

app.get("/health", (_req, res) => {
  res.status(200).send();
});

server.listen(port, () => {
  console.info(`Serveur Express en écoute sur le port ${port}`);
});
