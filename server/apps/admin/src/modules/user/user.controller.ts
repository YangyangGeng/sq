import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { Body, Delete, Put } from '@nestjs/common/decorators';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';

@Controller('user')
@ApiTags('用户模块')
export class UserController {
    constructor(
        private readonly userService: UserService
    ) {}

    @Get('hello')
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth('jwt')
    hello() {
        return {
            success: true,
            msg: 'hello world'
        }
    }

    @Get('getUserInfo/:uid')
    @ApiOperation({
        summary: '获取用户信息'
    })
    public async getUserInfo(@Param('uid') uid: string) {
        return await this.userService.findOneById(uid)
    }

    @Get('list/:page/:size')
    @ApiOperation({
        summary: '获取用户列表'
    })
    public async getUsers(@Param('page') currentPage: number, @Param('size') pageSize: number, @Query() query: any) {
        return await this.userService.findAll(pageSize, currentPage, query);
    }

    @Delete('deleteUser/:uid')
    @ApiOperation({
        summary: '删除用户信息'
    })
    public async deleteUser(@Param('uid') uid: string) {
        return await this.userService.deleteUser(uid)
    }

    @Put('updateUser')
    @ApiOperation({
        summary: '修改用户信息'
    })
    public async updateUser(@Body() user) {
        return await this.userService.updateUser(user)
    }
}
