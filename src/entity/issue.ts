import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Validation } from './validation';

@Entity()
export class Issue {
  @PrimaryGeneratedColumn('uuid')
  id?: number;

  @Column('int')
  level!: number;

  @Column('varchar')
  guideline?: string;

  @Column('varchar')
  type?: string;

  @Column('varchar', { array: true })
  pages: string[];

  @ManyToOne(() => Validation, (validation) => validation.issues)
  validation: Validation;
}
