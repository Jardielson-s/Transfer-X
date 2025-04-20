import 'dotenv/config';
import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';
import { ConfigEnvs } from '../../../config/env';
import { DataSource, DataSourceOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

export const config: TypeOrmModuleOptions = {
  type: 'postgres',
  host: ConfigEnvs.postgres.host,
  port: Number(ConfigEnvs.postgres.port),
  username: ConfigEnvs.postgres.username,
  password: ConfigEnvs.postgres.password,
  database: ConfigEnvs.postgres.database,
  entities: [join(__dirname, '/../**/**.entity{.ts,.js}')],
  migrations: ['src/database/migrations/**/*.{ts, js}'],
  autoLoadEntities: true,
  synchronize: false,
  migrationsRun: false,
  namingStrategy: new SnakeNamingStrategy(),
};

export default registerAs('typeorm', () => config);
export const connectionSource = new DataSource(config as DataSourceOptions);
