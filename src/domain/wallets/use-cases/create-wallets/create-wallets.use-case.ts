import { Inject, Injectable } from '@nestjs/common';
import { IUseCase } from 'domain/interfaces/use-case';
import { WalletEntity } from 'domain/wallets/entities/wallet.entity';
import { WalletRepository } from 'infra/repositories/wallets/wallet.repository';

@Injectable()
export class CreateWalletUseCase
  implements IUseCase<Partial<WalletEntity>, void>
{
  constructor(
    @Inject(WalletRepository)
    private readonly walletRepository: WalletRepository,
  ) {}
  async execute(walletEntityInput: Partial<WalletEntity>): Promise<void> {
    const walletEntity = new WalletEntity(walletEntityInput);
    await this.walletRepository.create(walletEntity);
  }
}
