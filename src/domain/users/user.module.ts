import { Module } from '@nestjs/common';
import { CreateUserUseCase } from './use-cases/create-user/create-user.use-case';
import { InfraModule } from 'infra/infra.module';

@Module({
  imports: [InfraModule],
  providers: [CreateUserUseCase],
  exports: [CreateUserUseCase, InfraModule],
})
export class UserDomainModule {}
