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
	BeforeInsert
} from "typeorm";

import { Service } from "./Service";

import * as uuidv4 from "uuid/v4";

@Entity("specialty")
export class Specialty extends BaseEntity {
	@PrimaryColumn("uuid")
	id: string;

	@ManyToOne(_ => User, user => user.specialtys, { nullable: false })
	user: User;

	@OneToMany(_ => Service, service => service.specialty)
	services: Service[];

	//@ManyToMany with DOCTOR

	@Column("varchar", { length: 255 })
	name: string;

	@Column("integer")
	code: number;

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

	@BeforeInsert()
	addId() {
		this.id = uuidv4();
	}
}
