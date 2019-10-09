import { createSpecialty } from "./functions/create-specialty";
import { ResolverMap } from "./../../types/graphql-utils.d";
import { fetchSpecialty } from "./functions/fetch-specialty";
import { fetchSpecialties } from "./functions/fetch-specialties";
import { updateSpecialty } from "./functions/update-specialty";
import { deleteSpecialty } from "./functions/delete-specialty";
import { doctorSpecialties } from "../doctor/functions/doctor-specialties";
import { Doctor } from "../../entity/Doctor";

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
		deleteSpecialty: async (_, args: GQL.IDeleteSpecialtyOnMutationArguments) => {
			return await deleteSpecialty(args);
		}
	},
	Doctor: {
		specialties: async (parent: Doctor) => {
			return await doctorSpecialties(parent);
		}
	}
};
