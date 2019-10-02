import { Specialty } from "./../../../entity/Specialty";
import { minLengthCode, minLengthName, failedToUpdate } from "../../../utils/messages";
import { formatYupError } from "../../../utils/format-yup-error";

import * as yup from "yup";
import { ForbiddenError } from "apollo-server";

const schema = yup.object().shape({
	code: yup.number().min(5, minLengthCode),
	name: yup.string().min(5, minLengthName)
});

export const updateSpecialty = async (args: GQL.IUpdateSpecialtyOnMutationArguments) => {
	try {
		await schema.validate({ args }, { abortEarly: false });
	} catch (err) {
		formatYupError(err);
	}

	try {
		const { id, name, code, description, value } = args.specialty;
		const specialty = await Specialty.findOneOrFail({ where: { id } });

		specialty.code = code;
		specialty.name = name!;
		specialty.description = description!;
		specialty.value = value!;

		await specialty.save();

		return specialty;
	} catch (e) {
		throw new ForbiddenError(failedToUpdate);
	}
};
