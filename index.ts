import { ApolloServer } from "apollo-server";
import { resolversComposition } from "./src/modules/resolvers-composition";
import { GraphQLModule } from "@graphql-modules/core";

import { commonModule } from "./src/modules/common/common-module";
import { authModule } from "./src/modules/auth/auth-module";
import { articlesModule } from "./src/modules/articles/articles-module";

const app = new GraphQLModule({
  name: "app",
  imports: [commonModule, authModule, articlesModule],
  resolversComposition
});

const { schema, context } = app;

const server = new ApolloServer({
  schema,
  context
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
