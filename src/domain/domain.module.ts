import { Module } from '@nestjs/common';
import { UserModule } from './users/user.module';

@Module({
  imports: [UserModule],
  exports: [UserModule],
})
export class DomainModule {}
