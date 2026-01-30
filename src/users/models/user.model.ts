import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Roles } from '../enums/user.enum';

export type userDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({required: true})
    id: string
  @Prop({required: true, unique: true})
    email: string
  @Prop({required: true})
    password: string
  @Prop({required: true, default: Roles.USER, enum: Object.values(Roles)})
    role: Roles
}

export const userSchema = SchemaFactory.createForClass(User);