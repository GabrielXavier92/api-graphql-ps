import { Doctor } from "./Doctor";

import {
	Entity,
	Column,
	PrimaryColumn,
	BeforeInsert,
	BaseEntity,
	CreateDateColumn,
	UpdateDateColumn,
	OneToMany
} from "typeorm";
import * as uuidv4 from "uuid/v4";

@Entity("user")
export class User extends BaseEntity {
	@PrimaryColumn("uuid")
	id: string;

	@Column("varchar", { length: 255, unique: true })
	email: string;

	@Column("varchar", { length: 255 })
	name: string;

	@Column("varchar", { length: 255 })
	password: string;

	@Column("boolean", { default: false })
	confirmed: boolean;

	@Column("boolean", { default: true })
	status: boolean;

	@Column()
	@CreateDateColumn()
	createdAt: Date;

	@Column()
	@UpdateDateColumn()
	updatedAt: Date;

	@OneToMany(_ => Doctor, doctor => doctor.user)
	doctors: Doctor[];

	@BeforeInsert()
	addId() {
		this.id = uuidv4();
	}
}
