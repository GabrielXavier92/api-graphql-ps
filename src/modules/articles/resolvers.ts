import { ResolverMap } from "../../types/graphql-utils";

export const resolvers: ResolverMap = {
	Mutation: {
		publishArticle: (_, { title, content }, __) => {
			const article = { title, content };
			return article;
		},
		post: (_, args) => {
			const link = {
				id: `id-doido`,
				description: args.description,
				url: args.url
			};

			return link;
		}
	}
};
