import { Doctor } from "./Doctor";
import { User } from "./User";
import { Patient } from "./Patient";
import { Service } from "./Service";

import {
	Entity,
	Column,
	PrimaryColumn,
	ManyToOne,
	BaseEntity,
	CreateDateColumn,
	UpdateDateColumn,
	ManyToMany,
	JoinTable
} from "typeorm";

@Entity("guide")
export class Guide extends BaseEntity {
	@PrimaryColumn("uuid")
	id: string;

	@ManyToOne(_ => User, user => user.guides, { nullable: false })
	user: User;

	@ManyToOne(_ => Doctor, doctor => doctor.guides, { nullable: false })
	doctor: Doctor;

	@ManyToOne(_ => Patient, patient => patient.guides, { nullable: false })
	patient: Patient;

	@ManyToMany(() => Service, service => service.id)
	@JoinTable({ name: "guide_service" })
	guideServices: Service[];

	@Column("time without time zone")
	emissionDate: string;

	@Column("time without time zone")
	careDate: string;

	@Column("text", { nullable: true })
	description: string;

	@Column()
	@CreateDateColumn()
	createdAt: Date;

	@Column()
	@UpdateDateColumn()
	updatedAt: Date;
}
