import { Module } from '@nestjs/common';
import { PostgresModule } from './rds/postgres.module';

@Module({
  imports: [PostgresModule],
  exports: [PostgresModule],
})
export class AwsModule {}
