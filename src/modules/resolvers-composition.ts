// import { validateRole } from "../utils/validate-role";
import { authenticated } from "../utils/authenticated-guard";

export const resolversComposition = {
	// "Mutation.publishArticle": [authenticated, validateRole("TESTE")],
	"Doctor.*": [authenticated],
	"Patient.*": [authenticated],
	"Schedule.*": [authenticated],
	"Service.*": [authenticated],
	"Specialty.*": [authenticated],

	// Doctor
	"Query.fetchDoctors": [authenticated],
	"Query.fetchDoctor": [authenticated],
	"Mutation.createDoctor": [authenticated],
	"Mutation.updateDoctor": [authenticated],
	"Mutation.deleteDoctor": [authenticated],
	"Doctor.specialties": [authenticated],
	"Doctor.services": [authenticated],

	// Patient
	"Query.fetchPatients": [authenticated],
	"Query.fetchPatient": [authenticated],
	"Mutation.createPatient": [authenticated],
	"Mutation.updatePatient": [authenticated],
	"Mutation.deletePatient": [authenticated],

	// Schedule
	"Query.fetchSchedule": [authenticated],
	"Query.fetchSchedules": [authenticated],
	"Mutation.createSchedule": [authenticated],
	"Mutation.updateSchedule": [authenticated],
	"Mutation.deleteSchedule": [authenticated],

	// Service
	"Query.fetchService": [authenticated],
	"Query.fetchServices": [authenticated],
	"Mutation.createService": [authenticated],
	"Mutation.updateService": [authenticated],
	"Mutation.deleteService": [authenticated],

	// Specialty
	"Query.fetchSpecialties": [authenticated],
	"Query.fetchSpecialty": [authenticated],
	"Mutation.createSpecialty": [authenticated],
	"Mutation.updateSpecialty": [authenticated],
	"Mutation.deleteSpecialty": [authenticated]
};
