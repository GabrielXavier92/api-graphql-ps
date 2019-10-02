import { Specialty } from "./../../../entity/Specialty";
import { Doctor } from "./../../../entity/Doctor";
import { ForbiddenError } from "apollo-server";
import { failedToFetch } from "../../../utils/messages";

export const doctorSpecialties = async ({ id }: Doctor) => {
	try {
		const specialties = await Specialty.find({
			where: {
				doctor: {
					id
				}
			}
		});

		// console.log("aaaaaaa", specialties);
		// const specialties2 = await Doctor.findOne({
		// 	where: { id },
		// 	relations: ["doctorSpecialties"]
		// });
		// console.log(specialties2!.doctorSpecialties);

		return specialties;
	} catch (err) {
		throw new ForbiddenError(failedToFetch);
	}
};
