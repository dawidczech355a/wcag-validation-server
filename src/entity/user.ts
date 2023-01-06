import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Validation } from './validation';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id?: number;

  @Column('varchar', { length: 255 })
  email!: string;

  @Column('varchar', { length: 255 })
  password!: string;

  @OneToMany(() => Validation, (validation) => validation.user)
  validations?: Validation[];
}
