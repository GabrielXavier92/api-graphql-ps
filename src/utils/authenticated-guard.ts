import { AuthenticationError } from "apollo-server";
import { invalidToken } from "./messages";

export const authenticated = (next: any) => (root: any, args: any, context: any, info: any) => {
	if (!context.currentUser) {
		throw new AuthenticationError(invalidToken);
	}

	return next(root, args, context, info);
};
