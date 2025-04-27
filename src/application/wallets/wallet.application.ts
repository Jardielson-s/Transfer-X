import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateWalletUseCase } from '@domain/wallets/use-cases/create-wallets/create-wallets.use-case';
import { WalletRepository } from '@infra/repositories/wallets/wallet.repository';
import { WalletEntity } from '@domain/wallets/entities/wallet.entity';
import { FindWalletByIdUseCase } from '@domain/wallets/use-cases/find-wallet-by-id/find-wallet-by-id.use-case';

@Injectable()
export class WalletApplicationFactory {
  constructor(
    @Inject(CreateWalletUseCase)
    private readonly createWalletUseCase: CreateWalletUseCase,
    @Inject(FindWalletByIdUseCase)
    private readonly findWalletByIdUseCase: FindWalletByIdUseCase,
    @Inject(WalletRepository)
    private readonly walletRepository: WalletRepository,
  ) {}

  async createWallet(input: Array<Partial<WalletEntity>>): Promise<string> {
    for (const wallet of input) {
      const emailAlreadyExists = await this.walletRepository.findByNumber(
        wallet.number,
      );
      if (emailAlreadyExists) {
        throw new BadRequestException('Wallet number already exists');
      }
    }
    await Promise.all(
      input.map(async (wallet) => {
        await this.createWalletUseCase.execute(wallet);
      }),
    );
    return 'wallets created';
  }

  async findById(id: string): Promise<WalletEntity> {
    return await this.findWalletByIdUseCase.execute(id);
  }
}
