import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    

    const token = request.cookies['access_token'];

    if (!token) {
      throw new UnauthorizedException('Please login before do this action');
    }

    try {
      const payload = await this.jwtService.verifyAsync(token);
      // ฝังข้อมูล user ลงใน request เพื่อให้ใช้ต่อได้ใน Controller
      request['user'] = payload;
    } catch {
      throw new UnauthorizedException('Invalid or expired token! Please login again!');
    }
    return true;
  }
}