import {
  Body,
  Controller,
  Get,
  Inject,
  Patch,
  Post,
  Query,
  Response,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response as Res } from 'express';
import { UserApplicationFactory } from 'application/users/users.application';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { UpsertUsers } from '../dtos/upsert-users.dto';
import { UserEntity } from 'domain/users/entities/user.entity';
import { QueryUserDto } from '../dtos/query-user.dto';

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

  @Patch('')
  @ApiResponse({
    status: 201,
    description: 'returns only request status',
  })
  async update(
    @Response() res: Res,
    @Body() input: UpdateUserDto,
  ): Promise<Res> {
    const data = await this.userApplicationFactory.updateUser(input);
    return res.status(201).json(data);
  }

  @Post('/upsert')
  @ApiResponse({
    status: 201,
    description: 'returns only request status',
  })
  async upsert(@Response() res: Res, @Body() input: UpsertUsers): Promise<Res> {
    const data = await this.userApplicationFactory.upsertUsers(input.data);
    return res.status(201).json(data);
  }

  @Get('')
  async getAll(@Query() query: QueryUserDto): Promise<Array<UserEntity>> {
    return this.userApplicationFactory.getAll(query);
  }
}
