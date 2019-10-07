import { failedToFetch } from "./../../../utils/messages";
import { ForbiddenError } from "apollo-server";
import { DoctorService } from "./../../../entity/DoctorService";
import { Doctor } from "./../../../entity/Doctor";

export const doctorServices = async ({ id }: Doctor) => {
	try {
		const services = await DoctorService.find({
			where: {
				doctorId: id
			},
			relations: ["service"]
		});
		return services.map(serv => serv.service);
	} catch (e) {
		throw new ForbiddenError(failedToFetch);
	}
};
