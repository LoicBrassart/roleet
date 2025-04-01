import { randomUUID } from "node:crypto";
import { createServer } from "node:http";
import cors from "cors";
import express from "express";
import { Server } from "socket.io";
import type { ClientToServerEvents, ServerToClientEvents } from "./index.types";

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
    // TODO: Record in database
    // wtf how did i forget I'd have to contact my graphql api ? -_-

    // Simule l'ajout dans la db
    const message = await Promise.resolve({
      id: randomUUID(),
      content: payload.content,
      userId: payload.userId,
      // Le type Date est une plaie, un number serait tellement mieux !
      createdAt: new Date().toISOString().replace("Z", "").replace("T", " "),
      channel: payload.channel,
    });

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
