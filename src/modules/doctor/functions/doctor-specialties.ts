import { Doctor } from "./../../../entity/Doctor";
import { ForbiddenError } from "apollo-server";
import { failedToFetch } from "../../../utils/messages";

export const doctorSpecialties = async ({ id }: Doctor) => {
	try {
		const specialties = await Doctor.findOne({
			where: { id },
			relations: ["doctorSpecialties"]
		});
		return specialties!.doctorSpecialties;
	} catch (err) {
		throw new ForbiddenError(failedToFetch);
	}
};
