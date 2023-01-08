import { Module, Global } from '@nestjs/common';
import { ProposerService } from './service';
import { ProposerController } from './controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Proposer, ProposerSchema } from './schemas/schema';

@Global()
@Module({
  providers: [ProposerService],
  controllers: [ProposerController],
  imports: [
    MongooseModule.forFeature([
      { name: Proposer.name, schema: ProposerSchema },
    ]),
  ],
  exports: [ProposerService],
})
export class ProposerModule {}
