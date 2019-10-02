import { Specialty } from "./../../../entity/Specialty";
import { failedToFetch } from "./../../../utils/messages";
import { ForbiddenError } from "apollo-server";

export const fetchSpecialty = async ({ id }: GQL.IFetchSpecialtyOnQueryArguments) => {
	try {
		const specialty = await Specialty.findOne({
			where: {
				id
			}
		});
		return specialty;
	} catch (e) {
		throw new ForbiddenError(failedToFetch);
	}
};
