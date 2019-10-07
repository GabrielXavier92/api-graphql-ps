import { Doctor } from "./Doctor";
import { User } from "./User";
import { Patient } from "./Patient";

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
import { ScheduleService } from "./ScheduleService";

enum ScheduleStatus {
	AGENDADO = "AGENDADO",
	ATENDENDO = "ATENDENDO",
	CONCLUIDO = "CONCLUIDO",
	CANCELADO = "CANCELADO"
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

	@OneToMany(_ => ScheduleService, scheduleService => scheduleService.schedule)
	scheduleServices: ScheduleService[];

	@Column("varchar", { length: 255 })
	name: string;

	@Column({ type: "enum", enum: ScheduleStatus, default: ScheduleStatus.AGENDADO })
	status: ScheduleStatus;

	@Column("time without time zone")
	day: string;

	@Column("float", { default: 0, nullable: true })
	value: number;

	@Column("varchar", { nullable: true })
	color: string;

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
