import { User } from "./User";

import {
	Entity,
	Column,
	PrimaryColumn,
	ManyToOne,
	BaseEntity,
	CreateDateColumn,
	UpdateDateColumn
} from "typeorm";
import { Specialty } from "./Specialty";

@Entity("service")
export class Service extends BaseEntity {
	@PrimaryColumn("uuid")
	id: string;

	@ManyToOne(_ => User, user => user.services)
	user: User;

	@ManyToOne(_ => Specialty, specialty => specialty.services)
	specialty: User;

	//@ManyToMany with HANDBOOK
	//@ManyToMany with GUIDE
	//@ManyToMany with SCHEDULE

	@Column("varchar", { length: 255 })
	name: string;

	@Column("varchar", { length: 255 })
	code: string;

	@Column("text", { nullable: true })
	description: string;

	@Column()
	@CreateDateColumn()
	createdAt: Date;

	@Column()
	@UpdateDateColumn()
	updatedAt: Date;
}
