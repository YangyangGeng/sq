import { Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Pass } from '../../auth/pass.decorator';
import { HomeService } from './home.service';

@Controller('home')
@ApiTags('用户首页模块')
export class HomeController {
    constructor(
        private readonly homeService: HomeService
    ) {}

    @Pass()
    @Post('getHome')
    @ApiOperation({
        summary: '获取首页数据'
    })
    public async getHome() {
        return await this.homeService.getHome()
    }
}
