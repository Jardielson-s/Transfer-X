import { Module } from '@nestjs/common';
import { UsersControllerModule } from './users/users-controller.module';
import { WalletsControllerModule } from './wallets/wallets-contoller.module';

@Module({
  imports: [UsersControllerModule, WalletsControllerModule],
  exports: [],
})
export class PresentationModule {}
