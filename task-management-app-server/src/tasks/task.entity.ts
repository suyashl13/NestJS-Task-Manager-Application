import { Max, Min } from "class-validator";
import { User } from "src/users/user.entity";
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class Task {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ nullable: false })
  title: string;

  @Column("varchar")
  description: string;

  @Column({ default: 0 })
  status: number;

  @Column("smallint")
  @Min(0)
  @Max(3)
  priority: number

  @ManyToMany(()=>User, (user) => user.assigned_tasks)
  assigned_users: User[]

  @CreateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
  })
  created_at: Date;

  @ManyToOne(()=>User, (user)=>user.tasks)
  user: User

  @UpdateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
    onUpdate: "CURRENT_TIMESTAMP(6)",
  })
  updated_at: Date;
}
