import { ScheduleService } from "./../../../entity/ScheduleService";
import { Service } from "./../../../entity/Service";
import { Schedule, ScheduleStatus } from "./../../../entity/Schedule";
import { AuthenticationError } from "apollo-server";
import { User as UserInterface } from "./../../auth/auth-helpers";
import { failedToCreateSchedule } from "../../../utils/messages";

export const createSchedule = async (
	args: GQL.ICreateScheduleOnMutationArguments,
	currentUser: UserInterface
) => {
	try {
		const { doctorId, patientId, name, status, day, value, color, services } = args.schedule;
		const schedule = Schedule.create({
			user: {
				id: currentUser.id
			},
			patient: {
				id: patientId
			},
			doctor: {
				id: doctorId
			},
			name: name!,
			status: (status! as any) as ScheduleStatus,
			day: await new Date(Number(day)).toString(),
			value: value!,
			color: color!
		});

		await schedule.save();

		if (services) {
			const servs = await Service.findByIds(services);
			servs.forEach(async serv => {
				const scheServ = ScheduleService.create({
					scheduleId: schedule.id,
					serviceId: serv.id
				});
				await scheServ.save();
			});
		}

		return schedule;
	} catch (err) {
		console.log(err);
		throw new AuthenticationError(failedToCreateSchedule);
	}
};
