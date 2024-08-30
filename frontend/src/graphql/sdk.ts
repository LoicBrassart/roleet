import { GraphQLClient } from "graphql-request";
import { getSdk } from "./generated/graphql-types";

const { VITE_API_URL } = import.meta.env;

const client = new GraphQLClient(VITE_API_URL);
const sdk = getSdk(client);

export default sdk;
