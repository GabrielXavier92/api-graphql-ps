import { GraphQLModule } from "@graphql-modules/core";
// import { tradeTokenForUser } from "./auth-helpers";
import { importSchema } from "graphql-import";
import { resolvers } from "./resolvers";
import { join } from "path";
// import { AuthenticationError } from "apollo-server";
// import { invalidToken } from "../../utils/messages";

// const HEADER_NAME = "authorization";

export const authModule = new GraphQLModule({
	name: "auth",
	typeDefs: importSchema(join(__dirname, "schema.graphql")),
	resolvers,
	context: async ({ /*req*/ }) => {
		// try {
		// 	const trade = await tradeTokenForUser(req.headers[HEADER_NAME]);
		// 	console.log(trade);
		// 	return trade;
		// } catch (e) {
		// 	console.log(e);
		// 	throw new AuthenticationError(invalidToken);
		// }
	}
});
