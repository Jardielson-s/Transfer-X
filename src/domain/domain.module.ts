import { Module } from '@nestjs/common';
import { UserDomainModule } from './users/user.module';

@Module({
  imports: [UserDomainModule],
  exports: [UserDomainModule],
})
export class DomainModule {}
