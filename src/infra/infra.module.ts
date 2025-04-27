import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'domain/users/entities/user.entity';
import { WalletEntity } from 'domain/wallets/entities/wallet.entity';
import { UserRepository } from './repositories/users/users.repository';
import { WalletRepository } from './repositories/wallets/wallet.repository';
import { AsaasService } from './gateway-payments/asaas.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, WalletEntity])],
  providers: [UserRepository, WalletRepository, AsaasService],
  exports: [UserRepository, WalletRepository, AsaasService],
})
export class InfraModule {}
