import { Entity, Column, PrimaryColumn, BeforeInsert, BaseEntity } from "typeorm";
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

	@BeforeInsert()
	addId() {
		this.id = uuidv4();
	}
}
