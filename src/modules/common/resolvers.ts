import { ResolverMap } from "../../types/graphql-utils";

export const resolvers: ResolverMap = {
  Query: {
    serverTime: () => {
      console.log("Hello World");
    }
  }
};
