import { BadRequestException, HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/user.schema'; 
import { createUserData } from './dto/createUser.Dto';
import * as bcrypt from 'bcrypt';
import { loginData } from './dto/login.Dto';
import { JwtService } from '@nestjs/jwt';
import { RefreshToken } from 'src/schemas/refreshToken.schema';
import { RefreshTokenData } from './dto/token.DTO';
import { uuid } from 'uuidv4';

@Injectable()
export class AuthService {
   
    constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(RefreshToken.name) private refresh_tokenModel: Model<RefreshToken>,
    private jwtService: JwtService
    ) {}
    ///////////////////////////////Sign up////////////////////////////////////////////
    async createUser(createUserData: createUserData): Promise<User> {
        const existingUser = await this.userModel.findOne({ email: createUserData.email });
        if (existingUser) {
            throw new BadRequestException("Email is already used");
        }
        const hashedPassword = await bcrypt.hash(createUserData.password, 10);
        const newUser = new this.userModel({
            ...createUserData,
            password: hashedPassword,
        });
        return newUser.save();
    }
  ///////////////////////////////login////////////////////////////////////////////
    async login(loginData: loginData) {
        const { email, password } = loginData;
        const user = await this.userModel.findOne({ email });
        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }else{
            const passwordMatch = await bcrypt.compare(password, user.password);
            if (!passwordMatch) {
                throw new UnauthorizedException('Invalid credentials');
            }
            const { access_token, refresh_token } = await this.generateTokens(user.id);
            return { message: 'Signin successful', access_token, refresh_token };
        }
       
    }
   //////////// token handling
    async refreshToken(refToken:string) {
        const token =  await this.refresh_tokenModel.findOne({ 
            refresh_token: refToken,
         });
        if (!token) {
        throw new UnauthorizedException();
        }
      const userId = token.userId; 
      const { access_token,refresh_token } = await this.generateTokens(userId);
        return { message: 'Tokens refreshed successfully', access_token,  refresh_token };
      }
    
      async generateTokens(userId): Promise<{ access_token: string; refresh_token: string }> {
        const access_token = this.jwtService.sign({ id: userId }, { expiresIn: '1h' });
        const refresh_token = uuid();
        await this.storerefreshToken( refresh_token ,userId); 
        return { access_token, refresh_token };
      }
      async storerefreshToken(token:string,user_id){
        const expire_date=new Date();
        expire_date.setDate(expire_date.getDate()+3);
        await  this.refresh_tokenModel.create({ token,user_id,expire_date});
      }
    }

