import { GraphQLModule } from "@graphql-modules/core";
import { authModule } from "../auth/auth-module";
import { importSchema } from "graphql-import";
import { resolvers } from "./resolvers";
import * as path from "path";

export const articlesModule = new GraphQLModule({
  name: "articles",
  imports: [authModule], //authModule must be imported, because this module uses currentUser in the context
  typeDefs: importSchema(path.join(__dirname, "schema.graphql")),
  resolvers
});
