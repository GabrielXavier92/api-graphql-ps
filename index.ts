import "reflect-metadata"; // typeorm
import "dotenv/config";

import { ApolloServer } from "apollo-server";
import { resolversComposition } from "./src/modules/resolvers-composition";
import { GraphQLModule } from "@graphql-modules/core";

import { authModule } from "./src/modules/auth/auth-module";
import { articlesModule } from "./src/modules/articles/articles-module";
import { doctorModule } from "./src/modules/doctor/doctor-module";
import { specialtyModule } from "./src/modules/specialty/specialty-module";
import { serviceModule } from "./src/modules/service/service-module";
import { scheduleModule } from "./src/modules/schedule/schedule-module";
import { patientModule } from "./src/modules/patient/patient-module";

import { createConnection } from "./src/utils/create-connection";

import { Request } from "express";

const startServer = async () => {
	const app = new GraphQLModule({
		name: "app",
		imports: [
			articlesModule,
			authModule,
			doctorModule,
			patientModule,
			scheduleModule,
			serviceModule,
			specialtyModule
		],
		resolversComposition,
		context(req: Request) {
			return req;
		}
	});

	const { schema, context } = app;

	const server = new ApolloServer({
		schema,
		context,
		introspection: true,
		playground: true,
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
