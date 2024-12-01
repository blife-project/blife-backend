import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";

export enum Role {
  USER = "USER",
  ADMIN = "ADMIN",
}

@Entity("auth")
export class Auth {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("varchar", { name: "username", unique: true })
  username: string;

  @Column("varchar", { name: "password" })
  password: string;

  @Column("enum", { name: "role", enum: Role, default: Role.USER })
  role: Role;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @CreateDateColumn({ name: "updated_at" })
  updatedAt: Date;
}
