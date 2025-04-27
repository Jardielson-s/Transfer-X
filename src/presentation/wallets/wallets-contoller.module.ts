import { Module } from '@nestjs/common';
import { WalletsController } from './controllers/wallet.controller';
import { ApplicationModule } from 'application/application.module';

@Module({
  imports: [ApplicationModule],
  controllers: [WalletsController],
  exports: [],
})
export class WalletsControllerModule {}
