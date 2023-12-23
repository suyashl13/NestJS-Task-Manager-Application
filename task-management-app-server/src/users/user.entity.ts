import { Length } from "class-validator";
import { Task } from "src/tasks/task.entity";
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from "typeorm";

@Entity()
@Unique(["email", "phone"])
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column({ default: 1 })
  role: number;

  @Column()
  email: string;

  @Column()
  @Length(6, 30, {
    message:
      "Password should be at least greater than 6 chars and smaller than 30 chars",
  })
  password: string;

  @Column()
  city: string;

  @ManyToMany(() => Task, (task) => task.assigned_users)
  assigned_tasks: Task[];

  @Column()
  phone: string;

  @Column({ default: "Not Assigned" })
  designation: string;

  @CreateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
  })
  created_at: Date;

  @OneToMany(() => Task, (task) => task.user)
  tasks: Task[];

  @UpdateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
    onUpdate: "CURRENT_TIMESTAMP(6)",
  })
  updated_at: Date;
}
