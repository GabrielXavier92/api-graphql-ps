import { failedToCreateSpecialty } from './../../../utils/messages';
import { User as UserInterface } from "./../../auth/auth-helpers";
import { minLengthName, minLengthCode } from "../../../utils/messages";
import { formatYupError } from "../../../utils/format-yup-error";
import { Specialty } from "./../../../entity/Specialty";
import { ForbiddenError } from "apollo-server";

import * as yup from "yup";

const schema = yup.object().shape({
	code: yup.number().min(5, minLengthCode),
	name: yup.string().min(5, minLengthName)
});

export const createSpecialty = async (
	args: GQL.ICreateSpecialtyOnMutationArguments,
	currentUser: UserInterface
) => {
	try {
		await schema.validate({ args }, { abortEarly: false });
	} catch (err) {
		formatYupError(err);
	}

	try {
		const { code, name, description } = args.specialty;

		const specialty = Specialty.create({
			code,
			name: name!,
			description: description!,
			user: {
				id: currentUser.id
			}
		});

		await specialty.save();

		return specialty;

	} catch (err) {
		throw new ForbiddenError(failedToCreateSpecialty)
	}
};
