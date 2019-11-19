import "reflect-metadata"; // typeorm
import "dotenv/config";

import { ApolloServer } from "apollo-server";
import { resolversComposition } from "./modules/resolvers-composition";
import { GraphQLModule } from "@graphql-modules/core";

import { authModule } from "./modules/auth/auth-module";
import { articlesModule } from "./modules/articles/articles-module";
import { doctorModule } from "./modules/doctor/doctor-module";
import { specialtyModule } from "./modules/specialty/specialty-module";
import { serviceModule } from "./modules/service/service-module";
import { scheduleModule } from "./modules/schedule/schedule-module";
import { patientModule } from "./modules/patient/patient-module";

import { createConnection } from "./utils/create-connection";

import { Request } from "express";

import { initiAxios } from './utils/connection';

const startServer = async () => {

	initiAxios();

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
