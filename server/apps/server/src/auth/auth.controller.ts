import { Login } from '@libs/db/schemas/customer.schema';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { Pass } from './pass.decorator';

@Controller('auth')
@ApiTags("用户验证")
export class AuthController {
    constructor(
        private readonly authService: AuthService,
    ) {}
    
    @Pass()
    @Post('login')
    @ApiOperation({
        summary: '用户登录'
    })
    public async login(@Body() loginDto: Login) {
        return await this.authService.login(loginDto);
    }
}
