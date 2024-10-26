import { IsEmail, IsString,IsNotEmpty } from 'class-validator';
export class loginData{
    @IsEmail()
    @IsNotEmpty()
    email:string;
    @IsNotEmpty()
    password:string; 

}