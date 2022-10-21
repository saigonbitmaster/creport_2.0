import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { GitCommit as Commit } from '../../flatworks/types/types';

export type GitCommitDocument = GitCommit & Document;

@Schema()
export class GitCommit {
  @Prop()
  proposalId: string;

  @Prop()
  commits: Commit[];

  @Prop()
  completedAt?: Date;

  @Prop()
  createdDate?: Date;
}

export const GitCommitSchema = SchemaFactory.createForClass(GitCommit);
