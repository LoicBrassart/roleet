import "reflect-metadata";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import * as dotenv from "dotenv";
import * as jwt from "jsonwebtoken";
import { buildSchema } from "type-graphql";
import { dataSource } from "./config/db";
import PlanResolver from "./resolvers/PlanResolver";
import PointOfInterestResolver from "./resolvers/PointOfInterestResolver";
import ScenarioResolver from "./resolvers/ScenarioResolver";
import UserResolver from "./resolvers/UserResolver";

dotenv.config();

const start = async () => {
  await dataSource.initialize();
  const schema = await buildSchema({
    resolvers: [
      UserResolver,
      ScenarioResolver,
      PlanResolver,
      PointOfInterestResolver,
    ],
    authChecker: ({ context }, neededRoles) => {
      if (!context.payload) return false;

      const userRoles = context.payload.roles.split(",");
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
      if (!req.headers.authorization) return { res };

      if (!req.headers.cookie) return { res };

      const payload = jwt.verify(
        req.headers.cookie.split("token=")[1],
        process.env.JWT_SECRET,
      );
      if (typeof payload === "string") return { res };
      return { payload, res };
    },
  });

  console.info(`🚀  Server ready at: ${url}`);
};

start();
