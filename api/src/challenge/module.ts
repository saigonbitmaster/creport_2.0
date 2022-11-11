import { Module } from '@nestjs/common';
import { ChallengeService } from './service';
import { ChallengeController } from './controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Challenge, ChallengeSchema } from './schemas/schema';
import { FundModule } from '../fund/module';

@Module({
  providers: [ChallengeService],
  controllers: [ChallengeController],
  imports: [
    FundModule,
    MongooseModule.forFeature([
      { name: Challenge.name, schema: ChallengeSchema },
    ]),
  ],
})
export class ChallengeModule {}
