import { User } from "../../../entity/User";
import { AuthenticationError } from "apollo-server";
import {
	minLengthEmail,
	maxLengthEmail,
	invalidEmail,
	minLengthPassword,
	failedToLogin,
	confirmedUser
} from "../../../utils/messages";
import { formatYupError } from "../../../utils/format-yup-error";

import * as bcrypt from "bcryptjs";
import * as yup from "yup";
import * as jwt from "jsonwebtoken";

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
		formatYupError(err);
	}
	const user = await User.findOne({
		where: { email }
	});

	// verifica se o usuario existe
	if (!user) throw new AuthenticationError(failedToLogin);

	// Verifica se o usuario confirmou o email
	// if (!user.confirmed) throw new AuthenticationError(confirmedUser);

	// Compara as senhas
	if (!(await bcrypt.compare(password, user.password))) throw new AuthenticationError(failedToLogin);

	const token = jwt.sign({ id: user.id, name: user.name }, process.env.JWT_SECRET as string, {
		expiresIn: "7days"
	});

	return { token };
};
