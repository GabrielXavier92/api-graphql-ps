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

enum Gender {
	MASCULINO = "masculino",
	FEMININO = "feminino"
}

@Entity("doctor")
export class Doctor extends BaseEntity {
	@PrimaryColumn("uuid")
	id: string;

	@ManyToOne(_ => User, user => user.doctors)
	user: User;

	@Column("varchar", { length: 255 })
	name: string;

	@Column({ type: "enum", enum: Gender, default: Gender.MASCULINO })
	gender: Gender;

	@Column("time without time zone")
	birth: string;

	@Column("varchar")
	cro: string;

	@Column("boolean", { default: true })
	status: boolean;

	@Column()
	@CreateDateColumn()
	createdAt: Date;

	@Column()
	@UpdateDateColumn()
	updatedAt: Date;
}
