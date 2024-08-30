import { GraphQLClient, RequestOptions } from 'graphql-request';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
type GraphQLClientRequestHeaders = RequestOptions['requestHeaders'];
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Mutation = {
  __typename?: 'Mutation';
  login: Scalars['String']['output'];
  signup: Scalars['String']['output'];
};


export type MutationLoginArgs = {
  data: NewUserInput;
};


export type MutationSignupArgs = {
  data: NewUserInput;
};

export type NewUserInput = {
  mail: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  getAllUsers: Array<User>;
};

/** Roles for users in this app */
export enum Roles {
  Admin = 'ADMIN',
  User = 'USER'
}

export type User = {
  __typename?: 'User';
  hashedPassword: Scalars['String']['output'];
  id: Scalars['Float']['output'];
  mail: Scalars['String']['output'];
  name: Scalars['String']['output'];
  roles: Array<Roles>;
};

export type SignupMutationVariables = Exact<{
  data: NewUserInput;
}>;


export type SignupMutation = { __typename?: 'Mutation', signup: string };

export type LoginMutationVariables = Exact<{
  data: NewUserInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: string };

export type GetAllUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllUsersQuery = { __typename?: 'Query', getAllUsers: Array<{ __typename?: 'User', id: number, name: string, roles: Array<Roles> }> };


export const SignupDocument = gql`
    mutation Signup($data: NewUserInput!) {
  signup(data: $data)
}
    `;
export const LoginDocument = gql`
    mutation Login($data: NewUserInput!) {
  login(data: $data)
}
    `;
export const GetAllUsersDocument = gql`
    query GetAllUsers {
  getAllUsers {
    id
    name
    roles
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string, variables?: any) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType, _variables) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    Signup(variables: SignupMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<SignupMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<SignupMutation>(SignupDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'Signup', 'mutation', variables);
    },
    Login(variables: LoginMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<LoginMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<LoginMutation>(LoginDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'Login', 'mutation', variables);
    },
    GetAllUsers(variables?: GetAllUsersQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetAllUsersQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetAllUsersQuery>(GetAllUsersDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetAllUsers', 'query', variables);
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;