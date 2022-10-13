import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProposerDocument = Proposer & Document;

@Schema()
export class Proposer {
  @Prop()
  fullName: string;

  @Prop()
  email: string;

  @Prop()
  walletAddress: string;

  @Prop()
  telegram: string;

  @Prop()
  description: string;

  @Prop()
  completedAt?: Date;

  @Prop()
  deletedAt?: Date;

  @Prop()
  createdDate?: Date;
}

export const ProposerSchema = SchemaFactory.createForClass(Proposer);
