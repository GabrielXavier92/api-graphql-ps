import { DoctorService } from "./DoctorService";
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
	OneToMany
} from "typeorm";

import * as uuidv4 from "uuid/v4";

import { Handbook } from "./Handbook";
import { Guide } from "./Guide";
import { Schedule } from "./Schedule";
import { DoctorSpecialty } from "./DoctorSpecialty";

export enum Gender {
	MASCULINO = "MASCULINO",
	FEMININO = "FEMININO"
}

export enum Status {
	ATIVO = "ATIVO",
	INATIVO = "INATIVO"
}

@Entity("doctor")
export class Doctor extends BaseEntity {
	@PrimaryColumn("uuid")
	id: string;

	@ManyToOne(
		_ => User,
		user => user.doctors,
		{ nullable: false }
	)
	user: User;

	@OneToMany(
		_ => Handbook,
		handbook => handbook.doctor
	)
	handbooks: Handbook[];

	@OneToMany(
		_ => Guide,
		guide => guide.doctor
	)
	guides: Guide[];

	@OneToMany(
		_ => DoctorSpecialty,
		doctorSpecialty => doctorSpecialty.doctor
	)
	doctorSpecialties: DoctorSpecialty[];

	@OneToMany(
		_ => DoctorService,
		doctorService => doctorService.doctor
	)
	doctorServices: DoctorService[];

	@OneToMany(
		_ => Schedule,
		schedule => schedule.doctor
	)
	schedules: Schedule[];

	@Column("varchar", { length: 255 })
	name: string;

	@Column("enum", { enum: Gender, nullable: true })
	gender: Gender;

	@Column({ nullable: true, type: "timestamptz" })
	birth: Date;

	@Column("integer", { nullable: true })
	cro: number;

	@Column("enum", { enum: Status, nullable: true })
	status: Status;

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
