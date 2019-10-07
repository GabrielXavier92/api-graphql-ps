import { failedToUpdate } from "./../../../utils/messages";
import { ForbiddenError } from "apollo-server";
import { Patient } from "./../../../entity/Patient";
import { minLengthName } from "../../../utils/messages";

import * as yup from "yup";
import { formatYupError } from "../../../utils/format-yup-error";
import { Gender } from "../../../entity/Doctor";

const schema = yup.object().shape({
	name: yup.string().min(5, minLengthName)
});

export const updatePatient = async (args: GQL.IUpdatePatientOnMutationArguments) => {
	try {
		await schema.validate({ args }, { abortEarly: false });
	} catch (err) {
		formatYupError(err);
	}

	try {
		const { id, name, birth, gender } = args.patient;

		const patient = await Patient.findOneOrFail({ where: { id } });

		patient.name = name!;
		patient.birth = birth!;
		patient.gender = (gender! as any) as Gender;

		patient.save();
		return patient;
	} catch (err) {
		throw new ForbiddenError(failedToUpdate);
	}
};
