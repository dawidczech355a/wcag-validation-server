import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm';

import { Issue } from './issue';
import { User } from './user';

@Entity()
export class Validation {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @CreateDateColumn()
  createdAt!: Date;

  @OneToMany(() => Issue, (issue) => issue.validation)
  issues: Issue[];

  @Column('varchar')
  url!: string;

  @ManyToOne(() => User, (user) => user.validations)
  user?: User;
}
