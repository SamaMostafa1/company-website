
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateOrganizationData {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;
}
