import { GraphQLModule } from "@graphql-modules/core";
import { tradeTokenForUser } from "./auth-helpers";
import gql from "graphql-tag";

const HEADER_NAME = "authorization";

export const authModule = new GraphQLModule({
  name: "auth",
  typeDefs: gql`
    type Query {
      me: User
    }
    type User {
      id: ID!
      username: String!
    }
  `,
  resolvers: {
    Query: {
      me: (root, args, { currentUser }) => currentUser
    },
    User: {
      id: user => user._id,
      username: user => user.username
    }
  },
  context: async ({ req }) => {
    let authToken = null;
    let currentUser = null;

    try {
      authToken = req.headers[HEADER_NAME];

      if (authToken) {
        currentUser = await tradeTokenForUser(authToken);
      }
    } catch (e) {
      console.warn(`Unable to authenticate using auth token: ${authToken}`);
    }

    return {
      authToken,
      currentUser
    };
  }
});
