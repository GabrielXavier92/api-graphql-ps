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
import { Handbook } from "./Handbook";
import { Guide } from "./Guide";
import { Schedule } from "./Schedule";
import * as uuidv4 from "uuid/v4";

enum Gender {
	MASCULINO = "MASCULINO",
	FEMININO = "FEMININO"
}

@Entity("patient")
export class Patient extends BaseEntity {
	@PrimaryColumn("uuid")
	id: string;

	@ManyToOne(_ => User, user => user.patients, { nullable: false })
	user: User;

	@OneToMany(_ => Handbook, handbook => handbook.patient)
	handbooks: Handbook[];

	@OneToMany(_ => Guide, guide => guide.patient)
	guides: Guide[];

	@OneToMany(_ => Schedule, schedule => schedule.patient)
	schedules: Schedule[];

	@Column("varchar", { length: 255 })
	name: string;

	@Column("enum", { enum: Gender, nullable: true })
	gender: Gender;

	@Column("time without time zone", { nullable: true })
	birth: string;

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
