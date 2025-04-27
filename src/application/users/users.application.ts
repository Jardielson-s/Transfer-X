import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateUserUseCase } from '@domain/users/use-cases/create-user/create-user.use-case';
import { UserEntity } from '@domain/users/entities/user.entity';
import { UserRepository } from '@infra/repositories/users/users.repository';

@Injectable()
export class UserApplicationFactory {
  constructor(
    @Inject(CreateUserUseCase)
    private readonly createUserUseCase: CreateUserUseCase,
    @Inject(UserRepository)
    private readonly userRepository: UserRepository,
  ) {}

  async createUser(input: Partial<UserEntity>): Promise<void> {
    const emailAlreadyExists = await this.userRepository.findByEmail(
      input.email,
    );
    if (emailAlreadyExists) {
      throw new BadRequestException('Email already exists');
    }
    const einAlreadyExists = await this.userRepository.findByEin(input.ein);
    if (einAlreadyExists) {
      throw new BadRequestException('Ein already exists');
    }
    await this.createUserUseCase.execute(input);
  }
}
