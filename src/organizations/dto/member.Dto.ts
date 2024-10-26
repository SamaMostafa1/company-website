
import { IsMongoId, IsNotEmpty, IsEnum } from 'class-validator';

export class AddMemberData {
  @IsNotEmpty()
  @IsMongoId()
  user_id: string; 

  @IsNotEmpty()
  @IsEnum(['admin', 'member'])
  access_level: 'admin' | 'member'; 
}
