import { ForbiddenError } from "apollo-server";
import { failedToDelete } from "../../../utils/messages";

import { Specialty } from "./../../../entity/Specialty";
export const deleteSpecialty = async ({ id }: GQL.IDeleteSpecialtyOnMutationArguments) => {
	try {
		const specialty = await Specialty.delete({ id });
		console.log(specialty);
		return true;
	} catch (err) {
		throw new ForbiddenError(failedToDelete)
	}
};
