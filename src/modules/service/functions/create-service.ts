import { failedToCreateService } from './../../../utils/messages';
import { User as UserInterface } from "../../auth/auth-helpers";
import { minLengthName, minLengthCode } from "../../../utils/messages";
import { formatYupError } from "../../../utils/format-yup-error";
import { Service } from "../../../entity/Service";
import { ForbiddenError } from "apollo-server";

import * as yup from "yup";

const schema = yup.object().shape({
	code: yup.number().min(5, minLengthCode),
	name: yup.string().min(5, minLengthName)
});

export const createService = async (
	args: GQL.ICreateServiceOnMutationArguments,
	currentUser: UserInterface
) => {
	try {
		await schema.validate({ args }, { abortEarly: false });
	} catch (err) {
		formatYupError(err);
	}

	try {
		const { code, name, description, value } = args.service;

		const service = Service.create({
			name: name,
			code: code!,
			value: value!,
			description: description!,
			user: {
				id: currentUser.id
			}
		});

		await service.save();

		return service;

	} catch (err) {
		throw new ForbiddenError(failedToCreateService)
	}
};
