import { User as UserInterface } from "./../../auth/auth-helpers";
import { minLengthName, minLengthCode, failedToCreateSpecialty } from "../../../utils/messages";
import { formatYupError } from "../../../utils/format-yup-error";
import { Specialty } from "./../../../entity/Specialty";
import { User } from "../../../entity/User";
import { AuthenticationError } from "apollo-server";

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

	const user = await User.findOne({
		where: { id: currentUser.id }
	});

	if (!user) throw new AuthenticationError(failedToCreateSpecialty);

	const { code, name, description, value } = args.specialty;

	const specialty = Specialty.create({
		code,
		name: name!,
		description: description!,
		value: value!,
		user
	});

	await specialty.save();

	return specialty;
};
