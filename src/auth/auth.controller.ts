import {
    Controller,
    Post,
    Body,
    Res,
    HttpStatus,
   
  } from '@nestjs/common';
import { AuthService } from './auth.service'; 
import { createUserData } from './dto/createUser.Dto'; 
import { loginData } from './dto/login.Dto'; 
import {    RefreshTokenData } from './dto/token.DTO';
import { response, Response } from 'express';

@Controller()
export class AuthController {
    constructor(private readonly authService: AuthService,) {} 

    @Post('signup')
    async createUser(@Body() createUserData: createUserData, @Res() response: Response) {
        return this.authService.createUser(createUserData);
        
    }
    @Post('signin')
    async login(@Body() loginData: loginData, @Res() response: Response) {
      const { message, access_token, refresh_token } = await this.authService.login(loginData);
      return response.status(HttpStatus.OK).json({ message, access_token, refresh_token });
    }
    @Post('refresh-token')
  async refreshToken(@Body() Token: string, @Res() response: Response) {
    const { message, access_token, refresh_token } = await this.authService.refreshToken(Token);
    return response.status(HttpStatus.OK).json({ message, access_token,refresh_token  });
  }
}

