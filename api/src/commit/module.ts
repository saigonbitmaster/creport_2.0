import { Module } from '@nestjs/common';
import { GitCommitService } from './service';
import { GitCommitController } from './controller';
import { MongooseModule } from '@nestjs/mongoose';
import { GitCommit, GitCommitSchema } from './schemas/schema';
import { BullModule } from '@nestjs/bull';
import { gitCommitQueueName } from '../types';
import { GitCommitProcessor } from './commit.processor';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  providers: [GitCommitService, GitCommitProcessor],
  controllers: [GitCommitController],
  imports: [
    ScheduleModule.forRoot(),
    BullModule.forRoot({
      redis: {
        host: process.env.REDIS_SERVER || 'localhost',
        port: +process.env.REDIS_PORT || 6379,
      },
    }),
    BullModule.registerQueue({
      name: gitCommitQueueName,
      redis: {
        host: process.env.REDIS_SERVER || 'localhost',
        port: +process.env.REDIS_PORT || 6379,
      },
    }),
    MongooseModule.forFeature([
      { name: GitCommit.name, schema: GitCommitSchema },
    ]),
  ],
})
export class GitCommitModule {}
