import { IsEmail, IsString, IsNotEmpty, IsOptional, MinLength } from 'class-validator';
export class createUserData{
    @IsNotEmpty()
    @IsString()
    @MinLength(3) 
    name:string;
    @IsEmail()
    @IsNotEmpty()
    @MinLength(6) 
    email:string;
    @IsNotEmpty()
    password:string;
    @IsOptional()
    isAdmin?:boolean;

}