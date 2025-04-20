import { Module } from '@nestjs/common';
import { CreateUserUseCase } from './use-cases/create-user/create-user.use-case';
import { RepositoryModule } from '@infra/repositories/repositories.module';

@Module({
  imports: [RepositoryModule],
  providers: [CreateUserUseCase],
  exports: [CreateUserUseCase, RepositoryModule],
})
export class UserDomainModule {}
