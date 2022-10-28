import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id?: number;

  @Column('varchar', { length: 255 })
  email!: string;

  @Column('varchar', { length: 255 })
  password!: string;
}
