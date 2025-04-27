import { Module } from '@nestjs/common';
import { ApplicationModule } from 'src/application/application.module';
import { WalletsController } from './controllers/wallet.controller';

@Module({
  imports: [ApplicationModule],
  controllers: [WalletsController],
  exports: [],
})
export class WalletsControllerModule {}
