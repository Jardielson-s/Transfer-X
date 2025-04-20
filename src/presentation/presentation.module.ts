import { Module } from '@nestjs/common';
import { UsersControllerModule } from './users/users-controller.module';

@Module({
  imports: [UsersControllerModule],
  exports: [],
})
export class PresentationModule {}
