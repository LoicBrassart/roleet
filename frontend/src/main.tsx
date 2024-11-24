import { ApolloProvider } from "@apollo/client";
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import client from "./lib/graphql/client";
import router from "./router";

// biome-ignore lint/style/noNonNullAssertion: We *know* this div is in the html template; otherwise it's not possible to load a React app
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <RouterProvider router={router} />
    </ApolloProvider>
  </React.StrictMode>,
);
