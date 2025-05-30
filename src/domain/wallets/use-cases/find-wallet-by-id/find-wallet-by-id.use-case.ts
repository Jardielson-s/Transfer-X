import { Inject, Injectable } from '@nestjs/common';
import { IUseCase } from 'domain/interfaces/use-case';
import { WalletEntity } from 'domain/wallets/entities/wallet.entity';
import { WalletRepository } from 'infra/repositories/wallets/wallet.repository';

@Injectable()
export class FindWalletByIdUseCase implements IUseCase<string, WalletEntity> {
  constructor(
    @Inject(WalletRepository)
    private readonly walletRepository: WalletRepository,
  ) {}
  async execute(id: string): Promise<WalletEntity> {
    return await this.walletRepository.findById(id);
  }
}
