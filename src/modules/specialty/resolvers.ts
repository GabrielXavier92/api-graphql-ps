import { createSpecialty } from "./functions/create-specialty";
import { ResolverMap } from "./../../types/graphql-utils.d";

export const resolvers: ResolverMap = {
	Mutation: {
		createSpecialty: async (_, args: GQL.ICreateSpecialtyOnMutationArguments, { currentUser }) => {
			return createSpecialty(args, currentUser);
		}
	}
};
