import { Module } from '@nestjs/common';
import { ChallengeService } from './service';
import { ChallengeController } from './controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Challenge, ChallengeSchema } from './schemas/schema';

@Module({
  providers: [ChallengeService],
  controllers: [ChallengeController],
  imports: [
    MongooseModule.forFeature([
      { name: Challenge.name, schema: ChallengeSchema },
    ]),
  ],
})
export class ChallengeModule {}
