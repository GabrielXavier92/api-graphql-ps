import { Specialty } from "./../../../entity/Specialty";
import { User as UserInterface } from "./../../auth/auth-helpers";
import { Doctor } from "./../../../entity/Doctor";
import { minLengthName, failedToCreateDoctor } from "../../../utils/messages";
import { formatYupError } from "../../../utils/format-yup-error";
import * as yup from "yup";
import { AuthenticationError } from "apollo-server";

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
		const { name, gender, birth, cro, specialties } = args.doctor;
		const doctor = Doctor.create({
			name,
			gender: gender!,
			birth: birth!,
			cro: cro!,
			user: { id: currentUser.id }
		});

		if (specialties) {
			const specs = await Specialty.findByIds(specialties!);
			doctor.doctorSpecialties = specs;
		}

		await doctor.save();

		return doctor;
	} catch (err) {
		throw new AuthenticationError(failedToCreateDoctor);
	}
};
