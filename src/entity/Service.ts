import { User } from "./User";

import {
	Entity,
	Column,
	PrimaryColumn,
	ManyToOne,
	BaseEntity,
	CreateDateColumn,
	UpdateDateColumn,
	BeforeInsert
} from "typeorm";

import * as uuidv4 from "uuid/v4";

@Entity("service")
export class Service extends BaseEntity {
	@PrimaryColumn("uuid")
	id: string;

	@ManyToOne(_ => User, user => user.services, { nullable: false })
	user: User;

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

	@BeforeInsert()
	addId() {
		this.id = uuidv4();
	}
}
