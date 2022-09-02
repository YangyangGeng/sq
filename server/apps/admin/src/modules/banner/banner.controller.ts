import { Banner } from '@libs/db/schemas/banner.schema';
import { Controller, Get, Param, Query } from '@nestjs/common';
import { Body, Post, Put } from '@nestjs/common/decorators';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { BannerService } from './banner.service';

@Controller('banner')
@ApiTags('首页Banner位配置')
export class BannerController {
    constructor(
        private readonly bannerService: BannerService
    ) {}

    @Get('list/:page/:size')
    @ApiOperation({
        summary: '获取banner列表'
    })
    public async getUsers(@Param('page') currentPage: number, @Param('size') pageSize: number, @Query() query: any) {
        return await this.bannerService.list(pageSize, currentPage, query);
    }

    @Post('create')
    @ApiOperation({
        summary: '添加banner'
    })
    public async create(@Body() bannerDto: Banner) {
        return await this.bannerService.create(bannerDto);
    }

    @Put('update/:id')
    @ApiOperation({
        summary: '修改banner信息'
    })
    public async update(@Body() banner: Banner, @Param('id') id: string) {
        return await this.bannerService.update(banner, id)
    }
}
