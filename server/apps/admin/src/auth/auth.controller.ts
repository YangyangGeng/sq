import { User } from '@libs/db/schemas/user.schema';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
    ) {}
    
    @Post('login')
    @ApiOperation({
        summary: '用户登录'
    })
    public async loginUser(@Body() userDto: User) {
        return await this.authService.login(userDto);
    }

    @Post('register')
    @ApiOperation({
        summary: '注册后台登录用户'
    })
    public async registerUser(@Body() userDto: User) {
        return await this.authService.register(userDto);
    }
}
