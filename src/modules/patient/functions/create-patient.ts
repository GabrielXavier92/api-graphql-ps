import { Patient } from "./../../../entity/Patient";
import { AuthenticationError } from "apollo-server";
import { User as UserInterface } from "./../../auth/auth-helpers";

import * as yup from "yup";
import { minLengthName, failedToCreatePatient } from "../../../utils/messages";
import { formatYupError } from "../../../utils/format-yup-error";
import { Gender } from "../../../entity/Doctor";

const schema = yup.object().shape({
	name: yup.string().min(5, minLengthName)
});

export const createPatient = async (
	args: GQL.ICreatePatientOnMutationArguments,
	currentUser: UserInterface
) => {
	try {
		await schema.validate({ args }, { abortEarly: false });
	} catch (err) {
		formatYupError(err);
	}

	try {
		const { name, gender, birth } = args.patient;

		const patient = Patient.create({
			name,
			gender: (gender! as any) as Gender,
			birth: birth!,
			user: {
				id: currentUser.id
			}
		});

		await patient.save();

		return patient;
	} catch (err) {
		throw new AuthenticationError(failedToCreatePatient);
	}
};
