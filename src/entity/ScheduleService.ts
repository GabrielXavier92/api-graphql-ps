import { Service } from "./Service";
import { Schedule } from "./Schedule";
import { Entity, PrimaryColumn, BaseEntity, Column, ManyToOne, BeforeInsert } from "typeorm";

import * as uuidv4 from "uuid/v4";

@Entity("schedule_service")
export class ScheduleService extends BaseEntity {
	@PrimaryColumn("uuid")
	id: string;

	@Column("uuid", { nullable: false })
	scheduleId: string;

	@Column("uuid", { nullable: false })
	serviceId: string;

	@ManyToOne(_ => Schedule, schedule => schedule.scheduleServices, { onDelete: "CASCADE" })
	schedule: Schedule[];

	@ManyToOne(_ => Service, service => service.serviceSchedule, { onDelete: "CASCADE" })
	service: Service[];

	@BeforeInsert()
	addId() {
		this.id = uuidv4();
	}
}
