import { User } from "./../../entity/User";
import {
	duplicatedEmail,
	minLengthName,
	minLengthEmail,
	maxLengthEmail,
	invalidEmail,
	minLengthPassword
} from "../../utils/messages";
import { ResolverMap } from "../../types/graphql-utils";

import * as bcrypt from "bcryptjs";
import * as yup from "yup";
import { formatYupError } from "../../utils/formatYupError";
// import { sendEmail } from "../../utils/sendEmail";

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

export const resolvers: ResolverMap = {
	Query: {
		me: () => "hello"
	},
	Mutation: {
		register: async (_, { name, email, password }: GQL.IRegisterOnMutationArguments) => {
			try {
				await schema.validate({ email, name, password }, { abortEarly: false });
			} catch (err) {
				return formatYupError(err);
			}

			console.log(name, email, password);

			const userExists = await User.findOne({
				where: { email },
				select: ["id"]
			});

			if (userExists) {
				return [
					{
						path: "email",
						message: duplicatedEmail
					}
				];
			}

			const hashPassword = await bcrypt.hash(password, 10);

			const user = User.create({
				email,
				name,
				password: hashPassword
			});

			await user.save();

			// Gerar uma URL para confirmacao de email
			// await sendEmail(email, "url");

			return [
				{
					path: "user",
					message: `Created user ${name}`
				}
			];
		}
	}
};
