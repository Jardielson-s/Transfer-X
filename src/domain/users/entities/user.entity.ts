import { IEntity } from 'domain/interfaces/entity';
import { WalletEntity } from 'domain/wallets/entities/wallet.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class UserEntity implements IEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar', unique: true })
  ein: string;

  @Column({ type: 'varchar', unique: true })
  email: string;

  @Column({ type: 'varchar' })
  password: string;

  @Column({ type: 'varchar' })
  phone: string;

  @Column({ type: 'varchar' })
  postalCode: string;

  @Column({ type: 'varchar' })
  address: string;

  @Column({ name: 'address_number', type: 'varchar' })
  addressNumber: string;

  @Column({ type: 'varchar' })
  complement?: string;

  @Column({ type: 'varchar' })
  city: string;

  @Column({ type: 'varchar' })
  country: string;

  @Column({ type: 'varchar', name: 'external_user_id' })
  externalUserId: string;

  @Column({ type: 'varchar', name: 'integration_id' })
  integrationId: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => WalletEntity, (wallet) => wallet.user)
  wallets: WalletEntity[];

  constructor(input: Partial<UserEntity>) {
    Object.assign(this, input);
  }
}
