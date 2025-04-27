import { Body, Controller, Get, Inject, Post, Response } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response as Res } from 'express';
import { UserApplicationFactory } from 'application/users/users.application';
import { CreateUserDto } from '../dtos/create-user.dto';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(
    @Inject(UserApplicationFactory)
    private readonly userApplicationFactory: UserApplicationFactory,
  ) {}

  @Post('')
  @ApiResponse({
    status: 201,
    description: 'returns only request status',
  })
  async create(
    @Response() res: Res,
    @Body() input: CreateUserDto,
  ): Promise<Res> {
    const data = await this.userApplicationFactory.createUser(input);
    return res.status(201).json(data);
  }

  @Get('')
  async details(): Promise<string> {
    return 'Ok';
  }
}
