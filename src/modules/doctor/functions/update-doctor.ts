import { Doctor, Gender } from "./../../../entity/Doctor";
import { formatYupError } from "../../../utils/format-yup-error";
import { ForbiddenError } from "apollo-server";
import { failedToUpdate, minLengthName } from "../../../utils/messages";

import * as yup from "yup";
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
		const { id, name, gender, birth, cro, specialties } = args.doctor;
		const doctor = await Doctor.findOneOrFail({ where: { id } });

		doctor.name = name;
		doctor.gender = (gender! as any) as Gender;
		doctor.birth = birth!;
		doctor.cro = cro!;

		if (specialties) {
			// const specs = await Specialty.findByIds(specialties!);
			// doctor.doctorSpecialties = specs;
		} else {
			doctor.doctorSpecialties = [];
		}

		await doctor.save();

		return doctor;
	} catch (e) {
		throw new ForbiddenError(failedToUpdate);
	}
};
