import { User } from "./User";

import {
	Entity,
	Column,
	PrimaryColumn,
	ManyToOne,
	BaseEntity,
	CreateDateColumn,
	UpdateDateColumn,
	OneToMany,
	ManyToMany,
	JoinTable
} from "typeorm";
import { Service } from "./Service";
import { Patient } from "./Patient";
import { Doctor } from "./Doctor";

@Entity("handbook")
export class Handbook extends BaseEntity {
	@PrimaryColumn("uuid")
	id: string;

	@ManyToOne(_ => User, user => user.handbooks)
	user: User;

	@ManyToOne(_ => Patient, patient => patient.handbooks)
	patient: Patient;

	@ManyToOne(_ => Doctor, doctor => doctor.handbooks)
	doctor: Doctor;

	@ManyToMany(() => Service, service => service.id)
	@JoinTable({ name: "handbook_service" })
	handbookServices: Service[];

	@OneToMany(_ => Service, service => service.specialty)
	services: Service[];

	@Column("varchar", { length: 255 })
	name: string;

	@Column("varchar", { length: 255 })
	code: string;

	@Column("text", { nullable: true })
	description: string;

	@Column("integer", { default: 0 })
	value: number;

	@Column("boolean", { default: true })
	status: boolean;

	@Column()
	@CreateDateColumn()
	createdAt: Date;

	@Column()
	@UpdateDateColumn()
	updatedAt: Date;
}
