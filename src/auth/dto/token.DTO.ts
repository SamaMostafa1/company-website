import { IsString, IsNotEmpty } from 'class-validator';

export class RefreshTokenData{
  @IsString()
  refresh_token: string;
}
