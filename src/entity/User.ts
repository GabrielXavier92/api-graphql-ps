import { Doctor } from "./Doctor";
import { Guide } from "./Guide";
import { Handbook } from "./Handbook";
import { Patient } from "./Patient";
import { Specialty } from "./Specialty";
import { Service } from "./Service";
import { Schedule } from "./Schedule";

import {
	Entity,
	Column,
	PrimaryColumn,
	BeforeInsert,
	BaseEntity,
	CreateDateColumn,
	UpdateDateColumn,
	OneToMany
} from "typeorm";
import * as uuidv4 from "uuid/v4";

@Entity("user")
export class User extends BaseEntity {
	@PrimaryColumn("uuid")
	id: string;

	@Column("varchar", { length: 255, unique: true })
	email: string;

	@Column("varchar", { length: 255 })
	name: string;

	@Column("varchar", { length: 255 })
	password: string;

	@Column("boolean", { default: false })
	confirmed: boolean;

	@Column("boolean", { default: true })
	status: boolean;

	@Column()
	@CreateDateColumn()
	createdAt: Date;

	@Column()
	@UpdateDateColumn()
	updatedAt: Date;

	@OneToMany(_ => Patient, patient => patient.user)
	patients: Patient[];

	@OneToMany(_ => Doctor, doctor => doctor.user)
	doctors: Doctor[];

	@OneToMany(_ => Specialty, specialty => specialty.user)
	specialtys: Specialty[];

	@OneToMany(_ => Service, service => service.user)
	services: Service[];

	@OneToMany(_ => Handbook, handbook => handbook.user)
	handbooks: Handbook[];

	@OneToMany(_ => Guide, guide => guide.user)
	guides: Guide[];

	@OneToMany(_ => Schedule, schedule => schedule.user)
	schedules: Schedule[];

	@BeforeInsert()
	addId() {
		this.id = uuidv4();
	}
}
