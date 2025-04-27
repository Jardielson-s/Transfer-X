import { WalletEntity } from '@domain/wallets/entities/wallet.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { IRepository } from 'src/shared/repository.interface';
import { Repository } from 'typeorm';

export class WalletRepository
  implements IRepository<Partial<WalletEntity>, WalletEntity>
{
  constructor(
    @InjectRepository(WalletEntity)
    private readonly walletRepository: Repository<WalletEntity>,
  ) {}

  async create(input: Partial<WalletEntity>): Promise<WalletEntity> {
    return await this.walletRepository.save(input);
  }

  async findById(id: string): Promise<WalletEntity> {
    console.log(id, 'aqui');
    return await this.walletRepository.findOne({
      where: {
        id,
      },
      relations: ['user'],
      relationLoadStrategy: 'join',
    });
  }

  async findByNumber(number: string): Promise<WalletEntity> {
    return await this.walletRepository.findOne({
      where: { number },
    });
  }
}
