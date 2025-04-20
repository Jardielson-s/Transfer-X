import { Module } from '@nestjs/common';
import { UserApplicationFactory } from './users/users.application';
import { UserDomainModule } from '@domain/users/user.module';

@Module({
  imports: [UserDomainModule],
  providers: [UserApplicationFactory],
  exports: [UserApplicationFactory],
})
export class ApplicationModule {}
