import { Module } from '@nestjs/common';
import { FundService } from './service';
import { FundController } from './controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Fund, FundSchema } from './schemas/schema';

@Module({
  providers: [FundService],
  controllers: [FundController],
  imports: [
    MongooseModule.forFeature([{ name: Fund.name, schema: FundSchema }]),
  ],
})
export class FundModule {}
