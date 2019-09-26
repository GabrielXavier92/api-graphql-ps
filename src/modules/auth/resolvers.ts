import { ResolverMap } from "../../types/graphql-utils";
import { register } from "./functions/register";
import { login } from "./functions/login";

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
		}
	}
};
