import { Controller, HttpStatus, HttpCode, Get , Post, Body, Req , Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDTO } from './dto/signin.dto';
import type { Response } from 'express';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { RolesGuard } from 'src/rbac/roles.guard';
@Controller('api/auth')
export class AuthController {

    constructor(private authService: AuthService){}

    @UseGuards(AuthGuard, RolesGuard)
    @Get('profile')
    getProfile(@Req() req){
        return {
            isAuthen: true,
            user:req.user
        }
    }

    @HttpCode(HttpStatus.OK)
    @Post('login')
    async signIn(@Body() signInDto: SignInDTO, @Res({ passthrough: true }) response: Response) {

        const res_data = await this.authService.signIn(signInDto.username, signInDto.password)
        response.cookie('access_token', res_data.access_token, {
            httpOnly: true,    
            secure: false,  
            sameSite: 'lax', 
            maxAge: 24 * 60 * 60 * 1000
            });
        return res_data;
  }

    @Post('logout')
    async logout(@Res({ passthrough: true }) response: Response) {

        response.cookie('access_token', '', {
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
            expires: new Date(0),
        });

        return { success: true, message: 'Logged out successfully' };
    }

}
