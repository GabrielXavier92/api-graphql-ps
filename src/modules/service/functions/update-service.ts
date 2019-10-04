import { Service } from "./../../../entity/Service";
import { minLengthCode, minLengthName, failedToUpdate } from "../../../utils/messages";
import { formatYupError } from "../../../utils/format-yup-error";

import * as yup from "yup";
import { ForbiddenError } from "apollo-server";

const schema = yup.object().shape({
	code: yup.number().min(5, minLengthCode),
	name: yup.string().min(5, minLengthName)
});

export const updateService = async (args: GQL.IUpdateServiceOnMutationArguments) => {
	try {
		await schema.validate({ args }, { abortEarly: false });
	} catch (err) {
		formatYupError(err);
	}

	try {
		const { id, code, name, description, value } = args.service;
		const service = await Service.findOneOrFail({ where: { id } });

		service.name = name;
		service.code = code!;
		service.description = description!;
		service.value = value!;

		await service.save();

		return service;
	} catch (e) {
		throw new ForbiddenError(failedToUpdate);
	}
};
