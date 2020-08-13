import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  RelationCount,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

import Post from "./Post";
import Follow from "./Follow";

@Entity("users")
class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column({ unique: true, select: false })
  email: string;

  @Column({ unique: true })
  username: string;

  @Column({ select: false })
  password: string;

  @OneToMany((type) => Post, (post) => post.user)
  posts: Post[];

  @OneToMany((type) => Follow, (follow) => follow.follower)
  following: User[];

  @OneToMany((type) => Follow, (follow) => follow.user)
  followers: User[];

  @RelationCount((user: User) => user.followers)
  followers_count: number;

  @RelationCount((user: User) => user.following)
  following_count: number;

  @CreateDateColumn({ type: "timestamp with time zone" })
  created_at: Date;

  @UpdateDateColumn({ type: "timestamp with time zone" })
  updated_at: Date;
}

export default User;
