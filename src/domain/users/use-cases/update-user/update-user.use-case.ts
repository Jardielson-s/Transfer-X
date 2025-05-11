import { Inject, Injectable } from '@nestjs/common';
import { IUseCase } from 'domain/interfaces/use-case';
import { UserEntity } from 'domain/users/entities/user.entity';
import { UserRepository } from 'infra/repositories/users/users.repository';

@Injectable()
export class UpdateUserUseCase
  implements IUseCase<Partial<UserEntity>, UserEntity>
{
  constructor(
    @Inject(UserRepository) private readonly userRepositiry: UserRepository,
  ) {}
  async execute(userEntityInput: Partial<UserEntity>): Promise<UserEntity> {
    const userEntity = new UserEntity(userEntityInput);
    return await this.userRepositiry.create(userEntity);
  }
}
