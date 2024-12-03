import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./user.entity";
import { ClothesCategory } from "./clothes-category.entity";

export enum ClothesPosition {
  WARDROBE = "WARDROBE",
  INUSE = "INUSE",
  BASKET = "BASKET",
  LAUNDRY = "LAUNDRY",
}

@Entity("clothes")
export class Clothes {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ name: "name", type: "varchar" })
  name: string;

  @Column({ name: "color", type: "varchar" })
  color: string;

  @Column({ name: "size", type: "varchar" })
  size: string;

  @Column({ name: "description", type: "varchar" })
  description: string;

  @Column({
    name: "position",
    type: "enum",
    enum: ClothesPosition,
    default: ClothesPosition.WARDROBE,
  })
  position: ClothesPosition;

  @Column({ name: "moved_date", type: "varchar" })
  moved_date: string;

  @Column({ name: "moved_time", type: "varchar" })
  moved_time: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: "user_id" })
  user: User;

  @ManyToOne(() => User)
  @JoinColumn({ name: "clothes_category_id" })
  clothes_category: ClothesCategory;

  @CreateDateColumn({ name: "created_at" })
  created_at: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updated_at: Date;
}
