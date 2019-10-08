import { Schedule } from "./../../../entity/Schedule";
import { failedToFetch } from "./../../../utils/messages";
import { ForbiddenError } from "apollo-server";
import { User as UserInterface } from "./../../auth/auth-helpers";

export const fetchSchedules = async (currentUser: UserInterface) => {
	try {
		const schedules = await Schedule.find({
			where: {
				user: {
					id: currentUser.id
				}
			}
		});
		return schedules;
	} catch (err) {
		throw new ForbiddenError(failedToFetch);
	}
};
