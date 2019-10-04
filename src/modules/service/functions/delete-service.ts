import { Service } from "../../../entity/Service";
export const deleteService = async ({ id }: GQL.IDeleteServiceOnMutationArguments) => {
	const service = await Service.delete({ id });
	console.log(service);
	return true;
};
