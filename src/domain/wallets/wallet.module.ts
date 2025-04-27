import { Module } from '@nestjs/common';
import { RepositoryModule } from '@infra/repositories/repositories.module';
import { CreateWalletUseCase } from './use-cases/create-wallets/create-wallets.use-case';
import { FindWalletByIdUseCase } from './use-cases/find-wallet-by-id/find-wallet-by-id.use-case';

@Module({
  imports: [RepositoryModule],
  providers: [CreateWalletUseCase, FindWalletByIdUseCase],
  exports: [CreateWalletUseCase, FindWalletByIdUseCase, RepositoryModule],
})
export class WalletDomainModule {}
