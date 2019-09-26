import { ValidationError } from "yup";

export const formatYupError = (err: ValidationError) => {
	const errors: Array<{ path: string; message: string; statusCode: number }> = [];
	err.inner.forEach(e => {
		errors.push({
			path: e.path,
			message: e.message,
			statusCode: 400
		});
	});

	return errors;
};
