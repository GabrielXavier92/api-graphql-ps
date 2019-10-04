import { DoctorService } from "./DoctorService";
import { User } from "./User";

import {
	Entity,
	Column,
	PrimaryColumn,
	BeforeInsert,
	ManyToOne,
	BaseEntity,
	CreateDateColumn,
	UpdateDateColumn,
	OneToMany
} from "typeorm";

import * as uuidv4 from "uuid/v4";

import { Handbook } from "./Handbook";
import { Guide } from "./Guide";
import { Schedule } from "./Schedule";
import { Service } from "./Service";
import { DoctorSpecialty } from "./DoctorSpecialty";

export enum Gender {
	MASCULINO = "MASCULINO",
	FEMININO = "FEMININO"
}

@Entity("doctor")
export class Doctor extends BaseEntity {
	@PrimaryColumn("uuid")
	id: string;

	@ManyToOne(_ => User, user => user.doctors, { nullable: false })
	user: User;

	@OneToMany(_ => Handbook, handbook => handbook.doctor)
	handbooks: Handbook[];

	@OneToMany(_ => Guide, guide => guide.doctor)
	guides: Guide[];

	//@ManyToMany with DOCTOR
	@OneToMany(_ => DoctorSpecialty, doctorSpecialty => doctorSpecialty.doctor)
	doctorSpecialties: DoctorSpecialty[];

	@OneToMany(_ => DoctorService, doctorService => doctorService.doctor)
	doctorServices: Service[];

	@OneToMany(_ => Schedule, schedule => schedule.doctor)
	schedules: Schedule[];

	@Column("varchar", { length: 255 })
	name: string;

	@Column("enum", { enum: Gender, nullable: true })
	gender: Gender;

	@Column("time without time zone", { nullable: true })
	birth: string;

	@Column("integer", { nullable: true })
	cro: number;

	@Column("boolean", { default: true })
	status: boolean;

	@Column()
	@CreateDateColumn()
	createdAt: Date;

	@Column()
	@UpdateDateColumn()
	updatedAt: Date;

	@BeforeInsert()
	addId() {
		this.id = uuidv4();
	}
}
