import { ResolverMap } from "../../types/graphql-utils";

export const resolvers: ResolverMap = {
  Mutation: {
    publishArticle: (
      parent,
      { title, content },
      { currentUser, authToken }
    ) => {
      const article = { title, content };
      return article;
    },
    post: (parent, args) => {
      const link = {
        id: `id-doido`,
        description: args.description,
        url: args.url
      };

      return link;
    }
  }
};
