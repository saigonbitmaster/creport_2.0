import { Module, Global } from '@nestjs/common';
import { ChallengeService } from './service';
import { ChallengeController } from './controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Challenge, ChallengeSchema } from './schemas/schema';
@Global()
@Module({
  providers: [ChallengeService],
  controllers: [ChallengeController],
  imports: [
    MongooseModule.forFeature([
      { name: Challenge.name, schema: ChallengeSchema },
    ]),
  ],
  exports: [ChallengeService],
})
export class ChallengeModule {}
