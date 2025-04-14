import { createServer } from "node:http";
import cors from "cors";
import express from "express";
import * as jwt from "jsonwebtoken";
import { Server, type Socket } from "socket.io";
import sendToPersist, {
  subscribeToMessageBroker,
} from "./services/messageBroker";
import type {
  ClientToServerEvents,
  Message,
  ServerToClientEvents,
  WithoutID,
} from "./types";

type jwtContent = {
  id: string;
  mail: string;
  name: string;
  roles: string[];
};
interface AuthenticatedSocket extends Socket {
  decodedToken?: jwtContent;
}

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) throw new Error("Missing env variable: JWT_SECRET !");

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
      credentials: true,
    },
    path: "/socket.io/",
    transports: ["websocket"],
  }
);
subscribeToMessageBroker();

ioServer.use((socket: AuthenticatedSocket, next) => {
  const cookieHeader = socket.handshake.headers.cookie;
  if (!cookieHeader) return next(new Error("No cookies found in request"));

  const cookies: { [key: string]: string } = {};
  for (let cookie of cookieHeader.split(";")) {
    const [name, ...valueParts] = cookie.trim().split("=");
    if (name && valueParts.length > 0) {
      cookies[name] = valueParts.join("=").trim();
    }
  }
  const authToken = cookies.roleetAuthToken;
  if (!authToken) return next(new Error("No JWT token found in cookie"));

  try {
    const user = jwt.verify(authToken, JWT_SECRET);
    if (typeof user === "string") return next(new Error("Invalid JWT found"));

    socket.decodedToken = user as jwtContent;
    next();
  } catch (err) {
    console.error("JWT verification error:", err);
    next(new Error("Authentication error"));
  }
});

ioServer.on("connection", (socket: AuthenticatedSocket) => {
  // TODO: Check authentication (as in backend, via JWT ?)
  try {
    if (!socket.decodedToken)
      throw new Error("Trying to connect without a valid JWT");

    socket.on("join_room", async (room) => {
      socket.join(room);
      console.info("A user joined in: ", socket.decodedToken?.name);
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
      console.info(socket.decodedToken?.name, " disconnected");
    });
  } catch (err) {
    console.error("JWT verification error:", err);
  }
});

app.get("/health", (_req, res) => {
  res.status(200).send();
});

server.listen(port, () => {
  console.info(`Serveur Express en écoute sur le port ${port}`);
});
