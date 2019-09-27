import { User } from "../../../entity/User";
import { ForbiddenError } from "apollo-server";
import {
	duplicatedEmail,
	minLengthName,
	minLengthEmail,
	maxLengthEmail,
	invalidEmail,
	minLengthPassword
} from "../../../utils/messages";
import { formatYupError } from "../../../utils/format-yup-error";

import * as bcrypt from "bcryptjs";
import * as yup from "yup";

const schema = yup.object().shape({
	email: yup
		.string()
		.min(5, minLengthEmail)
		.max(255, maxLengthEmail)
		.email(invalidEmail),
	name: yup
		.string()
		.min(5, minLengthName)
		.max(255),
	password: yup
		.string()
		.min(5, minLengthPassword)
		.max(255)
});

export const register = async ({ email, name, password }: GQL.IRegisterOnMutationArguments) => {
	try {
		await schema.validate({ email, name, password }, { abortEarly: false });
	} catch (err) {
		formatYupError(err);
	}

	const userExists = await User.findOne({
		where: { email },
		select: ["id"]
	});

	if (userExists) throw new ForbiddenError(duplicatedEmail);

	const hashPassword = await bcrypt.hash(password, 10);

	const user = User.create({
		email,
		name,
		password: hashPassword
	});

	await user.save();

	// Gerar uma URL para confirmacao de email
	// await sendEmail(email, "url");

	return user;
};
