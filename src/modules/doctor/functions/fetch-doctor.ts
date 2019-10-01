import { Doctor } from "./../../../entity/Doctor";
import { ForbiddenError } from "apollo-server";
import { failedToFetch } from "../../../utils/messages";

export const fetchDoctor = async ({ id }: GQL.IFetchDoctorOnQueryArguments) => {
	try {
		const doctor = await Doctor.findOne({
			where: {
				id
			}
		});
		return doctor;
	} catch (e) {
		throw new ForbiddenError(failedToFetch);
	}
};
