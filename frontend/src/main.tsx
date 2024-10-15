import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./router";

const client = new ApolloClient({
  uri: "/api",
  cache: new InMemoryCache(),
});

// biome-ignore lint/style/noNonNullAssertion: We *know* this div is in the html template; otherwise it's not possible to load a React app
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <RouterProvider router={router} />
    </ApolloProvider>
  </React.StrictMode>,
);
