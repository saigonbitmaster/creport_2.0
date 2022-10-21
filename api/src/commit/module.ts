import { Module } from '@nestjs/common';
import { GitCommitService } from './service';
import { GitCommitController } from './controller';
import { MongooseModule } from '@nestjs/mongoose';
import { GitCommit, GitCommitSchema } from './schemas/schema';

@Module({
  providers: [GitCommitService],
  controllers: [GitCommitController],
  imports: [
    MongooseModule.forFeature([
      { name: GitCommit.name, schema: GitCommitSchema },
    ]),
  ],
})
export class GitCommitModule {}
