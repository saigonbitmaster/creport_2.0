import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProposalDocument = Proposal & Document;

@Schema()
export class Proposal {
  @Prop()
  name: string;

  @Prop()
  projectId: string;

  @Prop()
  proposalUrl: string;

  @Prop()
  requestedBudget: number;

  @Prop()
  previousProposals: string[];

  @Prop()
  walletAddress: string;

  @Prop()
  gitLink: string;

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

  @Prop()
  fundId: string;

  @Prop()
  challengeId: string;

  @Prop()
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

export const ProposalSchema = SchemaFactory.createForClass(Proposal);
