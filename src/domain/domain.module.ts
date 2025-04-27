import { Module } from '@nestjs/common';
import { UserDomainModule } from './users/user.module';
import { WalletDomainModule } from './wallets/wallet.module';

@Module({
  exports: [UserDomainModule, WalletDomainModule],
})
export class DomainModule {}
