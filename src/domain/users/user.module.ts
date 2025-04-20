import { Module } from '@nestjs/common';
import { CreateUserUseCase } from './use-cases/create-user/create-user.use-case';

@Module({
  imports: [],
  providers: [CreateUserUseCase],
  exports: [CreateUserUseCase],
})
export class UserModule {}
