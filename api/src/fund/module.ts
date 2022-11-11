import { Module, Global } from '@nestjs/common';
import { FundService } from './service';
import { FundController } from './controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Fund, FundSchema } from './schemas/schema';

@Global()
@Module({
  providers: [FundService],
  controllers: [FundController],
  imports: [
    MongooseModule.forFeature([{ name: Fund.name, schema: FundSchema }]),
  ],
  exports: [FundService],
})
export class FundModule {}
