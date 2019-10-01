import { Doctor } from "./../../../entity/Doctor";
export const deleteDoctor = async ({ id }: GQL.IDeleteDoctorOnMutationArguments) => {
	const doctor = await Doctor.delete({ id });
	console.log(doctor);
	return true;
};
