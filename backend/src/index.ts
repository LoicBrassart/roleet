import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import * as dotenv from "dotenv";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
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
    authChecker: ({ context }, neededRoles) => {
      if (!context.user) return false;
      if (!neededRoles.length) return true;

      const userRoles = context.user.roles.split(",");
      if (userRoles.includes("ADMIN")) return true;

      return neededRoles.some((roleCandidate) =>
        userRoles.includes(roleCandidate),
      );
    },
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

  await subscribeToMessageBroker();

  console.info(`🚀  Server ready at: ${url}`);
};

start();
