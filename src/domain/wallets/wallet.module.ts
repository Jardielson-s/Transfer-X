import { Module } from '@nestjs/common';
import { CreateWalletUseCase } from './use-cases/create-wallets/create-wallets.use-case';
import { FindWalletByIdUseCase } from './use-cases/find-wallet-by-id/find-wallet-by-id.use-case';
import { InfraModule } from 'infra/infra.module';

@Module({
  imports: [InfraModule],
  providers: [CreateWalletUseCase, FindWalletByIdUseCase],
  exports: [CreateWalletUseCase, FindWalletByIdUseCase],
})
export class WalletDomainModule {}
