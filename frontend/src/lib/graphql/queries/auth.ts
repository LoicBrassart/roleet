import { gql } from "@apollo/client";

export const SIGNUP = gql`
  mutation signup($data: NewUserInput!) {
    signup(data: $data)
  }
`;

export const LOGIN = gql`
  mutation login($data: UserInput!) {
    login(data: $data)
  }
`;

export const LOGOUT = gql`
  mutation logout {
    logout
  }
`;
