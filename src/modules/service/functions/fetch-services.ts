import { failedToFetch } from "../../../utils/messages";
import { ForbiddenError } from "apollo-server";
import { User as UserInterface } from "../../auth/auth-helpers";
import { Service } from "../../../entity/Service";

export const fetchServices = async (currentUser: UserInterface) => {
	try {
		const services = await Service.find({
			where: {
				user: {
					id: currentUser.id
				}
			}
		});

		return services;
	} catch (e) {
		throw new ForbiddenError(failedToFetch);
	}
};
