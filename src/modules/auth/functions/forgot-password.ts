import { User } from "../../../entity/User";
import { ForbiddenError } from "apollo-server";

import { minLengthEmail, maxLengthEmail, invalidEmail } from "../../../utils/messages";
import { formatYupError } from "../../../utils/format-yup-error";

import * as yup from "yup";
import * as bcrypt from "bcryptjs";

const schema = yup.object().shape({
	email: yup
		.string()
		.min(5, minLengthEmail)
		.max(255, maxLengthEmail)
		.email(invalidEmail)
});

export const forgotPassword = async ({ email }: GQL.IForgotPasswordOnMutationArguments) => {
	try {
		await schema.validate({ email }, { abortEarly: false });
	} catch (err) {
		formatYupError(err);
	}

	const user = await User.findOne({
		where: { email }
	});

	// verifica se o usuario existe
	if (!user) throw new ForbiddenError(invalidEmail);

	const newPassword =
		Math.random()
			.toString(36)
			.substring(2, 15) +
		Math.random()
			.toString(36)
			.substring(2, 15);

	user.password = await bcrypt.hash(newPassword, 10);

	user.save();

	// Envia email para o usuario passando a nova senha
	// await sendEmail(newPassword);

	return true;
};
