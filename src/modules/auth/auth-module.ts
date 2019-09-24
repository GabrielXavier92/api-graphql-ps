import { GraphQLModule } from "@graphql-modules/core";
import { tradeTokenForUser } from "./auth-helpers";
import { importSchema } from "graphql-import";
import { resolvers } from "./resolvers";
import { join } from "path";

const HEADER_NAME = "authorization";

export const authModule = new GraphQLModule({
  name: "auth",
  typeDefs: importSchema(join(__dirname, "schema.graphql")),
  resolvers,
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
