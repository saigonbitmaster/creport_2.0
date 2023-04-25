import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Role } from '../../flatworks/types/types';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  fullName: string;

  @Prop()
  refreshToken: string;

  @Prop({
    type: String,
    required: false,
    enum: [Role.Admin, Role.User],
    default: Role.User,
  })
  role: string;

  @Prop()
  completedAt?: Date;

  @Prop({ required: true })
  createdAt?: Date;

  @Prop()
  deletedAt?: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
