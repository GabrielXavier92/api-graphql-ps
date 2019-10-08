import { failedToFetch } from "./../../../utils/messages";
import { ForbiddenError } from "apollo-server";
import { ScheduleService } from "./../../../entity/ScheduleService";

export const scheduleServices = async ({ id }: GQL.IFetchScheduleOnQueryArguments) => {
	try {
		const services = await ScheduleService.find({
			where: {
				scheduleId: id
			},
			relations: ["service"]
		});
		return services.map(serv => serv.service);
	} catch (err) {
		throw new ForbiddenError(failedToFetch);
	}
};
