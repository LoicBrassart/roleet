import { createServer } from "node:http";
import cors from "cors";
import express from "express";
import { Server } from "socket.io";

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
  // TODO: Check authentication (as in backend, via JWT ?)

  socket.on("message", (payload) => {
    console.info(payload.content);
    // TODO: Redispatch to whole playgroup
    // TODO: Record in database
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
