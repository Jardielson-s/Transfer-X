import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'domain/users/entities/user.entity';
import { IRepository } from 'shared/repository.interface';
import { InsertResult, Repository } from 'typeorm';

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

  async find(query: object): Promise<Array<UserEntity>> {
    return await this.userRepository.find({
      where: query,
    });
  }

  async upsert(input: Partial<UserEntity>[]): Promise<InsertResult> {
    return await this.userRepository.upsert(input, ['id']);
  }

  async findByEmail(email: string, query: object = null): Promise<UserEntity> {
    return await this.userRepository.findOne({
      where: {
        email,
        ...(Object.keys(query).length ? query : {}),
      },
    });
  }

  async findByEin(ein: string, query: object = null): Promise<UserEntity> {
    return await this.userRepository.findOne({
      where: {
        ein,
        ...(Object.keys(query).length ? query : {}),
      },
    });
  }
}
