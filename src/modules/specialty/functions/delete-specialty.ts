import { Specialty } from "./../../../entity/Specialty";
export const deleteSpecialty = async ({ id }: GQL.IDeleteSpecialtyOnMutationArguments) => {
	const specialty = await Specialty.delete({ id });
	console.log(specialty);
	return true;
};
