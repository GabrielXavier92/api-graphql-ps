import { Doctor } from "./Doctor";
import { Service } from "./Service";
import { Entity, Column, ManyToOne, PrimaryColumn, BeforeInsert, BaseEntity } from "typeorm";

import * as uuidv4 from "uuid/v4";

@Entity("doctor_service")
export class DoctorService extends BaseEntity {
	@PrimaryColumn("uuid")
	id: string;

	@Column("uuid")
	doctorId: string;

	@Column("uuid")
	serviceId: string;

	@ManyToOne(_ => Doctor, doctor => doctor.doctorServices, { onDelete: "CASCADE" })
	doctor: Doctor;

	@ManyToOne(_ => Service, service => service.servicesDoctor, { onDelete: "CASCADE" })
	service: Service;

	@BeforeInsert()
	addId() {
		this.id = uuidv4();
	}
}
