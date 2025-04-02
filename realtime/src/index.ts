import { randomUUID } from "node:crypto";
import { createServer } from "node:http";
import cors from "cors";
import express from "express";
import { Server } from "socket.io";
import sendToPersist from "./services/messageBroker";
import type { ClientToServerEvents, ServerToClientEvents } from "./types";

const port = 4000;
const app = express();
app.use(cors());
const server = createServer(app);
const io = new Server<ClientToServerEvents, ServerToClientEvents>(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
  path: "/socket.io/",
  transports: ["websocket"],
});

io.on("connection", (socket) => {
  console.info("a user connected");

  const fakeRoom = "zert-zert-zert-zert"; // TODO: Remove this bouchon
  socket.join(fakeRoom);

  // TODO: Check authentication (as in backend, via JWT ?)

  socket.on("send_message", async (payload) => {
    const message = await Promise.resolve({
      id: randomUUID(),
      content: payload.content,
      userId: payload.userId,
      createdAt: new Date().toISOString().replace("Z", "").replace("T", " "), // TODO: Think about the type to use for dates
      channel: payload.channel,
    });
    sendToPersist(message);

    io.to(fakeRoom).to(payload.channel).emit("listen_message", message);
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
