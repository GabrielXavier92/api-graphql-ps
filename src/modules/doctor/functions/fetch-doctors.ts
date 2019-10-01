import { Doctor } from "./../../../entity/Doctor";
import { User as UserInterface } from "./../../auth/auth-helpers";
import { ForbiddenError } from "apollo-server";
import { failedToFetch } from "../../../utils/messages";

export const fetchDoctors = async (currentUser: UserInterface) => {
	try {
		const doctors = await Doctor.find({
			where: {
				user: {
					id: currentUser.id
				}
			}
		});
		return doctors;
	} catch (e) {
		throw new ForbiddenError(failedToFetch);
	}
};
