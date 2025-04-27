import { IEntity } from '@domain/interfaces/entity';
import { UserEntity } from '@domain/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('wallets')
export class WalletEntity implements IEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Column({ type: 'varchar' })
  description: string;

  @Column({ type: 'varchar', unique: true })
  number: string;

  @Column({ type: 'varchar' })
  type: string;

  @Column({ type: 'varchar' })
  password: string;

  @Column({ type: 'float', default: 0 })
  balance: number;

  @Column({ type: 'boolean', default: false })
  locked: boolean;

  @ManyToOne(() => UserEntity, (user) => user.wallets)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @Column('uuid')
  userId: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  constructor(input: Partial<WalletEntity>) {
    Object.assign(this, input);
  }
}
