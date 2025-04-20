import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users.controller';
import { ApplicationModule } from 'src/application/application.module';

@Module({
  imports: [ApplicationModule],
  controllers: [UsersController],
  exports: [],
})
export class UsersControllerModule {}
