import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from './user.schema';  

@Schema()
export class Organization  {
  @Prop({ type: String, required: true })  
  name: string;

  @Prop({ type: String, required: true })  
  description: string;

  @Prop({
    type: [{ 
      user_id: { type: Types.ObjectId, ref: 'users', required: true }, 
      access_level: { type: String, enum: ['admin', 'member'], required: true } 
    }],
    default: [],
  })
  members: { user_id: Types.ObjectId; access_level: string }[];  
}

// Create the schema based on the class
export const OrganizationSchema = SchemaFactory.createForClass(Organization);
