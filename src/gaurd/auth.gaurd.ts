
import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException('Token not found');
    }

    try {
      // Validate the token and get the decoded payload
      const payload = await this.jwtService.verifyAsync(token, {
        secret: 'your_jwt_secret', // Ensure this matches the secret used to sign the JWT
      });

      // Attach the payload (user information) to the request object
      request['user'] = payload;

    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }

    return true; // Allow the request to proceed
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
