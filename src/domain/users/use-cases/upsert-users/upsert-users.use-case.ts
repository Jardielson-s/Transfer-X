import { Inject, Injectable } from '@nestjs/common';
import { IUseCase } from 'domain/interfaces/use-case';
import { UserEntity } from 'domain/users/entities/user.entity';
import { UserRepository } from 'infra/repositories/users/users.repository';
import { InsertResult } from 'typeorm';

@Injectable()
export class UpsertUserUseCase
  implements IUseCase<Partial<UserEntity>[], InsertResult>
{
  constructor(
    @Inject(UserRepository) private readonly userRepositiry: UserRepository,
  ) {}
  async execute(input: Partial<UserEntity>[]): Promise<InsertResult> {
    return await this.userRepositiry.upsert(input);
  }
}
