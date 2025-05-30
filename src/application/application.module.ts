import { Module } from '@nestjs/common';
import { UserApplicationFactory } from './users/users.application';
import { WalletApplicationFactory } from './wallets/wallet.application';
import { UserDomainModule } from 'domain/users/user.module';
import { WalletDomainModule } from 'domain/wallets/wallet.module';

@Module({
  imports: [UserDomainModule, WalletDomainModule],
  providers: [UserApplicationFactory, WalletApplicationFactory],
  exports: [UserApplicationFactory, WalletApplicationFactory],
})
export class ApplicationModule {}
