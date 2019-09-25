import "dotenv/config";

import { generateNamespace } from "@gql2ts/from-schema";
import { GraphQLSchema } from "graphql";
import { importSchema } from "graphql-import";
import { mergeSchemas, makeExecutableSchema } from "graphql-tools";

import { writeFile, readdirSync } from "fs";
import { join } from "path";

const genSchema = () => {
	// Rotina para percorrer por todas as pastas dentro de modules e mesclar os resolvers e schemas
	const schemas: GraphQLSchema[] = [];

	// Percorre pela pasta modules e pega apenas as pastas dos modulos
	const folders = readdirSync(join(__dirname, "../modules")).filter(f => !f.includes("."));

	folders.forEach(folder => {
		const { resolvers } = require(`../modules/${folder}/resolvers`);
		const typeDefs = importSchema(join(__dirname, `../modules/${folder}/schema.graphql`));

		schemas.push(makeExecutableSchema({ resolvers, typeDefs }));
	});

	return mergeSchemas({ schemas });
};

const types = generateNamespace("GQL", genSchema());

writeFile(join(__dirname, "../types/schemas.d.ts"), types, err => {
	console.error(err);
});
