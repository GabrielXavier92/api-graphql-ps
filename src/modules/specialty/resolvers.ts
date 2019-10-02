import { createSpecialty } from "./functions/create-specialty";
import { ResolverMap } from "./../../types/graphql-utils.d";
import { fetchSpecialty } from "./functions/fetch-specialty";
import { fetchSpecialties } from "./functions/fetch-specialties";
import { updateSpecialty } from "./functions/update-specialty";

export const resolvers: ResolverMap = {
	Query: {
		fetchSpecialty: async (_, args: GQL.IFetchSpecialtyOnQueryArguments) => {
			return await fetchSpecialty(args);
		},
		fetchSpecialties: async (_, __, { currentUser }) => {
			return await fetchSpecialties(currentUser);
		}
	},
	Mutation: {
		createSpecialty: async (_, args: GQL.ICreateSpecialtyOnMutationArguments, { currentUser }) => {
			return createSpecialty(args, currentUser);
		},
		updateSpecialty: async (_, args: GQL.IUpdateSpecialtyOnMutationArguments) => {
			return await updateSpecialty(args);
		},
		deleteSpecialty: async () => {}
	}
};
