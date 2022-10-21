import { Module } from '@nestjs/common';
import { ProposalService } from './service';
import { ProposalController } from './controller';
import { ProposalKpiController } from './controller.kpi';
import { MongooseModule } from '@nestjs/mongoose';
import { Proposal, ProposalSchema } from './schemas/schema';

@Module({
  providers: [ProposalService],
  controllers: [ProposalController, ProposalKpiController],
  imports: [
    MongooseModule.forFeature([
      { name: Proposal.name, schema: ProposalSchema },
    ]),
  ],
})
export class ProposalModule {}
