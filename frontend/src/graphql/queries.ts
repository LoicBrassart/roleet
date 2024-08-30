import { gql } from "@apollo/client";

export const SIGNUP = gql`
  mutation Signup($data: NewUserInput!) {
    signup(data: $data)
  }
`;

export const LOGIN = gql`
  mutation Login($data: NewUserInput!) {
    login(data: $data)
  }
`;

export const GETALLUSERS = gql`
  query GetAllUsers {
    getAllUsers {
      id
      name
      roles
    }
  }
`;
