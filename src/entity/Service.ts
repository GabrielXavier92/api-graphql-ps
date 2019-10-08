import { ScheduleService } from "./ScheduleService";
import { User } from "./User";

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
import { DoctorService } from "./DoctorService";

@Entity("service")
export class Service extends BaseEntity {
	@PrimaryColumn("uuid")
	id: string;

	@ManyToOne(_ => User, user => user.services, { nullable: false })
	user: User;

	@OneToMany(_ => DoctorService, doctorService => doctorService.service)
	servicesDoctor: DoctorService[];

	@OneToMany(_ => ScheduleService, scheduleService => scheduleService.service)
	serviceSchedule: ScheduleService[];

	@Column("varchar", { length: 255 })
	name: string;

	@Column("integer")
	code: number;

	@Column("text", { nullable: true })
	description: string;

	@Column("float", { default: 0 })
	value: number;

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
