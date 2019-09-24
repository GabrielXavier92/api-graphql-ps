import { GraphQLModule } from "@graphql-modules/core";
import gql from "graphql-tag";

export const commonModule = new GraphQLModule({
  name: "common",
  typeDefs: gql`
    type Query {
      serverTime: Common
    }

    type Common {
      message: String
    }
  `,
  resolvers: {
    Query: {
      serverTime: () => {
        console.log("Hello World");
      }
    }
  }
});
