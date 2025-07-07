import "reflect-metadata";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import * as dotenv from "dotenv";
import { buildSchema } from "type-graphql";
import redisClient from "./lib/Redis";
import { authChecker } from "./lib/helpers/authChecker";
import getUserFromReq from "./lib/helpers/getUserFromReq";
import { dataSource } from "./lib/typeorm/dataSource";
import resolvers from "./resolvers";
import subscribeToMessageBroker from "./services/messageBroker";
import type { AnonContext, AuthContext } from "./types/ApolloContext";

dotenv.config();

const start = async () => {
  await dataSource.initialize();
  const schema = await buildSchema({
    resolvers,
    //validate:true,
    authChecker,
  });

  const server = new ApolloServer({ schema });

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
    context: async ({ req, res }) => {
      const context: AnonContext | AuthContext = {
        req,
        res,
        user: getUserFromReq(req),
      };
      return context;
    },
  });

  redisClient.connect();

  await subscribeToMessageBroker();

  console.info(`🚀  Server ready at: ${url}`);
};

start();
