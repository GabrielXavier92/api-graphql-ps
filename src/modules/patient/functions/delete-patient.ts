import { Patient } from "./../../../entity/Patient";

export const deletePatient = async ({ id }: GQL.IDeletePatientOnMutationArguments) => {
	const patient = await Patient.delete({ id });
	console.log(patient);
	return true;
};
