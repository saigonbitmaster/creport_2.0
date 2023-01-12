import { Module } from '@nestjs/common';
import { GitCommitService } from './service';
import { GitCommitController } from './controller';
import { MongooseModule } from '@nestjs/mongoose';
import { GitCommit, GitCommitSchema } from './schemas/schema';
import { ScheduleModule } from '@nestjs/schedule';
import { ProposalModule } from '../proposal/module';

@Module({
  providers: [GitCommitService],
  controllers: [GitCommitController],
  imports: [
    ScheduleModule.forRoot(),
    MongooseModule.forFeature([
      { name: GitCommit.name, schema: GitCommitSchema },
    ]),
    ProposalModule,
  ],
})
export class GitCommitModule {}
