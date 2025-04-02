import "reflect-metadata";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import * as dotenv from "dotenv";
import * as jwt from "jsonwebtoken";
import { buildSchema } from "type-graphql";
import { dataSource } from "./config/db";
import CampaignResolver from "./resolvers/CampaignResolver";
import FlashcardResolver from "./resolvers/FlashcardResolver";
import MessageResolver from "./resolvers/MessageResolver";
import PlanResolver from "./resolvers/PlanResolver";
import PointOfInterestResolver from "./resolvers/PointOfInterestResolver";
import ScenarioResolver from "./resolvers/ScenarioResolver";
import UserResolver from "./resolvers/UserResolver";
import subscribeToMessageBroker from "./services/messageBroker";

dotenv.config();

const start = async () => {
  await dataSource.initialize();
  const schema = await buildSchema({
    resolvers: [
      UserResolver,
      ScenarioResolver,
      PlanResolver,
      PointOfInterestResolver,
      FlashcardResolver,
      CampaignResolver,
      MessageResolver,
    ],
    //validate:true,
    authChecker: ({ context }, neededRoles) => {
      if (!context.user) return false;
      if (!neededRoles.length) return true;

      const userRoles = context.user.roles.split(",");
      if (userRoles.includes("ADMIN")) return true;

      return !!neededRoles.filter((roleCandidate) =>
        userRoles.includes(roleCandidate),
      ).length;
    },
  });

  const server = new ApolloServer({ schema });

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
    context: async ({ req, res }) => {
      if (!process.env.JWT_SECRET) return { res };
      if (!req.headers.cookie) return { res };

      const match = req.headers.cookie.match(/roleetAuthToken=([^;]+)/);
      if (!match) return { res };

      const token = match[1];

      const user = jwt.verify(token, process.env.JWT_SECRET);
      if (typeof user === "string") return { res };

      return { user, res };
    },
  });

  await subscribeToMessageBroker();

  console.info(`🚀  Server ready at: ${url}`);
};

start();
