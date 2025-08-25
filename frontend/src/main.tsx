import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { ApolloProvider } from "@apollo/client";
import { RouterProvider } from "react-router";
import client from "@/lib/graphql/client";
import router from "@/lib/react-router/router";

const root = document.getElementById("root");
if (!root) {
  throw new Error("Could not find root element");
}

createRoot(root).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <RouterProvider router={router} />
    </ApolloProvider>
  </StrictMode>,
);
