import { ApolloClient, InMemoryCache } from "@apollo/client";

export default new ApolloClient({
  uri: "/api",
  cache: new InMemoryCache(),
});
