import { ForbiddenError } from "apollo-server";
import { failedToDelete } from "../../../utils/messages";

import { Doctor } from "./../../../entity/Doctor";

export const deleteDoctor = async ({ id }: GQL.IDeleteDoctorOnMutationArguments) => {
	try {
		const doctor = await Doctor.delete({ id });
		console.log(doctor);
		return true;
	} catch (err) {
		throw new ForbiddenError(failedToDelete);
	}
};
