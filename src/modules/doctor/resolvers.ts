import { Doctor } from "./../../entity/Doctor";
import { createDoctor } from "./functions/create-doctor";
import { ResolverMap } from "../../types/graphql-utils";
import { fetchDoctors } from "./functions/fetch-doctors";
import { fetchDoctor } from "./functions/fetch-doctor";
import { doctorSpecialties } from "./functions/doctor-specialties";
import { updateDoctor } from "./functions/update-doctor";
import { deleteDoctor } from "./functions/delete-doctor";

export const resolvers: ResolverMap = {
	Query: {
		fetchDoctors: async (_, __, { currentUser }) => {
			return await fetchDoctors(currentUser);
		},
		fetchDoctor: async (_, args: GQL.IFetchDoctorOnQueryArguments) => {
			return await fetchDoctor(args);
		}
	},
	Mutation: {
		createDoctor: async (_, args: GQL.ICreateDoctorOnMutationArguments, { currentUser }) => {
			return await createDoctor(args, currentUser);
		},
		updateDoctor: async (_, args: GQL.IUpdateDoctorOnMutationArguments) => {
			return await updateDoctor(args);
		},
		deleteDoctor: async (_, args: GQL.IDeleteDoctorOnMutationArguments) => {
			return await deleteDoctor(args);
		}
	},
	Doctor: {
		doctorSpecialties: async (parent: Doctor) => {
			return await doctorSpecialties(parent);
		}
	}
};
