import { fetchSchedules } from "./functions/fetch-schedules";
import { createSchedule } from "./functions/create-schedule";
import { ResolverMap } from "./../../types/graphql-utils.d";
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
};
