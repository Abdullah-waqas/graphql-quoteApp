import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type Query {
    users: [User]
    quotes: [Quote]
    user(_id: ID!): User
    iquote(by: ID!): [Quote]
    myProfile: User
  }
  type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
    quotes: [Quote]
  }
  type Quote {
    _id: ID
    name: String
    by: String
    user: User
  }
  type Mutation {
    signupUser(newUser: UserInput!): User
    signinUser(userSignin: SigninUserInput!): Token
    createQuote(name: String!): Quote
  }
  type Token {
    token: String
    userId: String
  }
  input SigninUserInput {
    email: String!
    password: String!
  }
  input UserInput {
    firstName: String!
    lastName: String!
    email: String!
    password: String!
  }
`;
