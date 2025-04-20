import { Injectable } from '@nestjs/common';
import { UserEntity } from '@domain/users/entities/user.enity';
import { IUseCase } from '@domain/interfaces/use-case';

@Injectable()
export class CreateUserUseCase
  implements IUseCase<Partial<UserEntity>, UserEntity>
{
  async execute(userEntityInput: Partial<UserEntity>): Promise<UserEntity> {
    return new UserEntity(userEntityInput);
  }
}
