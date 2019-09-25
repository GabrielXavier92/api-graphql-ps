export const validateRole = (role: string) => (next: any) => (
	root: any,
	args: any,
	context: any,
	info: any
) => {
	if (!context.currentUser.roles.includes(role)) {
		throw new Error(`Unauthorized!`);
	}

	return next(root, args, context, info);
};
