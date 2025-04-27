import { Module } from '@nestjs/common';
import { AwsModule } from './infra/aws/aws.module';
import { PresentationModule } from 'presentation/presentation.module';
import { InfraModule } from 'infra/infra.module';

@Module({
  imports: [PresentationModule, AwsModule, InfraModule],
  providers: [],
})
export class AppModule {}
