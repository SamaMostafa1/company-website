import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Types } from 'mongoose';
import { User } from './user.schema'; 
export class RefreshToken {
    @Prop({ required: true})
    refresh_token: string;
  
    @Prop({ required: true , ref: 'users',type:mongoose.Types.ObjectId})
    userId: mongoose.Types.ObjectId;
  
    @Prop({ required: true })
    expiresAt: Date;
  }
  
  export const RefreshTokenSchema = SchemaFactory.createForClass(RefreshToken);