import { gql } from "@apollo/client";

export const GET_ALL_QUOTES = gql`
  query getAllQuotes {
    quotes {
      _id
      name
      user {
        _id
        firstName
        lastName
        email
      }
    }
  }
`;

export const GET_ALL_QUOTES_BY_USER_ID = gql`
  query getByUserId($user_id: ID!) {
    user: user(_id: $user_id) {
      _id
      firstName
      lastName
      email
      quotes {
        # by
        name
      }
    }
  }
`;

export const GET_USER_PROFILE = gql`
  query getUserProfile {
    profile: myProfile {
      _id
      firstName
      lastName
      email
      quotes {
        # by
        name
      }
    }
  }
`;
