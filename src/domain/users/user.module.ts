import { Module } from '@nestjs/common';
import { CreateUserUseCase } from './use-cases/create-user/create-user.use-case';
import { InfraModule } from 'infra/infra.module';
import { UpdateUserUseCase } from './use-cases/update-user/update-user.use-case';
import { UpsertUserUseCase } from './use-cases/upsert-users/upsert-users.use-case';

@Module({
  imports: [InfraModule],
  providers: [CreateUserUseCase, UpdateUserUseCase, UpsertUserUseCase],
  exports: [
    CreateUserUseCase,
    UpdateUserUseCase,
    UpsertUserUseCase,
    InfraModule,
  ],
})
export class UserDomainModule {}
