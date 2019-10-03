import { DoctorSpecialty } from "./../../../entity/DoctorSpecialty";
import { Doctor } from "./../../../entity/Doctor";
import { ForbiddenError } from "apollo-server";
import { failedToFetch } from "../../../utils/messages";

export const doctorSpecialties = async ({ id }: Doctor) => {
	try {
		const specialties = await DoctorSpecialty.find({
			where: {
				doctorId: id
			},
			relations: ["specialty"]
		});

		return specialties.map(spec => {
			return spec.specialty;
		});
	} catch (err) {
		throw new ForbiddenError(failedToFetch);
	}
};
