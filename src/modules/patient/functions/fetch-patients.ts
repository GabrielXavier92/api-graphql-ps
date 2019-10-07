import { failedToFetch } from "./../../../utils/messages";
import { ForbiddenError } from "apollo-server";
import { Patient } from "./../../../entity/Patient";
import { User as UserInterface } from "./../../auth/auth-helpers";

export const fetchPatients = async (currentUser: UserInterface) => {
	try {
		const patients = await Patient.find({
			where: {
				user: {
					id: currentUser.id
				}
			}
		});
		return patients;
	} catch (err) {
		throw new ForbiddenError(failedToFetch);
	}
};
