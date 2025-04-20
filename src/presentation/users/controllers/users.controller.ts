import { UserEntity } from '@domain/users/entities/user.enity';
import { CreateUserUseCase } from '@domain/users/use-cases/create-user/create-user.use-case';
import { Body, Controller, Get, Inject, Post } from '@nestjs/common';

@Controller('users')
export class UsersController {
  constructor(
    @Inject(CreateUserUseCase) private readonly userUsecase: CreateUserUseCase,
  ) {}

  @Post('')
  async create(@Body() input: Partial<UserEntity>): Promise<void> {
    await this.userUsecase.execute(input);
  }

  @Get('')
  async details(): Promise<string> {
    return 'Ok';
  }
}
