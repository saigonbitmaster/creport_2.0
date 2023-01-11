import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as uniqueValidator from 'mongoose-unique-validator';

export type ProposerDocument = Proposer & Document;

@Schema()
export class Proposer {
  @Prop({ required: true })
  fullName: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop()
  walletAddress?: string;

  @Prop()
  telegram?: string;

  @Prop()
  description?: string;

  @Prop()
  completedAt?: Date;

  @Prop()
  deletedAt?: Date;

  @Prop()
  createdDate?: Date;
}

const ProposerSchema = SchemaFactory.createForClass(Proposer);
ProposerSchema.plugin(uniqueValidator);
// Create index for mongo full text search
ProposerSchema.index({
  fullName: 'text',
  email: 'text',
  telegram: 'text',
  walletAddress: 'text',
});

export { ProposerSchema };
