import { Injectable , UnauthorizedException, NotFoundException} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService, private jwtService: JwtService){}

    async signIn(username: string, pass: string): Promise<any> {
            
            const users = await this.usersService.findOne(username);
          
            if (!users || users.length === 0) {
                throw new NotFoundException({
                    isAuthen:false,
                    message: 'User Not Found',
                });
            }
             const user = users[0];

            if (user?.password !== pass) {
                throw new UnauthorizedException({
                    isAuthen:false,
                    message: 'Incorrect username or password'
                });
            }

            const payload = { sub: user.userId, username: user.username, role: user.role };
            
            return {
                isAuthen: true,
                message: 'Successfully login',
                access_token: await this.jwtService.signAsync(payload)
            };
  }
}
