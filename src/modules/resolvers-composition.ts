// import { validateRole } from "../utils/validate-role";
import { authenticated } from "../utils/authenticated-guard";

export const resolversComposition = {
	// "Mutation.publishArticle": [authenticated, validateRole("TESTE")],

	// Doctor
	"Query.fetchDoctors": [authenticated],
	"Query.fetchDoctor": [authenticated],
	"Mutation.createDoctor": [authenticated],
	"Mutation.updateDoctor": [authenticated],
	"Mutation.deleteDoctor": [authenticated],

	// Specilty
	"Query.fetchSpecialties": [authenticated],
	"Query.fetchSpecialty": [authenticated],
	"Mutation.createSpecialty": [authenticated],
	"Mutation.updateSpecialty": [authenticated],
	"Mutation.deleteSpecialty": [authenticated]
};
