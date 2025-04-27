import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'domain/users/entities/user.entity';
import { IRepository } from 'shared/repository.interface';
import { Repository } from 'typeorm';

export class UserRepository
  implements IRepository<Partial<UserEntity>, UserEntity>
{
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}
  async create(input: Partial<UserEntity>): Promise<UserEntity> {
    return await this.userRepository.save(input);
  }
  async findById(id: string): Promise<UserEntity> {
    return await this.userRepository.findOne({
      where: { id },
    });
  }

  async findByEmail(email: string): Promise<UserEntity> {
    return await this.userRepository.findOne({
      where: { email },
    });
  }

  async findByEin(ein: string): Promise<UserEntity> {
    return await this.userRepository.findOne({
      where: { ein },
    });
  }
}
