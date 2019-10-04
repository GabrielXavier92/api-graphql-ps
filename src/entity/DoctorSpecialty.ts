import { Specialty } from "./Specialty";
import { Doctor } from "./Doctor";
import { Entity, Column, ManyToOne, PrimaryColumn, BeforeInsert, BaseEntity } from "typeorm";

import * as uuidv4 from "uuid/v4";

@Entity("doctor_specialty")
export class DoctorSpecialty extends BaseEntity {
	@PrimaryColumn("uuid")
	id: string;

	@Column("uuid")
	doctorId: string;

	@Column("uuid")
	specialtyId: string;

	@ManyToOne(_ => Doctor, doctor => doctor.doctorSpecialties, { onDelete: "CASCADE" })
	doctor: Doctor;

	@ManyToOne(_ => Specialty, specialty => specialty.specialtiesDoctor, { onDelete: "CASCADE" })
	specialty: Specialty;

	@BeforeInsert()
	addId() {
		this.id = uuidv4();
	}
}
