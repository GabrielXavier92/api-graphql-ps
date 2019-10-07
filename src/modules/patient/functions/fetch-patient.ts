import { failedToFetch } from "./../../../utils/messages";
import { ForbiddenError } from "apollo-server";
import { Patient } from "./../../../entity/Patient";
export const fetchPatient = async ({ id }: GQL.IFetchPatientOnQueryArguments) => {
	try {
		const patient = await Patient.findOne({
			where: {
				id
			}
		});
		return patient;
	} catch (err) {
		throw new ForbiddenError(failedToFetch);
	}
};
