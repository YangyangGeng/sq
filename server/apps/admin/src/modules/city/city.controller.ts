import { City } from '@libs/db/schemas/city.schema';
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CityService } from './city.service';

@Controller('city')
@ApiTags('选择城市模块')
export class CityController {
    constructor(
        private readonly cityService: CityService
    ) {}

    @Get('list')
    @ApiOperation({
        summary: '获取城市列表'
    })
    public async list() {
        return await this.cityService.list();
    }

    @Post('create')
    @ApiOperation({
        summary: '添加城市'
    })
    public async create(@Body() cityDto: City) {
        return await this.cityService.create(cityDto);
    }

    @Delete('delete/:id')
    @ApiOperation({
        summary: '删除分类'
    })
    public async delete(@Param('id') id: string) {
        return await this.cityService.delete(id);
    }

    @Put('update/:id')
    @ApiOperation({
        summary: '修改分类'
    })
    public async update(@Body() cityDto: City, @Param('id') id: string) {
        return await this.cityService.update(cityDto, id);
    }
}
