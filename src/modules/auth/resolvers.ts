import { ResolverMap } from "../../types/graphql-utils";
import { register } from "./functions/register";
import { login } from "./functions/login";
import { forgotPassword } from "./functions/forgotPassword";
import { changePassword } from "./functions/changePassword";

export const resolvers: ResolverMap = {
	Query: {
		me: () => "hello"
	},
	Mutation: {
		register: async (_, args: GQL.IRegisterOnMutationArguments) => {
			return await register(args);
		},
		login: async (_, args: GQL.ILoginOnMutationArguments) => {
			return await login(args);
		},
		forgotPassword: async (_, args: GQL.IForgotPasswordOnMutationArguments) => {
			return await forgotPassword(args);
		},
		changePassword: async (_, args: GQL.IChangePasswordOnMutationArguments) => {
			return await changePassword(args);
		}
	}
};
