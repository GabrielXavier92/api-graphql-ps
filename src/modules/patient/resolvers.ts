import { fetchPatient } from "./functions/fetch-patient";
import { ResolverMap } from "./../../types/graphql-utils.d";
import { createPatient } from "./functions/create-patient";
import { fetchPatients } from "./functions/fetch-patients";
import { updatePatient } from "./functions/update-patient";
import { deletePatient } from "./functions/delete-patient";

export const resolvers: ResolverMap = {
	Query: {
		fetchPatient: async (_, args: GQL.IFetchPatientOnQueryArguments) => {
			return await fetchPatient(args);
		},
		fetchPatients: async (_, __, { currentUser }) => {
			return await fetchPatients(currentUser);
		}
	},
	Mutation: {
		createPatient: async (_, args: GQL.ICreatePatientOnMutationArguments, { currentUser }) => {
			return await createPatient(args, currentUser);
		},
		updatePatient: async (_, args: GQL.IUpdatePatientOnMutationArguments) => {
			return await updatePatient(args);
		},
		deletePatient: async (_, args: GQL.IDeletePatientOnMutationArguments) => {
			return await deletePatient(args);
		}
	}
};
