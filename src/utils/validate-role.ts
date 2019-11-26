import { ForbiddenError } from 'apollo-server';
export const validateRole = (role: string) => (next: any) => (
	root: any,
	args: any,
	context: any,
	info: any
) => {
	if (!context.currentUser.roles.includes(role)) {
		throw new ForbiddenError(`Unauthorized!`);
	}

	return next(root, args, context, info);
};
