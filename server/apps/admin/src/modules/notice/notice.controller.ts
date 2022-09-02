import { Notice } from '@libs/db/schemas/notice.schema';
import { Controller, Get, Param, Query } from '@nestjs/common';
import { Body, Post, Put } from '@nestjs/common/decorators';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { NoticeService } from './notice.service';

@Controller('notice')
@ApiTags('系统消息通知和广告通知')
export class NoticeController {
    constructor(
        private readonly noticeService: NoticeService
    ) {}

    @Get('list/:page/:size')
    @ApiOperation({
        summary: '获取消息列表'
    })
    public async getUsers(@Param('page') currentPage: number, @Param('size') pageSize: number, @Query() query: any) {
        return await this.noticeService.list(pageSize, currentPage, query);
    }

    @Post('create')
    @ApiOperation({
        summary: '创建消息'
    })
    public async create(@Body() noticeDto: Notice) {
        return await this.noticeService.create(noticeDto);
    }

    @Put('update/:id')
    @ApiOperation({
        summary: '修改notice信息'
    })
    public async update(@Body() notice: Notice, @Param('id') id: string) {
        return await this.noticeService.update(notice, id)
    }
}
