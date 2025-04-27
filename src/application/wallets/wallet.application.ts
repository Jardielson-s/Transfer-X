import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { WalletEntity } from 'domain/wallets/entities/wallet.entity';
import { CreateWalletUseCase } from 'domain/wallets/use-cases/create-wallets/create-wallets.use-case';
import { FindWalletByIdUseCase } from 'domain/wallets/use-cases/find-wallet-by-id/find-wallet-by-id.use-case';
import { AsaasService } from 'infra/gateway-payments/asaas.service';
import { pixAddressKeyType } from 'infra/gateway-payments/interfaces/transfer.interface';
import { UserRepository } from 'infra/repositories/users/users.repository';
import { WalletRepository } from 'infra/repositories/wallets/wallet.repository';

@Injectable()
export class WalletApplicationFactory {
  constructor(
    @Inject(CreateWalletUseCase)
    private readonly createWalletUseCase: CreateWalletUseCase,
    @Inject(FindWalletByIdUseCase)
    private readonly findWalletByIdUseCase: FindWalletByIdUseCase,
    @Inject(WalletRepository)
    private readonly walletRepository: WalletRepository,
    @Inject(UserRepository)
    private readonly userRepository: UserRepository,
    @Inject(AsaasService)
    private readonly asaasService: AsaasService,
  ) {}

  async createWallet(input: Array<Partial<WalletEntity>>): Promise<string> {
    try {
      for (const wallet of input) {
        const emailAlreadyExists = await this.walletRepository.findByNumber(
          wallet.number,
        );
        if (emailAlreadyExists) {
          throw new BadRequestException('Wallet number already exists');
        }

        const user = await this.userRepository.findById(wallet.userId);
        if (!user) {
          throw new BadRequestException('User not found');
        }
      }
      await Promise.all(
        input.map(async (wallet) => {
          const response = await this.asaasService.createPix(
            pixAddressKeyType.EVP,
          );
          wallet.pix = [{ key: response, type: pixAddressKeyType.EVP }];
          await this.createWalletUseCase.execute(wallet);
        }),
      );
      return 'wallets created';
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findById(id: string): Promise<WalletEntity> {
    return await this.findWalletByIdUseCase.execute(id);
  }

  async transferPix(input: {
    walletId: string;
    toKeyPix: string;
    value: number;
    description?: string;
  }): Promise<string> {
    try {
      const wallet = await this.walletRepository.findById(input.walletId);
      if (!wallet) {
        throw new BadRequestException('Wallet not found');
      }
      if (wallet.balance < input.value) {
        throw new BadRequestException('Wallet without balance');
      }
      const pix = wallet.pix.find((pix) => pix.key === input.toKeyPix);
      await this.asaasService.tranferPix({
        pixAddressKey: pix.key,
        pixAddressKeyType: pixAddressKeyType[pix.type],
        value: input.value,
        description: input.description,
        scheduleDate: null,
      });
      await this.walletRepository.update(input.walletId, {
        balance: wallet.balance - input.value,
      });
      return 'Transfer created';
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
