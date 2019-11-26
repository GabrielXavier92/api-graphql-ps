import { ForbiddenError } from "apollo-server";
import { failedToDelete } from "../../../utils/messages";

import { Patient } from "./../../../entity/Patient";

export const deletePatient = async ({ id }: GQL.IDeletePatientOnMutationArguments) => {
	try {
		const patient = await Patient.delete({ id });
		console.log(patient);
		return true;
	} catch (err) {
		throw new ForbiddenError(failedToDelete)
	}
};
