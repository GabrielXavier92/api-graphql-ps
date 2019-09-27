import "reflect-metadata"; // typeorm
import "dotenv/config";

import { ApolloServer } from "apollo-server";
import { resolversComposition } from "./src/modules/resolvers-composition";
import { GraphQLModule } from "@graphql-modules/core";

import { commonModule } from "./src/modules/common/common-module";
import { authModule } from "./src/modules/auth/auth-module";
import { articlesModule } from "./src/modules/articles/articles-module";
import { createConnection } from "./src/utils/create-connection";

import { Request } from "express";

const startServer = async () => {
	const app = new GraphQLModule({
		name: "app",
		imports: [commonModule, authModule, articlesModule],
		resolversComposition,
		context(req: Request) {
			return req;
		}
	});

	const { schema, context } = app;

	const server = new ApolloServer({
		schema,
		context,
		formatError: ({ message, path, extensions }) => ({
			message,
			path,
			errors: extensions!.exception!.errors,
			code: extensions!.code
		})
	});

	await createConnection();

	server.listen().then(({ url }) => {
		console.log(`🚀  Server ready at ${url}`);
	});
};

startServer();
