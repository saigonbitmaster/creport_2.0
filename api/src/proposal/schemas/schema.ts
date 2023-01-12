import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as uniqueValidator from 'mongoose-unique-validator';

export type ProposalDocument = Proposal & Document;

@Schema()
export class Proposal {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  projectId: string;

  @Prop()
  proposalUrl: string;

  @Prop()
  requestedBudget: number;

  @Prop()
  previousProposals: string[];

  @Prop()
  walletAddress: string;

  // @Prop()
  // gitLink: string;

  // There are multiple github repo in 1 proposal
  @Prop()
  gitLinks: string[];

  @Prop()
  smartContract: string;

  @Prop()
  projectStatus: string;

  @Prop()
  startDate: Date;

  @Prop()
  completeDate: Date;

  @Prop()
  gitCommits: string[];

  @Prop()
  fundTransactions: string[];

  @Prop({ required: true })
  fundId: string;

  @Prop({ required: true })
  challengeId: string;

  @Prop({ required: true })
  proposerId: string;

  @Prop()
  description: string;

  @Prop()
  completedAt?: Date;

  @Prop()
  deletedAt?: Date;

  @Prop()
  createdDate?: Date;
}

const ProposalSchema = SchemaFactory.createForClass(Proposal);
ProposalSchema.plugin(uniqueValidator);
// Create index for mongo full text search
ProposalSchema.index({
  name: 'text',
  projectId: 'text',
  requestedBudget: 'text',
  projectStatus: 'text',
});

export { ProposalSchema };
