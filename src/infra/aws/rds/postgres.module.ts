import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from './postgres.config';

@Module({
  imports: [TypeOrmModule.forRoot(config)],
  exports: [],
})
export class PostgresModule {}
