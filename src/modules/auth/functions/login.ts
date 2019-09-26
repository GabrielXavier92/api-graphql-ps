import { User } from "../../../entity/User";
import {
	minLengthEmail,
	maxLengthEmail,
	invalidEmail,
	minLengthPassword,
	failedToLogin,
	confirmedUser,
	welcomeMessage
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
	password: yup
		.string()
		.min(5, minLengthPassword)
		.max(255)
});
export const login = async ({ email, password }: GQL.ILoginOnMutationArguments) => {
	try {
		await schema.validate({ email, password }, { abortEarly: false });
	} catch (err) {
		throw formatYupError(err);
	}

	const user = await User.findOne({
		where: { email }
	});

	// verifica se o usuario existe
	if (!user) {
		return [
			{
				path: "user",
				message: failedToLogin,
				statusCode: 404
			}
		];
	}

	// Verifica se o usuario confirmou o email
	if (!user.confirmed) {
		return [
			{
				path: "user",
				message: confirmedUser,
				statusCode: 403
			}
		];
	}

	if (!(await bcrypt.compare(password, user.password))) {
		return [
			{
				path: "user",
				message: failedToLogin,
				statusCode: 401
			}
		];
	}
	return [
		{
			path: "login",
			message: welcomeMessage,
			statusCode: 202,
			token: 12321321
		}
	];
};
