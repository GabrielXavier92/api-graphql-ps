import { ForbiddenError } from "apollo-server";
import { failedToDelete } from "../../../utils/messages";

import { Service } from "../../../entity/Service";
export const deleteService = async ({ id }: GQL.IDeleteServiceOnMutationArguments) => {
	try {
		const service = await Service.delete({ id });
		console.log(service);
		return true;
	} catch (err) {
		throw new ForbiddenError(failedToDelete)
	}

};
