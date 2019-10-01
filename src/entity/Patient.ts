import { User } from "./User";

import {
	Entity,
	Column,
	PrimaryColumn,
	ManyToOne,
	BaseEntity,
	CreateDateColumn,
	UpdateDateColumn,
	OneToMany
} from "typeorm";
import { Handbook } from "./Handbook";
import { Guide } from "./Guide";
import { Schedule } from "./Schedule";

enum Gender {
	MASCULINO = "masculino",
	FEMININO = "feminino"
}

@Entity("patient")
export class Patient extends BaseEntity {
	@PrimaryColumn("uuid")
	id: string;

	@ManyToOne(_ => User, user => user.patients)
	user: User;

	@OneToMany(_ => Handbook, handbook => handbook.patient)
	handbooks: Handbook[];

	@OneToMany(_ => Guide, guide => guide.patient)
	guides: Guide[];

	@OneToMany(_ => Schedule, schedule => schedule.patient)
	schedules: Schedule[];

	@Column("varchar", { length: 255 })
	name: string;

	@Column({ type: "enum", enum: Gender, default: Gender.MASCULINO })
	gender: Gender;

	@Column("time without time zone", { nullable: true })
	birth: string;

	@Column()
	@CreateDateColumn()
	createdAt: Date;

	@Column()
	@UpdateDateColumn()
	updatedAt: Date;
}
