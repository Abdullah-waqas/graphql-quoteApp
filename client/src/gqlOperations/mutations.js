import { gql } from "@apollo/client";

export const SIGNUP_USER = gql`
  mutation createUser($newUser: UserInput!) {
    user: signupUser(newUser: $newUser) {
      _id
      firstName
      lastName
      email
    }
  }
`;

export const LOGIN_USER = gql`
  mutation signinUser($userSignin: SigninUserInput!) {
    user: signinUser(userSignin: $userSignin) {
      token
      userId
    }
  }
`;

export const CREATE_QUOTE = gql`
  mutation createQuote($name: String!) {
    quote: createQuote(name: $name) {
      name
      by
    }
  }
`;
