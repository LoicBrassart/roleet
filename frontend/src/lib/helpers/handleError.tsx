import { ApolloError } from "@apollo/client";
import { Navigate } from "react-router-dom";
import { useLogoutMutation } from "../graphql/generated/graphql-types";
import { useLogout } from "../zustand/userStore";

export function handleError(error: Error) {
  const resetUser = useLogout();
  const [logout] = useLogoutMutation();

  if (
    error instanceof ApolloError &&
    error.message ===
      "Access denied! You need to be authenticated to perform this action!"
  ) {
    resetUser();
    logout();
    return <Navigate to="/auth" replace />;
  }

  return <p>Oops, something went awry...</p>;
}
