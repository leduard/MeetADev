import {
  Entity,
  PrimaryGeneratedColumn,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from "typeorm";

import User from "./User";

@Entity("follows")
class Follow {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne((type) => User, (user) => user.followers, { eager: true })
  @JoinColumn({ name: "follower_id" })
  follower: User;

  @ManyToOne((type) => User, (user) => user.following, { eager: true })
  @JoinColumn({ name: "user_id" })
  user: User;

  @CreateDateColumn({ type: "timestamp with time zone" })
  created_at: Date;

  @UpdateDateColumn({ type: "timestamp with time zone" })
  updated_at: Date;
}

export default Follow;
