import { Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CityService } from './city.service';

@Controller('city')
@ApiTags('选择城市模块')
export class CityController {
    constructor(
        private readonly cityService: CityService
    ) {}

    @Post('list')
    @ApiOperation({
        summary: '获取首页数据'
    })
    public async list() {
        return await this.cityService.list()
    }
}
