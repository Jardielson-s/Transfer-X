import { UserEntity } from '@domain/users/entities/user.entity';
import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { UserApplicationFactory } from 'src/application/users/users.application';

@Controller('users')
export class UsersController {
  constructor(
    @Inject(UserApplicationFactory)
    private readonly userApplicationFactory: UserApplicationFactory,
  ) {}

  @Post('')
  async create(@Body() input: Partial<UserEntity>): Promise<void> {
    await this.userApplicationFactory.createUser(input);
  }

  @Get('')
  async details(): Promise<string> {
    return 'Ok';
  }
}
