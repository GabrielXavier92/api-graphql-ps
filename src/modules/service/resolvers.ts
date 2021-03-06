import { createService } from "./functions/create-service";
import { ResolverMap } from "../../types/graphql-utils";
import { fetchServices } from "./functions/fetch-services";
import { fetchService } from "./functions/fetch-service";
import { updateService } from "./functions/update-service";
import { deleteService } from "./functions/delete-service";
import { Doctor } from "../../entity/Doctor";
import { doctorServices } from "../doctor/functions/doctor-services";
import { scheduleServices } from "../schedule/functions/schedule-services";

export const resolvers: ResolverMap = {
	Query: {
		fetchService: async (_, args: GQL.IFetchServiceOnQueryArguments) => {
			return await fetchService(args);
		},
		fetchServices: async (_, __, { currentUser }) => {
			return await fetchServices(currentUser);
		}
	},
	Mutation: {
		createService: async (_, args: GQL.ICreateServiceOnMutationArguments, { currentUser }) => {
			return createService(args, currentUser);
		},
		updateService: async (_, args: GQL.IUpdateServiceOnMutationArguments) => {
			return await updateService(args);
		},
		deleteService: async (_, args: GQL.IDeleteServiceOnMutationArguments) => {
			return await deleteService(args);
		}
	},
	Doctor: {
		services: async (parent: Doctor) => {
			return await doctorServices(parent);
		}
	},
	Schedule: {
		services: async (parent: any) => {
			return await scheduleServices(parent);
		}
	}
};
