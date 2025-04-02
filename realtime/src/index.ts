import { randomUUID } from "node:crypto";
import { createServer } from "node:http";
import cors from "cors";
import express from "express";
import { Server } from "socket.io";
import sendToPersist from "./services/messageBroker";

const port = 4000;
const app = express();
app.use(cors());
const server = createServer(app);
const io = new Server(server, {
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

  socket.on("message", async (payload) => {
    const message = {
      content: payload.content,
      userId: payload.userId,
      id: randomUUID(), //TODO: remove this (get from persistence service ?)
      createdAt: new Date(),
    };
    sendToPersist(message);

    io.to(fakeRoom).to(payload.room).emit("message", message);
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
