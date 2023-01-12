import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ChallengeDocument = Challenge & Document;

@Schema()
export class Challenge {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  fundId: string;

  @Prop()
  budget: number;

  @Prop()
  description: string;

  @Prop()
  completedAt?: Date;

  @Prop()
  deletedAt?: Date;

  @Prop()
  createdDate?: Date;
}

const ChallengeSchema = SchemaFactory.createForClass(Challenge);
// Create index for mongo full text search
ChallengeSchema.index({
  name: 'text',
});

export { ChallengeSchema };
