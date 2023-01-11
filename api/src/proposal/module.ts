import { Module } from '@nestjs/common';
import { ProposalService } from './service';
import { ProposalController } from './controller';
import { ProposalKpiController } from './controller.kpi';
import { MongooseModule } from '@nestjs/mongoose';
import { Proposal, ProposalSchema } from './schemas/schema';
import { FundModule } from '../fund/module';
import { ChallengeModule } from '../challenge/module';
import { ProposerModule } from '../proposer/module';

@Module({
  providers: [ProposalService],
  controllers: [ProposalController, ProposalKpiController],
  imports: [
    FundModule,
    ChallengeModule,
    ProposerModule,
    MongooseModule.forFeature([
      { name: Proposal.name, schema: ProposalSchema },
    ]),
  ],
  exports: [ProposalService],
})
export class ProposalModule {}
