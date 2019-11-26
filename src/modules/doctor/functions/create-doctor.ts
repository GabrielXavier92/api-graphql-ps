import { DoctorService } from "./../../../entity/DoctorService";
import { Service } from "./../../../entity/Service";
import { DoctorSpecialty } from "./../../../entity/DoctorSpecialty";
import { Specialty } from "./../../../entity/Specialty";
import { User as UserInterface } from "./../../auth/auth-helpers";
import { Doctor, Gender } from "./../../../entity/Doctor";
import { minLengthName, failedToCreateDoctor } from "../../../utils/messages";
import { formatYupError } from "../../../utils/format-yup-error";
import * as yup from "yup";
import { ForbiddenError } from "apollo-server";

const schema = yup.object().shape({
	name: yup.string().min(5, minLengthName)
});

export const createDoctor = async (
	args: GQL.ICreateDoctorOnMutationArguments,
	currentUser: UserInterface
) => {
	try {
		await schema.validate({ args }, { abortEarly: false });
	} catch (err) {
		formatYupError(err);
	}

	try {
		const { name, gender, birth, cro, specialties, services } = args.doctor;
		const doctor = Doctor.create({
			name,
			gender: (gender! as any) as Gender,
			birth: birth!,
			cro: cro!,
			user: { id: currentUser.id }
		});

		await doctor.save();

		if (specialties) {
			const specs = await Specialty.findByIds(specialties!);
			specs.forEach(async spec => {
				const docSpec = DoctorSpecialty.create({
					doctorId: doctor.id,
					specialtyId: spec.id
				});
				await docSpec.save();
			});
		}

		if (services) {
			const servs = await Service.findByIds(services!);
			servs.forEach(async serv => {
				const docServ = DoctorService.create({
					doctorId: doctor.id,
					serviceId: serv.id
				});

				await docServ.save();
			});
		}

		return doctor;
	} catch (err) {
		throw new ForbiddenError(failedToCreateDoctor);
	}
};
