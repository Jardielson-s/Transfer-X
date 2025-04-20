import { Module } from '@nestjs/common';
import { PresentationModule } from '@presentation/presentation.module';
import { AwsModule } from './infra/aws/aws.module';
import { RepositoryModule } from '@infra/repositories/repositories.module';

@Module({
  imports: [PresentationModule, AwsModule, RepositoryModule],
  providers: [],
})
export class AppModule {}
