import { User } from "./User";
import { DoctorSpecialty } from "./DoctorSpecialty";

import {
	Entity,
	Column,
	PrimaryColumn,
	ManyToOne,
	BaseEntity,
	CreateDateColumn,
	UpdateDateColumn,
	BeforeInsert,
	OneToMany
} from "typeorm";

import * as uuidv4 from "uuid/v4";

@Entity("specialty")
export class Specialty extends BaseEntity {
	@PrimaryColumn("uuid")
	id: string;

	@ManyToOne(_ => User, user => user.specialtys, { nullable: false })
	user: User;

	//@ManyToMany with DOCTOR
	@OneToMany(_ => DoctorSpecialty, doctorSpecialty => doctorSpecialty.specialty)
	specialtiesDoctor: DoctorSpecialty[];

	@Column("varchar", { length: 255 })
	name: string;

	@Column("integer")
	code: number;

	@Column("text", { nullable: true })
	description: string;

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
