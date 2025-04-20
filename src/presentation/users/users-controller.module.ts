import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users.controller';
import { UserModule } from '@domain/users/user.module';

@Module({
  imports: [UserModule],
  controllers: [UsersController],
  exports: [],
})
export class UsersControllerModule {}
