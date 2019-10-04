import { GraphQLModule } from "@graphql-modules/core";
import { authModule } from "../auth/auth-module";
import { importSchema } from "graphql-import";
import { resolvers } from "./resolvers";
import { join } from "path";

export const serviceModule = new GraphQLModule({
	name: "services",
	imports: [authModule], //authModule must be imported, because this module uses currentUser in the context
	typeDefs: importSchema(join(__dirname, "schema.graphql")),
	resolvers
});
