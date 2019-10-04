import { failedToFetch } from "../../../utils/messages";
import { ForbiddenError } from "apollo-server";
import { Service } from "../../../entity/Service";

export const fetchService = async ({ id }: GQL.IFetchServiceOnQueryArguments) => {
	try {
		const service = await Service.findOne({
			where: {
				id
			}
		});
		return service;
	} catch (e) {
		throw new ForbiddenError(failedToFetch);
	}
};
