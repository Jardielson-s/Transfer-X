import { Module } from '@nestjs/common';
import { UserRepository } from './users/users.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '@domain/users/entities/user.enity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [UserRepository],
  exports: [UserRepository],
})
export class RepositoryModule {}
