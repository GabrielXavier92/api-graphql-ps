import { ValidationError } from "yup";
import { UserInputError } from "apollo-server";

export const formatYupError = (err: ValidationError) => {
	const errors: Array<{ path: string; message: string }> = [];

	err.inner.forEach(e => {
		errors.push({
			path: e.path,
			message: e.message
		});
	});

	throw new UserInputError("Validations error", { errors });
};
