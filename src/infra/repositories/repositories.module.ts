import { Module } from '@nestjs/common';
import { UserRepository } from './users/users.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '@domain/users/entities/user.entity';
import { WalletEntity } from '@domain/wallets/entities/wallet.entity';
import { WalletRepository } from './wallets/wallet.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, WalletEntity])],
  providers: [UserRepository, WalletRepository],
  exports: [UserRepository, WalletRepository],
})
export class RepositoryModule {}
