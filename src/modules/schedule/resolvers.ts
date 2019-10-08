import { fetchSchedules } from "./functions/fetch-schedules";
// import { fetchPatient } from "./../patient/functions/fetch-patient";
import { createSchedule } from "./functions/create-schedule";
import { ResolverMap } from "./../../types/graphql-utils.d";
// import { fetchDoctor } from "../doctor/functions/fetch-doctor";
// import { scheduleServices } from "./functions/schedule-services";
export const resolvers: ResolverMap = {
	Query: {
		fetchSchedule: async (_, args: GQL.IFetchScheduleOnQueryArguments) => {
			return args;
		},
		fetchSchedules: async (_, __, { currentUser }) => {
			return fetchSchedules(currentUser);
		}
	},
	Mutation: {
		createSchedule: async (_, args: GQL.ICreateScheduleOnMutationArguments, { currentUser }) => {
			return await createSchedule(args, currentUser);
		},
		updateSchedule: async () => {
			return true;
		},
		deleteSchedule: async () => {
			return true;
		}
	}
	// Schedule: {
	// 	// doctor: async (parent: any) => {
	// 	// 	console.log(parent);
	// 	// 	// return await fetchDoctor(parent.doctor);
	// 	// }
	// 	// patient: async (parent: GQL.ISchedule) => {
	// 	// 	const patient: GQL.IFetchPatientOnQueryArguments = parent.patient!;
	// 	// 	return await fetchPatient(patient);
	// 	// },
	// 	// services: async (parent: GQL.ISchedule) => {
	// 	// 	return await scheduleServices(parent);
	// 	// }
	// }
};