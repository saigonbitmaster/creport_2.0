import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as uniqueValidator from 'mongoose-unique-validator';

export type SettingDocument = Setting & Document;

@Schema()
export class Setting {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ required: true, unique: true })
  key: string;

  @Prop()
  url: string;

  @Prop()
  description: string;

  @Prop()
  completedAt?: Date;

  @Prop()
  deletedAt?: Date;

  @Prop()
  createdDate?: Date;
}

const SettingSchema = SchemaFactory.createForClass(Setting);
SettingSchema.plugin(uniqueValidator);
// Create index for mongo full text search
SettingSchema.index({
  name: 'text',
});

export { SettingSchema };
