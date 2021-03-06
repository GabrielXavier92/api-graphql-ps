import { createDoctor } from "./functions/create-doctor";
import { ResolverMap } from "../../types/graphql-utils";
import { fetchDoctors } from "./functions/fetch-doctors";
import { fetchDoctor } from "./functions/fetch-doctor";
import { updateDoctor } from "./functions/update-doctor";
import { deleteDoctor } from "./functions/delete-doctor";

export const resolvers: ResolverMap = {
	Query: {
		fetchDoctor: async (_, args: GQL.IFetchDoctorOnQueryArguments) => {
			return await fetchDoctor(args);
		},
		fetchDoctors: async (_, __, { currentUser }) => {
			return await fetchDoctors(currentUser);
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
	Schedule: {
		doctor: async (parent: GQL.ISchedule) => {
			const doctor: GQL.IFetchDoctorOnQueryArguments = {
				id: (parent as any).doctorId!
			};
			return await fetchDoctor(doctor);
		}
	}
};
