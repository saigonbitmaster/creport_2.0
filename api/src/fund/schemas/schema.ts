import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as uniqueValidator from 'mongoose-unique-validator';

export type FundDocument = Fund & Document;

@Schema()
export class Fund {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ required: true })
  currency: string;

  @Prop()
  budget: number;

  @Prop()
  date: Date;

  @Prop()
  description: string;

  @Prop()
  completedAt?: Date;

  @Prop()
  deletedAt?: Date;

  @Prop()
  createdDate?: Date;
}

const FundSchema = SchemaFactory.createForClass(Fund);
FundSchema.plugin(uniqueValidator);
// Create index for mongo full text search
FundSchema.index({
  name: 'text',
});

export { FundSchema };
