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

enum ScheduleStatus {
	AGENDADO = "agendado",
	ATENDENDO = "atendendo",
	CONCLUIDO = "concluido",
	CANCELADO = "cancelado"
}

@Entity("schedule")
export class Schedule extends BaseEntity {
	@PrimaryColumn("uuid")
	id: string;

	@ManyToOne(_ => User, user => user.schedules, { nullable: false })
	user: User;

	@ManyToOne(_ => Doctor, doctor => doctor.schedules, { nullable: false })
	doctor: Doctor;

	@ManyToOne(_ => Patient, patient => patient.schedules, { nullable: false })
	patient: Patient;

	@ManyToMany(() => Service, service => service.id)
	@JoinTable({ name: "schedule_service" })
	scheduleServices: Service[];

	@Column("varchar", { length: 255 })
	name: string;

	@Column({ type: "enum", enum: ScheduleStatus, default: ScheduleStatus.AGENDADO })
	status: ScheduleStatus;

	@Column("time without time zone")
	day: string;

	@Column("integer", { default: 0, nullable: true })
	value: number;

	@Column("varchar", { nullable: true })
	color: string;

	@Column()
	@CreateDateColumn()
	createdAt: Date;

	@Column()
	@UpdateDateColumn()
	updatedAt: Date;
}
