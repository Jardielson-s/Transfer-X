import { IEntity } from '@domain/interfaces/entity';
import {
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class UserEntity implements IEntity {
  @PrimaryColumn({ type: 'uuid' })
  id: string;

  @PrimaryColumn({ type: 'varchar' })
  name: string;

  @PrimaryColumn({ type: 'varchar', unique: true })
  ein: string;

  @PrimaryColumn({ type: 'varchar', unique: true })
  email: string;

  @PrimaryColumn({ type: 'varchar' })
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  constructor(input: Partial<UserEntity>) {
    Object.assign(this, input);
  }
}
