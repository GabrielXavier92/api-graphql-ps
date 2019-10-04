import { DoctorService } from "./../../../entity/DoctorService";
import { DoctorSpecialty } from "./../../../entity/DoctorSpecialty";
import { Doctor, Gender } from "./../../../entity/Doctor";
import { formatYupError } from "../../../utils/format-yup-error";
import { ForbiddenError } from "apollo-server";
import { failedToUpdate, minLengthName } from "../../../utils/messages";

import * as yup from "yup";
import { Specialty } from "../../../entity/Specialty";
import { Service } from "../../../entity/Service";
// import { Specialty } from "../../../entity/Specialty";

const schema = yup.object().shape({
	name: yup.string().min(5, minLengthName)
});

export const updateDoctor = async (args: GQL.IUpdateDoctorOnMutationArguments) => {
	try {
		await schema.validate({ args }, { abortEarly: false });
	} catch (err) {
		formatYupError(err);
	}

	try {
		const { id, name, gender, birth, cro, specialties, services } = args.doctor;
		const doctor = await Doctor.findOneOrFail({ where: { id } });

		doctor.name = name;
		doctor.gender = (gender! as any) as Gender;
		doctor.birth = birth!;
		doctor.cro = cro!;

		if (specialties) {
			const specs = await DoctorSpecialty.find({
				where: {
					doctorId: id
				},
				select: ["id"]
			});

			const compareSpecs = specs.map(spec => spec.id);
			if (compareSpecs !== specialties) {
				await DoctorSpecialty.delete(compareSpecs);

				const newSpecs = await Specialty.findByIds(specialties!);
				if (newSpecs.length > 0) {
					newSpecs.forEach(async spec => {
						const docSpec = DoctorSpecialty.create({
							doctorId: doctor.id,
							specialtyId: spec.id
						});
						await docSpec.save();
					});
				}
			}
		} else {
			doctor.doctorSpecialties = [];
		}

		if (services) {
			const servs = await DoctorService.find({
				where: {
					doctorId: id
				},
				select: ["id"]
			});

			const compareServs = servs.map(serv => serv.id);
			if (compareServs !== services) {
				await DoctorService.delete(compareServs);

				const newServs = await Service.findByIds(services!);
				if (newServs.length > 0) {
					newServs.forEach(async serv => {
						const docServ = DoctorService.create({
							doctorId: doctor.id,
							serviceId: serv.id
						});
						await docServ.save();
					});
				}
			}
		} else {
			doctor.doctorServices = [];
		}

		await doctor.save();

		return doctor;
	} catch (e) {
		throw new ForbiddenError(failedToUpdate);
	}
};
