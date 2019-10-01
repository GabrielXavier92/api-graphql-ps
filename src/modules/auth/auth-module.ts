import { GraphQLModule } from "@graphql-modules/core";
import { tradeTokenForUser } from "./auth-helpers";
import { importSchema } from "graphql-import";
import { resolvers } from "./resolvers";
import { join } from "path";
import { AuthenticationError } from "apollo-server";
import { invalidToken } from "../../utils/messages";

const HEADER_NAME = "token";

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
			return {
				currentUser
			};
		} catch (e) {
			throw new AuthenticationError(invalidToken);
		}
	}
});
