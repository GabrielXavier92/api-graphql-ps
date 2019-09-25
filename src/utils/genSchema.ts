import { GraphQLSchema } from 'graphql';
import { importSchema } from 'graphql-import'
import { mergeSchemas, makeExecutableSchema } from "graphql-tools";

import * as path from "path";
import * as fs from "fs";

export const genSchema = () => {
  // Rotina para percorrer por todas as pastas dentro de modules e mesclar os resolvers e schemas
  const schemas: GraphQLSchema[] = [];
  const folders = fs.readdirSync(path.join(__dirname, "../modules"));
  folders.forEach((folder) => {
    const { resolvers } = require(`../modules/${folder}/resolvers`);
    const typeDefs = importSchema(path.join(__dirname, `../modules/${folder}/schema.graphql`));

    schemas.push(makeExecutableSchema({ resolvers, typeDefs }))
  });

  return (mergeSchemas({ schemas }));
}