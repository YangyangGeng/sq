import { Message } from '@libs/db/schemas/message.schema';
import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Pass } from '../../auth/pass.decorator';
import { MessageService } from './message.service';

@Controller('message')
@ApiTags('发布信息相关')
export class MessageController {
    constructor(
        private readonly messageService: MessageService
    ) {}
    
    @Pass()
    @Get('list/:page/:size')
    @ApiOperation({
        summary: '获取消息列表'
    })
    public async getUsers(@Param('page') currentPage: number, @Param('size') pageSize: number, @Query() query: any) {
        return await this.messageService.list(pageSize, currentPage, query);
    }

    @Pass()
    @Post('create')
    @ApiOperation({
        summary: '创建消息'
    })
    public async create(@Body() noticeDto: Message) {
        return await this.messageService.create(noticeDto);
    }

    @Pass()
    @Put('update/:id')
    @ApiOperation({
        summary: '修改notice信息'
    })
    public async update(@Body() message: Message, @Param('id') id: string) {
        return await this.messageService.update(message, id)
    }
}
