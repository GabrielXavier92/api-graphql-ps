import { Doctor } from "./Doctor";
import { User } from "./User";
import { Patient } from "./Patient";

import {
  Entity,
  Column,
  PrimaryColumn,
  ManyToOne,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  OneToMany
} from "typeorm";

import * as uuidv4 from "uuid/v4";
import { ScheduleService } from "./ScheduleService";

export enum ScheduleStatus {
  AGENDADO = "AGENDADO",
  ATENDENDO = "ATENDENDO",
  CONCLUIDO = "CONCLUIDO",
  CANCELADO = "CANCELADO"
}

@Entity("schedule")
export class Schedule extends BaseEntity {
  @PrimaryColumn("uuid")
  id: string;

  @ManyToOne(_ => User, user => user.schedules, { nullable: false })
  user: User;

  @Column("uuid", { name: "doctorId" })
  doctorId: string;

  @ManyToOne(_ => Doctor, doctor => doctor.schedules, { nullable: false })
  doctor: Doctor;

  @Column("uuid", { name: "patientId" })
  patientId: string;

  @ManyToOne(_ => Patient, patient => patient.schedules, { nullable: false })
  patient: Patient;

  @OneToMany(_ => ScheduleService, scheduleService => scheduleService.schedule)
  scheduleServices: ScheduleService[];

  @Column("varchar", { length: 255, nullable: true })
  name: string;

  @Column({
    type: "enum",
    enum: ScheduleStatus,
    default: ScheduleStatus.AGENDADO
  })
  status: ScheduleStatus;

  @Column({ type: "timestamp", nullable: false })
  day: Date;

  @Column("float", { default: 0, nullable: true })
  value: number;

  @Column("varchar", { nullable: true })
  color: string;

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
