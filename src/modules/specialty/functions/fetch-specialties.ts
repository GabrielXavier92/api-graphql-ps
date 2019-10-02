import { failedToFetch } from "./../../../utils/messages";
import { ForbiddenError } from "apollo-server";
import { Specialty } from "./../../../entity/Specialty";
import { User as UserInterface } from "./../../auth/auth-helpers";

export const fetchSpecialties = async (currentUser: UserInterface) => {
	try {
		const specialties = await Specialty.find({
			where: {
				user: {
					id: currentUser.id
				}
			}
		});

		return specialties;
	} catch (e) {
		throw new ForbiddenError(failedToFetch);
	}
};
