import { Module } from '@nestjs/common';
import { ProposerService } from './service';
import { ProposerController } from './controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Proposer, ProposerSchema } from './schemas/schema';

@Module({
  providers: [ProposerService],
  controllers: [ProposerController],
  imports: [
    MongooseModule.forFeature([
      { name: Proposer.name, schema: ProposerSchema },
    ]),
  ],
})
export class ProposerModule {}
