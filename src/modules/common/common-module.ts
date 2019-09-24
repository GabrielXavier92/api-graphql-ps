import { GraphQLModule } from "@graphql-modules/core";
import { importSchema } from "graphql-import";
import { join } from "path";
import { resolvers } from "./resolvers";

export const commonModule = new GraphQLModule({
  name: "common",
  typeDefs: importSchema(join(__dirname, "schema.graphql")),
  resolvers
});
