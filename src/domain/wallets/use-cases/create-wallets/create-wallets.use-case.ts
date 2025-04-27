import { Inject, Injectable } from '@nestjs/common';
import { IUseCase } from '@domain/interfaces/use-case';
import { WalletRepository } from '@infra/repositories/wallets/wallet.repository';
import { WalletEntity } from '@domain/wallets/entities/wallet.entity';

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
