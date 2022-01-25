import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export enum ActionTypes {
  AddDatabaseEntry = 'ADD_DATABASE_ENTRY'
}

export type AutomationData = {
  actionId: Scalars['Float'];
  actionType: Scalars['Float'];
  deleted: Scalars['Boolean'];
  disabled: Scalars['Boolean'];
  triggerId: Scalars['Float'];
  triggerType: Scalars['Float'];
  userId: Scalars['Float'];
};

export type AutomationResponse = {
  __typename?: 'AutomationResponse';
  automation?: Maybe<Automations>;
  errors?: Maybe<Array<FieldError>>;
};

export type Automations = {
  __typename?: 'Automations';
  actionId: Scalars['Float'];
  actionType: ActionTypes;
  createdAt: Scalars['String'];
  deleted: Scalars['Boolean'];
  deletedDate: Scalars['String'];
  disabled: Scalars['Boolean'];
  id: Scalars['Float'];
  triggerId: Scalars['Float'];
  triggerType: TriggerTypes;
  updatedAt: Scalars['String'];
  userId: Scalars['Float'];
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createAutomation: AutomationResponse;
  login: UserResponse;
  register: UserResponse;
  updateAutomation?: Maybe<Automations>;
  updateUser?: Maybe<User>;
};


export type MutationCreateAutomationArgs = {
  automationData: AutomationData;
};


export type MutationLoginArgs = {
  credentials: UsernamePasswordInput;
};


export type MutationRegisterArgs = {
  credentials: UsernamePasswordInput;
};


export type MutationUpdateAutomationArgs = {
  id: Scalars['Float'];
};


export type MutationUpdateUserArgs = {
  id: Scalars['Float'];
  username: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  automation?: Maybe<Automations>;
  automations: Array<Automations>;
  user?: Maybe<User>;
  users: Array<User>;
};


export type QueryAutomationArgs = {
  id: Scalars['Int'];
};


export type QueryAutomationsArgs = {
  userId: Scalars['Float'];
};


export type QueryUserArgs = {
  id: Scalars['Int'];
};

export enum TriggerTypes {
  Schedule = 'SCHEDULE'
}

export type User = {
  __typename?: 'User';
  createdAt: Scalars['String'];
  id: Scalars['Float'];
  updatedAt: Scalars['String'];
  username: Scalars['String'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type UsernamePasswordInput = {
  password: Scalars['String'];
  username: Scalars['String'];
};

export type RegisterMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null | undefined, user?: { __typename?: 'User', id: number, username: string } | null | undefined } };


export const RegisterDocument = gql`
    mutation Register($username: String!, $password: String!) {
  register(credentials: {username: $username, password: $password}) {
    errors {
      field
      message
    }
    user {
      id
      username
    }
  }
}
    `;

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument);
};