import { User } from "./User";

import {
	Entity,
	Column,
	PrimaryColumn,
	BeforeInsert,
	ManyToOne,
	BaseEntity,
	CreateDateColumn,
	UpdateDateColumn,
	ManyToMany,
	JoinTable,
	OneToMany
} from "typeorm";

import * as uuidv4 from "uuid/v4";

import { Specialty } from "./Specialty";
import { Handbook } from "./Handbook";
import { Guide } from "./Guide";
import { Schedule } from "./Schedule";

// enum Gender {
// 	MASCULINO = "masculino",
// 	FEMININO = "feminino"
// }

@Entity("doctor")
export class Doctor extends BaseEntity {
	@PrimaryColumn("uuid")
	id: string;

	@ManyToOne(_ => User, user => user.doctors, { nullable: false })
	user: User;

	@OneToMany(_ => Handbook, handbook => handbook.doctor)
	handbooks: Handbook[];

	@OneToMany(_ => Guide, guide => guide.doctor)
	guides: Guide[];

	@ManyToMany(() => Specialty, specialty => specialty.id)
	@JoinTable({ name: "doctor_specialty" })
	doctorSpecialties: Specialty[];

	@OneToMany(_ => Schedule, schedule => schedule.doctor)
	schedules: Schedule[];

	@Column("varchar", { length: 255 })
	name: string;

	@Column("varchar", { length: 255, nullable: true })
	gender: string;

	@Column("time without time zone", { nullable: true })
	birth: string;

	@Column("integer", { nullable: true })
	cro: number;

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
